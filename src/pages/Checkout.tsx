import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

type PaymentType = "upi" | "card" | "cod";

export default function Checkout() {
  const context = useContext(CartContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("CartContext must be used inside CartProvider");
  }

  const { cart, clearCart } = context;

  const [payment, setPayment] = useState<PaymentType>("upi");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      ),
    [cart]
  );

  const discount = subtotal >= 2500 ? 500 : 0;
  const delivery = 0;
  const codFee = payment === "cod" ? 60 : 0;
  const total = subtotal - discount + delivery + codFee;

  const handlePlaceOrder = async (): Promise<void> => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (!fullName.trim() || cleanPhone.length !== 10 || !address.trim()) {
      alert("Please enter your name, valid mobile number, and delivery address");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);

    window.setTimeout(() => {
      localStorage.setItem("phone", cleanPhone);
      setOrderPlaced(true);
      clearCart();
      setIsPlacingOrder(false);
    }, 1400);
  };

  if (orderPlaced) {
    return (
      <main className="checkout-success-page">
        <section className="checkout-success-card">
          <div className="checkout-success-mark">✓</div>
          <p className="checkout-kicker">Order Confirmed</p>
          <h1>Your order has been placed</h1>
          <p>
            We saved your mobile number for order tracking. You can check your
            order status anytime from Track Order.
          </p>

          <div className="checkout-success-actions">
            <button type="button" onClick={() => navigate("/track-order")}>
              Track Order
            </button>

            <button type="button" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout-container">
        <div className="checkout-left">
          <div className="checkout-card">
            <p className="checkout-kicker">Delivery</p>
            <h3>Delivery Address</h3>

            <div className="form-grid">
              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isPlacingOrder}
              />

              <input
                placeholder="Mobile Number"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isPlacingOrder}
              />
            </div>

            <textarea
              placeholder="Complete Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isPlacingOrder}
            />
          </div>

          <div className="checkout-card">
            <p className="checkout-kicker">Payment</p>
            <h3>Payment Method</h3>

            <button
              type="button"
              className={`payment-group ${payment === "upi" ? "active" : ""}`}
              onClick={() => setPayment("upi")}
              disabled={isPlacingOrder}
            >
              <div className="group-header">
                <span>UPI Apps</span>
                <input type="radio" checked={payment === "upi"} readOnly />
              </div>
            </button>

            <button
              type="button"
              className={`payment-group ${payment === "card" ? "active" : ""}`}
              onClick={() => setPayment("card")}
              disabled={isPlacingOrder}
            >
              <div className="group-header">
                <span>Debit / Credit Cards</span>
                <input type="radio" checked={payment === "card"} readOnly />
              </div>
            </button>

            <button
              type="button"
              className={`payment-group ${payment === "cod" ? "active" : ""}`}
              onClick={() => setPayment("cod")}
              disabled={isPlacingOrder}
            >
              <div className="group-header">
                <span>Cash on Delivery</span>
                <input type="radio" checked={payment === "cod"} readOnly />
              </div>
            </button>

            {payment === "cod" && (
              <div className="cod-warning">
                Cash on Delivery includes a ₹60 confirmation fee.
              </div>
            )}

            <p className="gst-note">All prices are inclusive of GST</p>
          </div>
        </div>

        <aside className="checkout-right">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <span className="discount">-₹{discount}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
            </div>

            {payment === "cod" && (
              <div className="summary-row">
                <span>COD Confirmation Fee</span>
                <span>₹60</span>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="place-order"
              type="button"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? (
                <>
                  <span className="checkout-spinner"></span>
                  Placing Order
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="secure-text">Secure checkout and GST included</p>
          </div>
        </aside>
      </div>
    </section>
  );
}