import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { Link, useLocation } from "react-router";

const pageStyles = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem 1rem",
  background: "linear-gradient(135deg, #1a365d 0%, #2563eb 100%)",
  animation: "fadeIn 0.6s ease-out"
};

const heroStyles = {
  textAlign: "center",
  marginBottom: "2.5rem",
  animation: "slideDown 0.8s ease-out",
  color: "white"
};

const formContainerStyles = {
  backgroundColor: "#ffffff",
  backdropFilter: "blur(8px)",
  borderRadius: "0.75rem",
  padding: "2rem",
  width: "100%",
  maxWidth: "28rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  transform: "translateY(0)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 8px -2px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.08), 0 25px 35px -12px rgba(0, 0, 0, 0.2)"
  },
  animation: "slideUp 0.8s ease-out"
};

const inputStyles = {
  width: "100%",
  padding: "0.75rem 1rem",
  marginBottom: "1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  transition: "all 0.3s ease",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  ":focus": {
    outline: "none",
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)"
  }
};

const buttonStyles = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "linear-gradient(to right, #2563eb, #1d4ed8)",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  fontWeight: "500",
  transition: "all 0.3s ease",
  cursor: "pointer",
  ":hover": {
    background: "linear-gradient(to right, #1d4ed8, #1e40af)",
    transform: "translateY(-2px)"
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "none"
  }
};

const googleButtonStyles = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "0.75rem 1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "0.5rem",
  backgroundColor: "white",
  transition: "all 0.3s ease",
  cursor: "pointer",
  marginBottom: "1.5rem"
};


export default function SignIn() {
  const {
    register,
    submit,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signIn);
  const { search } = useLocation();

  return (
    <div style={pageStyles}>
      <div style={heroStyles}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.75rem" }}>Welcome Back</h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "0.5rem" }}>Sign in to continue your journey</p>
        <p style={{ fontSize: "1rem", opacity: 0.75, maxWidth: "28rem", margin: "0 auto" }}>
          Access your personalized resume builder and continue crafting professional resumes that stand out
        </p>
      </div>

      <div style={formContainerStyles}>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
          <a
            href={`/auth/google/start${search}`}
            style={{ ...googleButtonStyles, marginBottom: "1rem" }}
          >
            <img
              src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
              width={22}
              height={22}
              alt="Google logo"
            />
            <span>Continue with Google</span>
          </a>


          <div style={{ marginBottom: "1rem" }}>
            <input
              style={inputStyles}
              placeholder="Email"
              {...register("email")}
            />
            <input
              style={inputStyles}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
          </div>

          {errors?.root?.message && (
            <div style={{
              padding: "0.75rem",
              borderRadius: "0.375rem",
              backgroundColor: "#fef2f2",
              color: "#dc2626",
              fontSize: "0.875rem",
              animation: "fadeIn 0.3s ease-out",
              marginBottom: "1rem"
            }}>
              {errors.root.message}
            </div>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            style={buttonStyles}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p style={{ textAlign: "center", color: "#4b5563" }}>
            Forgot your password?{" "}
            <Link 
              to="/forgot-password"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                transition: "all 0.3s ease",
                ":hover": {
                  textDecoration: "underline"
                }
              }}
            >
              Reset password
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

