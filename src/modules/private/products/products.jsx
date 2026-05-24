/**
 * formulario de prductos
 */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  FormField,
  Input,
  Select,
  SearchBar,
} from "lib-components-react";
import { Modal } from "../../../components/modal/modal";
import "../adminPrivate.css";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  fetchProducts,
  updateProduct
} from "../../../store/slices/productsSlice";

import { fetchCategories, selectCategories } from "../../../store/slices/categoriesSlice";

// creando mi inicio del formulario
const EMPTY_FORM = { name: "", catalog: "", base_price: "", stock: "", status: "activo", };

export default function Products() {
  const dispatch = useDispatch();

  //inicializando los selectores
  const productos = useSelector(selectProducts);
  const ejecutando = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categorias = useSelector(selectCategories);

  // constantes iniciales
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  //preparando el dispatch para los pruductos
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);




  //
  const openEdit = (prod) => {
    setSelected(prod);
    setForm({
      name: prod.name,
      catalog: prod.catalog?.id ?? prod.catalog ?? "",
      base_price: prod.base_price,
      stock: prod.stock,
      status: prod.status,
    });
    setMode('edit')
  }

  // preparando el setQuery
  const [query, setQuery] = useState("");

  //filter
  const filtered = productos.filter((p) => {
    const q = query.toLowerCase();

    return (
      p.name?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.odoo_id?.toString().toLowerCase().includes(q)
    );
  });

  //campo visual para la columna de id
  const tableData = filtered.map((prod, index) => ({
    ...prod,
    numero: index + 1
  }));

  //para manejar update
  const handleSave = async () => {
    if (mode === "edit"){
      await dispatch(updateProduct({
        id: selected.id,
        data: {
          catalog: form.catalog,
          base_price: form.base_price,
          stock: form.stock,
          status: form.status
        },
      }));

      await dispatch(fetchProducts());
    };

    setMode(null);
  }

  //manejar set
  const set = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };


  const columns = [
    { key: "numero", header: "No." },
    { key: "name", header: "Nombre" },
    { key: "catalog_name", header: "Categoría", render: (row) => row.catalog_name ?? "",},
    {
      key: "base_price",
      header: "Precio",
      render: (row) => `Q${Number(row.base_price ?? 0).toFixed(2)}`,
    },
    { key: "status", header: "Estado", render: (row) => row.status ?? "",},
    { key: "stock", header: "Stock" },
    {
      key: "actions",
      header: "Acciones",
      render: (row) => (
        <div className="category-action-cell">
          <button className="category-action-btn category-action-btn--edit" onClick={() => openEdit(row)}>editar</button>
        </div>
      ),
    },
  ];



  return (
    <section className="admin-module" aria-labelledby="products-title">
      {/**header */}
      <header className="admin-module__header">
        <div className="admin-module__titles">
          <p className="admin-module__eyebrow">Administración</p>
          <h1 id="products-title" className="admin-module__title">
            Productos
          </h1>
        </div>
        <div className="admin-module__actions">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSearch={() => {}}
            placeholder="Buscar…"
            buttonText="Buscar"
          />
        </div>
      </header>

      <Table data={tableData} columns={columns} keyField="id" emptyMessage="No hay productos." itemsPerPage={10}/>

      {/**model para editar */}
      {(mode === "edit") && (
        <Modal
        title={`Editar producto ${form.name}`}
        onClose={() => setMode(null)}
        onConfirm={handleSave}
        confirmDisabled={!form.name.trim()}
        >
          <FormField label="catalog" name="categoria">
            <Select value={form.catalog} onChange={set('catalog')}>
              <option value="">Seleccione una categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="precio (Q)" name="price">
            <Input type="number" min="0" step="0.01" value={form.base_price} onChange={set('base_price')} />
          </FormField>
          <FormField label="stock" name="stock">
            <Input type="number" min="0" step="0.01" value={form.stock} onChange={set("stock")} />
          </FormField>
          <FormField label="Estado" name="status">
            <Select value={form.status} onChange={set("status")}>
              <option value="activo">Activo</option>
              <option value="agotado">Agotado</option>
              <option value="inactivo">Inactivo</option>
            </Select>
          </FormField>
        </Modal>
      )}
    </section>
  );
};