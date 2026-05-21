import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Admin.css";

type SizeType = {
  size: string;
  price: string | number;
  offerPrice: string | number;
  stock: string | number;
};

type VariantType = {
  color: string;
  sizes: SizeType[];
};

type ProductType = {
  name: string;
  basePrice: string | number;
  variants: VariantType[];
};

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://localhost:5000/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data: ProductType = await res.json();
        setProduct(data);
      } catch {
        setError("Unable to load product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!product) return;

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleVariantChange = (
    vIndex: number,
    field: string,
    value: string
  ): void => {
    if (!product) return;

    const updated = [...product.variants];

    updated[vIndex] = {
      ...updated[vIndex],
      [field]: value,
    };

    setProduct({
      ...product,
      variants: updated,
    });
  };

  const handleSizeChange = (
    vIndex: number,
    sIndex: number,
    field: string,
    value: string
  ): void => {
    if (!product) return;

    const updated = [...product.variants];

    updated[vIndex].sizes[sIndex] = {
      ...updated[vIndex].sizes[sIndex],
      [field]: value,
    };

    setProduct({
      ...product,
      variants: updated,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!product) return;

    try {
      setIsSaving(true);

      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      navigate("/admin/products");
    } catch {
      alert("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="admin-page">
        <div className="admin-loading-card">
          <span className="admin-spinner"></span>
          Loading product
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="admin-page">
        <div className="admin-error-card">
          <h2>{error || "Product not found"}</h2>
          <button
            className="admin-btn secondary"
            type="button"
            onClick={() => navigate("/admin/products")}
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Catalog</p>
          <h1 className="admin-title">Edit Product</h1>
        </div>

        <button
          className="admin-btn secondary"
          type="button"
          onClick={() => navigate("/admin/products")}
        >
          Back
        </button>
      </div>

      <section className="admin-panel admin-panel-animated">
        <div className="admin-field-grid">
          <label className="admin-field">
            <span>Name</span>
            <input
              className="admin-input"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Name"
              disabled={isSaving}
            />
          </label>

          <label className="admin-field">
            <span>Base Price</span>
            <input
              className="admin-input"
              name="basePrice"
              type="number"
              value={product.basePrice}
              onChange={handleChange}
              placeholder="Base Price"
              disabled={isSaving}
            />
          </label>
        </div>
      </section>

      {product.variants.map((v, vIndex) => (
        <section key={vIndex} className="admin-panel admin-panel-animated">
          <h2 className="admin-section-title">Variant {vIndex + 1}</h2>

          <label className="admin-field">
            <span>Color</span>
            <input
              className="admin-input"
              value={v.color}
              onChange={(e) =>
                handleVariantChange(vIndex, "color", e.target.value)
              }
              placeholder="Color"
              disabled={isSaving}
            />
          </label>

          <div className="admin-size-list">
            {v.sizes.map((s, sIndex) => (
              <div key={sIndex} className="admin-size-row admin-row-animated">
                <input
                  className="admin-input"
                  value={s.size}
                  onChange={(e) =>
                    handleSizeChange(vIndex, sIndex, "size", e.target.value)
                  }
                  placeholder="Size"
                  disabled={isSaving}
                />

                <input
                  className="admin-input"
                  value={s.price}
                  type="number"
                  onChange={(e) =>
                    handleSizeChange(vIndex, sIndex, "price", e.target.value)
                  }
                  placeholder="Price"
                  disabled={isSaving}
                />

                <input
                  className="admin-input"
                  value={s.offerPrice}
                  type="number"
                  onChange={(e) =>
                    handleSizeChange(
                      vIndex,
                      sIndex,
                      "offerPrice",
                      e.target.value
                    )
                  }
                  placeholder="Offer Price"
                  disabled={isSaving}
                />

                <input
                  className="admin-input"
                  value={s.stock}
                  type="number"
                  onChange={(e) =>
                    handleSizeChange(vIndex, sIndex, "stock", e.target.value)
                  }
                  placeholder="Stock"
                  disabled={isSaving}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="admin-actions">
        <button
          className="admin-btn primary"
          onClick={handleSubmit}
          disabled={isSaving}
          type="button"
        >
          {isSaving ? (
            <>
              <span className="admin-spinner light"></span>
              Saving Changes
            </>
          ) : (
            "Update Product"
          )}
        </button>
      </div>
    </main>
  );
}