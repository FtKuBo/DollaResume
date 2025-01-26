import React from "react";
import { Link } from "react-router";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      isAuthError: false
    };
  }

  static getDerivedStateFromError(error) {
    const isAuthError = error?.message?.includes("GraphQL") || error?.message?.includes("unauthorized");
    return {
      error,
      isAuthError
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      if (this.state.isAuthError) {
        return (
          <div className="error-container" style={styles.container}>
            <h2 style={styles.heading}>Session Expired</h2>
            <p style={styles.message}>Please sign in again to continue</p>
            <Link to="/sign-in" style={styles.button}>Sign In</Link>
          </div>
        );
      }

      return (
        <div className="error-container" style={styles.container}>
          <h2 style={styles.heading}>Something went wrong</h2>
          <p style={styles.message}>
            {this.state.error.message || "An unexpected error occurred"}
          </p>
          <button onClick={this.handleRetry} style={styles.button}>
            Try Again
          </button>
          {process.env.NODE_ENV === "development" && (
            <details style={styles.details}>
              <summary>Error Details</summary>
              <pre style={styles.pre}>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    padding: "20px",
    margin: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
  },
  heading: {
    color: "#333",
    marginBottom: "16px"
  },
  message: {
    color: "#666",
    marginBottom: "20px"
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "16px"
  },
  details: {
    marginTop: "20px",
    textAlign: "left"
  },
  pre: {
    padding: "15px",
    backgroundColor: "#f5f5f5",
    borderRadius: "4px",
    overflow: "auto"
  }
};

export default ErrorBoundary;