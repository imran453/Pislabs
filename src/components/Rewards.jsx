import Reveal from "./Reveal";

const rewardSteps = [
  ["Create", "You generate an AI video based on the brief."],
  ["Submit", "You submit your completed video."],
  ["Accepted", "Videos that meet requirements can enter the publishing queue."],
  ["Published", "Selected videos are published on the shared YouTube channel."],
  ["Revenue", "The channel earns as it grows."],
  [
    "Eligible rewards",
    "Rewards are calculated according to the contribution model and project performance.",
  ],
];

export default function Rewards() {
  return (
    <>
      <section className="px-6 py-16">
        <Reveal className="max-w-[830px] mx-auto bg-brand rounded-[40px] p-10 md:p-16 flex flex-col items-start gap-6">
          <span className="bg-white/5 border-2 border-white/15 text-white/70 text-sm font-semibold tracking-[3px] px-6 py-3 rounded-pill">
            NO GUARANTEED EARNINGS
          </span>
          <h3 className="font-display font-bold text-3xl md:text-[40px] text-white tracking-[-0.8px]">
            Transparent from day one.
          </h3>
          <p className="text-white/65 text-lg md:text-2xl leading-[1.55]">
            Rewards depend on project performance. We believe in making the
            model transparent from day one — including what we cannot
            promise.
          </p>
        </Reveal>
      </section>

      <section id="rewards" className="bg-surface px-6 py-24">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">
          <Reveal className="flex flex-col items-center">
            <span className="bg-white border border-line text-[#8a8d95] text-[9px] font-semibold tracking-[1.1px] px-3 py-1.5 rounded-pill">
              REWARDS
            </span>
            <h2 className="font-display font-bold text-3xl md:text-[40px] tracking-[-0.8px] text-center max-w-2xl mt-5">
              Your contribution. The channel's performance. The shared upside.
            </h2>
            <p className="text-[#54585f] text-sm text-center max-w-md mt-4">
              Rewards depend on the project's performance and the defined
              contribution model. Nothing is guaranteed.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 w-full max-w-4xl">
            {rewardSteps.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 0.06} className="flex flex-col gap-3">
                <p className="font-display font-bold text-2xl tracking-[-0.6px]">
                  {title}
                </p>
                <p className="text-black/65 text-base leading-relaxed">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
