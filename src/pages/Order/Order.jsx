import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, Button, TablePagination, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

import './Order.css';

function Order() {
    const [rows, setRows] = React.useState([
        { id: 1, name: 'Full name', position: 'Admin', amount: '10 pcs' },
        { id: 2, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 3, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 4, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 5, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 6, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 7, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 8, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 9, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 10, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
        { id: 11, name: 'Full name', position: 'xxxxxxx', amount: 'xx pcs' },
    ]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOrderDetails = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const handleApprove = () => {
        setRows(prevRows => prevRows.filter(row => row.id !== selectedRow.id)); // ลบแถวที่ตรงกับ selectedRow
        handleClose(); // ปิด Dialog หลังจากลบข้อมูล
    };

    return (
        <div className='main-content'>
            <Paper>
                <h1 style={{ marginLeft: '10px', marginBottom: '15px' }}>Order</h1>
                
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" align="center">
                                    <Checkbox />
                                </TableCell>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">Position</TableCell>
                                <TableCell align="center">Total Amount</TableCell>
                                <TableCell align="center">Order Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell padding="checkbox" align="center">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Avatar>{row.name.charAt(0)}</Avatar>
                                            <Box ml={1}>{row.name}</Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">{row.position}</TableCell>
                                    <TableCell align="center">{row.amount}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOrderDetails(row)}
                                        >
                                            ORDER DETAILS
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box display="flex" justifyContent="flex-end" mt={2} pr={2}>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>

                {/* Dialog */}
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <DialogTitle>Send product order</DialogTitle>
                    <DialogContent>
                        {selectedRow && (
                            <>
                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Box>
                                        <strong>Name: </strong>{selectedRow.name}
                                    </Box>
                                    <Box>
                                        <strong>Position: </strong>{selectedRow.position}
                                    </Box>
                                </Box>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Stock Availability</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Computer Asus</TableCell>
                                                <TableCell>5</TableCell>
                                                <TableCell>45</TableCell>
                                                <TableCell>
                                                    <Button color="error" variant="outlined">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Mouse-Logitech c130</TableCell>
                                                <TableCell>5</TableCell>
                                                <TableCell>15</TableCell>
                                                <TableCell>
                                                    <Button color="error" variant="outlined">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error" variant="contained">REJECT</Button>
                        <Button onClick={handleApprove} color="success" variant="contained">APPROVE</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </div>
    );
}

export default Order;
