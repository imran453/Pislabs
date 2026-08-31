import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = ["Building", "Your role", "How it works", "Rewards", "FAQ"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (open) return;

      if (window.scrollY < 40) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        setVisible(true);
      }, 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [open]);

  return (
    <>
      {/*
        IMPORTANT: centering here uses `inset-x-0` (left:0; right:0), NOT
        `left-1/2 -translate-x-1/2`. That matters because this wrapper's
        CHILD is animated by Framer Motion, which drives its own `y` via
        the CSS `transform` property. If THIS wrapper also centered itself
        via a `transform: translateX(-50%)` class, the two would fight
        over the same CSS property and centering would silently break
        the moment the fade animation runs. Keeping positioning (this
        element) and animation (the child) on separate elements avoids
        that entirely.
      */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          animate={{ opacity: visible || open ? 1 : 0, y: visible || open ? 0 : -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white flex items-center gap-4 lg:gap-8 xl:gap-14 pl-4 md:pl-8 pr-3 py-3 rounded-pill shadow-[0_14px_24px_0_rgba(0,0,0,0.1)] max-w-[calc(100vw-32px)] pointer-events-auto"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-brand size-7 rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-xs text-white">S</span>
            </div>
            <span className="font-display font-bold text-lg text-brand tracking-[-0.36px]">
              Stiteramp
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 rounded-pill p-1.5">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-1.5 rounded-pill text-sm text-black hover:bg-surface transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#signup"
            className="hidden sm:inline-block bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-pill whitespace-nowrap hover:bg-brand-dark transition-colors"
          >
            Join Waitlist
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden shrink-0 size-9 rounded-full bg-surface flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] inset-x-0 z-40 flex justify-center px-4 lg:hidden"
          >
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_14px_24px_0_rgba(0,0,0,0.1)] p-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-base text-black hover:bg-surface transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#signup"
                onClick={() => setOpen(false)}
                className="mt-2 bg-brand text-white text-sm font-medium px-5 py-3 rounded-pill text-center hover:bg-brand-dark transition-colors"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
