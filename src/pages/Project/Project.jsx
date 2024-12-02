import React, { useState } from "react";
import "./Project.css";

function Project() {
  const [isAdding, setIsAdding] = useState(false);

  const [projectData, setProjectData] = useState([
    { id: 1, project: "ซันก่อสร้าง", category: "การก่อสร้าง" },
    { id: 2, project: "JIB", category: "อุปกรณ์ฮาร์ดแวร์" },
    { id: 3, project: "New Instrument", category: "เครื่องดนตรี" },
  ]);

  const [newProject, setNewProject] = useState({ project: "", category: "" });
  const [editIndex, setEditIndex] = useState(null); // null = ไม่มีการแก้ไข
  const [editProject, setEditProject] = useState({ project: "", category: "" }); //เก็บข้อมูลโปรเจกต์ที่กำลังแก้ไข

  const handleAddProject = () => setIsAdding(true);

  const handleCancel = () => {
    setIsAdding(false);
    setNewProject({ project: "", category: "" });
  };

  const handleSubmit = () => {
    if (newProject.project && newProject.category) {
      setProjectData([
        ...projectData,
        { id: projectData.length + 1, ...newProject },
      ]);
      setIsAdding(false);
      setNewProject({ project: "", category: "" });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditProject({ ...projectData[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedData = [...projectData];
    updatedData[editIndex] = { ...editProject }; //editProject คือข้อมูลที่แก้ไขแล้ว แล้วก็เอาข้อมูลใน editProjecc ไปแทนที่ข้อมูลเดิม
    setProjectData(updatedData);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const filteredData = projectData.filter((_, i) => i !== index);
    setProjectData(filteredData);
  };

  return (
    <div className="main-content">
      <div className="header-table">
        <h1>Projects</h1>
        <button className="add-project-btn" onClick={handleAddProject}>
          + Add Project
        </button>
      </div>

      <div className="table-container">
        <table className="project-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr>
                <td>{projectData.length + 1}</td>
                <td colSpan="3">
                  {" "}
                  {/* รวมคอลัมน์สำหรับฟอร์ม */}
                  <div className="form-row">
                    <input
                      type="text"
                      name="project"
                      placeholder="Project Name"
                      value={newProject.project}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={newProject.category}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <div className="button-group">
                      <button className="submit-btn" onClick={handleSubmit}>
                        Submit
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {projectData.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="project"
                      value={editProject.project}
                      onChange={handleEditChange}
                    />
                  ) : (
                    data.project
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="category"
                      value={editProject.category}
                      onChange={handleEditChange}
                    />
                  ) : (
                    data.category
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <>
                      <button className="save-btn" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Project;
