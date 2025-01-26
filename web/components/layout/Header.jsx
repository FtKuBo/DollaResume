import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useUser, useSignOut } from "@gadgetinc/react";

const headerContainerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '64px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: 1000
};

const navContainerStyles = {
  maxWidth: '1200px',
  height: '100%',
  margin: '0 auto',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const logoStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000000',
  textDecoration: 'none'
};

const navLinksStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  position: 'relative'
};

const buttonStyles = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#000000',
  display: 'flex',
  alignItems: 'center'
};

const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: '8px',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  zIndex: 1001,
  minWidth: '180px',
  padding: '8px 0'
};

const dropdownLinkStyles = {
  display: 'block',
  padding: '8px 16px',
  color: '#000000',
  textDecoration: 'none',
  width: '100%',
  textAlign: 'left',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '16px',
  ':hover': {
    backgroundColor: '#f5f5f5'
  }
};

const authLinkStyles = {
  padding: '8px 16px',
  borderRadius: '4px',
  textDecoration: 'none',
  color: '#000000',
  fontSize: '16px',
  ':hover': {
    backgroundColor: '#f5f5f5'
  }
};

const Header = () => {
  const user = useUser();
  const signOut = useSignOut({ redirectOnSuccess: true, redirectToPath: "/" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={headerContainerStyles}>
      <nav style={navContainerStyles}>
        <Link to="/" style={logoStyles}>
          DollaResume
        </Link>
        
        <div style={navLinksStyles}>
          {user ? (
            <div ref={dropdownRef}>
              <button 
                style={buttonStyles}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.firstName || user.email}
              </button>
              
              {dropdownOpen && (
                <div style={dropdownStyles}>
                  <Link to="/profile" style={dropdownLinkStyles}>
                    Profile
                  </Link>
                  <button 
                    onClick={signOut}
                    style={dropdownLinkStyles}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/sign-in" style={authLinkStyles}>
                Sign In
              </Link>
              <Link to="/sign-up" style={authLinkStyles}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;