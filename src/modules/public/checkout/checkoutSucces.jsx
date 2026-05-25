//checkoutSucces.jsx

// src/modules/public/checkout/CheckoutSuccess.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "lib-components-react";
import "./checkoutSucces.css";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 3000);

    const redirect = setTimeout(() => {
      navigate("/home", { replace: true });
    }, 60000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <main className="checkout-success">
      <section className="checkout-success__card">
        <div className="checkout-success__icon">✓</div>

        <Text variant="HeadlineLarge">Pago realizado correctamente</Text>

        <Text variant="BodyLarge">
          Tu pago fue procesado con Stripe. Estamos preparando el resumen de tu
          pedido.
        </Text>

        <div className="checkout-success__info">
          <span>Serás redirigido automáticamente en:</span>
          <strong>{seconds} segundos</strong>
        </div>

        <div className="checkout-success__actions">
          <Button variant="secondary" onClick={() => navigate("/home")}>
            Ir al home
          </Button>

          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            Ir a mi perfil
          </Button>
        </div>
      </section>
    </main>
  );
}