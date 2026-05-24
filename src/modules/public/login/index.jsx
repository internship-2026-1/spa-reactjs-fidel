/**
 * mi login principal
 */
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  FormField,
  Input,
  Text,
  RadioButton,
} from "lib-components-react";
import { useAuth } from "../../../context/AuthContext";
import React from "react";
import "../login/login.css";
import { useState } from "react";
//
import { config } from "../../../config";
import { apiService } from "../../../services";
import { sessionStorageService } from "../../../services";

export default function Login() {
  const urlEndpoint = "auth/login/";

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const { loginCTX } = useAuth();
  //const [emailValue, setEmailValue] = useState("");
  const [value, setValue] = useState("");

  //debug concola
  const handlerValue = (e) => {
    console.log(e);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await apiService.post(
        `${config.appURLusers}${urlEndpoint}`,
        payload,
      );

      const accessToken = response.body?.access;
      const refreshToken = response.body?.refresh;
      const userData = response.body?.user;

      sessionStorageService.set("token", accessToken);
      sessionStorageService.set("refreshToken", refreshToken);
      sessionStorageService.set("user", {
        email: data.email,
        role: userData.role,
        name: userData.first_name,
      });

      if (!userData) {
        throw new Error("El backend no está enviando los datos del usuario");
      }

      //loginCTX(
      //  {
      //    email: data.email,
      //    role: userData.role,
      //    name: userData.first_name,
      //  },
      //  accessToken,
      //  refreshToken,
      //);

      loginCTX(userData, accessToken, refreshToken);

      //navigate("/dashboard");
      navigate(from, { replace: true });
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Credenciales inválidas",
      });
      alert(error.message || "error en el inicio de sesion");
    }
  };

  return (
    <main className="login-page">
      {/**bloque images */}
      <section className="login-page__image">
        <div className="login-image__content">
          <div className="login-image__brand">
            <Text variant="HeadlineLarge" color="white">
              TECHSPEC
            </Text>
          </div>

          <div className="login-image__center">
            <Text variant="DisplayLarge" color="white">
              Ingenieria para el redimiento extremo.
            </Text>

            <Text variant="BodyLarge" color="white">
              Accede a tu panel de configuracion tecnica y gestiona tus
              componentes con presicion quirurgica
            </Text>
          </div>

          <div className="login-image__footer">
            <Text variant="LabelLarge" color="white">
              CONTROL TOTAL
            </Text>

            <Text variant="LabelLarge" color="white">
              |
            </Text>

            <Text variant="LabelLarge" color="white">
              ALTA VELOCIDAD
            </Text>
          </div>
        </div>
      </section>

      {/**bloque input */}

      <section className="login-page__form">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-text-header">
            <Text variant="HeadlineLarge">Iniciar Sesión</Text>
            <Text variant="BodyLarge">
              Introduce tus credenciales para acceder a tu cuenta profesional.
            </Text>
          </div>

          {errors.root?.message ? (
            <p className="login-page__error" role="alert">
              {errors.root.message}
            </p>
          ) : null}

          <FormField
            label="Correo Electrónico"
            name="email"
            error={errors.email?.message ?? null}
          >
            <div className="input-with-icon">
              <span className="input-with-icon__icon">✉</span>
              <Input
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                error={errors.email?.message ?? null}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un email válido",
                  },
                })}
              />
            </div>
          </FormField>

          <FormField
            label="Contraseña"
            name="password"
            error={errors.password?.message ?? null}
          >
            <div className="login-password-header">
              <Link to="/register">¿Olvidaste tu contraseña?</Link>
            </div>

            <div className="input-with-icon">
              <span className="input-with-icon__icon">=</span>
              <Input
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                error={errors.password?.message ?? null}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />
            </div>
          </FormField>

          <div className="remember-session">
            <RadioButton
              value="std"
              checked={value === "std"}
              onChange={(e) => setValue(e.target.value)}
            />
            <span>Mantener sesión iniciada</span>
          </div>

          <Button
            type="submit"
            size="full"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar al sistema →"}
          </Button>

          <div className="login-divider">
            <span></span>
            <Text variant="LabelLarge">O CONTINUAR CON</Text>
            <span></span>
          </div>

          <div className="login-social-options">
            <button type="button" className="login-social-button">
              google
            </button>

            <button type="button" className="login-social-button">
              ssh key
            </button>
          </div>

          <div className="login-register-link">
            <span>¿No tienes una cuenta?</span>
            <Link to="/register">Solicitar acceso</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
