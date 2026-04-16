import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

/* Admin pages */

import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/Addproduct";
import ProductsList from "./pages/Admin/ProductsList";
import Orders from "./pages/Admin/Orders";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>

          {/* Public pages */}

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/products" element={<Products />} />

          <Route path="/contact" element={<Contact />} />

          {/* Admin routes */}

          <Route path="/admin" element={<Dashboard />} />

          <Route path="/admin/add-product" element={<AddProduct />} />

          <Route path="/admin/products" element={<ProductsList />} />

          <Route path="/admin/orders" element={<Orders />} />

        </Routes>

      </main>

    </BrowserRouter>

  );

}

export default App;