import React, { useState } from 'react';
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';

import Home from './pages/Home/Home';
import PickerHome from './pages/PickerHome/PickerHome';
import ShipperHome from './pages/ShipperHome/ShipperHome';
import Inventory from './pages/Inventory/Inventory';
import Picking from './pages/Pick/Picking';
import SendProduct from './pages/SendProduct/SendProduct';
import Goodsreceipt from './pages/Goodsreceipt/Goodreceipt';
import Requisition from './pages/Requisition/Requisition';
import Login from './pages/Login/Login';
import Project from './pages/Project/Project';
import OrderSummary from './pages/OrderSummary/OrderSummary';
import User from './pages/User/User';
import Report from './pages/Report/Report';
import FormReport from './pages/FormReport/FormReport';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [selectedProject, setSelectedProject] = useState("");
  const [avatar, setAvatar] = useState(''); // เพิ่ม state สำหรับ avatar
  const [orders, setOrders] = useState([]);
  const [pickerOrders, setPickerOrders] = useState([]);
  const [shipperOrders, setShipperOrders] = useState([]);

  const [reports, setReports] = useState([]); // State สำหรับเก็บรายงาน

  const addReport = (newReport) => {
    setReports((prevReports) => [...prevReports, newReport]);
  };


  const updateOrderStatus = (id, status) => {
    setPickerOrders((prevOrders) =>
      prevOrders.map((order, index) =>
        index === id ? { ...order, status } : order
      )
    );
  };

  const updateShipperOrderStatus = (id, status) => {
    setShipperOrders((prevOrders) =>
      prevOrders.map((order, index) =>
        index === id ? { ...order, status } : order
      )
    );
  };
  


  const [products, setProducts] = useState([
    { id: 1, name: 'Joy-stick', category: 'Electronic', serialNumber: 'SN12345', quantityInStock: 200 },
    { id: 2, name: 'Piano', category: 'Musical instrument', serialNumber: 'SN67890', quantityInStock: 60 },
    { id: 3, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 4, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 5, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 6, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 7, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 8, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 9, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 10, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
    { id: 11, name: 'xxxxx', category: 'xxxxx', quantityInStock: 'xxxx' },
  ]);

  const addPickerOrder = (order) => setPickerOrders([...pickerOrders, order]);
  
  const addShipperOrder = (newOrders) => {
    setShipperOrders((prevOrders) => [...prevOrders, ...newOrders]);
  };


  const [projects] = useState([
    { id: 1, project: "ซันก่อสร้าง", category: "การก่อสร้าง" },
    { id: 2, project: "JIB", category: "อุปกรณ์ฮาร์ดแวร์" },
    { id: 3, project: "New Instrument", category: "เครื่องดนตรี" },
  ]);



  const addOrder = (order) => {
    setOrders([...orders, order]);
  }

  //ทำหน้าHome ของแต่ละ role
  const getHomePage = () => {
    switch (role) {
      case 'superadmin':
      case 'admin':
        return <Home />;
      case 'picker':
        return <PickerHome  />;
      case 'shipper':
        return <ShipperHome />;
      default:
        return <Home />;
    }
  };

  if (token === '')  {
    return (
      <Login
        setToken={setToken}
        setRole={setRole}
        setUsername={setUsername}
        setAvatar={setAvatar} // ส่ง setAvatar
      />
    );
  }

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route
            element={
              <Layout
                setRole={setRole}
                setToken={setToken}
                role={role}
                username={username}
                avatar={avatar} // ส่ง avatar ไปยัง Layout
              />
            }
          >
            <Route path="/" element={getHomePage()} />
            <Route path="home" element={getHomePage()} />
            <Route path="project" element={<Project />} />
            <Route path="pickerhome" element={<PickerHome orders={pickerOrders} projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} addOrder={addPickerOrder} fullName={username}position={role} />} />
            <Route path="picking" element={<Picking products={products} setProducts={setProducts} addOrder={addPickerOrder} selectedProject={selectedProject || ''} />} />
            <Route path="inventory" element={<Inventory role={role} />} />
            <Route path="goodsreceipt" element={<Goodsreceipt fullName={username} role={role}  orders={shipperOrders} project={selectedProject} updateOrderStatus={updateShipperOrderStatus} />} />
            <Route path="requisition" element={<Requisition orders={pickerOrders} projects={projects} selectedProject={selectedProject}  fullName={username} position={role} updateOrderStatus={updateOrderStatus} />} />
            <Route path="shipperhome" element={<ShipperHome orders={shipperOrders} projects={projects} selectedProject={selectedProject} setSelectedProject={setSelectedProject} fullName={username} role={role} />} />
            <Route path="sendproduct" element={<SendProduct addOrder={addShipperOrder} selectedProject={selectedProject || ''} fullName={username} position={role} />} />
            <Route path="ordersummary" element={<OrderSummary />} />
            <Route path="user" element={<User />} />
            <Route path="report" element={<Report reports={reports} username={username} />} />
            <Route path="fomereport" element={<FormReport addReport={addReport} role={role} username={username} />} />

          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;