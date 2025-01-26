import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate, Link } from "react-router";
import "./ProfileLayout.css";

const ErrorFallback = ({ error }) => {
  return (
    <div className="profile-layout__error">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <Link to="/" className="profile-layout__error-link">
        Return Home
      </Link>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="profile-layout__loading">
    <p>Loading...</p>
  </div>
);

export default function ProfileLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="profile-layout">
      <div className="profile-layout__navigation">
        <button 
          onClick={() => navigate("/signed-in")} 
          className="profile-layout__nav-button"
        >
          Back to Home
        </button>
      </div>
      <main className="profile-layout__main">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <div className="profile-layout__content">
              {children}
            </div>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}