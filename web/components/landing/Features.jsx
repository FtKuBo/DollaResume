import React from 'react';

const features = [
  {
    id: 1,
    icon: "🤖",
    title: "AI-Powered Generation",
    description: "Our smart AI understands your experience and generates professional resume content tailored to your career goals"
  },
  {
    id: 2,
    icon: "📄",
    title: "Professional Templates",
    description: "Choose from a variety of modern, professionally designed templates that stand out to employers"
  },
  {
    id: 3,
    icon: "✨",
    title: "ATS-Friendly Format",
    description: "Ensure your resume gets past Applicant Tracking Systems with our optimized formatting"
  },
  {
    id: 4,
    icon: "⚡",
    title: "Quick & Easy",
    description: "Create a polished resume in minutes, not hours, with our intuitive interface"
  },
  {
    id: 5,
    icon: "💡",
    title: "Smart Suggestions",
    description: "Get intelligent recommendations for skills, achievements, and keywords relevant to your industry"
  },
  {
    id: 6,
    icon: "📥",
    title: "Multiple Export Options",
    description: "Download your resume in various formats including PDF, Word, and plain text"
  }
];

const Features = () => {
  return (
    <section className="features">
      <style>
        {`
          .features {
            padding: 4rem 2rem;
            background-color: #f8f9fa;
          }

          .features__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .feature-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease-in-out;
          }

          .feature-card:hover {
            transform: translateY(-5px);
          }

          .feature-card__icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
          }

          .feature-card__title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #2d3748;
          }

          .feature-card__description {
            color: #4a5568;
            line-height: 1.5;
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            .features {
              padding: 3rem 1rem;
            }

            .features__grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <div className="features__grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <span className="feature-card__icon" role="img" aria-label={feature.title}>
              {feature.icon}
            </span>
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;