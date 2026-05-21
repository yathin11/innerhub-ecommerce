import { useState } from "react";
import "./Checkout.css";

export default function Checkout() {
  const [payment, setPayment] = useState("upi");

  const subtotal = 2998;
  const discount = 500;
  const delivery = 0;
  const codFee = payment === "cod" ? 60 : 0;

  const total = subtotal - discount + delivery + codFee;

  return (
    <section className="checkout">
      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          {/* ADDRESS */}
          <div className="checkout-card">
            <h3>Delivery Address</h3>

            <div className="form-grid">
              <input placeholder="Full Name" />
              <input placeholder="Mobile Number" />
            </div>

            <textarea placeholder="Complete Delivery Address"></textarea>
          </div>

          {/* PAYMENT */}
          <div className="checkout-card">
            <h3>Payment Method</h3>

            {/* UPI SECTION */}
            <div
              className={`payment-group ${payment === "upi" ? "active" : ""}`}
              onClick={() => setPayment("upi")}
            >
              <div className="group-header">
                <span>UPI Apps</span>
                <input type="radio" checked={payment === "upi"} readOnly />
              </div>

              <div className="group-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg" alt="GPay" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" alt="PhonePe" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/CRED-LOGO2.png" alt="CRED" />
              </div>
            </div>

            {/* CARD SECTION */}
            <div
              className={`payment-group ${payment === "card" ? "active" : ""}`}
              onClick={() => setPayment("card")}
            >
              <div className="group-header">
                <span>Debit / Credit Cards</span>
                <input type="radio" checked={payment === "card"} readOnly />
              </div>

              <div className="group-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" />
              </div>
            </div>

            {/* COD SECTION */}
            <div
              className={`payment-group ${payment === "cod" ? "active" : ""}`}
              onClick={() => setPayment("cod")}
            >
              <div className="group-header">
                <span>Cash on Delivery</span>
                <input type="radio" checked={payment === "cod"} readOnly />
              </div>
            </div>

            {payment === "cod" && (
              <div className="cod-warning">
                ⚠ To confirm Cash on Delivery, pay ₹60 confirmation fee online.
              </div>
            )}

            <p className="gst-note">
              ✔ All prices are inclusive of GST
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
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

            <button className="place-order">
              Place Order
            </button>

            <p className="secure-text">
              🔒 100% Secure Payments
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}