import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1.",
    title: "Join",
    body: "the founding creator community.",
    video: "/how-it-works-1.mp4",
    cardBg: "#9b3cdd",
  },
  {
    num: "2.",
    title: "Get the brief",
    body: "Receive the channel's niche, content direction and video requirements.",
    video: "/how-it-works-2.mp4",
    cardBg: "#292929",
  },
  {
    num: "3.",
    title: "Generate",
    body: "Create an AI-generated video that follows the brief.",
    video: "/how-it-works-3.mp4",
    cardBg: "#c6b5ff",
  },
  {
    num: "4.",
    title: "Submit",
    body: "Send the completed video through the creator workflow for review and possible publishing.",
    video: "/how-it-works-4.mp4",
    cardBg: "#6ee7b7",
  },
];

/*
============================================================
MAIN

Desktop keeps the original sticky/scroll-jacked track exactly
as it was. Mobile no longer tries to replicate that with
synchronized height math (rowHeight / section vh / trackY all
had to match perfectly and kept desyncing) — it's just normal
stacked content that flows with natural scroll instead.
============================================================
*/

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth < 768);
    }
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (isMobile) {
    return <MobileHowItWorks />;
  }

  return <DesktopHowItWorks />;
}

/*
============================================================
MOBILE — plain stacked flow, no pinning, no scroll-jacking.
Numbered, title, and body are left-aligned and bold, matching
the reference.
============================================================
*/

function MobileHowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-black text-white px-6 pt-20 pb-16">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="font-display font-bold text-[38px] leading-none">How</span>
          <span className="bg-brand text-black px-3 py-1 rounded-full font-display font-bold text-[38px] leading-none">
            PIS labs
          </span>
        </div>
        <span className="font-display font-bold text-[38px] leading-none block mt-1">
          works
        </span>
      </div>

      <div className="flex flex-col gap-16">
        {steps.map((step) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="text-left">
              <p className="font-display font-bold text-[38px] leading-none text-white">
                {step.num}
              </p>
              <p className="font-display font-bold text-[30px] leading-[1.1] tracking-[-0.5px] text-white mt-3">
                {step.title}
              </p>
              <p className="font-display font-normal text-[18px] leading-[1.3] text-white/70 mt-2 max-w-[320px]">
                {step.body}
              </p>
            </div>

                        <div
              className="relative w-full aspect-[9/14] rounded-[20px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.35)] mt-8"
              style={{ backgroundColor: step.cardBg }}
            > 
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={step.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
              <div className="absolute inset-0 rounded-[20px] border border-white/10 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/*
============================================================
DESKTOP — unchanged from before the mobile work started.
============================================================
*/

function DesktopHowItWorks() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(
    scrollYProgress,
    (value) => (value <= 0 ? 1 : 0)
  );

  const rowHeight = 560;
  const titleSpacing = 120;

  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(rowHeight * (steps.length - 1) + titleSpacing)]
  );

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative h-[400vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.div
          style={{ opacity: headingOpacity }}
          className="absolute top-[55px] left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center justify-center text-center pointer-events-none whitespace-nowrap w-max"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-bold text-[38px] md:text-[48px] leading-none">
              How
            </span>
            <span className="bg-brand text-black px-3 py-1 rounded-full font-display font-bold text-[38px] md:text-[48px] leading-none">
              PIS labs
            </span>
          </div>
          <span className="font-display font-bold text-[38px] md:text-[48px] leading-none mt-1">
            works
          </span>
        </motion.div>

        <div className="absolute inset-0 max-w-[1100px] mx-auto px-6 md:px-10 overflow-visible">
          <motion.div
            style={{
              y: trackY,
              paddingTop: `calc((100vh - ${rowHeight}px) / 2 + 120px)`,
              paddingBottom: `calc((100vh - ${rowHeight}px) / 2)`,
            }}
            className="relative w-full flex flex-col overflow-visible"
          >
            {steps.map((step) => (
              <StepRow key={step.num} step={step} />
            ))}
          </motion.div>
        </div>

        <div className="absolute right-6 md:right-10 bottom-8 z-[600] flex flex-col gap-2">
          {steps.map((_, index) => (
            <StepIndicator key={index} index={index} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step }) {
  return (
    <div className="relative h-[560px] w-full shrink-0 flex items-center overflow-visible">
      <div className="w-[46%] flex flex-col justify-center pr-6 md:pr-10">
        <p className="font-display font-semibold text-[42px] md:text-[52px] leading-none text-white">
          {step.num}
        </p>
        <p className="font-display font-bold text-[32px] md:text-[42px] leading-[1.05] tracking-[-1px] text-white mt-5">
          {step.title}
        </p>
        <p className="font-display font-normal text-[20px] md:text-[25px] leading-[1.15] text-white/70 mt-2 max-w-[400px]">
          {step.body}
        </p>
      </div>

      <div className="w-[54%] flex items-center justify-center pl-4 overflow-visible">
        <div
          className="relative w-[250px] md:w-[280px] lg:w-[320px] aspect-[9/14] rounded-[20px] overflow-hidden shrink-0 shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
          style={{ backgroundColor: step.cardBg }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={step.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/[0.03] pointer-events-none" />
          <div className="absolute inset-0 rounded-[20px] border border-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ index, progress }) {
  const start = index / steps.length;
  const center = (index + 0.5) / steps.length;
  const end = (index + 1) / steps.length;

  const opacity = useTransform(
    progress,
    [Math.max(0, start), center, Math.min(1, end)],
    [0.3, 1, 0.3]
  );

  const scale = useTransform(
    progress,
    [Math.max(0, start), center, Math.min(1, end)],
    [1, 1.5, 1]
  );

  return <motion.span style={{ opacity, scale }} className="block size-2 rounded-full bg-white" />;
}