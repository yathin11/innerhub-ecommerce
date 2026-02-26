import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Products />
        <Contact />
      </main>
    </>
  );
}