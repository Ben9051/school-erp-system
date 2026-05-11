import React, { useState } from "react";

const RestrictionPanel = ({ onClose }: { onClose: () => void }) => {
  const [admNo, setAdmNo] = useState("");

  return (
    <div className="panel">
      <h3>🚫 Restrict Student</h3>

      <input
        placeholder="Admission No"
        value={admNo}
        onChange={(e) => setAdmNo(e.target.value)}
      />

      <button>Search</button>

      <hr />

      <label>Suspend Duration</label>
      <select>
        <option>1 Day</option>
        <option>1 Week</option>
        <option>1 Month</option>
        <option>This Term</option>
        <option>This Year</option>
      </select>

      <br />

      <label>
        <input type="radio" name="restrict" /> Blacklist
      </label>

      <div>
        <button>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default RestrictionPanel;