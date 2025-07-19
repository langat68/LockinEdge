import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
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
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@lockinedge.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
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
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <Github size={20} />
                <span>GitHub</span>
              </a>
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