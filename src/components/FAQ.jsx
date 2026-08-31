import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "What is Pis-labs community income Tree?",
    a: "Stiteramp is a single YouTube channel built by a community of AI video creators. Instead of one person producing everything, many creators generate videos for one shared channel, and the project handles publishing, channel management, growth and operations.",
  },
  { q: "What will I actually do as a creator?", a: "Generate AI videos that follow the channel's brief and submit them for review — the rest is handled by the project." },
  { q: "Do I need AI video experience?", a: "No prior experience is required, though familiarity with AI video tools helps you move faster through the workflow." },
  { q: "Do I need to edit videos?", a: "No. Editing, thumbnails and publishing are handled outside of the creator role." },
  { q: "How are submissions tracked?", a: "Every submission moves through a review workflow with clear status stages, from draft to ready-for-review to published." },
  { q: "How do creators earn?", a: "Rewards are calculated according to the defined contribution model and the channel's performance." },
  { q: "How much can I earn?", a: "Earnings depend entirely on channel performance and contribution — nothing is guaranteed up front." },
  { q: "When does the channel launch?", a: "Launch timing will be shared with the founding creator community as the waitlist fills." },
  { q: "Is joining free?", a: "Yes — joining the waitlist and the founding community is free, with no guaranteed earnings." },
];

function FaqItem({ q, a, isOpen, onToggle, isFirst }) {
  return (
    <div className={`px-7 md:px-12 py-7 ${isFirst ? "" : "border-t border-line"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 text-left"
      >
        <span className="font-body font-medium text-lg md:text-[21px] text-black">
          {q}
        </span>
        <span
          className={`shrink-0 size-9 rounded-full border flex items-center justify-center text-lg leading-none transition-colors ${
            isOpen
              ? "bg-[#5b2bd9] border-[#5b2bd9] text-white"
              : "bg-white border-line text-[#8a8d95]"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-[#54585f] text-base leading-[1.55] pt-4 max-w-[900px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white border-b border-line px-6 py-16 flex flex-col items-center">
      <div className="max-w-[1280px] w-full flex flex-col gap-14 items-center">
        <Reveal className="flex flex-col gap-6 items-center text-center">
          <span className="bg-white border border-line text-[#8a8d95] text-[11px] font-semibold tracking-[1.32px] px-3.5 py-1.5 rounded-pill">
            QUESTIONS, ANSWERED
          </span>
          <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-[-0.8px] max-w-[530px]">
            Before you join, here's what to know.
          </h2>
          <p className="text-[#54585f] text-[17px] max-w-[560px]">
            Everything we can tell you about the creator role today.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="border border-line rounded-[35px] w-full overflow-hidden">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isFirst={i === 0}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>

        <div className="flex items-center gap-2 text-[15px]">
          <span className="text-[#54585f]">Still unsure?</span>
          <a href="#signup" className="text-brand-dark font-medium hover:underline">
            Join the waitlist for the full creator guidelines
          </a>
        </div>
      </div>
    </section>
  );
}
