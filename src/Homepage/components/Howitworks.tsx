import { Upload, Search, Target } from "lucide-react";
import "../Styling/Howitworks.scss";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload",
      description:
        "Simply upload your resume in seconds. We support PDF, Word, and text formats.",
    },
    {
      icon: Search,
      title: "Analyze",
      description:
        "Our AI analyzes your resume for impact, keywords, formatting, and industry standards.",
    },
    {
      icon: Target,
      title: "Match",
      description:
        "Get personalized job recommendations and actionable feedback to improve your chances.",
    },
  ];

  return (
    <section id="features" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Transform your career in three simple steps</p>
        </div>

        <div className="steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.title} className="step">
                <div className="icon-wrapper">
                  <IconComponent className="step-icon" />
                </div>

                <div className="step-number">
                  <span>Step {index + 1}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
