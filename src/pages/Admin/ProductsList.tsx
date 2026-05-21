import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

type VariantType = {
  images: string[];
};

type ProductType = {
  _id: string;
  name: string;
  basePrice: number;
  variants?: VariantType[];
};

export default function ProductsList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/products");

        if (!res.ok) {
          throw new Error("Unable to load products");
        }

        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch {
        setError("Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Catalog</p>
          <h1 className="admin-title">Products</h1>
        </div>

        <button
          className="admin-btn primary"
          type="button"
          onClick={() => navigate("/admin/add-product")}
        >
          Add Product
        </button>
      </div>

      {isLoading && (
        <div className="admin-loading-card">
          <span className="admin-spinner"></span>
          Loading products
        </div>
      )}

      {error && !isLoading && (
        <div className="admin-error-card">
          <h2>{error}</h2>
          <button
            className="admin-btn secondary"
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <div className="admin-empty-state">
          <h2>No products yet</h2>
          <p>Add your first YESSIX product to start building the catalog.</p>
        </div>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className="admin-product-grid">
          {products.map((p) => {
            const image = p.variants?.[0]?.images?.[0];

            return (
              <article key={p._id} className="admin-product-card admin-row-animated">
                {image ? (
                  <img src={image} alt={p.name} className="admin-product-image" />
                ) : (
                  <div className="admin-product-image admin-product-image-empty">
                    No Image
                  </div>
                )}

                <div className="admin-product-body">
                  <h3>{p.name}</h3>
                  <p>₹{p.basePrice}</p>

                  <button
                    className="admin-btn secondary"
                    type="button"
                    onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                  >
                    Edit Product
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}