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
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function Goodsreceipt({ orders = [], fullName, role, project, updateOrderStatus }) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ฟังก์ชันแสดงรายละเอียดคำสั่งซื้อ
  const handleOrderDetails = (order, index) => {
    setSelectedOrder({ ...order, index }); // เพิ่ม index เข้าไปใน selectedOrder
    setOpen(true);
  };

  // ฟังก์ชันสำหรับการอนุมัติคำสั่งซื้อ
  const handleApprove = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.index, "Approved"); // อัปเดตสถานะเป็น Approved
    }
    handleClose();
  };

  // ฟังก์ชันสำหรับการปฏิเสธคำสั่งซื้อ
  const handleReject = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.index, "Rejected"); // อัปเดตสถานะเป็น Rejected
    }
    handleClose();
  };

  // ปิด Dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="main-content" style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <Paper elevation={3}>
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: 2,
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Goods Receipt
          </Typography>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Position</TableCell>
                <TableCell align="center">Total Amount</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Order Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:nth-of-type(even)": { backgroundColor: "#ffffff" },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{fullName}</TableCell>
                    <TableCell align="center">{role}</TableCell>
                    <TableCell align="center">{order.amount} pcs</TableCell>
                    <TableCell align="center">{new Date().toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOrderDetails(order, index)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    No orders available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white" }}>
            Order Details
          </DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: 2 }}
              mb={2}
            >
              <Typography variant="body1">
                <strong>Name:</strong> {fullName}
              </Typography>
              <Typography variant="body1">
                <strong>Project:</strong> {project}
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{selectedOrder?.id}</TableCell>
                    <TableCell>{selectedOrder?.productName}</TableCell>
                    <TableCell>{selectedOrder?.serialNumber || "N/A"}</TableCell>
                    <TableCell>{selectedOrder?.category || "N/A"}</TableCell>
                    <TableCell>{selectedOrder?.amount}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleReject}
              color="error"
              variant="contained"
              sx={{ marginRight: "auto" }} // ปุ่ม Reject ไปด้านซ้าย
            >
              Reject
            </Button>
            <Button onClick={handleApprove} color="success" variant="contained">
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

export default Goodsreceipt;
