import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

//imports de slices
import { selectUsers, fetchUsers, selectUsersLoading, selectUsersError } from '../../../store/slices/usersSlice'
import { selectProducts, fetchProducts } from '../../../store/slices/productsSlice'
import { selectCategories, fetchCategories } from '../../../store/slices/categoriesSlice'
import { selectOrders, fetchOrders } from "../../../store/slices/ordersSlice";

import "./dashboard.css";


//colores definidos
const STATUS_COLORS = {
  "Entregado":   "success",
  "En tránsito": "info",
  "Procesando":  "warning",
  "Pendiente":   "neutral",
  "Cancelado":   "danger",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
   const error = useSelector(selectUsersError);

  //selector productos
  const products = useSelector(selectProducts);
  //categorias
  const categories = useSelector(selectCategories);
  //orders
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
  }, [dispatch]);

  const stats = [
    {label: 'Productos', value: loading ? "..." : products.length, sub: "en catalogo", path: "/productos", mod: "blue"},
    {label: 'Categorias', value: loading ? "..." : categories.length, sub: 'registradas', path: '/categorias', mod: 'purple'},
    {label: 'Orders', value: loading ? "..." : orders.length, sub: "en total", path: "/pedidos", mod: "orange"},
    {label: "Usuarios", value: loading ? "..." : users.length, sub: "registrados", path: "/usuarios", mod: "green",},
  ];


  return (
    <section className="dashboard">
      {/**header */}
      <header className="dashboard__header">
        <p className="dashboard__eyebrow">Panel principal</p>
        <h1 className="dashboard__title">Bienvenido, {user?.name ?? user?.email}</h1>
        <p className="dashboard__subtitle">Resumen general de la plataforma.</p>
      </header>

      {error ? <p className="dashboard__error">{error}</p> : null}

      <div className="dashboard__stats">
        {stats.map((s) => (
          <Link key={s.path} to={s.path} className={`dashboard__stat dashboard__stat--${s.mod}`}>
            <span className="dashboard__stat-value">{s.value}</span>
            <span className="dashboard__stat-label">{s.label}</span>
            <span className="dashboard__stat-sub">{s.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}