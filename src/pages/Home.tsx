import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

import heroImage from "../assets/images/hero.jpg";

import Products from "./Products";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.75,
              ease: "easeOut",
            }}
          >
            <span className="hero-tag">Premium Men&apos;s Essentials</span>

            <h1>
              Style That Speaks
              <br />
              <span>Confidence.</span>
            </h1>

            <p>
              Discover thoughtfully crafted essentials designed for everyday
              comfort, sharper fits, and elevated modern living.
            </p>

            <div className="hero-actions">
              <Link className="hero-btn primary" to="/products">
                Shop Now
              </Link>

              <Link className="hero-btn secondary" to="/about">
                Explore YESSIX
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.08,
            }}
          >
            <img src={heroImage} alt="YESSIX premium men's essentials" />
          </motion.div>
        </div>
      </section>

      <Products />
      <About />
      <Contact />
    </>
  );
}