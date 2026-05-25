import { Link } from "react-router-dom";
import { Button, Text } from "lib-components-react";
import "./promotions.css";

// imagenes locales 
import promoLaptop from "../../../assets/images/laptop2.png";
import promoKeyboard from "../../../assets/images/keyboard.png";
import promoSetup from "../../../assets/images/setup.png";

const PROMOTIONS = [
  {
    id: 1,
    title: "Combo Gamer Inicial",
    description: "Teclado mecanico, mouse RGB y audifonos para iniciar tu setup.",
    discount: "15% OFF",
    image: promoKeyboard,
    validUntil: "Valido hasta agotar existencia",
  },
  {
    id: 2,
    title: "Laptop para Desarrollo",
    description: "Equipos ideales para programacion, bases de datos y virtualizacion.",
    discount: "10% OFF",
    image: promoLaptop,
    validUntil: "Promocion semanal",
  },
  {
    id: 3,
    title: "Setup Profesional",
    description: "Componentes seleccionados para mejorar rendimiento y productividad.",
    discount: "20% OFF",
    image: promoSetup,
    validUntil: "Solo por tiempo limitado",
  },
];

export default function Promotions() {
  return (
    <main className="promotions">
      <section className="promotions__header">
        <Text variant="HeadlineLarge">Promociones</Text>
        <Text variant="BodyLarge">
          Ofertas demo disponibles para productos seleccionados de TECHSPEC.
        </Text>
      </section>

      <section className="promotions__grid">
        {PROMOTIONS.map((promo) => (
          <article key={promo.id} className="promotions__card">
            <div className="promotions__image-wrap">
              <img src={promo.image} alt={promo.title} />
              <span className="promotions__badge">{promo.discount}</span>
            </div>

            <div className="promotions__content">
              <Text variant="HeadlineMedium">{promo.title}</Text>
              <Text variant="BodyLarge">{promo.description}</Text>

              <p className="promotions__valid">{promo.validUntil}</p>

              <Link to="/home">
                <Button variant="primary">Ver productos</Button>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}