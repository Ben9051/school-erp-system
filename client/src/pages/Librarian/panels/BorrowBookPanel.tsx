import React, { useState } from "react";

const BorrowBookPanel = ({ onClose }: { onClose: () => void }) => {
  const [admNo, setAdmNo] = useState("");

  return (
    <div className="panel">
      <h3>📤 Borrow Book</h3>

      <input
        placeholder="Student Admission No"
        value={admNo}
        onChange={(e) => setAdmNo(e.target.value)}
      />

      <button>Search Student</button>

      <hr />

      <select>
        <option>Storybooks & Novels</option>
        <option>Textbooks</option>
      </select>

      <input placeholder="Book Name / Subject" />
      <input placeholder="Book Number" />

      <div>
        <p>Borrow Date: Auto Generated</p>
      </div>

      <button>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BorrowBookPanel;