import { Upload, Sparkles } from "lucide-react";
import "../Styling/Hero.scss";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    // Check if user is authenticated
    const isAuthenticated = checkAuthStatus();
    
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      navigate('/login');
    }
  };

  // Helper function to check authentication status
  const checkAuthStatus = () => {
    // Method 1: Check for JWT token in localStorage
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token) {
      // Optional: Add token validation logic here
      try {
        // Basic token expiry check if your token includes exp
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
      } catch (error) {
        // If token parsing fails, remove invalid token
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        return false;
      }
    }

    // Method 2: Check for session cookie (uncomment if using cookies)
    // const sessionCookie = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('session='));
    // return !!sessionCookie;

    // Method 3: Check sessionStorage
    // const sessionData = sessionStorage.getItem('userSession');
    // return !!sessionData;

    return false;
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Column - Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles className="sparkles-icon" />
              <span className="badge-text">
                AI-Powered Resume Analysis
              </span>
            </div>
            
            <h1 className="hero-title">
              Unlock your next opportunity with{" "}
              <span className="accent-text">confidence</span>
            </h1>
            
            <p className="hero-subtitle">
              Get instant AI-powered feedback on your resume and discover 
              personalized job matches that align with your skills and career goals.
            </p>
            
            <div className="hero-actions">
              <button className="upload-btn" onClick={handleUploadClick}>
                <Upload className="upload-icon" />
                Upload Resume
              </button>
              
            </div>
            
            <div className="hero-features">
              <div className="feature">
                <div className="feature-dot"></div>
                <span>Free analysis</span>
              </div>
              <div className="feature">
                <div className="feature-dot"></div>
                <span>Instant results</span>
              </div>
              
            </div>
          </div>

          {/* Right Column - AI Office Illustration */}
          <div className="hero-visual">
            <div className="illustration-container">
              <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="office-illustration">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#f8fafc", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#e2e8f0", stopOpacity:1}} />
                  </linearGradient>
                  
                  <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#f1f5f9", stopOpacity:1}} />
                  </linearGradient>
                  
                  <linearGradient id="aiGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#6366f1", stopOpacity:0.8}} />
                    <stop offset="50%" style={{stopColor:"#8b5cf6", stopOpacity:0.9}} />
                    <stop offset="100%" style={{stopColor:"#a855f7", stopOpacity:0.8}} />
                  </linearGradient>
                  
                  <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:1}} />
                    <stop offset="70%" style={{stopColor:"#8b5cf6", stopOpacity:0.8}} />
                    <stop offset="100%" style={{stopColor:"#6366f1", stopOpacity:1}} />
                  </radialGradient>
                  
                  {/* Filters */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                
                {/* Background */}
                <rect width="800" height="600" fill="url(#skyGradient)"/>
                
                {/* Office Building */}
                <rect x="50" y="150" width="300" height="350" fill="url(#buildingGradient)" stroke="#e2e8f0" strokeWidth="2" filter="url(#shadow)"/>
                
                {/* Building Windows */}
                <g fill="#cbd5e1" opacity="0.7">
                  <rect x="80" y="180" width="40" height="30" rx="2"/>
                  <rect x="140" y="180" width="40" height="30" rx="2"/>
                  <rect x="200" y="180" width="40" height="30" rx="2"/>
                  <rect x="260" y="180" width="40" height="30" rx="2"/>
                  
                  <rect x="80" y="230" width="40" height="30" rx="2"/>
                  <rect x="140" y="230" width="40" height="30" rx="2"/>
                  <rect x="200" y="230" width="40" height="30" rx="2"/>
                  <rect x="260" y="230" width="40" height="30" rx="2"/>
                  
                  <rect x="80" y="280" width="40" height="30" rx="2"/>
                  <rect x="140" y="280" width="40" height="30" rx="2"/>
                  <rect x="200" y="280" width="40" height="30" rx="2"/>
                  <rect x="260" y="280" width="40" height="30" rx="2"/>
                </g>
                
                {/* Highlighted Office Window (Where AI is working) */}
                <rect x="140" y="230" width="40" height="30" rx="2" fill="url(#aiGlow)" filter="url(#glow)">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/>
                </rect>
                
                {/* Building Entrance */}
                <rect x="160" y="420" width="60" height="80" fill="#1f2937" rx="3"/>
                <rect x="170" y="430" width="40" height="60" fill="url(#buildingGradient)" rx="2"/>
                
                {/* AI Central Hub */}
                <circle cx="500" cy="300" r="80" fill="url(#aiCore)" filter="url(#glow)"/>
                <circle cx="500" cy="300" r="60" fill="none" stroke="url(#aiGlow)" strokeWidth="2" opacity="0.6">
                  <animate attributeName="r" values="60;70;60" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="500" cy="300" r="40" fill="none" stroke="url(#aiGlow)" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                {/* AI Brain Symbol */}
                <g transform="translate(500,300)">
                  {/* Brain outline */}
                  <path d="M -20,-15 Q -25,-25 -15,-30 Q 0,-35 15,-30 Q 25,-25 20,-15 Q 25,-5 20,5 Q 25,15 15,20 Q 0,25 -15,20 Q -25,15 -20,5 Q -25,-5 -20,-15 Z" 
                        fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8"/>
                  
                  {/* Neural connections */}
                  <g stroke="#ffffff" strokeWidth="1" opacity="0.6">
                    <line x1="-15" y1="-10" x2="-5" y2="0"/>
                    <line x1="-5" y1="0" x2="5" y2="-5"/>
                    <line x1="5" y1="-5" x2="15" y2="5"/>
                    <line x1="-10" y1="5" x2="0" y2="10"/>
                    <line x1="0" y1="10" x2="10" y2="0"/>
                  </g>
                  
                  {/* Neural nodes */}
                  <g fill="#ffffff">
                    <circle cx="-15" cy="-10" r="2"/>
                    <circle cx="-5" cy="0" r="2"/>
                    <circle cx="5" cy="-5" r="2"/>
                    <circle cx="15" cy="5" r="2"/>
                    <circle cx="-10" cy="5" r="2"/>
                    <circle cx="0" cy="10" r="2"/>
                    <circle cx="10" cy="0" r="2"/>
                  </g>
                </g>
                
                {/* Data Connections from Office to AI */}
                <g stroke="url(#aiGlow)" strokeWidth="2" fill="none" opacity="0.7">
                  <path d="M 180,245 Q 250,200 420,280">
                    <animate attributeName="strokeDasharray" values="0,200;200,0" dur="2s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                {/* Multiple Companies/Buildings */}
                <g opacity="0.6">
                  {/* Company 1 */}
                  <rect x="600" y="200" width="120" height="200" fill="url(#buildingGradient)" stroke="#e2e8f0" filter="url(#shadow)"/>
                  <rect x="620" y="220" width="20" height="15" fill="#cbd5e1"/>
                  <rect x="650" y="220" width="20" height="15" fill="#cbd5e1"/>
                  <rect x="680" y="220" width="20" height="15" fill="#cbd5e1"/>
                  <rect x="620" y="250" width="20" height="15" fill="#cbd5e1"/>
                  <rect x="650" y="250" width="20" height="15" fill="#cbd5e1"/>
                  <rect x="680" y="250" width="20" height="15" fill="#cbd5e1"/>
                  
                  {/* Company 2 */}
                  <rect x="450" y="480" width="100" height="100" fill="url(#buildingGradient)" stroke="#e2e8f0" filter="url(#shadow)"/>
                  <rect x="465" y="495" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="485" y="495" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="505" y="495" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="525" y="495" width="15" height="12" fill="#cbd5e1"/>
                  
                  {/* Company 3 */}
                  <rect x="580" y="450" width="80" height="130" fill="url(#buildingGradient)" stroke="#e2e8f0" filter="url(#shadow)"/>
                  <rect x="590" y="465" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="610" y="465" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="630" y="465" width="15" height="12" fill="#cbd5e1"/>
                  <rect x="650" y="465" width="15" height="12" fill="#cbd5e1"/>
                </g>
                
                {/* Job Matching Connections */}
                <g stroke="url(#aiGlow)" strokeWidth="1.5" fill="none" opacity="0.5">
                  {/* To Company 1 */}
                  <path d="M 580,300 Q 640,250 660,235">
                    <animate attributeName="strokeDasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite"/>
                  </path>
                  {/* To Company 2 */}
                  <path d="M 500,380 Q 500,430 500,480">
                    <animate attributeName="strokeDasharray" values="0,100;100,0" dur="2.5s" repeatCount="indefinite"/>
                  </path>
                  {/* To Company 3 */}
                  <path d="M 550,350 Q 600,400 620,450">
                    <animate attributeName="strokeDasharray" values="0,100;100,0" dur="2.8s" repeatCount="indefinite"/>
                  </path>
                </g>
                
                {/* Professional Person Silhouette */}
                <g transform="translate(200,350)">
                  {/* Head */}
                  <circle cx="0" cy="-30" r="12" fill="#1f2937"/>
                  
                  {/* Body */}
                  <rect x="-8" y="-18" width="16" height="25" fill="#1f2937" rx="2"/>
                  
                  {/* Arms */}
                  <rect x="-15" y="-10" width="6" height="15" fill="#1f2937" rx="2"/>
                  <rect x="9" y="-10" width="6" height="15" fill="#1f2937" rx="2"/>
                  
                  {/* Legs */}
                  <rect x="-6" y="7" width="5" height="18" fill="#1f2937" rx="2"/>
                  <rect x="1" y="7" width="5" height="18" fill="#1f2937" rx="2"/>
                  
                  {/* Briefcase */}
                  <rect x="17" y="-5" width="10" height="8" fill="#6366f1" rx="1"/>
                  <rect x="19" y="-7" width="6" height="2" fill="#6366f1" rx="1"/>
                </g>
                
                {/* Resume/Document floating from person to AI */}
                <g transform="translate(280,320)">
                  <rect x="0" y="0" width="20" height="25" fill="#ffffff" stroke="#6366f1" strokeWidth="1" filter="url(#shadow)"/>
                  <line x1="3" y1="5" x2="17" y2="5" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="3" y1="8" x2="17" y2="8" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="3" y1="11" x2="14" y2="11" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="3" y1="14" x2="17" y2="14" stroke="#cbd5e1" strokeWidth="1"/>
                  <line x1="3" y1="17" x2="12" y2="17" stroke="#cbd5e1" strokeWidth="1"/>
                  
                  {/* Animation */}
                  <animateTransform attributeName="transform" 
                                    type="translate" 
                                    values="280,320; 350,300; 420,290" 
                                    dur="4s" 
                                    repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;1;0;0;1" dur="4s" repeatCount="indefinite"/>
                </g>
                
                {/* Success indicators (checkmarks, job offers) */}
                <g fill="#10b981" opacity="0.8">
                  {/* Job offer 1 */}
                  <circle cx="680" cy="180" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </circle>
                  <path d="M 675,180 L 678,183 L 685,176" stroke="#ffffff" strokeWidth="2" fill="none">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s"/>
                  </path>
                  
                  {/* Job offer 2 */}
                  <circle cx="520" cy="460" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s"/>
                  </circle>
                  <path d="M 515,460 L 518,463 L 525,456" stroke="#ffffff" strokeWidth="2" fill="none">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s"/>
                  </path>
                  
                  {/* Job offer 3 */}
                  <circle cx="640" cy="430" r="8" fill="#10b981">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2.5s"/>
                  </circle>
                  <path d="M 635,430 L 638,433 L 645,426" stroke="#ffffff" strokeWidth="2" fill="none">
                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2.5s"/>
                  </path>
                </g>
                
                {/* Floating particles for AI processing */}
                <g fill="url(#aiGlow)" opacity="0.6">
                  <circle cx="450" cy="250" r="2">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 30,-20; 0,0" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="520" cy="220" r="1.5">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -25,15; 0,0" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="480" cy="350" r="2.5">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 20,25; 0,0" dur="5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;