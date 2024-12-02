import React from "react";
import { useNavigate } from "react-router-dom";
import "./PickerHome.css";

const PickerHome = ({ orders, projects, selectedProject, setSelectedProject, addOrder, fullName, position }) => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    if (!selectedProject) { //เช็คว่า user เลือกโครงการรึยัง
      alert("Please select a project first!");
      return;
    }
    navigate("/picking", { //ส่งข้อมูลโครงการที่เลือก ไปยัง picking
      state: { selectedProject },
    });
  };

  const handleSubmitOrders = () => {
    if (!selectedProject) { //เช็คว่า user เลือกโครงการรึยัง
      alert("Please select a project before submitting orders!");
      return;
    }

    if (orders.length === 0) {
      alert("No orders to submit.");
      return;
    }

    if (position !== "superadmin" && position !== "admin") {
      alert("The approval request has been sent");
      return;
    }
  
    navigate("/requisition", {
      state: {
        orders: orders, // ส่งข้อมูลคำสั่งซื้อ
        selectedProject: selectedProject, // ส่งชื่อโครงการ
        fullName: fullName, // ส่งชื่อผู้ใช้
        position: position, // ส่งตำแหน่งผู้ใช้
      },
    });
  };
  

  return (
    <div className="main-content">
      <div className="picker-home">
        <div className="picker-header">
          <h1 className="picker-title">Picking Goods</h1>
          <button
            className="picker-add-product-button"
            onClick={handleAddProductClick}
          >
            + Add Product
          </button>
        </div>
        <div className="project-dropdown">
          <label htmlFor="project-select">Select Project:</label>
          <select
            id="project-select"
            className="project-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">-- Select a Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.project}>
                {project.project}
              </option>
            ))}
          </select>
        </div>
        <div className="picker-table-container">
          <table className="picker-order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Products</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.product}</td>
                    <td>{order.date}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <span className={`status-badge ${order.status?.toLowerCase() || "waiting"}`}>
                        {order.status || "Waiting"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-orders-message">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ปุ่ม Submit */}
        <div className="picker-submit-container">
          <button
            className="picker-submit-button"
            onClick={handleSubmitOrders}
            disabled={orders.length === 0 || !selectedProject}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickerHome;
