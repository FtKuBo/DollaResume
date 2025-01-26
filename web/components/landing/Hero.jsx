import { Link } from "react-router";
import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">
          Create Your Perfect Resume with AI
        </h1>
        <p className="hero__subtitle">
          Build a professional resume in minutes with our AI-powered resume builder. 
          Stand out from the crowd and land your dream job faster.
        </p>
        <div className="hero__actions">
          <Link to="/sign-up" className="hero__button hero__button--primary">
            Get Started Free
          </Link>
          <Link to="/sign-in" className="hero__button hero__button--secondary">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}