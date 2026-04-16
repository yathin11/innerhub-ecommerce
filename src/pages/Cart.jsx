import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.productId._id}>
              <h4>{item.productId.name}</h4>
              <p>₹ {item.productId.price}</p>
              <p>Qty: {item.quantity}</p>

              <button onClick={() => removeFromCart(item.productId._id)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹ {total}</h3>

          <button onClick={() => navigate("/checkout")}>
            Go to Checkout
          </button>
        </>
      )}
    </div>
  );
}