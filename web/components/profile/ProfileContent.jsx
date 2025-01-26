import { useState, useTransition, useCallback, useRef, useEffect, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUser, useAction } from "@gadgetinc/react";
import { api } from "../../api";
import "./ProfileContent.css";

// Fallback component for error boundary
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="profile-content__error-boundary" role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

// SVG icon component
const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7 1.3C12.1 0.9 12.6 0.7 13.1 0.7C13.6 0.7 14.1 0.9 14.5 1.3C14.9 1.7 15.1 2.2 15.1 2.7C15.1 3.2 14.9 3.7 14.5 4.1L4.7 13.9L0.7 15.1L1.9 11.1L11.7 1.3Z" 
          fill="currentColor"/>
  </svg>
);

const ProfileContent = () => {
  const user = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(() => ({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? ""
  }));
  const [validations, setValidations] = useState({
    firstName: true,
    lastName: true,
    phoneNumber: true
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const saveTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);
  const [isPending, startTransition] = useTransition();
  const [{ fetching }, updateUser] = useAction(api.user.update);
  const handleEditClick = () => {
    if (user) {
      startTransition(() => {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || ""
        });
        setEditMode(true);
        setError("");
      });
    }
  };

  if (!user) return (
    <div className="profile-content profile-content--loading" aria-busy="true">
      <div className="profile-content__skeleton">
        <div className="profile-content__skeleton-field" aria-hidden="true" />
        <div className="profile-content__skeleton-field" aria-hidden="true" />
        <div className="profile-content__skeleton-field" aria-hidden="true" />
        <div className="profile-content__skeleton-field" aria-hidden="true" />
      </div>
    </div>
  );

  const validatePhoneNumber = useCallback((phone) => {
    // Stricter phone regex that requires proper formatting
    const phoneRegex = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
    return phone === "" || phoneRegex.test(phone);
  }, []);

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'phoneNumber':
        return validatePhoneNumber(value);
      case 'firstName':
      case 'lastName':
        return value.trim().length >= 2 && value.trim().length <= 50;
      default:
        return true;
    }
  }, [validatePhoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const isValid = validateField(name, value);
    setValidations(prev => ({ ...prev, [name]: isValid }));
    
    if (!isValid) {
      const message = name === 'phoneNumber' 
        ? 'Please enter a phone number in format: +1 (555) 555-5555'
        : `${name === 'firstName' ? 'First' : 'Last'} name must be between 2 and 50 characters`;
      setError(message);
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const isValid = Object.values(validations).every(v => v);
    if (!isValid) {
      setError("Please correct the invalid fields before saving.");
      return;
    }

    // Only send fields that have changed
    const changes = {};
    for (const [key, value] of Object.entries(formData)) {
      const trimmedValue = typeof value === 'string' ? value.trim() : value;
      if (user[key] !== trimmedValue) {
        changes[key] = trimmedValue;
      }
    }

    // Always include the ID
    if (Object.keys(changes).length === 0) {
      setSuccess(true);
      setEditMode(false);
      return;
    }

    try {
      await updateUser({ 
        id: user.id,
        ...changes
      });
      setSuccess(true);
      setEditMode(false);
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
      saveTimeout.current = setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
      console.error("Profile update error:", err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setError("");
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="profile-content-wrapper">
        <div className={`profile-content ${editMode ? 'profile-content--edit-mode' : ''}`}>
        <div className="profile-content__messages" aria-live="polite">
          {success && (
            <p className="profile-content__success" role="alert" aria-live="polite">
              <span className="profile-content__success-icon" aria-hidden="true">✓</span>
              Profile updated successfully at {new Date().toLocaleTimeString()}
            </p>
          )}
          {error && (
            <p className="profile-content__error" role="alert" aria-live="assertive">
              <span className="profile-content__error-icon" aria-hidden="true">!</span>
              {error}
            </p>
          )}
        </div>
        <form className="profile-content__form" onSubmit={handleSubmit}>
          <div className="profile-content__field">
            <label className="profile-content__label" htmlFor="email">Email Address</label>
            <input 
              className="profile-content__input"
              type="email"
              id="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="profile-content__field">
            <label className="profile-content__label" htmlFor="firstName">First Name</label>
            <input 
              className={`profile-content__input ${!validations.firstName && editMode ? 'profile-content__input--invalid' : ''}`} 
              aria-invalid={!validations.firstName && editMode}
              aria-describedby={!validations.firstName && editMode ? "firstName-error" : undefined}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editMode || fetching}
            />
          </div>
          <div className="profile-content__field">
            <label className="profile-content__label" htmlFor="lastName">Last Name</label>
            <input 
              className={`profile-content__input ${!validations.lastName && editMode ? 'profile-content__input--invalid' : ''}`} 
              aria-invalid={!validations.lastName && editMode}
              aria-describedby={!validations.lastName && editMode ? "lastName-error" : undefined}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editMode || fetching}
            />
          </div>
          <div className="profile-content__field">
            <label className="profile-content__label" htmlFor="phoneNumber">Phone Number</label>
            <div className="profile-content__field-wrapper">
              <input 
                className={`profile-content__input ${!validations.phoneNumber && editMode ? 'profile-content__input--invalid' : ''}`} 
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!editMode || fetching}
                placeholder="+1 (555) 555-5555"
                aria-invalid={!validations.phoneNumber && editMode}
                pattern="^\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$"
              />
              {!validations.phoneNumber && editMode && (
                <span id="phoneNumber-error" className="profile-content__validation-message" role="alert">
                  Phone number must be in format: +1 (555) 555-5555
                </span>
              )}
            </div>
          </div>
          <div className="profile-content__button-container">
            {!editMode ? (
              <button 
                type="button"
                className="profile-content__action-button profile-content__action-button--secondary"
                onClick={handleEditClick}
                disabled={!user || isPending}
                aria-label="Edit profile information"
              >
                <span className="profile-content__button-icon" aria-hidden="true"><PencilIcon /></span>
                {isPending ? "Loading..." : "Edit Profile"}
              </button>
            ) : (
              <>
                <button 
                  type="submit"
                  className="profile-content__action-button profile-content__action-button--primary"
                  disabled={fetching || isPending || !Object.values(validations).every(v => v)}
                  aria-busy={fetching}
                  aria-disabled={fetching || isPending || !Object.values(validations).every(v => v)}
                >
                  {fetching ? (
                    <span className="profile-content__button-loading" role="status">
                      <span className="profile-content__button-loading-icon" aria-hidden="true">↻</span>
                      <span className="profile-content__button-loading-text">Saving...</span>
                    </span>
                  ) : "Save Changes"}
                </button>
                <button 
                  type="button"
                  className="profile-content__action-button profile-content__action-button--secondary"
                  onClick={handleCancel}
                  disabled={fetching || isPending}
                  aria-label="Cancel editing profile"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProfileContent;
