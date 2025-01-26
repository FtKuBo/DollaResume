import { useFetch, useSignOut, useUser } from "@gadgetinc/react";
import { useNavigate } from "react-router";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease-in-out",
    animation: "slideUp 0.4s ease-in-out",
    overflow: "hidden",
  },
  header: {
    marginBottom: "32px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #2563eb 0%, #1a365d 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#4B5563",
    lineHeight: "1.5",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  button: {
    padding: "16px 28px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    background: "linear-gradient(135deg, #2563eb 0%, #1a365d 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  secondaryButton: {
    backgroundColor: "white",
    color: "#2563eb",
    border: "2px solid #2563eb",
    background: "white",
    transform: "none",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
  },
  signOutButton: {
    backgroundColor: "white",
    color: "#DC2626",
    border: "2px solid #DC2626",
    background: "white",
    transform: "none",
    marginTop: "16px",
    boxShadow: "0 2px 4px rgba(220, 38, 38, 0.1)",
  },
  // Add hover styles through inline style spread
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
  },
  secondaryButtonHover: {
    transform: "scale(1.05)",
    backgroundColor: "#F0F7FF",
    borderColor: "#1d4ed8",
    color: "#1d4ed8",
    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.15)",
  },
  signOutButtonHover: {
    transform: "scale(1.05)",
    backgroundColor: "#FEE2E2",
    borderColor: "#B91C1C",
    color: "#B91C1C", 
    boxShadow: "0 8px 16px rgba(220, 38, 38, 0.15)",
  },
};

export default function() {
  const user = useUser();
  const navigate = useNavigate();
  const signOut = useSignOut({ redirectOnSuccess: true, redirectToPath: "/sign-in" });

  const [{ data, fetching, error }, generateText] = useFetch("/resume", {
    method: "post",
    stream: "string",
  });

  const handleGenerate = async () => {
    await generateText();
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Let's Build Your Dream Career</h1>
            <p style={styles.subtitle}>
              Create a standout resume in minutes with our AI-powered platform. Get started now and make your next career move count.
            </p>
          </div>

          <div style={styles.buttonContainer}>
            <button
              style={{
                ...styles.button,
                ...(fetching ? {} : styles.buttonHover)
              }}
              onClick={() => navigate('/questions')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #1a365d 100%)";
              }}
            >
              Build Your Resume
            </button>
            <button
              style={{...styles.button, ...styles.secondaryButton}}
              onClick={() => navigate('/profile')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#F0F7FF";
                e.currentTarget.style.borderColor = "#1d4ed8";
                e.currentTarget.style.color = "#1d4ed8";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(37, 99, 235, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#2563eb";
                e.currentTarget.style.color = "#2563eb";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(37, 99, 235, 0.1)";
              }}
            >
              View Profile
            </button>
            <button
              style={{ ...styles.button, ...styles.signOutButton }}
              onClick={signOut}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#FEE2E2";
                e.currentTarget.style.borderColor = "#B91C1C";
                e.currentTarget.style.color = "#B91C1C";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(220, 38, 38, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#DC2626";
                e.currentTarget.style.color = "#DC2626";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(220, 38, 38, 0.1)";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}