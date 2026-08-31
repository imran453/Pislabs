import { iconLinkedin, iconTwitter, iconInstagram } from "../assets/figmaAssets";

export default function Footer() {
  return (
    <footer className="bg-white w-full">
      <div className="bg-brand w-full flex flex-col lg:flex-row items-start justify-between gap-12 px-6 md:px-16 py-10 md:py-16">
        <div className="flex flex-col gap-6 max-w-[380px]">
          <div className="flex items-center gap-3">
            <div className="bg-white size-9 rounded-xl flex items-center justify-center">
              <span className="font-display font-bold text-sm text-brand">S</span>
            </div>
            <span className="font-display font-bold text-xl text-white tracking-[-0.44px]">
              Stiteramp
            </span>
          </div>
          <p className="text-white/65 text-base leading-relaxed">
            One community building one YouTube channel together.
          </p>
          <div className="flex gap-3">
            {[iconLinkedin, iconTwitter, iconInstagram].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-white border border-line size-11 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <img src={icon} alt="" className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-16 md:gap-20 text-white">
          <div className="flex flex-col gap-5">
            <p className="text-[13px] tracking-[-0.26px]">BUILDING</p>
            <div className="flex flex-col gap-3 text-white/65 text-sm">
              <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
              <a href="#" className="hover:text-white transition-colors">Who can join</a>
              <a href="#rewards" className="hover:text-white transition-colors">Rewards</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[13px] tracking-[-0.26px]">LEGAL</p>
            <div className="flex flex-col gap-3 text-white/65 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Download</a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-6 md:px-16 py-6 text-sm text-black/50">
        <p>© 2025 PIS-labs. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-black transition-colors">Terms &amp; Conditions</a>
        </div>
      </div>
    </footer>
  );
}
