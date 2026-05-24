/**
 * formulario usuarios
 */
//1.
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Button, SearchBar, Text, FormField, Input, Select } from "lib-components-react"
import { Modal } from "../../../components/modal/modal"
import { selectUsers, selectUsersLoading, selectUsersError, fetchUsers, createUsers, patchUser } from "../../../store/slices/usersSlice"
import './users.jsx'
import '../adminPrivate.css'

//2.
const EMPTY_FORM = { first_name: "", last_name: "", password: "", email: "", phone: "", role: "", status: "activo"}

export default function Users() {
    const dispatch = useDispatch();

    //3.
    const usuario = useSelector(selectUsers);
    const ejecutando = useSelector (selectUsersLoading);
    const error = useSelector(selectUsersError);

    //4.
    const [mode, setMode] = useState(null);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    //5.
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    //6
    const openCreate = () => {
        setForm(EMPTY_FORM);
        setSelected(null);
        setMode("create");
    };
    const openEdit = (use) => {
        setSelected(use);
        setForm({
            first_name: use.first_name ?? "",
            last_name: use.last_name ?? "",
            email: use.email ?? "",
            password: "",
            role: use.role ?? "",
            status: use.status ?? "",
        });
        setMode('edit');
    };
    const openDelete = (use) => {
        setSelected(use);
        setMode('delete');
    };

    //7.
    const [query, setQuery] = useState("");

    //8.
    const filtered = usuario.filter((u) => {
        const q = query.toLowerCase();

        return (
            (u.first_name ?? "").toLowerCase().includes(q) ||
            (u.last_name ?? "").toLowerCase().includes(q) ||
            (u.email ?? "").toLowerCase().includes(q) ||
            (u.role ?? "").toLowerCase().includes(q) ||
            (u.status ?? "").toLowerCase().includes(q) ||
            (u.created_at ?? "").toLowerCase().includes(q) ||
            (u.date_joined ?? "").toLowerCase().includes(q)
        );
    });

    //9. campo visual para la tabla
    const tableData = filtered.map((user, index) => ({
        ...user,
        numero: index + 1,
    }));

    //10
    const handleSave = async () => {
        if (mode === "create" ){
            await dispatch(
                createUsers({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    password: form.password,
                    phone: form.phone,
                    role: form.role  || "b2c",
                    status: form.status  || "activo",
                })
            );

            //resolviendo bug del back 
            await dispatch(fetchUsers());
        };

        if ( mode === "edit" ){
            await dispatch(
                patchUser({
                    id: selected.id,
                    data: {
                        role: form.role,
                        status: form.status,
                    },
                }),
            );

            await dispatch(fetchUsers());
        };

        setMode(null);
    };

    //11.
    const handleDelete = () => {
        dispatch(selectUsers);
    };

    //12.
    const set = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };
    

    //13.
    const columns = [
        { key: "numero", header: "No." },
        { key: "first_name", header: "Nombre" },
        {key: "email", header: "Email" },
        {key: "role", header: "Role" },
        {key: "status", header: "Estado" },
        {
          key: "created_at",
          header: "Alta",
          render: (row) => {
            const fecha = row.created_at ?? row.date_joined;
            return fecha ? new Date(fecha).toLocaleDateString() : "";
          },
        },
        {key: "actions", header: "Aciones", render: (row) => (
            <div className="category-action-cell">
                <button className="category-action-btn category-action-btn--edit"
                onClick={() => openEdit(row)}
                >
                    editar
                </button>
                <button className="category-action-btn category-action-btn--danger"
                onClick={() => openDelete(row)}
                >
                    eliminar
                </button>
            </div>
        )},
    ]


    return (
        <section className="admin-module" aria-labelledby="users-title">
            <header className="admin-module__header">
                <div className="admin-module__titles">
                    <p className="admin-module__eyebrow">Administración</p>
                    <h1 id="users-title" className="admin-module__title">Usuarios</h1>
                </div>

                <div className="admin-module__actions">
                    <SearchBar query={query} onQueryChange={setQuery} onSearch={() => {}} placeholder="Buscar…" buttonText="Buscar" />
                    <Button variant="primary" onClick={openCreate}>Nuevo usuario</Button>
                </div>
            </header>

            <Table 
            data={tableData}
            columns={columns}
            keyField="id"
            emptyMessage="No hay usuarios."
            itemsPerPage={10}
            />

            {/** modal pora crear*/}
            {(mode === "create") && (
                <Modal
                title={
                     "Nuevo usuario"
                }
                onClose={() => setMode(null)}
                onConfirm={handleSave}
                confirmDisabled={
                  !form.first_name.trim() ||
                  !form.last_name.trim() ||
                  !form.email.trim() ||
                  !form.password.trim() ||
                  !form.phone.trim()
                }
                >
                    <FormField label="Nombre" name="name">
                        <Input 
                        type="text"
                        value={form.first_name}
                        onChange={set("first_name")}
                        placeholder="ej. juam"
                        />
                    </FormField>
                    <FormField label="apellido" name="last_name">
                        <Input 
                        type="text"
                        value={form.last_name}
                        onChange={set("last_name")}
                        placeholder="ej. perez"
                        />
                    </FormField>

                    <FormField label="email" name="email">
                        <Input 
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="user@gmail.com"
                        />
                    </FormField>

                    <FormField label="password" name="password">
                        <Input 
                        type="password"
                        value={form.password}
                        onChange={set("password")}
                        placeholder="micontrasena123"
                        />
                    </FormField>

                    <FormField label="telefono" name="phone">
                      <Input
                        type="text"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="45454545"
                      />
                    </FormField>


                    <FormField label="role" name="rol">
                        <Select value={form.role} onChange={set('role')}>
                            <option value="b2c">b2c</option>
                            <option value="b2b">2b2</option>
                            <option value="admin">admin</option>                            
                       </Select>
                    </FormField>
                    <FormField label="estado" name="status">
                        <Select value={form.status} onChange={set('status')}>
                            <option value="activo">activo</option>
                            <option value="inactivo">inactivo</option>
                        </Select>
                    </FormField>
                </Modal>
            )}

            {/**modal para editar */}
            {(mode === "edit") && (
                <Modal
                title={
                     `Editar a ${form.first_name}?`
                }
                onClose={() => setMode(null)}
                onConfirm={handleSave}
                confirmDisabled={!form.first_name.trim()}
                >
                    <FormField label="Nombre" name="name">
                        <Input 
                        type="text"
                        value={form.first_name}
                        onChange={set("first_name")}
                        disabled={true}
                        />
                    </FormField>

                    <FormField label="role" name="rol">
                        <Select value={form.role} onChange={set('role')}>
                            <option value="b2c">b2c</option>
                            <option value="b2b">2b2</option>
                            <option value="admin">admin</option>                            
                       </Select>
                    </FormField>
                    <FormField label="estado" name="status">
                        <Select value={form.status} onChange={set('status')}>
                            <option value="activo">activo</option>
                            <option value="inactivo">inactivo</option>
                        </Select>
                    </FormField>
                </Modal>
            )}

            {/**modal para eliminar */}
            {mode === "delete" && (
                <Modal
                title="Eliminar Usuario?"
                onClose={() => setMode(null)}
                onConfirm={handleDelete}
                confirmLabel="Eliminar"
                >
                    <p style={{ margin: 0, color: "var(--text)" }}>
                        Eliminar? <strong>{selected?.first_name}</strong>? Esta accion no se puede hacer.!
                    </p>
                </Modal>
            )}
        </section>
    )
}

//