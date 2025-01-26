import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation, Link } from "react-router";

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a365d 0%, #2563eb 100%)",
    padding: "2rem",
  },
  hero: {
    textAlign: "center",
    color: "white",
    marginBottom: "2.5rem",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    animation: "fadeIn 0.8s ease-out",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    opacity: "0.9",
    animation: "slideUp 0.8s ease-out",
  },
  formSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "440px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "2.5rem",
    width: "100%",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    animation: "fadeIn 0.5s ease-out",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.12)",
    },
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: "2rem",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "16px",
    color: "#2d3748",
    backgroundColor: "#f8fafc",
    transition: "all 0.2s ease-in-out",
    "&:focus": {
      outline: "none",
      borderColor: "#3b82f6",
      backgroundColor: "white",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
    "&:hover": {
      borderColor: "#cbd5e0",
    },
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    backgroundColor: "white",
    color: "#2d3748",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "1rem",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#cbd5e0",
    },
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#1d4ed8",
      transform: "translateY(-1px)",
    },
    "&:disabled": {
      backgroundColor: "#93c5fd",
      cursor: "not-allowed",
      transform: "none",
    },
  },
  errorMessage: {
    color: "#dc2626",
    fontSize: "14px",
    marginTop: "-0.5rem",
    marginBottom: "1rem",
    fontWeight: "500",
  },
  successMessage: {
    color: "#059669",
    fontSize: "14px",
    marginBottom: "1rem",
    textAlign: "center",
    fontWeight: "500",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "@keyframes slideUp": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
};

export default function() {
  const {
    register,
    submit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.signUp, {
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { search } = useLocation();

  return (
    <div style={styles.root}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to DollaResume</h1>
        <p style={styles.heroSubtitle}>Create your professional resume in minutes</p>
      </div>
      <div style={styles.formSection}>
        <div style={styles.card}>
          <form onSubmit={async (e) => {
            e.preventDefault();
            console.log("Starting form submission");
            try {
              await submit(e);
            } catch (error) {
              console.error("Form submission failed:", error);

              // Check if error is about duplicate email
              if (error.message?.toLowerCase().includes("email already exists")) {
                setError('email', {
                  type: 'duplicate',
                  message: 'An account with this email already exists. Please sign in instead.'
                });
              } else {
                setError('root', {
                  type: 'submit',
                  message: error.message || 'An error occurred during signup'
                });
              }
            }
          }}>
            <h1 style={styles.title}>Create account</h1>
            <a
              href={`/auth/google/start${search}`}
              style={styles.googleButton}
            >
              <img
                src="https://assets.gadget.dev/assets/default-app-assets/google.svg"
                alt="Google logo"
                style={{ marginRight: "10px", width: "20px", height: "20px" }}
              />
              Continue with Google
            </a>

            <input
              style={styles.input}
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors?.email &&
              <p style={styles.errorMessage}>
                {errors.email.message}
              </p>
            }
            <input
              style={styles.input}
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                }
              })}
            />
            {errors?.password &&
              <p style={styles.errorMessage}>
                {errors.password.message}
              </p>
            }
            {errors?.root?.message &&
              <p style={styles.errorMessage}>
                {errors.root.message}
              </p>
            }
            {isSubmitSuccessful && !errors?.email && !errors?.root &&
              <p style={styles.successMessage}>
                Please check your inbox to verify your email
              </p>
            }
            <button
              style={{
                ...styles.submitButton,
                ...(isSubmitting && styles.submitButton["&:disabled"])
              }}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <span style={{ color: "#64748b" }}>Already have an account? </span>
              <Link
                to="/sign-in"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontWeight: "500",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                }}
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}