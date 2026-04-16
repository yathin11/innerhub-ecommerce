import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";

// Admin
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/Addproduct";
import ProductsList from "./pages/Admin/ProductsList";
import Orders from "./pages/Admin/Orders";
import AdminLogin from "./pages/Admin/Login";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 🔒 PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductsList />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Home />} />

        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;