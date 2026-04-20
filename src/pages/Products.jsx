import "./Products.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import PhonePopup from "../components/PhonePopup";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { addToCart, phone, savePhone } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  // 🔥 FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://innerhub-backend.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  // ADD TO CART
  const handleAddToCart = (product) => {
    if (!phone) {
      setSelectedProduct(product);
      setShowPopup(true);
      return;
    }
    addToCart(product);
  };

  // BUY NOW
  const handleBuyNow = (product) => {
    if (!phone) {
      setSelectedProduct(product);
      setShowPopup(true);
      return;
    }
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <section className="products-section">
      <h2 className="products-title">Men's Innerwear Collection</h2>

      <div className="products-grid">
        {products.map((item) => {
          // ✅ Get first image from first variant
          const image =
            item?.variants?.[0]?.images?.[0] ||
            "https://via.placeholder.com/300";

          // ✅ Get first size price
          const price =
            item?.variants?.[0]?.sizes?.[0]?.offerPrice ||
            item?.variants?.[0]?.sizes?.[0]?.price ||
            item.basePrice;

          const oldPrice =
            item?.variants?.[0]?.sizes?.[0]?.price ||
            item.basePrice;

          return (
            <div className="product-card" key={item._id}>
              <div className="product-image">
                <img src={image} alt={item.name} />

                <div className="discount-badge">
                  {oldPrice && price
                    ? Math.round(((oldPrice - price) / oldPrice) * 100)
                    : 0}
                  % OFF
                </div>

                <div className="image-overlay">
                  <button
                    className="quick-buy"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="product-info">
                <p className="brand">InnerHub</p>
                <h3>{item.name}</h3>

                <div className="price-row">
                  <span className="price">₹{price}</span>
                  <span className="old-price">₹{oldPrice}</span>
                </div>

                <div className="rating">⭐ 4.5</div>

                <button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PHONE POPUP */}
      {showPopup && (
        <PhonePopup
          onSubmit={(p) => {
            savePhone(p);
            setShowPopup(false);

            if (selectedProduct) {
              addToCart(selectedProduct);
            }
          }}
        />
      )}
    </section>
  );
}