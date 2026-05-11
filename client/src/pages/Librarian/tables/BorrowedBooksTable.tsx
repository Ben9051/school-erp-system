import React from "react";

const BorrowedBooksTable = () => {
  return (
    <table border={1} width="100%" cellPadding={10}>
      <thead>
        <tr>
          <th>Book No</th>
          <th>Name</th>
          <th>Student</th>
          <th>Grade</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>BK002</td>
          <td>English Book</td>
          <td>John Doe</td>
          <td>Grade 6</td>
          <td>2026-05-01</td>
          <td>2026-05-10</td>
          <td>Borrowed</td>
        </tr>
      </tbody>
    </table>
  );
};

export default BorrowedBooksTable;