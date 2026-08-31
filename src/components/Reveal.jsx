import { motion } from "framer-motion";

/**
 * Generic scroll-reveal wrapper used throughout the page so every section
 * shares the same "drops in on scroll, resets when scrolled away" language
 * as the sendpotion.com reference — not a one-time fade, but a real
 * enter/exit tied to viewport position.
 */
export default function Reveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.6,
  once = false,
  amount = 0.3,
  className = "",
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
