import React, { useState } from "react"; // เอานี่มาใช้ เพราะ React คือพระเอกของเรา และ useState เอาไว้จัดการข้อมูลแบบหล่อ ๆ
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material"; // Material-UI คือของเทพ เอามาแต่งหน้าตาให้ UI ดูอย่างโปร

const User = () => {
  // เก็บรายชื่อผู้ใช้ไว้ใน users (เริ่มต้นว่าง ๆ ไม่มีใคร)
  const [users, setUsers] = useState([]);
  // isAdding บอกว่าเรากำลังจะเพิ่มผู้ใช้ใหม่รึป่าว? (false แปลว่ายังไม่ได้เพิ่ม)
  const [isAdding, setIsAdding] = useState(false);
  // newUser คือข้อมูลของผู้ใช้ใหม่ที่เรากำลังกรอกในฟอร์ม
  const [newUser, setNewUser] = useState({
    firstName: "", // ชื่อจริง
    lastName: "", // นามสกุล
    role: "", // บทบาท เช่น Admin, Picker
  });
  // editingUserId บอกว่าเรากำลังแก้ไขข้อมูลของใคร (ถ้า null แปลว่าไม่ได้แก้ใคร)
  const [editingUserId, setEditingUserId] = useState(null);

  // มี Role 4 อย่างให้เลือก
  const roles = ["Super Admin", "Admin", "Picker", "Shipper"];

  // ฟังก์ชันเพิ่มผู้ใช้ใหม่
  const handleAddUser = () => {
    // เช็กก่อนเลย ว่าไอ้ช่องกรอก user กรอกครบยัง?
    if (!newUser.firstName || !newUser.lastName || !newUser.role) {
      alert("Please fill in all fields!"); // แจ้งเตือน
      return;
    }
    // เอาผู้ใช้ใหม่ยัดลงไปใน users
    setUsers([
      ...users, // เอาข้อมูลเดิมมาด้วย
      { id: users.length + 1, ...newUser }, // เพิ่มข้อมูลใหม่จาก newUserพร้อม ID 
    ]);
    // เคลียร์ฟอร์มซะ!
    setNewUser({ firstName: "", lastName: "", role: "" });
    setIsAdding(false); // ปิดคำสั่งเพิ่มผู้ใช้
  };

  // ฟังก์ชันลบผู้ใช้
  const handleDeleteUser = (id) => {
    
    setUsers(users.filter((user) => user.id !== id));
  };

  // ฟังก์ชันเปิดโหมดแก้ไข
  const handleEditUser = (id) => {
    // จำไว้ว่าเรากำลังแก้ไข ID ไหน
    setEditingUserId(id);
  };

  // ฟังก์ชันบันทึกการแก้ไข
  const handleSaveEdit = () => {
    // วนลูปผู้ใช้ทั้งหมด ถ้าคนไหนตรงกับ ID ที่แก้ไข ก็อัปเดตข้อมูลใหม่
    setUsers(
      users.map((user) =>
        user.id === editingUserId
          ? { ...newUser, id: editingUserId } // ถ้าใช่ก็อัปเดต
          : user // ถ้าไม่ใช่ก็ปล่อยผ่าน
      )
    );
    // ออกจากโหมดแก้ไข
    setEditingUserId(null);
    setNewUser({ firstName: "", lastName: "", role: "" }); // เคลียร์ฟอร์มเหมือนเดิม
  };

  return (
    <div className="main-content">
      <Box sx={{ padding: 2 }}>
        {/* หัวข้อใหญ่เบิ้ม "Manage User" */}
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Manage User
        </Typography>

        {/* ปุ่ม Manage จัดไว้มุมขวา */}
        <Box
          sx={{
            display: "flex", // ใช้ Flexbox จัดตำแหน่ง
            justifyContent: "flex-end", // ดันไปติดมุมขวา
            marginBottom: 2, // เว้นระยะด้านล่างหน่อย
          }}
        >
          <Button
            variant="contained" // ปุ่มแบบมีพื้นหลัง
            onClick={() => setIsAdding(true)} // กดแล้วเปิดโหมดเพิ่มผู้ใช้
            disabled={isAdding} // ถ้ากำลังเพิ่มอยู่ disable ปุ่มไปเลย ไม่ให้ซ้ำซ้อน
          >
            Manage
          </Button>
        </Box>

        {/* ตารางผู้ใช้ */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* หัวข้อในตาราง */}
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* วนลูปแสดงผู้ใช้ */}
              {users.map((user) =>
                editingUserId === user.id ? (
                  // ถ้ากำลังแก้ไข (ID ตรงกับที่กำลังแก้)
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <TextField
                        value={newUser.firstName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, firstName: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={newUser.lastName}
                        onChange={(e) =>
                          setNewUser({ ...newUser, lastName: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({ ...newUser, role: e.target.value })
                        }
                      >
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleSaveEdit} // ปุ่ม Save
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setEditingUserId(null)} // ปุ่ม Cancel
                        sx={{ marginLeft: 1 }}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  // โหมดปกติ
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setNewUser(user); // เอาข้อมูลผู้ใช้มาใส่ในฟอร์ม
                          handleEditUser(user.id); // เปิดโหมดแก้ไข
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)} // ปุ่ม Delete
                        sx={{ marginLeft: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ฟอร์มเพิ่มผู้ใช้ */}
        {isAdding && (
          <Box sx={{ marginTop: 2 }}>
            <h3>Add New User</h3>
            <TextField
              label="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              sx={{ marginRight: 1 }}
            />
            <Select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              displayEmpty
              sx={{ marginRight: 1, minWidth: 150 }}
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="success" onClick={handleAddUser}>
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsAdding(false)}
              sx={{ marginLeft: 1 }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default User; // บอก React ว่านี่คือ Component ชื่อ User
