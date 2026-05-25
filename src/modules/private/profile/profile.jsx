/**
 * para editar el perfil usuario
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../adminPrivate.css";
import { Button, Text, Input, FormField } from "lib-components-react";

import {
  fetchUserProfile,
  updateUserProfile,
  selectUserProfile,
  selectUserProfileLoading,
  selectUserProfileError,
  selectUserProfileSuccess,
} from "../../../store/slices/usersSlice";

const initialForm = {
  id: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  phone_number: "",
  country: "",
  role: "",
  status: "",
};

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(selectUserProfile);
  const loading = useSelector(selectUserProfileLoading);
  const error = useSelector(selectUserProfileError);
  const success = useSelector(selectUserProfileSuccess);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm({
        id: profile.id ?? "",
        username: profile.username ?? "",
        email: profile.email ?? "",
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        address: profile.address ?? "",
        phone_number: profile.phone_number ?? "",
        country: profile.country ?? "",
        role: profile.role ?? "",
        status: profile.status ?? "",
      });
    }
  }, [profile]);

  const setValue = (field) => (value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value ?? "",
    }));
  };

  const handleCancel = () => {
    if (!profile) return;

    setForm({
      id: profile.id ?? "",
      username: profile.username ?? "",
      email: profile.email ?? "",
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      address: profile.address ?? "",
      phone_number: profile.phone_number ?? "",
      country: profile.country ?? "",
      role: profile.role ?? "",
      status: profile.status ?? "",
    });
  };

  const handleUpdate = async () => {
    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      address: form.address,
      phone_number: form.phone_number,
      country: form.country,
    };

    await dispatch(updateUserProfile(payload)).unwrap();
    alert("Perfil actualizado correctamente");
  };
//{error ? <p className="dashboard__error">{error}</p> : null}
  return (
    <section className="admin-module" aria-labelledby="profile-title">
      <header className="admin-module__header">
        <div className="admin-module__titles">
          <p className="admin-module__eyebrow">Gestiona tu perfil</p>
          <h1 id="profile-title" className="admin-module__title">
            Ahora puedes administrar tu perfil
          </h1>
        </div>
      </header>

      {loading ? <Text variant="BodyLarge">Cargando perfil...</Text> : null}
      {/**aqui va el manejo de error */}
      {success ? <p className="dashboard__success">{success}</p> : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <FormField label="Username" name="username">
          <Input
            name="username"
            value={form.username}
            disabled
            changeValue={setValue("username")}
          />
        </FormField>

        <FormField label="Correo electrónico" name="email">
          <Input
            name="email"
            type="email"
            value={form.email}
            disabled
            changeValue={setValue("email")}
          />
        </FormField>

        <FormField label="Nombre" name="first_name">
          <Input
            name="first_name"
            value={form.first_name}
            placeholder="Ingresa tu nombre"
            changeValue={setValue("first_name")}
          />
        </FormField>

        <FormField label="Apellido" name="last_name">
          <Input
            name="last_name"
            value={form.last_name}
            placeholder="Ingresa tu apellido"
            changeValue={setValue("last_name")}
          />
        </FormField>

        <FormField label="Dirección" name="address">
          <Input
            name="address"
            value={form.address}
            placeholder="Ingresa tu dirección"
            changeValue={setValue("address")}
          />
        </FormField>

        <FormField label="Teléfono" name="phone_number">
          <Input
            name="phone_number"
            type="tel"
            value={form.phone_number}
            placeholder="+502 0000-0000"
            changeValue={setValue("phone_number")}
          />
        </FormField>

        <FormField label="País" name="country">
          <Input
            name="country"
            value={form.country}
            placeholder="Ingresa tu país"
            changeValue={setValue("country")}
          />
        </FormField>

        <FormField label="Rol" name="role">
          <Input
            name="role"
            value={form.role}
            disabled
            changeValue={setValue("role")}
          />
        </FormField>

        <FormField label="Estado" name="status">
          <Input
            name="status"
            value={form.status}
            disabled
            changeValue={setValue("status")}
          />
        </FormField>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <Button
          variant="secondary"
          size="md"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={handleUpdate}
          disabled={loading}
        >
          Actualizar
        </Button>
      </div>
    </section>
  );
}