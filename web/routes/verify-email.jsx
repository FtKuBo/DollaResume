import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useAction } from "@gadgetinc/react";
import { api } from "../api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [, verifyEmail] = useAction(api.user.verifyEmail);
  const code = searchParams.get("code");

  useEffect(() => {
    const verify = async () => {
      await verifyEmail({ code });
      setTimeout(() => {
        navigate("/sign-in", { replace: true });
      }, 1500);
    };

    verify();
  }, [code, verifyEmail, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '24px',
          color: '#333',
          marginBottom: '16px'
        }}>Verifying Email</h2>
        <p style={{
          color: '#666',
          fontSize: '16px',
          margin: 0
        }}>Please wait while we verify your email address...</p>
      </div>
    </div>
  );
}
