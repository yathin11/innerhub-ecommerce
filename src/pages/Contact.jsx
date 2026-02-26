import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">

        {/* LEFT SIDE - INFO */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>
            Let’s Build Something <span>Together.</span>
          </h2>

          <p>
            Have a question, feedback, or partnership inquiry?
            Our team is here to help you.
          </p>

          <div className="info-item">
            <FiMail />
            <span>support@innerhub.com</span>
          </div>

          <div className="info-item">
            <FiPhone />
            <span>+91 98765 43210</span>
          </div>

          <div className="info-item">
            <FiMapPin />
            <span>Chennai, India</span>
          </div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Your Message"></textarea>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}