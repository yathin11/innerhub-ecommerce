import { motion } from "framer-motion";
import "./About.css";
import aboutImage from "../assets/images/about.jpg";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -48,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-wrapper">
        <motion.div
          className="about-image"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <img src={aboutImage} alt="YESSIX premium men's essentials" />
        </motion.div>

        <motion.div
          className="about-content"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          transition={{
            duration: 0.75,
            ease: "easeOut",
            delay: 0.08,
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="about-tag">Our Story</span>

          <h2>
            Built for Comfort.
            <br />
            <span>Designed for Confidence.</span>
          </h2>

          <p>
            YESSIX is a premium men&apos;s essentials brand built around
            everyday comfort, clean design, and dependable quality. What begins
            with innerwear grows into a sharper lifestyle experience for modern
            men.
          </p>

          <p>
            We believe premium should feel effortless. Quiet details, better
            fits, and thoughtful materials come together to make essentials that
            feel personal from the first wear.
          </p>
        </motion.div>
      </div>
    </section>
  );
}