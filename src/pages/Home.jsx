import { motion } from "framer-motion";
import "./Home.css";
import heroImage from "../assets/images/hero.jpg"; // Add your image here

export default function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">

        {/* LEFT CONTENT */}
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

          <div className="hero-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="primary-btn"
            >
              Shop Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="secondary-btn"
            >
              Explore
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
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
  );
}