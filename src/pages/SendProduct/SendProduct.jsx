import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendProduct.css";

const SendProduct = ({ addOrder }) => {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    amount: "",
    serialNumber: "",
  });
  const [isEditing, setIsEditing] = useState(null); // null = ไม่มีการแก้ไข

  const categories = ["Electronic", "Furniture", "Clothing"]; // Mock categories

  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนหน้า

  // Generate Serial Number
  const generateSerialNumber = () => {
    return `SN${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        ...newProduct,
        serialNumber: generateSerialNumber(),
        id: products.length + 1,
      },
    ]);
    setNewProduct({ productName: "", category: "", amount: "" });
  };

  const handleEditProduct = (index) => {
    setIsEditing(index);
    setNewProduct(products[index]);
  };

  const handleSaveEdit = () => {
    const updatedProducts = [...products]; //ลอกค่าจาก products
    updatedProducts[isEditing] = newProduct; // แทนค่าที่แก้ไข แล้วใช้ตัวแปร newProduct เพื่อเก็บ
    setProducts(updatedProducts); // ส่งข้อมูลไปยัง products
    setIsEditing(null); //ปิดหน้า edit 
    setNewProduct({ productName: "", category: "", amount: "" }); //ล้างค่า
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    if (products.length === 0) {
      alert("No products to submit.");
      return;
    }

    addOrder(products); // ส่งข้อมูลไปยัง ShipperHome
    navigate("/shipperhome"); // กลับไปหน้า ShipperHome
  };

  return (
    <div className="main-content">
      <h1>Send the Product</h1>
      <div className="send-product-container">
        <div className="add-product-container">
          <label>Product Name:</label>
          <input
            type="text"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
          />
          <label>Category:</label>
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="">-- Select Category --</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label>Amount:</label>
          <input
            type="number"
            value={newProduct.amount}
            onChange={(e) =>
              setNewProduct({ ...newProduct, amount: e.target.value })
            }
          />
          {isEditing !== null ? (
            <>
              <button className="save-btn" onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="add-product-btn"
              onClick={handleAddProduct}
              disabled={
                !newProduct.productName || !newProduct.category || !newProduct.amount
              }
            >
              Add Product
            </button>
          )}
        </div>
        <table className="send-product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Serial Number</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.serialNumber}</td>
                  <td>{product.category}</td>
                  <td>{product.amount}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditProduct(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products added.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="submit-container">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={products.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendProduct;
