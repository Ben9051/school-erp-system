import React from "react";

const ClearancePanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="panel">
      <h3>✅ Student Clearance</h3>

      <input placeholder="Student Admission No" />
      <button>Search</button>

      <hr />

      <p>If no pending books → Show CLEAR button</p>
      <p>If pending → list books + warning</p>

      <button>Clear Student</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ClearancePanel;