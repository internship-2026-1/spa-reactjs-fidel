import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, FormField, Select, SearchBar } from 'lib-components-react'
import { selectOrders, fetchOrders, simulateOrderPayment} from "../../../store/slices/ordersSlice";

import '../adminPrivate.css';
import { Modal } from "../../../components/modal/modal";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pendiente" },
  { value: "PAID", label: "Confirmado" },
  { value: "SYNCED", label: "Entregado / sincronizado" },
  { value: "FAILED", label: "Fallido" },
  { value: "CANCELLED", label: "Cancelado" },
];

const STATUS_COLORS = {
  "Pendiente":   { background: "#f3f4f6", color: "#6b7280" },
  "Confirmado":  { background: "#ccfbf1", color: "#0f766e" },
  "Procesando":  { background: "#fef3c7", color: "#b45309" },
  "En tránsito": { background: "#dbeafe", color: "#1d4ed8" },
  "Entregado":   { background: "#dcfce7", color: "#15803d" },
  "Cancelado":   { background: "#fee2e2", color: "#dc2626" },
};

const STATUS_LABELS = {
  PENDING: "Pendiente",
  PAID: "Confirmado",
  SYNCED: "Entregado",
  FAILED: "Cancelado",
  CANCELLED: "Cancelado",
};


export default function Orders() {
    const dispatch = useDispatch();

    //selector
    const orders = useSelector(selectOrders);

    // constantes iniciales
    const [mode, setMode] = useState(null);
    const [selected, setSelected]   = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [query, setQuery]         = useState("");

    const openManage = (order) => {
      setSelected(order);
      setNewStatus(order.status ?? "Pendiente");
      setMode("gestionar");
    };

    //preparando dispatch para orders
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    //filtered
    const filtered = orders.filter((o) => {
      const q = query.toLowerCase();

      return (
        (o.id ?? "").toString().toLowerCase().includes(q) ||
        (o.customer_id ?? "").toString().toLowerCase().includes(q) ||
        (o.status ?? "").toLowerCase().includes(q)
      );
    });

    //la columna visual en vez de id pedidos
    const tableData = filtered.map((pedi, index) => ({
        ...pedi,
        numero: index + 1,
    }));




    // para manejar gestionar
    const handleSave = async () => {
      if (!selected) return;
    
      if (newStatus === "PAID") {
        await dispatch(simulateOrderPayment(selected.id)).unwrap();
        await dispatch(fetchOrders());
        setMode(null);
        return;
      }
    
      if (newStatus === "CANCELLED") {
        alert("Cancelación pendiente: aun necesito endpoint para poder cancelar.");
        setMode(null);
        return;
      }
    
      alert("Este estado por ahora solo es informativo.");
      setMode(null);
    };

    //manejar set
    //const set = (field) => (e) => {
    //    setForm((prev) => ({
    //        ...prev,
    //        [field]: e.target.value,
    //    }));
    //};


    //columna para la tabla
    const columns = [
        { key: "numero",       header: "# Pedido" },
        //{ key: "customer_id", header: "Cliente"  },
        {key: "customer_name", header: "Cliente", render: (row) => row.customer_name ?? row.customer ?? row.customer_id,},
        { key: "created_at",     header: "Fecha", render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : "",},
        { key: "items",    header: "Ítems", render: (row) => row.items?.length ?? 0,},
        { key: "total_amount",    header: "Total",   render: (row) => `Q${Number(row.total_amount ?? 0).toFixed(2)}`,},
        { key: "status",   header: "Estado", render: (row) => <StatusBadge status={row.status} />},
        { key: "actions",  header: "Acciones",
            render: (row) => (
                <div className="category-action-cell">
                    <button className="category-action-btn category-action-btn--edit" onClick={() => openManage(row)}>Gestionar</button>
                </div>
            )
        },
    ]

    //comonentes
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

    function Detail({ label, value }) {
      return (
        <div>
          <strong>{label}: </strong>
          <span>{value}</span>
        </div>
      );
    }

    return (
        <section className="admin-module" aria-labelledby="orders-title">
            {/**header */}
            <header className="admin-module__header">
                <div className="admin-module__titles">
                    <p className="admin-module__eyebrow">Administración</p>
                    <h1 id="orders-title" className="admin-module__title">Pedidos</h1>
                </div>
                <div className="admin-module__actions">
                    <SearchBar query={query} onQueryChange={setQuery} onSearch={() => {}} placeholder="Buscar..." buttonText="Buscar"/>
                </div>
            </header>

            {/**tabla */}
            <Table data={tableData} columns={columns} keyField="id" emptyMessage="No hay pedidos." itemsPerPage={10} />

            {/**modal gestionar */}
            { mode === "gestionar" && selected && (
                <Modal title={`Pedido ${selected.id}`} onClose={() => setMode(null)} onConfirm={handleSave} confirmLabel="Actualizar estado">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1.5rem", marginBottom: "1rem" }}>
                        <Detail label="Cliente" value={selected.customer} />
                        <Detail label="Fecha"   value={selected.date} />
                        <Detail label="Ítems"   value={selected.items?.map((item) => `${item.product_sku} x${item.quantity}`).join(", ") ?? ""} />
                        <Detail label="Total"   value={`Q${Number(selected.total_amount ?? 0).toFixed(2)}`} />
                    </div>
                    <FormField label="Estado del pedido" name="status">
                        <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
  {STATUS_OPTIONS.map((s) => (
    <option key={s.value} value={s.value}>
      {s.label}
    </option>
  ))}
</Select>
                    </FormField>
                </Modal>
            )}


        </section>
    )
}