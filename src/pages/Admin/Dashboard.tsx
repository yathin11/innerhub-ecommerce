import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">YESSIX</p>
          <h1 className="admin-title">Admin Dashboard</h1>
        </div>

        <button className="admin-btn secondary" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="admin-stats-grid" aria-label="Admin overview">
        <div className="admin-stat-card">
          <span>Catalog</span>
          <strong>Products</strong>
          <p>Manage product listings, variants, and prices.</p>
        </div>

        <div className="admin-stat-card">
          <span>Orders</span>
          <strong>Tracking</strong>
          <p>Search orders using customer phone numbers.</p>
        </div>

        <div className="admin-stat-card">
          <span>Store</span>
          <strong>YESSIX</strong>
          <p>Keep the storefront clean, premium, and current.</p>
        </div>
      </section>

      <div className="admin-dashboard-grid">
        <Link className="admin-dashboard-card" to="/admin/add-product">
          <span>Add Product</span>
          <p>Create a product with colors, images, sizes, stock, and pricing.</p>
        </Link>

        <Link className="admin-dashboard-card" to="/admin/products">
          <span>View Products</span>
          <p>Review the catalog and edit existing product details.</p>
        </Link>

        <Link className="admin-dashboard-card" to="/admin/orders">
          <span>View Orders</span>
          <p>Look up customer orders and check delivery information.</p>
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;