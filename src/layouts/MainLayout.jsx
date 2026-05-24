import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MainLayout.css";

function Navbar() {
  const { user, logout, menu } = useAuth();
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/dashboard">TECHSPEC</Link>
      </div>
      <ul className="navbar__links">
        {menu &&
          menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={pathname === item.path ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="navbar__user">
        <span>{user?.name ?? user?.email}</span>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} TECHSPEC. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}

export function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout__content">{children}</main>
      <Footer />
    </div>
  );
}
