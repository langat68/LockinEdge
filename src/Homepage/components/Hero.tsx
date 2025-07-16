import { Upload, ArrowRight } from "lucide-react";
import "../Styling/Hero.scss";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock your next opportunity
            <br />
            <span>with confidence</span>
          </h1>

          <p className="hero-subtitle">
            Get AI-powered resume feedback and discover smart job matches tailored to your skills.
            Transform your career journey with personalized insights.
          </p>

          <div className="hero-actions">
            <button className="upload-btn" onClick={handleUploadClick}>
              <Upload className="icon-left" />
              Upload Resume
              <ArrowRight className="icon-right" />
            </button>

            <button className="try-btn">
              Try It Free
            </button>
          </div>

          <div className="hero-note">
            ✨ No signup required • Get instant feedback • 100% secure
          </div>
        </div>
      </div>

      <div className="hero-bg">
        <div className="decor decor-green"></div>
        <div className="decor decor-yellow"></div>
      </div>
    </section>
  );
};

export default HeroSection;
