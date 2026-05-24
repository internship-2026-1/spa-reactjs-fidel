import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormField,
  Input,
  Text,
  RadioButton,
} from "lib-components-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./register.css";
//
import { apiService } from "../../../services/api/ApiService";
import { config } from "../../../config";

export default function Register() {
  //url de la peticion apunta al back
  const urlEndpoint = 'register/'

  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload ={
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
      }

      const response = await apiService.post(
        `${config.appURLusers}${urlEndpoint}`,
        payload
      );

      console.log("CREADO: ", response)
      alert(response.message || "Usuario creado correctamente");
      navigate("/dashboard");


    } catch (error) {
      alert(JSON.stringify(error.data || error.message));
      const backError = error.data?.body;

      if(backError){
        Object.entries(backError).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });

        alert(error.message || "Error al crear usuario");
        return;
      }

      setError('root', {
        type: "server",
        message: error.message || "error cuadno se crea el usuario: ",
      });
    };
  };

  return (
    <main className="register-page">
      <section className="register-card">
        <section className="register-card__left">
        <div className="register-card__info">
          <div className="register-info__content">
            <Text variant="DisplayLarge" color="white">
              Potencia tu ingeniería.
            </Text>

            <Text variant="BodyLarge" color="white">
              Únete a la comunidad de élite para entusiastas del hardware y
              profesionales del rendimiento técnico.
            </Text>

            <div className="register-info__item">
              <Text variant="HeadlineMedium" color="white">
                Configuraciones de Vanguardia
              </Text>
              <Text variant="BodyLarge" color="white">
                Acceso a las especificaciones más recientes.
              </Text>
            </div>

            <div className="register-info__item">
              <Text variant="HeadlineMedium" color="white">
                Optimización Extrema
              </Text>
              <Text variant="BodyLarge" color="white">
                Herramientas de análisis para benchmarking.
              </Text>
            </div>
          </div>
        </div>

        <div className="register-card__blank"></div>

        </section>

        <section className="register-card__form">
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="register-form__header">
              <Text variant="HeadlineLarge">Crear cuenta</Text>
              <Text variant="BodyLarge">
                Ingresa tus datos para comenzar tu experiencia técnica.
              </Text>
            </div>

            <div className="register-form__row">
              <FormField
                label="Nombre"
                name="name"
                error={errors.name?.message ?? null}
              >
                <Input
                  name="name"
                  placeholder="Ej. Juan"
                  error={errors.name?.message ?? null}
                  {...register("first_name", {
                    required: "El nombre es obligatorio",
                  })}
                />
              </FormField>

              <FormField
                label="Apellido"
                name="lastName"
                error={errors.lastName?.message ?? null}
              >
                <Input
                  name="lastName"
                  placeholder="Ej. Pérez"
                  error={errors.lastName?.message ?? null}
                  {...register("last_name", {
                    required: "El apellido es obligatorio",
                  })}
                />
              </FormField>
            </div>

            {/** */}
            <FormField
            label="Telefono"
            name="phone"
            error={errors.phone?.message ?? null}
            >
              <Input 
              name="phone"
              placeholder="+502"
              error={errors.phone?.message ?? null}
              {...register("phone",{
                required: "El numero debe ser obligatorio",
              })}
              />
            </FormField>

            <FormField
              label="Correo Electrónico"
              name="email"
              error={errors.email?.message ?? null}
            >
              <Input
                name="email"
                type="email"
                placeholder="usuario@techspec.com"
                error={errors.email?.message ?? null}
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo válido",
                  },
                })}
              />
            </FormField>

            <FormField
              label="Contraseña"
              name="password"
              error={errors.password?.message ?? null}
            >
              <Input
                name="password"
                type="password"
                placeholder="********"
                error={errors.password?.message ?? null}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "Mínimo 8 caracteres",
                  },
                })}
              />
              <p className="register-form__hint">
                Mínimo 8 caracteres, incluyendo un número.
              </p>
            </FormField>

            <div className="register-form__terms">
              <RadioButton
                value="std"
                checked={value === "std"}
                onChange={(e) => setValue(e.target.value)}
              />

              <Text variant="LabelLarge">
                Acepto los <Link to="/terminos">Términos de Servicio</Link> y
                la <Link to="/politica">Política de Privacidad</Link> de
                TECHSPEC.
              </Text>
            </div>

            <Button
              type="submit"
              size="full"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Registrar Cuenta →"}
            </Button>

            <div className="register-form__login">
              <Text variant="LabelLarge">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login">Inicia sesión aquí</Link>
              </Text>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}