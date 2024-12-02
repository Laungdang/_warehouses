import { Outlet } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

function Layout({ setRole, setToken, role, username, avatar }) { // รับ username เป็น props
  return (
    <div>
      <Header username={username} role={role}  avatar={avatar} /> {/* ส่ง username และ role ไปยัง Header */}
      <Navbar setRole={setRole} setToken={setToken} role={role} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
