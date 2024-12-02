import React from "react";
import "./Report.css";

function Report({ reports }) {
  return (
    <div className="main-content">
      <div className="report-container">
        <h1>Report</h1>
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reported By</th>
              <th>Topic</th>
              <th>Issue</th>
              <th>Date</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{report.username}</td>
                <td>{report.topic}</td>
                <td>{report.issue}</td>
                <td>{report.date}</td>
                <td>{report.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
