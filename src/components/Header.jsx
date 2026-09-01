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

  return (
    <>
      {/* ==================================================
          HEADER
          ================================================== */}

      <div
        className="
          fixed
          top-6
          left-0
          right-0
          z-50

          flex
          justify-center

          px-3
          sm:px-4

          pointer-events-none

          overflow-visible
        "
      >
        <motion.div
          animate={{
            opacity: visible || open ? 1 : 0,
            y: visible || open ? 0 : -12,
          }}
          transition={{
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            bg-white

            flex
            flex-row
            items-center

            w-full
            lg:w-auto

            justify-between
            lg:justify-normal

            gap-3
            sm:gap-4
            lg:gap-8
            xl:gap-14

            pl-3
            sm:pl-4
            md:pl-8

            pr-3
            sm:pr-4
            md:pr-8

            py-3

            rounded-pill

            shadow-[0_14px_24px_0_rgba(0,0,0,0.1)]

            pointer-events-auto

            whitespace-nowrap

            shrink-0

            max-w-full
          "
        >
          {/* ==================================================
              LOGO
              ================================================== */}

          <div
            className="
              flex
              items-center
              gap-2.5
              shrink-0
              whitespace-nowrap
            "
          >
            <div
              className="
                bg-brand
                size-7
                rounded-lg
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <span className="font-display font-bold text-xs text-white">
                S
              </span>
            </div>

            <span
              className="
                font-display
                font-bold
                text-lg
                text-brand
                tracking-[-0.36px]
                whitespace-nowrap
              "
            >
              Stiteramp
            </span>
          </div>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}

          <nav className="hidden lg:flex items-center gap-1 rounded-pill p-1.5 shrink-0">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="
                  px-4
                  py-1.5
                  rounded-pill
                  text-sm
                  text-black
                  hover:bg-surface
                  transition-colors
                  whitespace-nowrap
                "
              >
                {item}
              </a>
            ))}
          </nav>

          {/* ==================================================
              DESKTOP WAITLIST
              ================================================== */}

          <a
            href="#signup"
            className="
              hidden
              lg:inline-block

              bg-brand
              text-white

              text-sm
              font-medium

              px-5
              py-2.5

              rounded-pill

              whitespace-nowrap

              shrink-0

              hover:bg-brand-dark
              transition-colors
            "
          >
            Join Waitlist
          </a>

          {/* ==================================================
              MOBILE MENU BUTTON
              ================================================== */}

          <button
            onClick={() => setOpen(!open)}
            className="
              lg:hidden

              shrink-0

              size-9

              rounded-full

              bg-surface

              flex
              items-center
              justify-center
            "
            aria-label="Toggle menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </motion.div>
      </div>

      {/* ==================================================
          MOBILE MENU
          ================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              fixed
              top-[88px]

              left-0
              right-0

              z-40

              flex
              justify-center

              px-4

              lg:hidden
            "
          >
            <div
              className="
                w-full
                max-w-sm

                bg-white

                rounded-3xl

                shadow-[0_14px_24px_0_rgba(0,0,0,0.1)]

                p-4

                flex
                flex-col
                gap-1
              "
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="
                    px-4
                    py-3

                    rounded-xl

                    text-base
                    text-black

                    hover:bg-surface
                    transition-colors
                  "
                >
                  {item}
                </a>
              ))}

              <a
                href="#signup"
                onClick={() => setOpen(false)}
                className="
                  mt-2

                  bg-brand
                  text-white

                  text-sm
                  font-medium

                  px-5
                  py-3

                  rounded-pill

                  text-center

                  hover:bg-brand-dark
                  transition-colors
                "
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