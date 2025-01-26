import { useState, Suspense, useCallback, useEffect } from "react";
import { useSession, useAction, useFindMany } from '@gadgetinc/react';
import { useNavigate } from 'react-router';
import { api } from '../api';
import ResumeCard from '../components/resume/ResumeCard';
import ResumeForm from '../components/resume/ResumeForm';

// Shared styles
const pageContainerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  paddingTop: "84px"
};

const contentContainerStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "24px",
  paddingBottom: "40px"
};

const scrollContainerStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  marginTop: "20px",
  gap: "20px"
};

const gradientTextStyle = {
  background: "linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem"
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  marginBottom: "20px",
  animation: "fadeIn 0.5s ease-out, slideUp 0.5s ease-out"
};

const buttonStyle = {
  backgroundColor: "#0077FF",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "6px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
  ":hover": {
    backgroundColor: "#0066DD",
    transform: "translateY(-1px)"
  }
};


export default function Questions() {
  const navigate = useNavigate();
  const session = useSession();
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const [aiResponse, setAiResponse] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [{ data: createdResume, fetching: createFetching, error: createError }, create] = useAction(api.resumes.create);

  const [{ data: resumes = [], fetching: resumesFetching, error: resumesError }] = useFindMany(api.resumes, {
    filter: { userEmail: { equals: session?.user?.email } },
    sort: { createdAt: "Descending" },
    pause: !session?.user?.email
  });

  const [initialFormData, setInitialFormData] = useState(null);

  const handleReuseResume = (resume) => {
    console.log(resume);
    try {
      setInitialFormData(resume.formData);
      setShowForm(true);
    } catch (error) {
      console.error("Error processing resume data:", error);
    }
  };

  const handleDownloadPDF = useCallback(async () => {
    setPdfError(null);
    setPdfGenerating(true);

    try {
      if (!aiResponse) {
        throw new Error("No resume content available to generate PDF");
      }
      console.log(aiResponse);
      let parsedAiResponse;
      try {
        parsedAiResponse = JSON.parse(aiResponse);
      } catch (err) {
        throw new Error("Failed to parse AI response: Invalid JSON format");
      }

      const pdfData = {
        surname: session?.user?.firstName || '',
        lastname: session?.user?.lastName || '',
        email: session?.user?.email || '',
        phone: session?.user?.phoneNumber || '',
        education: parsedAiResponse.education || [],
        experience: parsedAiResponse.experience || [],
        skills: parsedAiResponse.skills || [],
        projects: parsedAiResponse.projects || [],
        links: parsedAiResponse.links || []
      };

      console.log(pdfData);

      const response = await api.fetch("/generate-pdf", {
        method: "POST",
        body: JSON.stringify(pdfData),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('[PDF Generation] Error:', err);
      setPdfError(err.message);
    } finally {
      setPdfGenerating(false);
    }
  }, [aiResponse]);

  useEffect(() => {
    if (showSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showSuccess]);

  const handleSubmit = async (formData) => {
    setAiError(null);
    setAiLoading(true);

    try {
      const controller = new AbortController();
      const response = await api.fetch("/resume", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Failed to process resume with AI: ${response.status} ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("No response body received from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeResponse = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // Final decode to catch any remaining bytes
            completeResponse += decoder.decode();
            break;
          }
          // Stream decode with streaming flag to preserve partial multi-byte characters
          completeResponse += decoder.decode(value, { stream: true });
        }

        // Set the complete AI response
        setAiResponse(completeResponse);

        // Create the resume record
        await create({
          queries: {
            formData
          },
          userEmail: session?.user?.email,
        });
      } catch (error) {
        reader.cancel();
        if (error.name === 'AbortError') {
          throw new Error('Request was cancelled');
        }
        throw new Error(`Error processing AI response: ${error.message}`);
      }

      setShowForm(false);
      setShowSuccess(true);
      setInitialFormData(null);
    } catch (err) {
      console.error('[Resume Form] Error:', err);
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)"
      }}>
        <div style={{...gradientTextStyle}}>Loading your resume builder...</div>
      </div>
    }>
      <div style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          {(createError || resumesError || aiError) && (
            <div style={{
              padding: "16px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "4px"
            }}>
              Error: {createError?.message || resumesError?.message || aiError}
            </div>
          )}

          {showSuccess ? (
            <div style={{
              ...cardStyle,
              margin: "24px auto",
              maxWidth: "800px"
            }}>
              <h2 style={{...gradientTextStyle, marginBottom: "16px"}}>Resume Information Saved!</h2>
              <p style={{
                color: "#666",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "24px"
              }}>
                Your resume information has been successfully saved. You can now view it in your profile.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                marginTop: '24px',
                flexWrap: 'wrap' 
              }}>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowForm(false);
                  }}
                  style={{...buttonStyle}}
                >
                  Create Another Resume
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={pdfGenerating || !aiResponse}
                  style={{
                    ...buttonStyle,
                    opacity: (pdfGenerating || !aiResponse) ? 0.6 : 1,
                    cursor: (pdfGenerating || !aiResponse) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {pdfGenerating ? 'Generating PDF...' : 'Download PDF'}
                </button>
              </div>
              {pdfError && (
                <div style={{
                  padding: '16px',
                  marginTop: '10px',
                  backgroundColor: '#fee',
                  color: '#c00',
                  borderRadius: '4px'
                }}>
                  PDF Generation Error: {pdfError}
                </div>
              )}
            </div>
          ) : !showForm ? (
            <>
              <div style={{...cardStyle}}>
                <h1 style={{...gradientTextStyle}}>Build Your Professional Resume</h1>
                <p style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  marginBottom: "24px",
                  lineHeight: "1.6"
                }}>
                  Welcome to our AI-powered resume builder. Fill in your key details, and we'll help
                  you craft a compelling resume that stands out.
                </p>
                <button 
                  onClick={() => setShowForm(true)} 
                  style={{
                    ...buttonStyle,
                    fontSize: "1.1rem"
                  }}
                >
                  Get Started
                </button>
              </div>

              {resumesFetching ? (
                <div style={{
                  ...cardStyle,
                  textAlign: 'center',
                  padding: '20px',
                  color: '#666'
                }}>Loading your resumes...</div>
              ) : resumes.length > 0 ? (
                <div>
                  <h2 style={{
                    ...gradientTextStyle,
                    margin: "30px 0 20px"
                  }}>Your Previous Resumes</h2>
                  <div style={scrollContainerStyle}>
                    {resumes.map((resume) => (
                      <ResumeCard
                        key={resume.id}
                        resume={resume}
                        isExpanded={expandedId === resume.id}
                        onToggleExpand={() => setExpandedId(expandedId === resume.id ? null : resume.id)}
                        onReuseResume={handleReuseResume}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>No resumes found. Create your first one!</div>
              )}
            </>
          ) : (
            <ResumeForm
              onSubmit={handleSubmit}
              isLoading={createFetching}
              aiLoading={aiLoading}
              error={aiError}
              initialData={initialFormData}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
}
