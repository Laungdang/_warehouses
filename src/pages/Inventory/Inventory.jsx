import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import "./Inventory.css";

function Inventory({ role }) { // รับ role จาก props
  const [inventory, setInventory] = useState([
    { id: 1, product: "Polo Tshirt", serialNumber: "SN001", category: "Clothing", amount: 10 },
    { id: 2, product: "Item 2", serialNumber: "SN002", category: "Category 1", amount: 15 },
    { id: 3, product: "Item 3", serialNumber: "SN003", category: "Category 2", amount: 8 },
  ]);

  const [addingProduct, setAddingProduct] = useState(false); // สถานะเพิ่มสินค้า
  const [newProductData, setNewProductData] = useState({
    product: "",
    category: "",
    amount: "",
  }); // เก็บข้อมูลสินค้าที่จะเพิ่ม

  const [editingItemId, setEditingItemId] = useState(null); // ID ของแถวที่กำลังแก้ไข
  const [editingData, setEditingData] = useState({}); // ข้อมูลที่กำลังแก้ไข

  // เริ่มแก้ไข
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingData({ ...item });
  };

  // บันทึก
  const handleSave = () => {
  
    setInventory((prevInventory) =>
      prevInventory.map((item) =>      
        item.id === editingItemId ? { ...editingData } : item  //แทนข้อมูลใน item ด้วย eeditingItemId
      )
    );
    setEditingItemId(null);
  };

  // ยกเลิก
  const handleCancel = () => {
    setEditingItemId(null);
    setEditingData({});
  };

  // ลบ
  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id)); //เก็บเฉพาะสินค้าที่ id ไม่ตรงกับสินค้าที่ลบ
  };

  // เพิ่มสินค้าใหม่
  const handleAddProduct = () => {
    if (!newProductData.product || !newProductData.category || !newProductData.amount) {  //เช็คว่ามีช่องที่ไม่ได้กรอกรึป่าว
      alert("Please fill in all fields");
      return;
    }
    setInventory([
      ...inventory, //copy รายการสินค้าเก่าไว้ 
      { 
        id: inventory.length + 1, //id สินค้า + 1 ไปเรื่อยๆ
        product: newProductData.product,
        serialNumber: `SN00${inventory.length + 1}`, // สร้าง Serial Number อัตโนมัติ
        category: newProductData.category,
        amount: parseInt(newProductData.amount, 10),
      },
    ]);
    setNewProductData({ product: "", category: "", amount: "" }); // รีเซ็ตฟอร์ม
    setAddingProduct(false); // ปิดโหมดเพิ่มสินค้า
  };

  // ยกเลิกการเพิ่มสินค้า
  const handleCancelAdd = () => {
    setNewProductData({ product: "", category: "", amount: "" });
    setAddingProduct(false);
  };

  // Total Product Count
  const totalProductCount = inventory.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      className="main-content"
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Inventory Table */}
      <TableContainer component={Paper} elevation={3} style={{ flex: 2 }}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Inventory
          </Typography>
        </Box>

        {/* ปุ่ม Add Product */}
        {(role === "superadmin" || role === "admin") && (
          <Box
            sx={{
              padding: "10px",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddingProduct(true)}
            >
              Add Product
            </Button>
          </Box>
        )}

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Serial Number</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              {(role === "superadmin" || role === "admin") && (
                <TableCell align="center">Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  "&:nth-of-type(even)": { backgroundColor: "#ffffff" },
                }}
              >
                <TableCell>{item.id}</TableCell>
                {editingItemId === item.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editingData.product || ""}
                        onChange={(e) =>
                          setEditingData({ ...editingData, product: e.target.value })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>{item.serialNumber}</TableCell>
                    <TableCell>
                      <Select
                        value={editingData.category || ""}
                        onChange={(e) =>
                          setEditingData({ ...editingData, category: e.target.value })
                        }
                        fullWidth
                      >
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        <MenuItem value="Category 1">Category 1</MenuItem>
                        <MenuItem value="Category 2">Category 2</MenuItem>
                        <MenuItem value="Category 3">Category 3</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={editingData.amount || ""}
                        onChange={(e) =>
                          setEditingData({ ...editingData, amount: parseInt(e.target.value) })
                        }
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={handleSave}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.serialNumber}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.amount} pcs</TableCell>
                    {(role === "superadmin" || role === "admin") && (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ marginRight: 1 }}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </>
                )}
              </TableRow>
            ))}
            {addingProduct && (
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>
                  <TextField
                    value={newProductData.product}
                    onChange={(e) =>
                      setNewProductData({ ...newProductData, product: e.target.value })
                    }
                    placeholder="Product Name"
                    fullWidth
                  />
                </TableCell>
                <TableCell>Auto</TableCell>
                <TableCell>
                  <Select
                    value={newProductData.category}
                    onChange={(e) =>
                      setNewProductData({ ...newProductData, category: e.target.value })
                    }
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Category 1">Category 1</MenuItem>
                    <MenuItem value="Category 2">Category 2</MenuItem>
                    <MenuItem value="Category 3">Category 3</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={newProductData.amount}
                    onChange={(e) =>
                      setNewProductData({ ...newProductData, amount: e.target.value })
                    }
                    placeholder="Amount"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleAddProduct}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleCancelAdd}
                    >
                      Cancel
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Overview Panel */}
      <Paper
        elevation={3}
        style={{
          flex: 0.8,
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            borderBottom: "2px solid #1976d2",
            paddingBottom: 1,
            marginBottom: 2,
          }}
        >
          Overview
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
          <Typography>Total Product</Typography>
          <Typography fontWeight="bold">{totalProductCount}</Typography>
        </Box>
      </Paper>
    </div>
  );
}

export default Inventory;
