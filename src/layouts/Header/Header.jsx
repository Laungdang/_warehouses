import './Header.css';

function Header({ username, role, avatar }) {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/metthier2.png" alt="Metthier Logo" /> {/* Path ตรงจาก public */}
      </div>
      <div className="header-user-info">
        <span>
          {username}
        </span>
        <img src={avatar} alt="User Avatar" className="user-avatar" /> {/* แสดงรูปภาพจาก avatar */}
      </div>
    </header>
  );
}

export default Header;
