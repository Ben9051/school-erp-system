import React from "react";

const LibrarianDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Librarian Overview</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="card">Total Books</div>
        <div className="card">Borrowed Books</div>
        <div className="card">Overdue Books</div>
        <div className="card">Lost Books</div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;