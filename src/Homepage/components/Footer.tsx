import "../Styling/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <h3>
              Lockin<span>Edge</span>
            </h3>
            <p>
              AI-powered resume analysis and job matching platform helping professionals unlock their next career opportunity.
            </p>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-connect">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 LockinEdge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
