import "./Products.css";

import trunkBlack from "../assets/products/trunk-black.jpg";
import briefGrey from "../assets/products/brief-grey.jpg";
import boxerBlue from "../assets/products/boxer-blue.jpg";
import trunkNavy from "../assets/products/trunk-navy.jpg";
import briefPack from "../assets/products/brief-pack.jpg";

const products = [
  {
    id: 1,
    name: "UltraSoft Cotton Trunks",
    brand: "InnerHub",
    price: 799,
    oldPrice: 1199,
    img: trunkBlack,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Premium Stretch Briefs",
    brand: "InnerHub",
    price: 699,
    oldPrice: 999,
    img: briefGrey,
    rating: 4.3,
  },
  {
    id: 3,
    name: "Comfort Fit Boxer Shorts",
    brand: "InnerHub",
    price: 899,
    oldPrice: 1299,
    img: boxerBlue,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Everyday Cotton Briefs (Pack of 3)",
    brand: "InnerHub",
    price: 999,
    oldPrice: 1499,
    img: briefPack,
    rating: 4.4,
  },
  {
    id: 5,
    name: "Premium Modal Trunks",
    brand: "InnerHub",
    price: 1099,
    oldPrice: 1699,
    img: trunkNavy,
    rating: 4.7,
  },
];
export default function Products() {
  return (
    <section id="products" className="products-section">
      <h2 className="products-title">Men's Innerwear Collection</h2>

      <div className="products-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>

            <div className="product-image">
              <img src={item.img} alt={item.name} />

              <div className="discount-badge">
                {Math.round(
                  ((item.oldPrice - item.price) / item.oldPrice) * 100
                )}
                % OFF
              </div>

              <div className="image-overlay">
                <a href="/checkout" className="quick-buy">
                  Buy Now
                </a>
              </div>
            </div>

            <div className="product-info">
              <p className="brand">{item.brand}</p>
              <h3>{item.name}</h3>

              <div className="price-row">
                <span className="price">₹{item.price}</span>
                <span className="old-price">₹{item.oldPrice}</span>
              </div>

              <div className="rating">
                ⭐ {item.rating}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}