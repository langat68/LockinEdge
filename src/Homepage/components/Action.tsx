import { ArrowRight } from "lucide-react";
import "../Styling/Action.scss";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CallToAction = () => {
  const navigate = useNavigate();
  
  // Get authentication status from Redux store
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  // Alternative: You could also check for token existence
  // const token = useSelector((state: any) => state.auth.token);

  const handleGetStarted = () => {
    // Check if user is logged in
    if (isAuthenticated) {
      // User is logged in, redirect to upload resume page
      navigate('/upload');
    } else {
      // User is not logged in, redirect to login page
      navigate('/login');
    }
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
            {isAuthenticated ? 'Upload Resume' : 'Get Started Now'}
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