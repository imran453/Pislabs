const youDo = [
  "Generate AI videos",
  "Follow the content brief",
  "Submit completed videos",
];
const youDont = [
  "Edit other creators' videos",
  "Design thumbnails",
  "Manage the channel",
  "Run marketing",
];

import Reveal from "./Reveal";

export default function CreatorRoleDetail() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-[1030px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
        <Reveal y={20} className="flex-1 max-w-[420px]">
          <h3 className="font-display font-bold text-3xl md:text-[40px] text-brand tracking-[-0.8px] leading-[1.06]">
            Get in early. Build with us.
          </h3>
          <p className="mt-6 text-[#54585f] text-[17px] leading-[1.55]">
            Your job is focused: generate quality AI videos that match the
            channel's brief and submit them.
          </p>
          <div className="mt-6 bg-surface rounded-2xl p-5">
            <p className="text-[#54585f] text-[15px] leading-relaxed">
              Publishing, thumbnails, scheduling, channel strategy, audience
              growth and operations sit with the project, not with you.
            </p>
          </div>
        </Reveal>

        <Reveal y={20} delay={0.1} className="flex-1 w-full bg-brand rounded-[20px] p-8 md:p-11 text-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[1.32px] text-white/50">
              01 / CREATOR ROLE
            </span>
            <span className="bg-white/5 border border-white/15 text-[11px] font-semibold tracking-[1.32px] px-3 py-1.5 rounded-pill text-white/70">
              THE ONLY ROLE
            </span>
          </div>
          <p className="font-display font-bold text-2xl md:text-[32px] tracking-[-0.64px] mt-5">
            AI Video Creator
          </p>
          <p className="text-white/65 text-base mt-3 leading-relaxed">
            Generate videos that match the channel's niche, brief and quality
            standards.
          </p>

          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[1.32px] text-white">
                YOU DO
              </p>
              {youDo.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 py-3 border-b border-white/10"
                >
                  <span className="text-[#f0ebfd] text-sm">✓</span>
                  <span className="text-[15px] text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[1.32px] text-white/45">
                YOU DON'T
              </p>
              {youDont.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 py-3 border-b border-white/10"
                >
                  <span className="text-sm text-white/35">×</span>
                  <span className="text-[15px] text-white/50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
