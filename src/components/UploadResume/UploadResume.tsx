import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import './UploadResume.css';

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
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
          setMessage("✅ Resume uploaded & analyzed successfully!");
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

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}

      {analysis && (
        <div className="analysis-result" style={{ marginTop: "2rem" }}>
          <h3>📝 Analysis Results:</h3>
          <p><strong>Summary:</strong> {analysis.summary}</p>
          <p><strong>Experience:</strong> {analysis.experience} years</p>

          <div>
            <strong>Skills:</strong>
            <ul>
              {analysis.skills?.map((skill: string, i: number) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Strengths:</strong>
            <ul>
              {analysis.strengths?.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Improvements:</strong>
            <ul>
              {analysis.improvements?.map((imp: string, i: number) => (
                <li key={i}>{imp}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Education:</strong>
            <ul>
              {analysis.education?.map(
                (edu: { degree: string; institution: string; year: number }, i: number) => (
                  <li key={i}>
                    {edu.degree} at {edu.institution} ({edu.year})
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
