/**
 * estructura fija para paginas privadas
 */
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const {user, logout, menu, role } = useAuth();

    return (
        <nav className="navbar">
        <div className="navbar__brand">
            <Link to="/dashboard">SPA fidel</Link>
        </div>
        <ul className="navbar__links">
            <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        <ul className="navbar__links">
            <li>role: {role ? role : "No hay rol"}</li>
        </ul>
        <ul className="navbar__links">
            { menu && menu.map((item) => (
            <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
            </li>
            ))}
        </ul>
        <div className="navbar__user">
            <span>{user?.email}</span>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
        </nav>
    )
}

function Footer(){
    return(
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} @fidel aceptar cookies </p>
        </footer>
    )
}

export function MainLayout({ children }){
    return(
        <div className="main_layout">
            <Navbar />
            <main className="main-layout__content">
                {children}
            </main>
            <Footer />
        </div>
    )
}