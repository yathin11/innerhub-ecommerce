import React, { useState } from "react";
import "./Admin.css";

type SizeType = {
  size: string;
  price: string;
  offerPercent: string | number;
  offerPrice: string | number;
  stock: string;
};

type VariantType = {
  color: string;
  images: string[];
  sizes: SizeType[];
};

function AddProduct() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [basePrice, setBasePrice] = useState<string>("");
  const [uploadingVariant, setUploadingVariant] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [variants, setVariants] = useState<VariantType[]>([
    { color: "", images: [], sizes: [] },
  ]);

  const uploadToCloudinary = async (file: File): Promise<string> => {
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

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleImageUpload = async (
    vIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingVariant(vIndex);
      const url = await uploadToCloudinary(file);

      const updated = [...variants];
      updated[vIndex].images = [...updated[vIndex].images, url];
      setVariants(updated);
    } catch {
      alert("Image upload failed");
    } finally {
      setUploadingVariant(null);
      e.target.value = "";
    }
  };

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const updated = [...variants];

    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };

    setVariants(updated);
  };

  const addVariant = (): void => {
    setVariants([...variants, { color: "", images: [], sizes: [] }]);
  };

  const addSizeByClick = (vIndex: number, size: string): void => {
    const updated = [...variants];
    const exists = updated[vIndex].sizes.find((s) => s.size === size);

    if (exists) return;

    updated[vIndex].sizes.push({
      size,
      price: "",
      offerPercent: "",
      offerPrice: "",
      stock: "",
    });

    setVariants(updated);
  };

  const handleSizeChange = (
    vIndex: number,
    sIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const updated = [...variants];

    updated[vIndex].sizes[sIndex] = {
      ...updated[vIndex].sizes[sIndex],
      [e.target.name]: e.target.value,
    };

    setVariants(updated);
  };

  const handleOfferChange = (
    vIndex: number,
    sIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const updated = [...variants];
    const percent = Number(e.target.value);
    const price = Number(updated[vIndex].sizes[sIndex].price);
    const offerPrice = price - (price * percent) / 100;

    updated[vIndex].sizes[sIndex].offerPercent = e.target.value;
    updated[vIndex].sizes[sIndex].offerPrice = price
      ? Math.round(offerPrice)
      : "";

    setVariants(updated);
  };

  const isValidProduct = (): boolean => {
    if (!name.trim() || !description.trim() || !basePrice) {
      alert("Please fill product name, description, and base price");
      return false;
    }

    const hasValidVariant = variants.some(
      (variant) =>
        variant.color.trim() &&
        variant.images.length > 0 &&
        variant.sizes.length > 0
    );

    if (!hasValidVariant) {
      alert("Please add at least one variant with color, image, and size");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!isValidProduct()) return;

    const product = {
      name,
      description,
      basePrice: Number(basePrice),
      variants,
    };

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const res = await fetch(
        "https://innerhub-backend.onrender.com/api/admin/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!res.ok) throw new Error();

      setSuccessMessage("Product added successfully");
      setName("");
      setDescription("");
      setBasePrice("");
      setVariants([{ color: "", images: [], sizes: [] }]);
    } catch {
      alert("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Catalog</p>
          <h1 className="admin-title">Add Product</h1>
        </div>
      </div>

      {successMessage && (
        <div className="admin-success-alert">
          <span>✓</span>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <section className="admin-panel">
          <h2 className="admin-section-title">Product Details</h2>

          <div className="admin-field-grid">
            <label className="admin-field">
              <span>Product Name</span>
              <input
                className="admin-input"
                placeholder="Classic cotton vest"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="admin-field">
              <span>Base Price</span>
              <input
                className="admin-input"
                type="number"
                placeholder="499"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Description</span>
            <textarea
              className="admin-textarea"
              placeholder="Write a short product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </section>

        <div className="admin-section-heading">
          <h2 className="admin-section-title">Variants</h2>

          <button
            type="button"
            className="admin-btn secondary"
            onClick={addVariant}
            disabled={isSubmitting}
          >
            Add Color Variant
          </button>
        </div>

        {variants.map((v, vIndex) => (
          <section key={vIndex} className="admin-panel admin-panel-animated">
            <div className="admin-variant-head">
              <h3>Variant {vIndex + 1}</h3>
            </div>

            <label className="admin-field">
              <span>Color</span>
              <input
                className="admin-input"
                name="color"
                placeholder="Black"
                value={v.color}
                onChange={(e) => handleVariantChange(vIndex, e)}
                disabled={isSubmitting}
              />
            </label>

            <label className="admin-field">
              <span>Images</span>
              <input
                type="file"
                className="admin-input"
                accept="image/*"
                onChange={(e) => handleImageUpload(vIndex, e)}
                disabled={isSubmitting || uploadingVariant === vIndex}
              />
            </label>

            {uploadingVariant === vIndex && (
              <div className="admin-uploading">
                <span className="admin-spinner"></span>
                Uploading image
              </div>
            )}

            {v.images.length > 0 && (
              <div className="admin-image-row">
                {v.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="admin-thumb admin-thumb-animated"
                    alt="Product"
                  />
                ))}
              </div>
            )}

            <div className="admin-size-picker">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="admin-size-btn"
                  onClick={() => addSizeByClick(vIndex, size)}
                  disabled={isSubmitting}
                >
                  {size}
                </button>
              ))}
            </div>

            {v.sizes.length > 0 && (
              <div className="admin-size-list">
                {v.sizes.map((s, sIndex) => (
                  <div key={sIndex} className="admin-size-row admin-row-animated">
                    <input className="admin-input" value={s.size} readOnly />

                    <input
                      className="admin-input"
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={s.price}
                      onChange={(e) => handleSizeChange(vIndex, sIndex, e)}
                      disabled={isSubmitting}
                    />

                    <input
                      className="admin-input"
                      name="offerPercent"
                      type="number"
                      placeholder="Offer %"
                      value={s.offerPercent}
                      onChange={(e) => handleOfferChange(vIndex, sIndex, e)}
                      disabled={isSubmitting}
                    />

                    <input
                      className="admin-input"
                      name="stock"
                      type="number"
                      placeholder="Stock"
                      value={s.stock}
                      onChange={(e) => handleSizeChange(vIndex, sIndex, e)}
                      disabled={isSubmitting}
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
            )}
          </section>
        ))}

        <div className="admin-actions">
          <button
            type="submit"
            className="admin-btn primary"
            disabled={isSubmitting || uploadingVariant !== null}
          >
            {isSubmitting ? (
              <>
                <span className="admin-spinner light"></span>
                Creating Product
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddProduct;