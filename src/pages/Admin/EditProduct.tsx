import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (vIndex, field, value) => {
    const updated = [...product.variants];
    updated[vIndex][field] = value;
    setProduct({ ...product, variants: updated });
  };

  const handleSizeChange = (vIndex, sIndex, field, value) => {
    const updated = [...product.variants];
    updated[vIndex].sizes[sIndex][field] = value;
    setProduct({ ...product, variants: updated });
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    alert("✅ Updated");
    navigate("/admin/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="admin-container">
      <h2>Edit Product</h2>

      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="basePrice"
        value={product.basePrice}
        onChange={handleChange}
        placeholder="Base Price"
      />

      {product.variants.map((v, vIndex) => (
        <div key={vIndex} className="variant-box">

          <input
            value={v.color}
            onChange={(e) =>
              handleVariantChange(vIndex, "color", e.target.value)
            }
            placeholder="Color"
          />

          {v.sizes.map((s, sIndex) => (
            <div key={sIndex}>

              <input
                value={s.size}
                onChange={(e) =>
                  handleSizeChange(vIndex, sIndex, "size", e.target.value)
                }
              />

              <input
                value={s.price}
                onChange={(e) =>
                  handleSizeChange(vIndex, sIndex, "price", e.target.value)
                }
              />

              <input
                value={s.offerPrice}
                onChange={(e) =>
                  handleSizeChange(vIndex, sIndex, "offerPrice", e.target.value)
                }
              />

              <input
                value={s.stock}
                onChange={(e) =>
                  handleSizeChange(vIndex, sIndex, "stock", e.target.value)
                }
              />

            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Update Product</button>
    </div>
  );
}