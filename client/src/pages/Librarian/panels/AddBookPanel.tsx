import React, { useState } from "react";

const AddBookPanel = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState("");

  return (
    <div className="panel">
      <h3>➕ Add Book</h3>

      <label>Type</label>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="">Select</option>
        <option value="textbook">Textbook</option>
        <option value="story">Storybooks & Novels</option>
      </select>

      {type === "story" && (
        <>
          <input placeholder="Book Name" />
          <input placeholder="Quantity" />
        </>
      )}

      {type === "textbook" && (
        <>
          <select>
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
          </select>

          <select>
            <option>Math</option>
            <option>English</option>
          </select>

          <input placeholder="Description" />
          <input placeholder="Quantity" />
        </>
      )}

      <div style={{ marginTop: 10 }}>
        <button>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBookPanel;