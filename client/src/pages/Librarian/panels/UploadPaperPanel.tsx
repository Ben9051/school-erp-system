import React from "react";

const UploadPaperPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="panel">
      <h3>📄 Upload Past Paper</h3>

      <input placeholder="Subject Code" />
      <input placeholder="Title" />
      <input type="file" />

      <p>Allowed: PDF, Word</p>

      <button>Upload</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UploadPaperPanel;