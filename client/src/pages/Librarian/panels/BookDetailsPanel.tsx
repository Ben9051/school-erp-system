import React from "react";

const BookDetailsPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="panel">
      <h3>📘 Book Details</h3>

      <p>Book info here</p>
      <p>Movement history here</p>
      <p>Current holder info</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BookDetailsPanel;