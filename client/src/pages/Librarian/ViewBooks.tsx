import React from "react";

const ViewBooks = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 View Books</h2>

      <div style={{ margin: "10px 0" }}>
        {/* FILTER BAR PLACEHOLDER */}
        <input placeholder="Search book..." />
      </div>

      <table border={1} width="100%" cellPadding={10}>
        <thead>
          <tr>
            <th>Book No</th>
            <th>Name</th>
            <th>Type</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BK001</td>
            <td>Mathematics</td>
            <td>Textbook</td>
            <td>Grade 5</td>
            <td>Math</td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooks;