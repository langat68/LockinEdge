import React, { useState } from 'react';

import './jobs.css';

interface JobRecommendation {
  jobTitle: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  jobUrl: string;
  source: string;
  compatibilityScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  reasoning: string;
}

interface JobRecommendationsProps {
  resumeId?: string;
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ resumeId }) => {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
 

  const fetchRecommendations = async () => {
    if (!resumeId) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/resume/${resumeId}/recommendations/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data);
      } else {
        setError(data.message || "Failed to fetch recommendations");
      }

    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError("❌ Failed to fetch job recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    if (score >= 40) return '#EF4444'; // Red
    return '#6B7280'; // Gray
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Weak Match';
  };

  const filteredRecommendations = recommendations.filter(rec => {
    switch (filter) {
      case 'high': return rec.compatibilityScore >= 80;
      case 'medium': return rec.compatibilityScore >= 60 && rec.compatibilityScore < 80;
      case 'low': return rec.compatibilityScore >= 40 && rec.compatibilityScore < 60;
      default: return true;
    }
  });

  return (
    <div className="job-recommendations-container">
      <div className="recommendations-header">
        <h2>🎯 Job Recommendations</h2>
        <div className="header-actions">
          <button 
            onClick={fetchRecommendations} 
            disabled={loading || !resumeId}
            className="generate-btn"
          >
            {loading ? '⏳ Finding Jobs...' : '🔍 Find Jobs'}
          </button>
        </div>
      </div>

      {!resumeId && (
        <div className="no-resume-message">
          <p>📄 Please upload a resume first to see job recommendations</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <>
          <div className="filters">
            <span>Filter by match quality:</span>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All ({recommendations.length})
              </button>
              <button 
                className={filter === 'high' ? 'active' : ''}
                onClick={() => setFilter('high')}
              >
                Excellent ({recommendations.filter(r => r.compatibilityScore >= 80).length})
              </button>
              <button 
                className={filter === 'medium' ? 'active' : ''}
                onClick={() => setFilter('medium')}
              >
                Good ({recommendations.filter(r => r.compatibilityScore >= 60 && r.compatibilityScore < 80).length})
              </button>
              <button 
                className={filter === 'low' ? 'active' : ''}
                onClick={() => setFilter('low')}
              >
                Fair ({recommendations.filter(r => r.compatibilityScore >= 40 && r.compatibilityScore < 60).length})
              </button>
            </div>
          </div>

          <div className="recommendations-grid">
            {filteredRecommendations.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-header">
                  <div className="job-title-company">
                    <h3>{job.jobTitle}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">{job.location}</p>
                  </div>
                  <div className="compatibility-score">
                    <div 
                      className="score-circle"
                      style={{ 
                        background: `conic-gradient(${getScoreColor(job.compatibilityScore)} ${job.compatibilityScore * 3.6}deg, #e5e7eb 0deg)`
                      }}
                    >
                      <span className="score-text">{job.compatibilityScore}%</span>
                    </div>
                    <span className="score-label">{getScoreLabel(job.compatibilityScore)}</span>
                  </div>
                </div>

                <div className="job-details">
                  <p className="job-description">
                    {job.description.length > 150 
                      ? `${job.description.substring(0, 150)}...` 
                      : job.description
                    }
                  </p>

                  {job.salary && (
                    <p className="salary">💰 {job.salary}</p>
                  )}

                  <div className="skills-section">
                    <div className="matching-skills">
                      <strong>✅ Your matching skills:</strong>
                      <div className="skill-tags">
                        {job.matchingSkills.map((skill, i) => (
                          <span key={i} className="skill-tag matching">{skill}</span>
                        ))}
                      </div>
                    </div>

                    {job.missingSkills.length > 0 && (
                      <div className="missing-skills">
                        <strong>📚 Skills to improve:</strong>
                        <div className="skill-tags">
                          {job.missingSkills.map((skill, i) => (
                            <span key={i} className="skill-tag missing">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="requirements">
                    <strong>Requirements:</strong>
                    <ul>
                      {job.requirements.slice(0, 5).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ai-reasoning">
                    <strong>🤖 AI Analysis:</strong>
                    <p>{job.reasoning}</p>
                  </div>
                </div>

                <div className="job-footer">
                  <span className="job-source">via {job.source}</span>
                  <a 
                    href={job.jobUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="apply-btn"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>🔍 Scanning job boards and analyzing matches...</p>
          <p className="loading-subtext">This may take a few moments</p>
        </div>
      )}

      {!loading && recommendations.length === 0 && resumeId && !error && (
        <div className="no-recommendations">
          <p>🎯 Click "Find Jobs" to discover opportunities that match your skills!</p>
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;
