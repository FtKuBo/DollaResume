import { useActionForm, useAuth } from "@gadgetinc/react";
import { api } from "../api";
import { useLocation, Link } from "react-router";
import { useState, useEffect } from "react";

export default function() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const {
    submit,
    register,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.resetPassword, {
    defaultValues: {
      code: params.get("code"),
      password: "",
      confirmPassword: "",
    },
  });
  const { configuration } = useAuth();

  useState(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a365d 0%, #2563eb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      opacity: isVisible ? 1 : 0,
      animation: "fadeIn 500ms ease-out forwards"
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "0 20px"
      }}>
        <div style={{
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "white",
            margin: "0 0 8px 0",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }}>Reset Your Password</h1>
          <p style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.9)",
            margin: 0
          }}>Choose a new secure password for your account</p>
        </div>
        <div>
          {isSubmitSuccessful ? (
            <div style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              animation: "slideDown 500ms ease-out forwards",
              textAlign: "center"
            }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1a1a1a",
                margin: "0 0 16px 0"
              }}>Password Reset Successfully!</h2>
              <p style={{
                fontSize: "16px",
                color: "#666",
                margin: "0 0 24px 0"
              }}>Your password has been updated.</p>
              <Link to={configuration.signInPath} style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "linear-gradient(90deg, #3182ce 0%, #2c5282 100%)",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
                transition: "opacity 150ms ease-in-out",
                cursor: "pointer",
                border: "none",
                ":hover": {
                  opacity: 0.9
                }
              }}>
                Sign in now
              </Link>
            </div>
          ) : (
            <div style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              animation: "slideDown 500ms ease-out forwards"
            }}>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  margin: "0 0 8px 0"
                }}>Create New Password</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <input
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box",
                      transition: "border-color 150ms ease-in-out",
                      outline: "none",
                      "&:focus": {
                        borderColor: "#2563eb"
                      }
                    }}
                    placeholder="New password"
                    type="password"
                    {...register("password")}
                  />
                  {errors?.user?.password?.message && (
                    <p style={{
                      color: "#e53e3e",
                      margin: "4px 0 0 0",
                      fontSize: "14px"
                    }}>{errors?.user?.password?.message}</p>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <input
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "16px",
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                    placeholder="Confirm password"
                    type="password"
                    {...register("confirmPassword", {
                      validate: (value) => value === watch("password") || "The passwords do not match",
                    })}
                  />
                  {errors?.confirmPassword?.message && (
                    <p style={{
                      color: "#e53e3e",
                      margin: "4px 0 0 0",
                      fontSize: "14px"
                    }}>{errors.confirmPassword.message}</p>
                  )}
                </div>
                {errors?.root?.message && (
                  <p style={{
                    color: "#e53e3e",
                    margin: "4px 0 0 0",
                    fontSize: "14px"
                  }}>{errors.root.message}</p>
                )}
                <button
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #1a365d 0%, #2563eb 100%)",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "500",
                    transition: "opacity 150ms ease-in-out",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    border: "none",
                    opacity: isSubmitting ? 0.7 : 1,
                    fontSize: "16px"
                  }}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
