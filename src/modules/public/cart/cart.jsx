import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Text, InfoCard, Sumador } from "lib-components-react";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeItem,
} from "../../../store/slices/cartSlice";
import {
  TrashIcon,
  GridIcon,
  TruckIcon,
  CardPayIcon,
  BankIcon,
  ShieldIcon,
} from "../../../components";
import "./cart.css";

//impuesto 
const TAX_RATE = 0.16;

function formatCurrency(amount) {
    return `Q${Number(amount ?? 0).toFixed(2)}`;
  //return `€${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  //return `Q${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function Cart() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const items = useSelector(selectCartItems)
    const subtotal = useSelector(selectCartSubtotal)
    
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax


  return(
    <div className="cart">
        <Text variant="HeadlineLarge">Tus compras ...</Text>

        <div className="cart__body">
            
            <div className="cart__left">
                {items.length === 0 && (
                    <div className="cart__empty">
                        <GridIcon />
                        <Text variant="BodyLarge">ho.! Tu carrito está vacío.</Text>
                        <Link to='/home' className="cart__cta-link">
                        Ir al catalogo?
                        </Link>
                    </div>
                )}

                {items.map((item) => (
                    <div key={item.id} className="cart__item">
                        <img className="cart__item-image"
                        src={item.image} 
                        alt={item.name} 
                        />

                        <div className="cart__item-info">
                            <span className="cart__item-name">{item.name}</span>
                            {item.tags && (
                                <div className="cart__item-tags">
                                    {item.tags.slice(0,2).map((tag) => (
                                        <span key={tag} className="cart__item-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="cart__item-right">
                            <span className="cart__item-price">{formatCurrency(item.price)}</span>
                            <Sumador 
                            value={item.quantity}
                            min={1}
                            max={99}
                            onChange={(AA) => 
                                dispatch(updateQuantity({id: item.id, quantity: AA}))
                            }
                            />

                            <button 
                            className="cart__item-remove"
                            onClick={() => dispatch(removeItem(item.id))}
                            >
                                <TrashIcon />
                                Eliminar?
                                
                            </button>
                        </div>
                    </div>
                ))}

                <div className="cart__cta">
                    <GridIcon />
                    <p className="cart__cta-text">
                        ¿Buscas algo más? Explora nuestros componentes certificados.
                    </p>

                    <Link to="/home" className="cart__cta-link">
                    continuar comprando 
                    </Link>
                </div>
            </div>

            <div className="cart__summary">
                <Text variant="HeadlineMedium">Resumen del Pedido</Text>

                <div className="cart__summary-rows">

                    <div className="cart__summary-row">
                        <span>Subtotal ({items.length} producto{items.length !== 1 ? 's' : ''})</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="cart__summary-row">
                        <span>Envío estimado</span>
                        <span className="cart__summary-free">Gratis</span>
                    </div>

                    <div className="cart__summary-row">
                        <span>Impuestos (IVA 16%)</span>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                </div>

                <hr className="cart__divider" />

                <div className="cart__total">
                    <Text variant="HeadlineMedium">Total</Text>
                    <span className="cart__total-price">{formatCurrency(total)}</span>
                </div>

                <div className="cart__summary-actions">
                    <Button variant="primary"
                    size="full"
                      onClick={() => {
                    if (items.length === 0) {
                      alert("No puedes ingresar, tu carrito está vacío. Sigue comprando.");
                      navigate("/home");
                      return;
                    }
                
                    navigate("/checkout");
                  }}>
                        pagar
                    </Button>

                    <Button 
                    variant="secondary" 
                    size="full"
                    onClick={() => navigate('/home')}>
                        guardar para despues.!
                    </Button>
                </div>

                <InfoCard 
                icon={<TruckIcon />}
                title="Entrega a propietario"
                description="recibe tu producto en 24-48 horas abiles con muestra logistica de precisio."
                />

                <div className="cart__trust">
                    <CardPayIcon />
                    <BankIcon />
                    <ShieldIcon />

                </div>

            </div>
        </div>
    </div>
  )
}
