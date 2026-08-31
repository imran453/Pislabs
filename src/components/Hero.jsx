import TypewriterText from "./TypewriterText";
import { avatar1, avatar2, avatar3 } from "../assets/figmaAssets";

const typedWords = [
  "YouTube Monetization",
  "Faceless Channels",
  "Content at Scale",
  "Passive Income",
];

export default function Hero() {
  return (
    <section className="relative pt-[160px] pb-10 px-6">
      <div className="max-w-[560px] mx-auto text-center">
        <h1 className="font-display font-bold text-[40px] md:text-[56px] leading-[1.05] tracking-[-1.12px] text-black">
          Make AI videos For{" "}
          <TypewriterText words={typedWords} className="text-[40px] md:text-[56px] font-bold" />
        </h1>

        <p className="mt-6 font-body text-[#54585f] text-[17px] leading-[1.55] max-w-[560px] mx-auto">
          Stiteramp is a YouTube channel built by a community of AI video
          creators. You create the videos. We handle the rest.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#signup"
            className="bg-brand text-white text-[15px] font-medium px-6 py-3.5 rounded-pill hover:bg-brand-dark transition-colors"
          >
            Join the Founding Community
          </a>
          <a
            href="#how-it-works"
            className="bg-white border border-[#e5e5e8] text-brand text-[15px] font-medium px-6 py-3.5 rounded-pill hover:bg-surface transition-colors"
          >
            See How It Works
          </a>
        </div>
      </div>

      {/* "Join 3k+ Members" badge */}
      <div className="flex justify-center mt-10 relative z-10">
        <div className="bg-white border border-[#cbd1dd] flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-pill shadow-[0_0_0_4px_white,0_6px_24px_2px_rgba(77,77,77,0.08)]">
          <div className="flex items-start">
            {[avatar1, avatar2, avatar3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="size-6 rounded-full ring-2 ring-white -mr-1.5 last:mr-0"
              />
            ))}
          </div>
          <p className="text-[#666] text-sm">Join 3k+ Members</p>
        </div>
      </div>

      {/* The circular video used to render here as a separate, static
         element. It now lives entirely inside <BuildingSweep> right below,
         so the SAME element that shows your video is the one that grows
         and sweeps into the purple Building panel — one continuous piece,
         not two disconnected circles. See BuildingSweep.jsx. */}
    </section>
  );
}
