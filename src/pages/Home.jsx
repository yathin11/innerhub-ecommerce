import { motion } from "framer-motion";
import "./Home.css";
import heroImage from "../assets/images/hero.jpg";

// 👇 IMPORT SECTIONS
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-container">

          {/* LEFT */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-tag">Premium Men's Essentials</span>

            <h1>
              Style That Speaks <br />
              <span>Confidence.</span>
            </h1>

            <p>
              Discover thoughtfully crafted essentials designed
              for everyday comfort and elevated modern living.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={heroImage} alt="Hero" />
          </motion.div>

        </div>
      </section>

      {/* 👇 ADD THESE SECTIONS */}
      <Products />
      <About />
      <Contact />
    </>
  );
}