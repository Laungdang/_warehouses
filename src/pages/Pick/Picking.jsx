import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "./Picking.css";

function Picking({ products, setProducts, addOrder }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  const location = useLocation();
  const selectedProject = location?.state?.selectedProject || "";

  if (!selectedProject) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 3 }}>
        Please select a project first!
      </Typography>
    );
  }

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setQuantity("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleSubmitOrder = () => {
    if (!selectedProduct || !quantity || parseInt(quantity, 10) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const newQuantityInStock = selectedProduct.quantityInStock - parseInt(quantity, 10);

    if (newQuantityInStock < 0) {
      alert("Insufficient stock!");
      return;
    }

    // Update stock in the products list
    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, quantityInStock: newQuantityInStock }
          : product
      )
    );

    // Add the order
    addOrder({
      id: selectedProduct.id,
      product: selectedProduct.name,
      serialNumber: selectedProduct.serialNumber,
      category: selectedProduct.category,
      quantity: quantity,
      date: new Date().toLocaleDateString(),
      project: selectedProject,
      status: "Waiting",
    });

    handleCloseDialog();
  };

  return (
    <div className="main-content">
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Picking Goods for Project: {selectedProject}
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Quantity in Stock</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.serialNumber || "N/A"}</TableCell>
                    <TableCell>{product.quantityInStock} pcs</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1976d2",
                          "&:hover": { backgroundColor: "#115293" },
                        }}
                        onClick={() => handleOpenDialog(product)}
                      >
                        + Pick Product
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No products available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            {selectedProduct?.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#757575", marginBottom: 1 }}>
            Category: {selectedProduct?.category}
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e", marginBottom: 2 }}>
            Serial Number: {selectedProduct?.serialNumber || "N/A"}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", padding: "0 24px 16px 24px" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitOrder}
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
              color: "white",
              fontWeight: "bold",
            }}
          >
            Submit Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Picking;
