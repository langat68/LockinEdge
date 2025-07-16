import { ArrowRight } from "lucide-react";
import "../Styling/Action.scss";
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="call-to-action">
      <div className="container">
        <h2>
          Start improving your resume
          <br />
          <span>in minutes</span>
        </h2>

        <p>
          Join thousands of professionals who have already enhanced their careers with LockinEdge.
        </p>

        <div className="actions">
          <button className="cta-btn" onClick={handleGetStarted}>
            Get Started Now
            <ArrowRight className="icon" />
          </button>

          <div className="note">
            Free analysis • No credit card required
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
