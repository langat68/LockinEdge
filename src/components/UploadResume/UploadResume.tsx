import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import JobRecommendations from './JobRecommendations';
import './UploadResume.scss';

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [resumeId, setResumeId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'upload' | 'recommendations'>('upload');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSubmit = async () => {
    if (file && user?.id) {
      setIsLoading(true);
      setMessage("");
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user.id);

      try {
        const response = await fetch('https://lockinedge-backend-8.onrender.com/resume', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Upload successful:', data);

        if (data.success) {
          setAnalysis(data.data.analysis);
          setResumeId(data.data.id);
          setMessage("success");
          
          setTimeout(() => {
            setMessage("ready");
          }, 2000);
        } else {
          setMessage("warning");
        }

      } catch (error) {
        console.error('Upload failed:', error);
        setMessage("error");
        setAnalysis(null);
      } finally {
        setIsLoading(false);
      }
    } else if (!user?.id) {
      setMessage("login_required");
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return '📄';
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return '📝';
    return '📋';
  };

  const getMessageText = (messageType: string) => {
    const messages = {
      success: "✅ Resume uploaded & analyzed successfully!",
      ready: "🎯 Great! Now let's find jobs that match your skills!",
      warning: "⚠️ Upload succeeded but no analysis returned.",
      error: "❌ Upload failed. Please try again.",
      login_required: "⚠️ Please log in to upload your resume."
    };
    return messages[messageType as keyof typeof messages] || "";
  };

  return (
    <div className="upload-resume-container">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={activeTab === 'upload' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('upload')}
        >
          📄 Upload Resume
        </button>
        <button 
          className={activeTab === 'recommendations' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('recommendations')}
          disabled={!resumeId}
        >
          🎯 Job Matches
          {resumeId && activeTab !== 'recommendations' && (
            <span className="tab-badge">New!</span>
          )}
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="upload-tab">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <div className="spinner-ring"></div>
                </div>
                <div>
                  <p className="loading-text">Analyzing your resume...</p>
                  <p className="loading-subtext">This may take a few moments</p>
                </div>
              </div>
            </div>
          )}

          <div
            className={`dropzone ${isDragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p>Drag & drop your resume here</p>
            <p>or</p>
            <button className="dropzone-button" type="button">
              📁 Choose File
            </button>
            <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
            <p className="dropzone-hint">Supported formats: PDF, DOCX, TXT (Max 10MB)</p>
          </div>

          {file && (
            <div className="file-preview">
              <div className="file-info">
                <div className="file-details">
                  <span className="file-icon">{getFileIcon(file.name)}</span>
                  <div>
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={handleSubmit} 
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner" style={{width: '1rem', height: '1rem', border: '2px solid #ffffff40', borderTop: '2px solid #ffffff'}}></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      ✨ Analyze Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className={`message ${message}`}>
              {getMessageText(message)}
            </div>
          )}

          {analysis && (
            <div className="analysis-result">
              <div className="analysis-header">
                <h3>✨ Analysis Results</h3>
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className="view-jobs-btn"
                >
                  🎯 View Job Matches →
                </button>
              </div>

              <div className="analysis-content">
                <div className="analysis-summary">
                  <h4>Executive Summary</h4>
                  <p>{analysis.summary}</p>
                </div>

                <div className="analysis-grid">
                  <div className="analysis-item">
                    <h4>🏆 Experience</h4>
                    <p className="experience-years">{analysis.experience} years</p>
                  </div>

                  <div className="analysis-item">
                    <h4>🚀 Technical Skills</h4>
                    <div className="skills-grid">
                      {analysis.skills?.map((skill: string, i: number) => (
                        <span key={i} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="analysis-item">
                    <h4>💪 Key Strengths</h4>
                    <ul className="strengths-list">
                      {analysis.strengths?.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-item">
                    <h4>📈 Growth Opportunities</h4>
                    <ul className="improvements-list">
                      {analysis.improvements?.map((imp: string, i: number) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-item">
                    <h4>🎓 Education</h4>
                    <div className="education-list">
                      {analysis.education?.map(
                        (edu: { degree: string; institution: string; year: number }, i: number) => (
                          <div key={i} className="education-item">
                            <span className="degree">{edu.degree}</span>
                            <span className="institution">{edu.institution}</span>
                            <span className="year">({edu.year})</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <JobRecommendations resumeId={resumeId} />
      )}
    </div>
  );
};

export default UploadResume;