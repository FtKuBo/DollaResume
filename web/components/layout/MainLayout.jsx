import { Suspense } from "react";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";

function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: "2rem", textAlign: "center", backgroundColor: "#FEF2F2", borderRadius: "0.5rem", margin: "2rem" }}>
      <h2 style={{ color: "#991B1B", marginBottom: "1rem" }}>Something went wrong</h2>
      <pre style={{ color: "#DC2626", fontSize: "0.875rem" }}>{error.message}</pre>
    </div>
  );
}

export default function MainLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div style={{ 
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F9FAFB"
      }}>
        <Header />
        <main style={{
          flex: "1 1 auto",
          padding: "2rem",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto"
        }}>
          <Suspense fallback={
            <div style={{ 
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ fontSize: "0.875rem", color: "#6B7280" }}>Loading...</div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
        <footer style={{
          padding: "2rem",
          backgroundColor: "white",
          borderTop: "1px solid #E5E7EB",
          textAlign: "center"
        }}>
          <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>© 2024 DollaResume. All rights reserved.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}