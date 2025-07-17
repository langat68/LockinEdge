import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Analysis = {
  summary: string;
  experience: number;
  skills: string[];
  strengths: string[];
  improvements: string[];
  education: { degree: string; institution: string; year: number }[];
};

const ResumeDetails: React.FC = () => {
  const { id: resumeId } = useParams<{ id: string }>();

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [edited, setEdited] = useState<Analysis | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      const res = await fetch(`http://localhost:3000/resume/${resumeId}`);
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.data.analysis);
        setEdited(data.data.analysis);
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleSave = async () => {
    const res = await fetch(`http://localhost:3000/resume/${resumeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analysis: edited }),
    });
    const data = await res.json();
    if (data.success) {
      setAnalysis(data.data.analysis);
      setIsEditing(false);
      setMessage("✅ Changes saved.");
    } else {
      setMessage("❌ Failed to save changes.");
    }
  };

  const handleDownload = () => {
    window.open(`http://localhost:3000/resume/${resumeId}/download`, "_blank");
  };

  if (!resumeId) return <p>Invalid resume ID</p>;
  if (!analysis || !edited) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Resume Details</h2>

      {message && <p>{message}</p>}

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "✏️ Edit"}
      </button>
      <button onClick={handleDownload} style={{ marginLeft: "1rem" }}>
        📥 Download PDF
      </button>

      <div>
        <label>Summary:</label>
        <textarea
          disabled={!isEditing}
          value={edited.summary}
          onChange={(e) =>
            setEdited({ ...edited, summary: e.target.value })
          }
        />

        <label>Experience (years):</label>
        <input
          type="number"
          disabled={!isEditing}
          value={edited.experience}
          onChange={(e) =>
            setEdited({ ...edited, experience: parseInt(e.target.value) })
          }
        />

        <label>Skills (comma-separated):</label>
        <input
          disabled={!isEditing}
          value={edited.skills.join(", ")}
          onChange={(e) =>
            setEdited({
              ...edited,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />

        <label>Strengths (comma-separated):</label>
        <input
          disabled={!isEditing}
          value={edited.strengths.join(", ")}
          onChange={(e) =>
            setEdited({
              ...edited,
              strengths: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />

        <label>Improvements (comma-separated):</label>
        <input
          disabled={!isEditing}
          value={edited.improvements.join(", ")}
          onChange={(e) =>
            setEdited({
              ...edited,
              improvements: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />

        <label>Education:</label>
        {edited.education.map((edu, i) => (
          <div key={i}>
            <input
              disabled={!isEditing}
              value={edu.degree}
              onChange={(e) => {
                const updated = [...edited.education];
                updated[i].degree = e.target.value;
                setEdited({ ...edited, education: updated });
              }}
            />
            <input
              disabled={!isEditing}
              value={edu.institution}
              onChange={(e) => {
                const updated = [...edited.education];
                updated[i].institution = e.target.value;
                setEdited({ ...edited, education: updated });
              }}
            />
            <input
              type="number"
              disabled={!isEditing}
              value={edu.year}
              onChange={(e) => {
                const updated = [...edited.education];
                updated[i].year = parseInt(e.target.value);
                setEdited({ ...edited, education: updated });
              }}
            />
          </div>
        ))}
      </div>

      {isEditing && (
        <button onClick={handleSave} style={{ marginTop: "1rem" }}>
          💾 Save Changes
        </button>
      )}
    </div>
  );
};

export default ResumeDetails;
