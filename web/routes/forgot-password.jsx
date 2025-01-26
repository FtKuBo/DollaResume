import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { Link } from "react-router";

const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const pageStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '20px',
  background: 'linear-gradient(135deg, #1a365d 0%, #2563eb 100%)',
  color: 'white'
};

const heroStyles = {
  textAlign: 'center',
  marginBottom: '2rem',
  animation: 'fadeIn 0.6s ease-out'
};

const formContainerStyles = {
  background: 'white',
  borderRadius: '12px',
  padding: '2.5rem',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  animation: 'slideUp 0.6s ease-out'
};

const inputStyles = {
  width: '100%',
  padding: '0.75rem 1rem',
  marginBottom: '1rem',
  border: '1px solid #E2E8F0',
  borderRadius: '0.375rem',
  fontSize: '1rem',
  color: '#1a202c',
  transition: 'border-color 0.2s ease',
  outline: 'none',
  '&:focus': {
    borderColor: '#2563eb',
    boxShadow: '0 0 0 1px #2563eb'
  }
};

const buttonStyles = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#1d4ed8'
  },
  '&:disabled': {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed'
  }
};

const linkStyles = {
  color: '#2563eb',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
  marginTop: '1rem',
  fontSize: '0.875rem',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: '#1d4ed8'
  }
};

export default function() {
  const {
    submit,
    register,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useActionForm(api.user.sendResetPassword);

  const content = isSubmitSuccessful ? (
    <div style={formContainerStyles}>
      <h2 style={{ color: '#1a202c', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>Check Your Email</h2>
      <p style={{ color: '#4a5568', marginBottom: '2rem', lineHeight: '1.5' }}>
        We've sent password reset instructions to your email address. Please check your inbox and follow the instructions to reset your password.
      </p>
      <Link to="/sign-in" style={linkStyles}>Return to Sign In</Link>
    </div>
  ) : (
    <div style={formContainerStyles}>
      <h1 style={{ color: '#1a202c', marginBottom: '1rem', fontSize: '1.75rem', fontWeight: '600' }}>Reset Your Password</h1>
      <p style={{ color: '#4a5568', marginBottom: '2rem', lineHeight: '1.5' }}>
        Don't worry! Enter your email address below and we'll send you instructions to reset your password.
      </p>
      <form onSubmit={submit}>
        <input 
          style={inputStyles}
          placeholder="Email address" 
          type="email"
          {...register("email")} 
        />
        <button 
          style={buttonStyles}
          disabled={isSubmitting} 
          type="submit"
        >
          {isSubmitting ? "Sending Instructions..." : "Reset Password"}
        </button>
        <Link to="/sign-in" style={linkStyles}>
          Back to Sign In
        </Link>
      </form>
    </div>
  );

  return (
    <>
      <style>{keyframes}</style>
      <div style={pageStyles}>
        <div style={heroStyles}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Password Reset</h1>
          <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>We'll help you get back into your account safely.</p>
        </div>
        {content}
      </div>
    </>
  );
}
