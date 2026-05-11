import React, { useState } from "react";

const FindBookPanel = ({ onClose }: { onClose: () => void }) => {
  const [bookNo, setBookNo] = useState("");

  return (
    <div className="panel">
      <h3>🔍 Find Book</h3>

      <input
        placeholder="Enter Book Number"
        value={bookNo}
        onChange={(e) => setBookNo(e.target.value)}
      />

      <button>Search</button>

      <div style={{ marginTop: 10 }}>
        <p>Book info + movement history will appear here</p>
      </div>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FindBookPanel;