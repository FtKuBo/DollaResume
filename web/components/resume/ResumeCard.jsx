import { useAction } from "@gadgetinc/react";
import { api } from "../../api";
import { useState } from "react";

export default function ResumeCard({ resume, refetch, onReuseResume }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: isHovered 
      ? "0 8px 16px rgba(0, 0, 0, 0.1)" 
      : "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  };

  const titleStyle = {
    background: "linear-gradient(45deg, #2563eb, #4f46e5)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontSize: "16px",
    fontWeight: "500",
    margin: "0",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "12px",
  };

  const baseButtonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#2563eb",
    color: "white",
    ":hover": {
      backgroundColor: "#1d4ed8",
    },
  };

  const deleteButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#dc2626",
    color: "white",
    ":hover": {
      backgroundColor: "#b91c1c",
    },
  };

  const errorStyle = {
    color: "#dc2626",
    marginTop: "8px",
    fontSize: "14px",
  };

  const [{ fetching: isDeleting, error: deleteError }, deleteResume] = useAction(api.resumes.delete);

  const handleDelete = async () => {
    try {
      await deleteResume({ id: resume.id });
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleReuse = () => {
    if (resume.queries) {
      onReuseResume(resume.queries);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={headerStyle}>
        <div>
          <p style={titleStyle}>{formatDate(resume.createdAt)}</p>
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={handleReuse}
            style={primaryButtonStyle}
            disabled={!resume.queries}
          >
            Reuse
          </button>
          <button
            onClick={handleDelete}
            style={deleteButtonStyle}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {deleteError && (
        <div style={errorStyle}>
          Error deleting resume: {deleteError.message}
        </div>
      )}
    </div>
  );
}