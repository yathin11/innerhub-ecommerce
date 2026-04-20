import React, { useState } from "react";
import "./Admin.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const [variants, setVariants] = useState([
    {
      color: "",
      images: [],
      sizes: []
    }
  ]);

  // ✅ CLOUDINARY UPLOAD FUNCTION
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "yessix");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnbvvz27b/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // 🔹 IMAGE UPLOAD (FIXED)
  const handleImageUpload = async (vIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadToCloudinary(file); // ✅ FIXED NAME

    const updated = [...variants];
    updated[vIndex].images.push(url);
    setVariants(updated);
  };

  // 🔹 Variant change
  const handleVariantChange = (index, e) => {
    const updated = [...variants];
    updated[index][e.target.name] = e.target.value;
    setVariants(updated);
  };

  // 🔹 Add color variant
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        images: [],
        sizes: []
      }
    ]);
  };

  // 🔹 Add size
  const addSizeByClick = (vIndex, size) => {
    const updated = [...variants];

    const exists = updated[vIndex].sizes.find(s => s.size === size);
    if (exists) return;

    updated[vIndex].sizes.push({
      size,
      price: "",
      offerPercent: "",
      offerPrice: "",
      stock: ""
    });

    setVariants(updated);
  };

  // 🔹 Size change
  const handleSizeChange = (vIndex, sIndex, e) => {
    const updated = [...variants];
    updated[vIndex].sizes[sIndex][e.target.name] = e.target.value;
    setVariants(updated);
  };

  // 🔹 Offer calculation
  const handleOfferChange = (vIndex, sIndex, e) => {
    const updated = [...variants];

    const percent = Number(e.target.value);
    const price = Number(updated[vIndex].sizes[sIndex].price);

    const offerPrice = price - (price * percent) / 100;

    updated[vIndex].sizes[sIndex].offerPercent = percent;
    updated[vIndex].sizes[sIndex].offerPrice = Math.round(offerPrice);

    setVariants(updated);
  };

  // 🔹 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      basePrice: Number(basePrice),
      variants
    };

    try {
      const res = await fetch("https://innerhub-backend.onrender.com/api/admin/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(product)
})

      if (!res.ok) throw new Error();

      alert("✅ Product Added");

    } catch (err) {
      alert("❌ Failed");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Add Product</h2>

      <form onSubmit={handleSubmit} className="admin-form">

        {/* PRODUCT INFO */}
        <div className="admin-card">
          <input
            className="admin-input"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="admin-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="admin-input"
            type="number"
            placeholder="Base Price"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
        </div>

        {/* VARIANTS */}
        <h3>Variants</h3>

        {variants.map((v, vIndex) => (
          <div key={vIndex} className="admin-card">

            <input
              className="admin-input"
              name="color"
              placeholder="Color"
              value={v.color}
              onChange={(e) => handleVariantChange(vIndex, e)}
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              className="admin-input"
              onChange={(e) => handleImageUpload(vIndex, e)}
            />

            {/* IMAGE PREVIEW */}
            <div style={{ display: "flex", gap: "10px" }}>
              {v.images.map((img, i) => (
                <img key={i} src={img} width="60" alt="" />
              ))}
            </div>

            {/* SIZE BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="admin-btn"
                  onClick={() => addSizeByClick(vIndex, size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* SIZES */}
            {v.sizes.map((s, sIndex) => (
              <div
                key={sIndex}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  marginTop: "10px"
                }}
              >
                <input className="admin-input" value={s.size} readOnly />

                <input
                  className="admin-input"
                  name="price"
                  placeholder="Price"
                  value={s.price}
                  onChange={(e) => handleSizeChange(vIndex, sIndex, e)}
                />

                <input
                  className="admin-input"
                  placeholder="Offer %"
                  value={s.offerPercent}
                  onChange={(e) => handleOfferChange(vIndex, sIndex, e)}
                />

                <input
                  className="admin-input"
                  value={s.offerPrice}
                  placeholder="Final Price"
                  readOnly
                />
              </div>
            ))}

          </div>
        ))}

        <div className="admin-actions">
          <button type="button" className="admin-btn" onClick={addVariant}>
            + Add Color Variant
          </button>

          <button type="submit" className="admin-btn">
            Create Product
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddProduct;