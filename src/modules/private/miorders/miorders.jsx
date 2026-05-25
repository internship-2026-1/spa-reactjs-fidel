/**
 * este componente es para mi orders
 */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table } from "lib-components-react";
import { useAuth } from "../../../context/AuthContext";
import "../adminPrivate.css";
import { fetchOrdersByCustomer, selectOrders, selectOrdersLoading, selectOrdersError } from '../../../store/slices/ordersSlice'


const STATUS_COLORS = {
  Pendiente: { background: "#f3f4f6", color: "#6b7280" },
  Confirmado: { background: "#ccfbf1", color: "#0f766e" },
  Entregado: { background: "#dcfce7", color: "#15803d" },
  Fallido: { background: "#fee2e2", color: "#dc2626" },
  Cancelado: { background: "#fee2e2", color: "#dc2626" },
};

const STATUS_LABELS = {
  PENDING: "Pendiente",
  PAID: "Confirmado",
  SYNCED: "Entregado",
  FAILED: "Fallido",
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

export default function MyOrders() {
    const dispatch = useDispatch();
    const { user } = useAuth();

    const orders = useSelector(selectOrders);
    const loading = useSelector(selectOrdersLoading);
    const error = useSelector(selectOrdersError);

  const userName = user?.name ?? user?.first_name ?? user?.email ?? "Usuario";

    useEffect(() => {
      if (user?.id) {
        dispatch(fetchOrdersByCustomer(user.id));
      }
    }, [dispatch, user?.id]);

  const tableData = orders.map((order, index) => ({
    ...order,
    numero: index + 1,
  }));

  const columns = [
    { key: "numero", header: "# Pedido" },
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
    <section className="admin-module" aria-labelledby="my-orders-title">
      <header className="admin-module__header">
        <div className="admin-module__titles">
          <p className="admin-module__eyebrow">
            Hola bienvenido, {userName}
          </p>

          <h1 id="my-orders-title" className="admin-module__title">
            Mis pedidos
          </h1>
        </div>
      </header>

      {loading ? <p>Cargando pedidos...</p> : null}
      {error ? <p className="dashboard__error">{error}</p> : null}

      <Table
        data={tableData}
        columns={columns}
        keyField="id"
        emptyMessage="No tienes pedidos registrados."
        itemsPerPage={10}
      />
    </section>
  );
}