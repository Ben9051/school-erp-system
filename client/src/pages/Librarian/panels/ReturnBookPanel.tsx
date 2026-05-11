import React from "react";

const ReturnBookPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="panel">
      <h3>📥 Return Books</h3>

      <input placeholder="Search Student Admin No" />
      <button>Search</button>

      <hr />

      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Book No</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>BK001</td>
            <td>Math</td>
            <td>Grade 5</td>
            <td>Algebra</td>
            <td>Borrowed</td>
            <td>
              <button>Clear</button>
              <button>Mark Lost</button>
              <button>Found</button>
              <button>Replace</button>
            </td>
          </tr>
        </tbody>
      </table>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ReturnBookPanel;