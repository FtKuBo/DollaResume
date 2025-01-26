import { Link } from "react-router";

const styles = {
  landing: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "clamp(1rem, 5vw, 2rem)",
    background: "linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%)"
  },
  hero: {
    textAlign: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "clamp(2rem, 8vw, 4rem) auto",
    padding: "0 1rem"
  },
  title: {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    fontWeight: "700",
    marginBottom: "clamp(1rem, 3vw, 1.5rem)",
    background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: "1.2"
  },
  subtitle: {
    fontSize: "clamp(1rem, 3vw, 1.25rem)",
    color: "#4b5563",
    marginBottom: "clamp(1.5rem, 5vw, 2.5rem)",
    lineHeight: "1.7",
    maxWidth: "600px",
    margin: "0 auto 2rem"
  },
  ctaContainer: {
    display: "flex",
    gap: "clamp(0.5rem, 2vw, 1rem)",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    "@media (max-width: 640px)": {
      flexDirection: "column",
      padding: "0 1rem"
    }
  },
  primaryCta: {
    background: "#2563eb",
    color: "white",
    padding: "0.875rem clamp(1.5rem, 4vw, 2rem)",
    borderRadius: "0.5rem",
    fontWeight: "600",
    transition: "transform 0.2s",
    textDecoration: "none",
    textAlign: "center",
    "@media (hover: hover)": {
      ":hover": {
        transform: "translateY(-2px)"
      }
    },
    "@media (max-width: 640px)": {
      width: "100%"
    }
  },
  secondaryCta: {
    background: "white",
    color: "#2563eb",
    padding: "0.875rem clamp(1.5rem, 4vw, 2rem)",
    borderRadius: "0.5rem",
    fontWeight: "600",
    border: "2px solid #2563eb",
    textDecoration: "none",
    transition: "background 0.2s",
    textAlign: "center",
    "@media (hover: hover)": {
      ":hover": {
        background: "#f0f7ff"
      }
    },
    "@media (max-width: 640px)": {
      width: "100%"
    }
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: "clamp(1rem, 3vw, 2rem)",
    width: "100%",
    maxWidth: "1200px",
    margin: "clamp(2rem, 8vw, 4rem) auto",
    padding: "0 clamp(1rem, 3vw, 2rem)",
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr"
    }
  },
  featureCard: {
    background: "white",
    padding: "clamp(1.5rem, 4vw, 2rem)",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    "@media (hover: hover)": {
      ":hover": {
        transform: "translateY(-4px)"
      }
    }
  },
  featureIcon: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    marginBottom: "clamp(0.75rem, 2vw, 1rem)"
  },
  featureTitle: {
    fontSize: "clamp(1.1rem, 3vw, 1.25rem)",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#1f2937"
  },
  featureDescription: {
    color: "#6b7280",
    lineHeight: "1.6",
    fontSize: "clamp(0.875rem, 2vw, 1rem)"
  }
};

export default function Index() {
  return (
    <main style={styles.landing}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Create Professional Resumes with AI</h1>
        <p style={styles.subtitle}>
          Transform your career journey with our intelligent resume builder. 
          Create stunning, ATS-friendly resumes in minutes using the power of AI.
        </p>
        <div style={styles.ctaContainer}>
          <Link to="/sign-up" style={styles.primaryCta}>
            Get Started Free
          </Link>
          <Link to="/sign-in" style={styles.secondaryCta}>
            Sign In
          </Link>
        </div>
      </section>

      <section style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>✨</div>
          <h2 style={styles.featureTitle}>AI-Powered Writing</h2>
          <p style={styles.featureDescription}>
            Smart suggestions and improvements for your resume content, powered by advanced AI
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📄</div>
          <h2 style={styles.featureTitle}>ATS-Friendly Templates</h2>
          <p style={styles.featureDescription}>
            Professional templates designed to pass Applicant Tracking Systems
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⚡️</div>
          <h2 style={styles.featureTitle}>Quick and Easy</h2>
          <p style={styles.featureDescription}>
            Create a professional resume in minutes with our intuitive builder
          </p>
        </div>
      </section>
    </main>
  );
}