import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormReport.css";

function FormReport({ addReport, username , role}) {
  const [formData, setFormData] = useState({
    topic: "",
    issue: "",
    date: new Date().toISOString().split("T")[0],
    detail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    addReport({ ...formData, username }); // เพิ่มชื่อผู้ใช้ในรายงาน
    alert("Report submitted successfully!");

    if (role === "superadmin" || role === "admin") { // ถ้าเป็นผู้ดูแลระบบหรือผู้ดูแลโครงการ
    navigate("/report");
    }
  };

  return (
    <div className="main-content">
      <div className="report-form-container">
        <h1 className="form-title">Report a Problem</h1>
        
        <form className="form-report">
          <div className="form-group">
            <label>หัวข้อรายงาน</label>
            <select name="topic" value={formData.topic} onChange={handleChange} required>
              <option value="" disabled>เลือกหัวข้อรายงาน</option>
              <option value="สินค้าหมด">สินค้าหมด</option>
              <option value="สินค้าชำรุด">สินค้าชำรุด</option>
              <option value="ระบบมีปัญหา">ระบบมีปัญหา</option>
            </select>
          </div>
          <div className="form-group">
            <label>ปัญหาที่พบ</label>
            <input
              type="text"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="กรอกปัญหาที่พบ"
              required
            />
          </div>
          <div className="form-group">
            <label>วัน/เดือน/ปี</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>คำอธิบาย</label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              placeholder="กรอกรายละเอียด"
              rows="4"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="submit-btn" onClick={handleSubmit}>
              ส่ง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormReport;
