import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  FormField,
  Input,
  Select,
  SearchBar,
} from "lib-components-react";
import { Modal } from "../../../components/modal/modal";
import "../adminPrivate.css";
import "./categories.css";

import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
  fetchCategories,
  createCategory,
  patchCategory,
} from "../../../store/slices/categoriesSlice";

//1. define el estado inicial del formulario
const EMPTY_FORM = { name: "", description: "", status: "activo" };

export default function Categories() {
  const dispatch = useDispatch();

  //2. obtiene datos y estados desde redux
  const categorias = useSelector(selectCategories);
  const ejecutando = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);

  //3. controla el modal, la fila seleccionada y el formulario
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  //4. carga las categorias al montar el componente
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  //5. abre los modales segun la accion del usuario
  const openCreate = () => {
    setForm(EMPTY_FORM);
    setSelected(null);
    setMode("create");
  };
  const openEdit = (cat) => {
    setSelected(cat);
    setForm({
      name: cat.name ?? "",
      description: cat.description ?? "",
      status: cat.status ?? "activo",
    });
    setMode("edit");
  };
  const openDelete = (cat) => {
    setSelected(cat);
    setMode("delete");
  };

  //6. controla el texto del buscador
  const [query, setQuery] = useState("");

  //7. filtra categorias segun el texto buscado
  const filtered = categorias.filter((c) => {
    const q = query.toLowerCase();

    return (
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  });

  //8. agrega numero visual sin tocar el id real
  const tableData = filtered.map((cat, index) => ({
    ...cat,
    numero: index + 1,
  }));

  //9. guarda una categoria nueva o actualiza una existente
  const handleSave = async () => {
    if (mode === "create") {
      await dispatch(
        createCategory({
          name: form.name,
          description: form.description,
          status: form.status,
        }),
      );
    }

    if (mode === "edit") {
      await dispatch(
        patchCategory({
          id: selected.id,
          data: {
            name: form.name,
            description: form.description,
            status: form.status,
          },
        }),
      );
    }

    setMode(null);
  };

  //10. ejecuta la accion de eliminar categoria
  const handleDelete = () => {
    dispatch(selectCategories);
  };

  //11. actualiza el campo del formulario que cambia
  const set = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  //12. define las columnas y acciones de la tabla
  const columns = [
    //{ key: "id",            header: "ID"          },
    { key: "numero", header: "No." },
    { key: "name", header: "Nombre" },
    { key: "description", header: "Descripción" },
    { key: "productsCount", header: "Productos" },
    { key: "status", header: "Estado" },
    {
      key: "actions",
      header: "Acciones",
      render: (row) => (
        <div className="category-action-cell">
          <button
            className="category-action-btn category-action-btn--edit"
            onClick={() => openEdit(row)}
          >
            editar
          </button>
          <button
            className="category-action-btn category-action-btn--danger"
            onClick={() => openDelete(row)}
          >
            eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="admin-module" aria-labelledby="categories-title">
      {/**header */}
      <header className="admin-module__header">
        <div className="admin-module__titles">
          <p className="admin-module__eyebrow">Administración</p>
          <h1 id="categories-title" className="admin-module__title">
            Categorías
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
          <Button variant="primary" onClick={openCreate}>
            Nueva categoría
          </Button>
        </div>
      </header>

      {/** filtered */}
      <Table
        data={tableData}
        columns={columns}
        keyField="id"
        emptyMessage="No hay categorías."
        itemsPerPage={10}
      />

      {/**modal crear y editar */}
      {(mode === "create" || mode === "edit") && (
        <Modal
          title={
            mode === "create" ? "Nueva categoria" : `editar: ${selected?.name}`
          }
          onClose={() => setMode(null)}
          onConfirm={handleSave}
          confirmDisabled={!form.name.trim()}
        >
          <FormField label="Nombre" name="name">
            <Input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="ej. categorias"
            />
          </FormField>
          <FormField label="Descripcion" name="description">
            <Input
              type="text"
              value={form.description}
              onChange={set("description")}
              placeholder="Descripcion breve"
            />
          </FormField>
          {/**estado */}
          <FormField label="Estado" name="status">
            <Select value={form.status} onChange={set("status")}>
              <option value="activo">Activa</option>
              <option value="inactivo">Inactiva</option>
            </Select>
          </FormField>
        </Modal>
      )}

      {mode === "delete" && (
        <Modal
          title="Eliminar categoria?"
          onClose={() => setMode(null)}
          onConfirm={handleDelete}
          confirmLabel="Eliminar"
        >
          <p style={{ margin: 0, color: "var(--text)" }}>
            Eliminar? <strong>{selected?.name}</strong>? Esta accion no se puede
            hacer
          </p>
        </Modal>
      )}
    </section>
  );
}

/*
1. imports
2. empty form
3. componente categories
4. dispatch
5. selectors de redux
6. estados locales
7. useeffect para cargar categorias
8. funciones para abrir modales
9. query del buscador
10. filtro de categorias
11. tabledata con numero visual
12. handles de guardar y eliminar
13. funcion set del formulario
14. columnas de la tabla
15. return con header, tabla y modales
*/