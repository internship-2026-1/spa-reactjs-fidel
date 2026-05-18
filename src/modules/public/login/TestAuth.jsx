import { useAuth } from "../../../context/AuthContext";
import { Button } from 'lib-components-react'

export default function TestAuth() {
  const { user, token, role, menu, Login, logout, isAuthenticated } = useAuth();

  const probarLogin = () => {
    const fakeUser = {
      id: 1,
      name: "Fidel",
      role: "admin",
    };

    Login(fakeUser, "token_fake_123", "refresh_fake_456");
  };

  return (
    <div>
      <h1>Prueba AuthContext</h1>

      <p>Autenticado: {isAuthenticated ? "Sí" : "No"}</p>
      <p>Usuario: {user ? user.name : "Sin usuario"}</p>
      <p>Token: {token || "Sin token"}</p>
      <p>Rol: {role || "Sin rol"}</p>

      <h3>Menú:</h3>
      <pre>{JSON.stringify(menu, null, 2)}</pre>

      <br/>
      <br />

      <div className="state-row">

        <div className="panel">
      <Button variant="primary" onClick={probarLogin}>Probar login</Button>
        </div>

        <div className="panel">
      <Button variant="primary" onClick={logout}>Cerrar sesión</Button>
        </div>

        </div>
      
    </div>
  );
}