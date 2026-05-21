import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const context = useContext(CartContext);
  const navigate = useNavigate();

  const [removingId, setRemovingId] = useState<string>("");

  if (!context) {
    throw new Error("CartContext must be used inside CartProvider");
  }

  const { cart, removeFromCart } = context;

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      ),
    [cart]
  );

  const handleRemove = (id: string): void => {
    setRemovingId(id);

    window.setTimeout(() => {
      removeFromCart(id);
      setRemovingId("");
    }, 220);
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <p className="cart-kicker">Your Cart</p>
          <h1>Your cart is empty</h1>
          <p>Add your favourite YESSIX essentials and come back to checkout.</p>

          <Link className="cart-shop-btn" to="/products">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <p className="cart-kicker">Your Cart</p>
        <h1>Shopping Bag</h1>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cart.map((item) => {
            const product = item.productId;
            const itemTotal = product.price * item.quantity;

            return (
              <article
                key={product._id}
                className={`cart-item ${
                  removingId === product._id ? "is-removing" : ""
                }`}
              >
                <div className="cart-item-image-wrap">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/240x240?text=YESSIX"
                    }
                    alt={product.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-content">
                  <div>
                    <h2>{product.name}</h2>

                    <div className="cart-item-meta">
                      <span>₹{product.price}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>

                  <div className="cart-item-footer">
                    <strong>₹{itemTotal}</strong>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => handleRemove(product._id)}
                      disabled={removingId === product._id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary-row">
            <span>Subtotal</span>
            <strong>₹{total}</strong>
          </div>

          <div className="cart-summary-row">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <button
            type="button"
            className="cart-checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Go to Checkout
          </button>

          <Link className="cart-continue-link" to="/products">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}