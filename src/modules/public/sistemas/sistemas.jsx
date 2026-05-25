import { Link } from "react-router-dom";
import { Text } from "lib-components-react";
import "./sistemas.css";

const SISTEMAS = [
  {
    id: 1,
    title: "Sistemas Gamer",
    description: "Equipos y componentes para alto rendimiento en juegos, streaming y entretenimiento.",
    tag: "Alto rendimiento",
  },
  {
    id: 2,
    title: "Sistemas para Programación",
    description: "Laptops, monitores, teclados y accesorios pensados para desarrollo de software.",
    tag: "Desarrollo",
  },
  {
    id: 3,
    title: "Sistemas Empresariales",
    description: "Soluciones para oficina, servidores, almacenamiento y redes empresariales.",
    tag: "Empresa",
  },
  {
    id: 4,
    title: "Sistemas de Seguridad",
    description: "Equipos para respaldo eléctrico, protección de datos, redes y monitoreo.",
    tag: "Seguridad",
  },
];

export default function Sistemas() {
  return (
    <main className="sistemas">
      <section className="sistemas__hero">
        <Text variant="LabelLarge">TECHSPEC SYSTEMS</Text>
        <Text variant="DisplayLarge">Soluciones tecnológicas</Text>
        <Text variant="BodyLarge">
          Explora sistemas diseñados para diferentes tipos de usuarios y escenarios tecnológicos.
        </Text>
      </section>

      <section className="sistemas__grid">
        {SISTEMAS.map((sistema) => (
          <article key={sistema.id} className="sistemas__card">
            <span className="sistemas__tag">{sistema.tag}</span>

            <Text variant="HeadlineMedium">{sistema.title}</Text>

            <Text variant="BodyLarge">{sistema.description}</Text>

            <Link to="/home" className="sistemas__link">
              Ver productos
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}