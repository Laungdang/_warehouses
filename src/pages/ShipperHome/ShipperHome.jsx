import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShipperHome.css";

const ShipperHome = ({
  orders = [],
  projects = [],
  selectedProject = "",
  setSelectedProject,
  fullName, // ชื่อผู้ใช้ที่ส่งผ่าน props
  role, // ตำแหน่งผู้ใช้ที่ส่งผ่าน props
}) => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    if (!selectedProject) {
      alert("Please select a project first!");
      return;
    }
    navigate("/sendproduct", { state: { selectedProject } });
  };

  const handleSubmit = () => {
    if (!selectedProject) {
      alert("Please select a project first!");
      return;
    }
    if (orders.length === 0) {
      alert("No orders available to submit.");
      return;
    }
    if (role !== "superadmin" && role !== "admin") {
      alert("The approval request has been sent");
      return;
    }
    navigate("/goodsreceipt", {
      state: {
        orders, // ข้อมูลคำสั่งซื้อ
        fullName, // ชื่อผู้ใช้จาก props
        role, // ตำแหน่งผู้ใช้จาก props
        project: selectedProject, // โครงการที่เลือก
      },
    });
  };

  return (
    <div className="main-content">
      <div className="shipper-home">
        <div className="shipper-header">
          <h1 className="shipper-title">Send the product</h1>
          <button
            className="shipper-add-product-button"
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
        <div className="shipper-table-container">
          <table className="shipper-order-table">
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
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.productName}</td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>{order.amount}</td>
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
                    No orders available. Please add a product to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="submit-container">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={orders.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipperHome;
