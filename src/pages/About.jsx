import { motion } from "framer-motion";
import "./About.css";
import aboutImage from "../assets/images/about.jpg"; // add image

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-wrapper">

        {/* LEFT IMAGE */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src={aboutImage} alt="About InnerHub" />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="about-tag">Our Story</span>

          <h2>
            Built for Comfort. <br />
            <span>Designed for Confidence.</span>
          </h2>

          <p>
            InnerHub is a premium men’s essentials brand redefining everyday comfort.
            What started with innerwear is evolving into a complete lifestyle
            experience — thoughtfully designed and digitally refined.
          </p>

          <p>
            We believe premium doesn’t have to shout. It should feel effortless,
            timeless, and personal — just like InnerHub.
          </p>
        </motion.div>

      </div>
    </section>
  );
}