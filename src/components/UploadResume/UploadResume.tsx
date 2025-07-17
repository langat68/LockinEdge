import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import JobRecommendations from './JobRecommendations';
import './UploadResume.css';

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [resumeId, setResumeId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'upload' | 'recommendations'>('upload');
  const { user } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (file && user?.id) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user.id);

      try {
        const response = await fetch('http://localhost:3000/resume', {
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
          setResumeId(data.data.id); // Store the resume ID
          setMessage("✅ Resume uploaded & analyzed successfully!");
          
          // Show success message with recommendation option
          setTimeout(() => {
            setMessage("🎯 Great! Now let's find jobs that match your skills!");
          }, 2000);
        } else {
          setMessage("⚠️ Upload succeeded but no analysis returned.");
        }

      } catch (error) {
        console.error('Upload failed:', error);
        setMessage("❌ Upload failed. Please try again.");
        setAnalysis(null);
      }
    } else if (!user?.id) {
      console.error("User ID not available. Please log in.");
      setMessage("⚠️ Please log in to upload your resume.");
    }
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
          {resumeId && <span className="tab-badge">New!</span>}
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="upload-tab">
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Drag & drop your resume here</p>
            <p>or</p>
            <input type="file" onChange={handleFileChange} accept=".pdf,.docx,.txt" />
          </div>

          {file && (
            <div className="file-preview">
              <p>📄 Selected file: {file.name}</p>
              <button onClick={handleSubmit} className="submit-btn">
                Submit
              </button>
            </div>
          )}

          {message && <p className="message">{message}</p>}

          {analysis && (
            <div className="analysis-result">
              <div className="analysis-header">
                <h3>📝 Analysis Results</h3>
                <button 
                  onClick={() => setActiveTab('recommendations')}
                  className="view-jobs-btn"
                >
                  🎯 View Job Matches →
                </button>
              </div>

              <div className="analysis-content">
                <div className="analysis-summary">
                  <h4>Summary</h4>
                  <p>{analysis.summary}</p>
                </div>

                <div className="analysis-grid">
                  <div className="analysis-item">
                    <h4>Experience</h4>
                    <p className="experience-years">{analysis.experience} years</p>
                  </div>

                  <div className="analysis-item">
                    <h4>Skills</h4>
                    <div className="skills-grid">
                      {analysis.skills?.map((skill: string, i: number) => (
                        <span key={i} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="analysis-item">
                    <h4>Strengths</h4>
                    <ul className="strengths-list">
                      {analysis.strengths?.map((s: string, i: number) => (
                        <li key={i}>✅ {s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-item">
                    <h4>Areas for Improvement</h4>
                    <ul className="improvements-list">
                      {analysis.improvements?.map((imp: string, i: number) => (
                        <li key={i}>💡 {imp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="analysis-item">
                    <h4>Education</h4>
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