import React from "react";

type Props = {
  onView?: (bookNo: string) => void;
};

const BooksTable: React.FC<Props> = ({ onView }) => {
  return (
    <table border={1} width="100%" cellPadding={10}>
      <thead>
        <tr>
          <th>Book No</th>
          <th>Name</th>
          <th>Type</th>
          <th>Grade</th>
          <th>Subject</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>BK001</td>
          <td>Mathematics</td>
          <td>Textbook</td>
          <td>Grade 5</td>
          <td>Math</td>
          <td>10</td>
          <td>Available</td>
          <td>
            <button onClick={() => onView?.("BK001")}>
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BooksTable;