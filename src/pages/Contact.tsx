import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import "./Contact.css";

const revealLeft = {
  hidden: {
    opacity: 0,
    x: -48,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const revealRight = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function Contact() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setIsSending(true);

    window.setTimeout(() => {
      setIsSending(false);
      setSent(true);
    }, 800);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <motion.div
          className="contact-info"
          variants={revealLeft}
          initial="hidden"
          whileInView="visible"
          transition={{
            duration: 0.75,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="contact-kicker">Contact</p>

          <h2>
            We’re Here for <span>Every Detail.</span>
          </h2>

          <p>
            Need help with sizing, orders, delivery, or a product question?
            Reach out to the YESSIX team and we’ll help you quickly.
          </p>

          <div className="info-list">
            <div className="info-item">
              <FiMail />
              <span>support@yessix.com</span>
            </div>

            <div className="info-item">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>

            <div className="info-item">
              <FiMapPin />
              <span>Chennai, India</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-wrapper"
          variants={revealRight}
          initial="hidden"
          whileInView="visible"
          transition={{
            duration: 0.75,
            ease: "easeOut",
            delay: 0.08,
          }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            {sent && (
              <div className="contact-success">
                Message sent. We’ll get back to you soon.
              </div>
            )}

            <input type="text" placeholder="Your Name" required />

            <input type="email" placeholder="Email Address" required />

            <textarea placeholder="Your Message" required></textarea>

            <motion.button
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="contact-spinner"></span>
                  Sending
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}