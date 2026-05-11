import React from "react";

type ReportType = "overdue" | "lost" | "borrowed" | "inventory";

const ReportsTable = ({ type }: { type: ReportType }) => {
  return (
    <div>
      <h3>📊 {type.toUpperCase()} Report</h3>

      <table border={1} width="100%" cellPadding={10}>
        <thead>
          <tr>
            <th>Book No</th>
            <th>Name</th>
            <th>Student</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>BK003</td>
            <td>Science</td>
            <td>Jane Doe</td>
            <td>Grade 7</td>
            <td>{type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;