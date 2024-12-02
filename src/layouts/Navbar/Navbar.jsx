import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ setRole, setToken, role }) {
  const [tab, setTab] = useState("");

  // ตั้งเส้นทางของ Home ตาม role
  const homePath = role === "picker" ? "/pickerhome" : "/home";

  return (
    <div className="navbar-container">
      {/* Home Menu (เฉพาะ role ที่ไม่ใช่ picker) */}
      {role !== "picker" && role !== "shipper" && (
        <Link to={homePath}>
          <button onClick={() => setTab("home")}>
            <span className="bi bi-houses"> Home</span>
          </button>
        </Link>
      )}


      {/* Superadmin Menus */}
      {role === "superadmin" ? (
        <>

        <Link to={"/inventory"}>
            <button onClick={() => setTab("inventory")}>
              <span className="bi bi-box-seam"> Inventory</span>
            </button>
          </Link>
          
        <Link to={"/project"}>
            <button onClick={() => setTab("project")}>
              <span className="bi bi-building-add"> Add Project</span>
            </button>
          </Link>
      
          <Link to={"/pickerhome"}>
            <button onClick={() => setTab("pickerhome")}>
              <span className="bi bi-house-add"> Picking Goods</span>
            </button>
          </Link>

          <Link to={"/requisition"}>
            <button onClick={() => setTab("requisition")}>
              <span className="bi bi-clipboard"> Requisition</span>
            </button>
          </Link>
          
          <Link to={"/shipperhome"}>
          <button onClick={() => setTab("shipperhome")}>
            <span className="bi bi-house-add"> Send the product</span>
          </button>
          </Link>

          <Link to={"/goodsreceipt"}>
            <button onClick={() => setTab("goodsreceipt")}>
              <span className="bi bi-clipboard"> Goods Receipt</span>
            </button>
          </Link> 

          <Link to={"/user"}>
            <button onClick={() => setTab("user")}>
              <span className="bi bi-people"> Manage User</span>
            </button>
          </Link> 

          <Link to={"/fomereport"}>
            <button onClick={() => setTab("fomereport")}>
              <span className="bi bi-flag"> Report Form</span>
            </button>
          </Link> 

          <Link to={"/report"}>
            <button onClick={() => setTab("report")}>
              <span className="bi bi-flag"> Report</span>
            </button>
          </Link> 
          
          

        </>
      ) : null}

      {/* Admin/Superadmin Menus */}
      {role === "admin" ? (
        <>
          <Link to={"/inventory"}>
            <button onClick={() => setTab("inventory")}>
              <span className="bi bi-box-seam"> Inventory</span>
            </button>
          </Link>
          <Link to={"/goodsreceipt"}>
            <button onClick={() => setTab("goodsreceipt")}>
              <span className="bi bi-clipboard"> Goods Receipt</span>
            </button>
          </Link>
          <Link to={"/requisition"}>
            <button onClick={() => setTab("requisition")}>
              <span className="bi bi-clipboard"> Requisition</span>
            </button>
          </Link>
          
          <Link to={"/fomereport"}>
            <button onClick={() => setTab("fomereport")}>
              <span className="bi bi-flag"> Report Form</span>
            </button>
          </Link> 

          <Link to={"/report"}>
            <button onClick={() => setTab("report")}>
              <span className="bi bi-flag"> Report</span>
            </button>
          </Link> 
        
        </>
      ) : null}

      {/* Picker Role Menus */}
      {role === "picker" ? (
        <>
          <Link to={"/pickerhome"}>
            <button onClick={() => setTab("pickerhome")}>
              <span className="bi bi-house-add"> Home</span>
            </button>
          </Link>
          <Link to={"/inventory"}>
            <button onClick={() => setTab("inventory")}>
              <span className="bi bi-box-seam"> Inventory</span>
            </button>
          </Link>

          <Link to={"/fomereport"}>
            <button onClick={() => setTab("fomereport")}>
              <span className="bi bi-flag"> Report Form</span>
            </button>
          </Link> 
          
        </>
      ) : null}

        {role === "shipper" ? (
        <>
          <Link to={"/shipperhome"}>
          <button onClick={() => setTab("shipperhome")}>
            <span className="bi bi-houses"> Home</span>
          </button>
          </Link>
          <Link to={"/inventory"}>
            <button onClick={() => setTab("inventory")}>
              <span className="bi bi-box-seam"> Inventory</span>
            </button>
          </Link>

          <Link to={"/fomereport"}>
            <button onClick={() => setTab("fomereport")}>
              <span className="bi bi-flag"> Report Form</span>
            </button>
          </Link> 
          
        </>
      ) : null} 


      {/* Logout Button */}
      <button>
        <span
          className="btn btn-outline-danger"
          onClick={() => {
            setToken('');
            setRole('');
          }}
        >
          Logout
        </span>
      </button>
    </div>
  );
}

export default Navbar;
