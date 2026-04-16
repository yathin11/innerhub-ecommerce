import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import heroImage from "../assets/images/hero.jpg";

export default function Home() {
  return (
    <section className="hero"> {/* ✅ removed id="home" */}
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

          {/* BUTTONS */}
          <div className="hero-actions">

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link to="/products" className="primary-btn">
                Shop Now
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link to="/about" className="secondary-btn">
                Explore
              </Link>
            </motion.div>

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