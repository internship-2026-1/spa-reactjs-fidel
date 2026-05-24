/**
 * /home
 */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Text, Button, CardGrid, Card} from "lib-components-react"
import { selectActiveCategory } from "../../../store/slices/homeSlice"
import { addItem } from "../../../store/slices/cartSlice"
import './home.css'
//import slice de productos
import { selectProducts, fetchProducts } from '../../../store/slices/productsSlice'

//filtrar
const CATEGORAS = ['Todos', 'Tarjeta Gráfica', 'Procesadores', 'Disco Duro', 'Herramientas']


export default function Home(){
    const dispatch = useDispatch();

    const activeCategory = useSelector(selectActiveCategory);
    
    //selector de productsSlice
    const productos = useSelector(selectProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    //mapper
    const productosHome = productos.map((product) => ({
      id: product.id,
      sku: product.sku,
      title: product.name,
      description: product.description || "Producto tecnologico disponible en TECHSPEC.",
      image:
        product.images?.[0] ||
        "https://placehold.co/600x400/0d1117/ffffff?text=TECHSPEC",
      badge: product.catalog_name || "TECHSPEC",
      tags: [
        product.sku,
        product.status || "activo",
        `Stock ${product.stock ?? 0}`,
      ],
      price: `Q${Number(product.base_price ?? 0).toFixed(2)}`,
      raw: product,
    }));

    return(
        <div className="home">
            <section className="home__hero">
                <div className="home__hero-content">
                    <span className="home__hero-badge">
                        <Text variant="LabelLarge">NUEVO</Text>
                    </span>
                    
                        <Text variant="DisplayLarge">Ingeniería al Límite.</Text>
                        <Text variant="BodyLarge">
                            Presentamos la nueva serie de procesadores y GPUs optimizados para estaciones de trabajo de alto rendimiento.
                        </Text>

                        <Button variant="primary" iconName="Arrow">
                            <Text variant="BodyLarge">Explorar Catálogo</Text>
                        </Button>
                </div>
                <div className="home__hero-image">
                    <img src="https://placehold.co/480x300/0d1117/00d4ff?text=GPU"
                    alt="GPU de alto rendimiento"
                    />
                </div>
            </section>

            <section className="home__filters">
                <div className="home__filter-tabs">
                    {CATEGORAS.map((cat) =>(
                        <button
                        key={cat}
                        className={`home__filter-btn${activeCategory === cat ? ' home__filter-btn--active' : ''}`}
                        onClick={() => dispatch(setActiveCategory(cat))}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <span className="home__sort">
                Ordenar por · <strong>Más vendidos</strong>
                </span>
            </section>

            <section className="home__products">
                        <CardGrid columns={4} gap={20}>
          {productosHome.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              imageAlt={product.title}
              badge={product.badge}
              title={
                <Link to={`/product/${product.id}`} className="home__card-link">
                  {product.title}
                </Link>
              }
              description={product.description}
              tags={product.tags}
              footer={
                <div className="home__card-footer">
                  <span className="home__price">{product.price}</span>
                  <Button
                    variant="primary"
                    iconName="Cart"
                    size="sm"
                    onClick={() => dispatch(addItem({
                        id: product.id,
                        sku: product.sku,
                        name: product.title,
                        price: Number(product.raw.base_price ?? 0),
                        image: product.image
                    }))}
                  >
                    Agregar
                  </Button>
                </div>
              }
            />
          ))}
        </CardGrid>
            </section>
        </div>
    )
}

