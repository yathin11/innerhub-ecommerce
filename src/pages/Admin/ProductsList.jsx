import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Products</h2>

      <div className="admin-grid">
        {products.map((p) => (
          <div key={p._id} className="admin-card">

            <img
              src={p.variants?.[0]?.images?.[0]}
              alt=""
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h3>{p.name}</h3>
            <p>₹ {p.basePrice}</p>

            <button onClick={() => navigate(`/admin/edit-product/${p._id}`)}>
              Edit
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}