import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Text,
  FormField,
  Input,
  RadioButton,
} from "lib-components-react";
import {
  selectStep,
  selectShipping,
  selectPayment,
  selectPendingOrderId,
  nextStep,
  prevStep,
  updateShipping,
  updatePayment,
  setPendingOrderId, createCheckoutSession
} from "../../../store/slices/checkoutSlice";
import {
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
} from "../../../store/slices/cartSlice";
import { createOrder } from "../../../store/slices/ordersSlice";
import { useAuth } from "../../../context/AuthContext";
import "./checkout.css";

const SHIPPING_OPTIONS = {
  express: {
    label: "Envío Express",
    description: "1-2 días hábiles",
    cost: 15,
  },
  standard: { label: "Estándar", description: "3-5 días hábiles", cost: 0 },
};

function formatCurrency(amount) {
  return `Q${Number(amount ?? 0).toFixed(2)}`;
}

//----------------------------------------------

//---------------------------------------

/* ── Step indicator ── */
function StepIndicator({ step }) {
  const steps = ["Envío", "Pago"];
  return (
    <div className="step-indicator">
      {steps.map((label, i) => {
        const num = i + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={num} className="step-indicator__item">
            <div
              className={`step-indicator__circle${active ? " step-indicator__circle--active" : ""}${done ? " step-indicator__circle--done" : ""}`}
            >
              {done ? "✓" : num}
            </div>
            <span
              className={`step-indicator__label${active ? " step-indicator__label--active" : ""}`}
            >
              {label}
            </span>
            {i < steps.length - 1 && <div className="step-indicator__line" />}
          </div>
        );
      })}
    </div>
  );
}

/* ── Order summary (right panel) ── */
function OrderSummary() {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const { method } = useSelector(selectShipping);
  const shippingCost = SHIPPING_OPTIONS[method].cost;
  const tax = subtotal * 0.16;
  const total = subtotal + shippingCost + tax;

  return (
    <aside className="checkout-summary">
      <Text variant="HeadlineMedium">Resumen de Orden</Text>

      <ul className="checkout-summary__items">
        {items.map((item) => (
          <li key={item.id} className="checkout-summary__item">
            <div className="checkout-summary__item-img-wrap">
              <img src={item.image} alt={item.name} />
              <span className="checkout-summary__item-qty">
                {item.quantity}
              </span>
            </div>
            <div className="checkout-summary__item-info">
              <span className="checkout-summary__item-name">{item.name}</span>
              {item.tags && (
                <span className="checkout-summary__item-tags">
                  {item.tags.slice(0, 2).join(" · ")}
                </span>
              )}
            </div>
            <span className="checkout-summary__item-price">
              {formatCurrency(item.price)}
            </span>
          </li>
        ))}
      </ul>

      <div className="checkout-summary__rows">
        <div className="checkout-summary__row">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="checkout-summary__row">
          <span>Envío</span>
          <span className={shippingCost === 0 ? "checkout-summary__free" : ""}>
            {shippingCost === 0 ? "Gratis" : formatCurrency(shippingCost)}
          </span>
        </div>
        <div className="checkout-summary__row">
          <span>Impuestos (IVA 16%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="checkout-summary__total">
        <span>Total</span>
        <span className="checkout-summary__total-price">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="checkout-summary__discount">
        <input
          className="checkout-summary__discount-input"
          type="text"
          placeholder="Código de descuento"
        />
        <button className="checkout-summary__discount-btn">Aplica</button>
      </div>

      <div className="checkout-summary__ssl">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <span>Pago seguro encriptado con tecnología SSL de 256 bits.</span>
      </div>
    </aside>
  );
}

/* ── Step 1: Shipping ── */
function ShippingStep() {
  const dispatch = useDispatch();
  const shipping = useSelector(selectShipping);

  return (
    <div className="checkout-form">
      <Text variant="HeadlineMedium">Dirección de Envío</Text>

      <div className="checkout-form__grid-2">
        <FormField label="Nombre completo" name="fullName">
          <Input
            name="fullName"
            placeholder="Ej. Juan Pérez"
            changeValue={(v) => dispatch(updateShipping({ fullName: v }))}
          />
        </FormField>
        <FormField label="Correo electrónico" name="email">
          <Input
            name="email"
            type="email"
            placeholder="juan@techspec.com"
            changeValue={(v) => dispatch(updateShipping({ email: v }))}
          />
        </FormField>
      </div>

      <FormField label="Dirección de la calle" name="address">
        <Input
          name="address"
          placeholder="Av. Insurgentes Sur 123"
          changeValue={(v) => dispatch(updateShipping({ address: v }))}
        />
      </FormField>

      <div className="checkout-form__grid-3">
        <FormField label="Ciudad" name="city">
          <Input
            name="city"
            changeValue={(v) => dispatch(updateShipping({ city: v }))}
          />
        </FormField>
        <FormField label="Estado / Provincia" name="state">
          <Input
            name="state"
            changeValue={(v) => dispatch(updateShipping({ state: v }))}
          />
        </FormField>
        <FormField label="Código Postal" name="zip">
          <Input
            name="zip"
            changeValue={(v) => dispatch(updateShipping({ zip: v }))}
          />
        </FormField>
      </div>

      <div className="checkout-form__section-title">Método de Envío</div>
      <div className="checkout-form__shipping-options">
        {Object.entries(SHIPPING_OPTIONS).map(([key, opt]) => (
          <label
            key={key}
            className={`shipping-option${shipping.method === key ? " shipping-option--active" : ""}`}
          >
            <RadioButton
              name="shippingMethod"
              value={key}
              checked={shipping.method === key}
              onChange={() => dispatch(updateShipping({ method: key }))}
            />
            <div className="shipping-option__info">
              <span className="shipping-option__label">{opt.label}</span>
              <span className="shipping-option__desc">{opt.description}</span>
            </div>
            <span className="shipping-option__price">
              {opt.cost === 0 ? "Gratis" : formatCurrency(opt.cost)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: Payment ── */
// este formulario es temporal; luego se reemplaza por stripe checkout
function PaymentStep() {
  const dispatch = useDispatch();

  return (
    <div className="checkout-form">
      <Text variant="HeadlineMedium">Datos de Pago</Text>

      <FormField label="Número de tarjeta" name="cardNumber">
        <Input
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          changeValue={(v) => dispatch(updatePayment({ cardNumber: v }))}
        />
      </FormField>

      <FormField label="Nombre en la tarjeta" name="cardName">
        <Input
          name="cardName"
          placeholder="Juan Pérez"
          changeValue={(v) => dispatch(updatePayment({ cardName: v }))}
        />
      </FormField>

      <div className="checkout-form__grid-2">
        <FormField label="Fecha de vencimiento" name="expiry">
          <Input
            name="expiry"
            placeholder="MM / AA"
            changeValue={(v) => dispatch(updatePayment({ expiry: v }))}
          />
        </FormField>
        <FormField label="CVV" name="cvv">
          <Input
            name="cvv"
            placeholder="•••"
            changeValue={(v) => dispatch(updatePayment({ cvv: v }))}
          />
        </FormField>
      </div>
    </div>
  );
}

/* ── Main checkout ── */
export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  //validar porque no me acepta el jwt
  //const { user } = useAuth();
  console.log("USUARIO LOGUEADO:", user);

  const step = useSelector(selectStep);
  const shipping = useSelector(selectShipping);
  const subtotal = useSelector(selectCartSubtotal);
  const cartCount = useSelector(selectCartCount);
  const items = useSelector(selectCartItems);
  const pendingOrderId = useSelector(selectPendingOrderId);

  const shippingCost = SHIPPING_OPTIONS[shipping.method]?.cost ?? 0;
  const tax = subtotal * 0.16;
  const total = subtotal + shippingCost + tax;

  // crea la orden en backend usando los productos del carrito
  const handleNext = async () => {
    if (!user?.id) {
      alert("Debes iniciar sesión para continuar con el pago");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    console.log("DATA ENVIO:", shipping);
    console.log("DATA CARRITO:", items);
    console.log("CUSTOMER_ID:", user.id);

    const result = await dispatch(
      createOrder({
        customer_id: user.id,
        items: items.map((item) => ({
          product_sku: item.sku,
          quantity: item.quantity,
        })),
      }),
    ).unwrap();

    dispatch(setPendingOrderId(result.id));
    dispatch(nextStep());
  };

  // por ahora solo simula el pago y redirige a exito
  const handlePay = async () => {
    const result = await dispatch(createCheckoutSession(pendingOrderId)).unwrap();

    if (result?.checkout_url) {
      window.location.href = result.checkout_url;
    }
  };

  return (
    <div className="checkout">
      <StepIndicator step={step} />

      <div className="checkout__body">
        <div className="checkout__left">
          {step === 1 ? <ShippingStep /> : <PaymentStep />}

          <div className="checkout__actions">
            {step === 1 ? (
              <Link to="/cart" className="checkout__back-link">
                ← Volver al carrito
              </Link>
            ) : (
              <button
                className="checkout__back-link"
                onClick={() => dispatch(prevStep())}
              >
                ← Volver al envío
              </button>
            )}

            {step === 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Continuar al Pago
              </Button>
            ) : (
              <Button variant="primary" iconName="Lock" onClick={handlePay}>
                Pagar
              </Button>
            )}
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
