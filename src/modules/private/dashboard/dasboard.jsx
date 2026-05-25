import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

//imports de slices
import {
  selectUsers,
  fetchUsers,
  selectUsersLoading,
  selectUsersError,
} from "../../../store/slices/usersSlice";
import {
  selectProducts,
  fetchProducts,
} from "../../../store/slices/productsSlice";
import {
  selectCategories,
  fetchCategories,
} from "../../../store/slices/categoriesSlice";
import { selectOrders, fetchOrders } from "../../../store/slices/ordersSlice";
import { Table } from "lib-components-react";
import "./dashboard.css";

//para colores de cada estado
const STATUS_COLORS = {
  Pendiente: { background: "#f3f4f6", color: "#6b7280" },
  Confirmado: { background: "#ccfbf1", color: "#0f766e" },
  Procesando: { background: "#fef3c7", color: "#b45309" },
  "En tránsito": { background: "#dbeafe", color: "#1d4ed8" },
  Entregado: { background: "#dcfce7", color: "#15803d" },
  Cancelado: { background: "#fee2e2", color: "#dc2626" },
};
//estados
const STATUS_LABELS = {
  PENDING: "Pendiente",
  PAID: "Confirmado",
  SYNCED: "Entregado",
  FAILED: "Cancelado",
  CANCELLED: "Cancelado",
};

function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? status;
  const colors = STATUS_COLORS[label] ?? STATUS_COLORS["Pendiente"];

  return (
    <span
      style={{
        background: colors.background,
        color: colors.color,
        padding: "4px 10px",
        borderRadius: "999px",
        fontWeight: 600,
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();
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
    {
      label: "Productos",
      value: loading ? "..." : products.length,
      sub: "en catalogo",
      path: "/productos",
      mod: "blue",
    },
    {
      label: "Categorias",
      value: loading ? "..." : categories.length,
      sub: "registradas",
      path: "/categorias",
      mod: "purple",
    },
    {
      label: "Orders",
      value: loading ? "..." : orders.length,
      sub: "en total",
      path: "/pedidos",
      mod: "orange",
    },
    {
      label: "Usuarios",
      value: loading ? "..." : users.length,
      sub: "registrados",
      path: "/usuarios",
      mod: "green",
    },
  ];

  const recentOrders = orders.slice(0, 5).map((order, index) => ({
    ...order,
    numero: index + 1,
  }));

  const orderColumns = [
    { key: "numero", header: "# Pedido" },
    {
      key: "customer_name",
      header: "Cliente",
      render: (row) => row.customer_name ?? row.customer_id,
    },
    {
      key: "created_at",
      header: "Fecha",
      render: (row) =>
        row.created_at ? new Date(row.created_at).toLocaleDateString() : "",
    },
    {
      key: "items",
      header: "Ítems",
      render: (row) => row.items?.length ?? 0,
    },
    {
      key: "total_amount",
      header: "Total",
      render: (row) => `Q${Number(row.total_amount ?? 0).toFixed(2)}`,
    },
    {
      key: "status",
      header: "Estado",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <section className="dashboard">
      {/**header */}
      <header className="dashboard__header">
        <p className="dashboard__eyebrow">Panel principal</p>
        <h1 className="dashboard__title">
          Bienvenido, {user?.name ?? user?.email}
        </h1>
        <p className="dashboard__subtitle">Resumen general de la plataforma.</p>
      </header>

      {error ? <p className="dashboard__error">{error}</p> : null}

      <div className="dashboard__stats">
        {stats.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className={`dashboard__stat dashboard__stat--${s.mod}`}
          >
            <span className="dashboard__stat-value">{s.value}</span>
            <span className="dashboard__stat-label">{s.label}</span>
            <span className="dashboard__stat-sub">{s.sub}</span>
          </Link>
        ))}
      </div>

      {/**tabla */}
      <div className="dashboard__section">
        {/**header de la tabla */}
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Pedidos recientes</h2>
          <Link to="/pedidos" className="dashboard__section-link">Ver todos</Link>
        </div>
        {/**tabla */}
        <div className="dashboard__table-wrap">
                  <Table
          data={recentOrders}
          columns={orderColumns}
          keyField="id"
          emptyMessage="No hay pedidos recientes."
          itemsPerPage={5}
        />
        </div>
      </div>
    </section>
  );
}
