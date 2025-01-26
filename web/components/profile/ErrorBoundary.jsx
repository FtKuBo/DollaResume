import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{
      padding: "20px",
      margin: "20px",
      borderRadius: "8px",
      backgroundColor: "#FEF2F2",
      border: "1px solid #FCA5A5",
      color: "#991B1B"
    }}>
      <h2 style={{
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "12px"
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontSize: "14px",
        marginBottom: "16px",
        color: "#7F1D1D"
      }}>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={resetErrorBoundary}
        style={{
          backgroundColor: "#DC2626",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#B91C1C"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#DC2626"}
      >
        Try Again
      </button>
    </div>
  );
};

const ProfileErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optional: Add any additional reset logic here
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ProfileErrorBoundary;