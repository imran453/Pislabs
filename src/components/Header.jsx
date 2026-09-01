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

      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [open]);

  // lock background scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ==================================================
          DESKTOP HEADER — unchanged floating pill, lg and up
          ================================================== */}

      <div
        className="
          hidden
          lg:flex

          fixed
          top-6
          left-0
          right-0
          z-50

          justify-center

          px-4

          pointer-events-none
        "
      >
        <motion.div
          animate={{
            opacity: visible ? 1 : 0,
            y: visible ? 0 : -12,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="
            bg-white
            flex
            items-center
            w-auto
            gap-8
            xl:gap-14
            pl-8
            pr-4
            py-3
            rounded-pill
            shadow-[0_14px_24px_0_rgba(0,0,0,0.1)]
            pointer-events-auto
            whitespace-nowrap
          "
        >
          <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <div className="bg-brand size-7 rounded-lg flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-xs text-white">S</span>
            </div>
            <span className="font-display font-bold text-lg text-brand tracking-[-0.36px] whitespace-nowrap">
              Stiteramp
            </span>
          </div>

          <nav className="flex items-center gap-1 rounded-pill p-1.5 shrink-0">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-1.5 rounded-pill text-sm text-black hover:bg-surface transition-colors whitespace-nowrap"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#signup"
            className="bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-pill whitespace-nowrap shrink-0 hover:bg-brand-dark transition-colors"
          >
            Join Waitlist
          </a>
        </motion.div>
      </div>

      {/* ==================================================
          MOBILE HEADER BAR — flat, full-width, sits flush at
          the very top (no floating pill/margin), matching the
          sendpotion reference instead of the desktop pill.
          ================================================== */}

      <motion.div
        animate={{
          opacity: visible || open ? 1 : 0,
          y: visible || open ? 0 : -12,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-50

          bg-white
          border-b
          border-line

          flex
          items-center
          justify-between

          px-4
          sm:px-6
          py-3.5
        "
      >
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <div className="bg-brand size-7 rounded-lg flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-xs text-white">S</span>
          </div>
          <span className="font-display font-bold text-lg text-brand tracking-[-0.36px] whitespace-nowrap">
            Stiteramp
          </span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 size-9 rounded-full bg-transparent hover:bg-surface transition-colors flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </motion.div>

      {/* ==================================================
          MOBILE MENU — full-screen takeover, matching the
          sendpotion reference: solid background covering the
          whole viewport, logo + close button up top, large
          stacked nav links, waitlist button pinned near the
          bottom. Replaces the old small dropdown card.
          ================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[60] bg-black flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-brand size-7 rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-white">S</span>
                </div>
                <span className="font-display font-bold text-lg text-brand tracking-[-0.36px]">
                  Stiteramp
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="shrink-0 size-9 rounded-full bg-transparent hover:bg-white/10 transition-colors flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-6 px-6 sm:px-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-3xl text-white"
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 sm:px-8 pb-8 pt-4 shrink-0">
              <a
                href="#signup"
                onClick={() => setOpen(false)}
                className="block w-full bg-brand text-white text-base font-medium py-4 rounded-pill text-center hover:bg-brand-dark transition-colors"
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