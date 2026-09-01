import { useEffect, useRef, useState } from "react";
import { vectorSwirl } from "../assets/figmaAssets";

const VIDEO_SRC = "/hero-video.mp4";

const stats = [
  {
    num: "01",
    title: "Creators",
    body: "A founding community of AI video makers.",
  },
  {
    num: "02",
    title: "AI Videos",
    body: "Creators generate videos from the channel's content direction.",
  },
  {
    num: "03",
    title: "Submission",
    body: "Completed videos enter the creator workflow.",
  },
  {
    num: "03",
    title: "YouTube",
    body: "Selected videos are published on the shared channel.",
  },
  {
    num: "05",
    title: "Revenue",
    body: "The channel earns as it grows.",
  },
];

const panelCount = stats.length + 1;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

export default function BuildingSweep() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const [videoFailed, setVideoFailed] = useState(false);

  const mobileIntroRef = useRef(null);
  const [mobileProgress, setMobileProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const el = trackRef.current;

        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollableHeight =
            el.offsetHeight - window.innerHeight;

          if (scrollableHeight > 0) {
            const scrolled = -rect.top;

            setProgress(
              clamp(scrolled / scrollableHeight, 0, 1)
            );
          }
        }

        const introEl = mobileIntroRef.current;

        if (introEl) {
          const introRect = introEl.getBoundingClientRect();
          const introScrollable =
            introEl.offsetHeight - window.innerHeight;

          if (introScrollable > 0) {
            const introScrolled = -introRect.top;

            setMobileProgress(
              clamp(introScrolled / introScrollable, 0, 1)
            );
          }
        }

        ticking = false;
      });

      ticking = true;
    }

    function handleResize() {
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });

      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
  ============================================================
  PURPLE BACKGROUND EXPANSION
  ============================================================
  */

  const VIDEO_SIZE = 320;

  const PURPLE_GROW_START = 0.015;
  const PURPLE_GROW_END = 0.19;

  const purpleGrowth = mapRange(
    progress,
    PURPLE_GROW_START,
    PURPLE_GROW_END,
    0,
    1
  );

  const purpleTargetSize =
    Math.max(viewport.w, viewport.h) * 1.55;

  const purpleSize = lerp(
    VIDEO_SIZE,
    purpleTargetSize,
    purpleGrowth
  );

  const purpleRadius = purpleSize / 2;

  /*
  ============================================================
  BUILDING CONTENT REVEAL
  ============================================================
  */

  const INTRO_FADE_START = 0.2;
  const INTRO_FADE_END = 0.26;

  const introOpacity = mapRange(
    progress,
    INTRO_FADE_START,
    INTRO_FADE_END,
    0,
    1
  );

  const contentOpacity = mapRange(
    progress,
    0.3,
    0.36,
    0,
    1
  );

  /*
  ============================================================
  VIDEO
  ============================================================
  */

  const VIDEO_MOVE_START = 0.05;
  const VIDEO_MOVE_END = 0.2;

  const moveProgress = mapRange(
    progress,
    VIDEO_MOVE_START,
    VIDEO_MOVE_END,
    0,
    1
  );

  const videoCenterY = lerp(
    viewport.h / 2,
    -VIDEO_SIZE,
    moveProgress
  );

  const fadeStart =
    VIDEO_MOVE_START +
    (VIDEO_MOVE_END - VIDEO_MOVE_START) * 0.6;

  const videoOpacity = mapRange(
    progress,
    fadeStart,
    VIDEO_MOVE_END,
    1,
    0
  );

  const showVideo = progress <= VIDEO_MOVE_END;

  /*
  ============================================================
  BUILDING PANELS
  ============================================================
  */

  const PANEL_START = 0.3;
  const PANEL_END = 0.88;

  const panelProgress = mapRange(
    progress,
    PANEL_START,
    PANEL_END,
    0,
    panelCount - 1
  );

  const panelTranslateX =
    -(panelProgress * viewport.w);

  /*
  ============================================================
  FINAL REVENUE FRAME
  ============================================================
  */

  const SCALE_START = 0.88;
  const SCALE_END = 0.97;

  const exitProgress = mapRange(
    progress,
    SCALE_START,
    SCALE_END,
    0,
    1
  );

  const finalFrameWidth = lerp(
    purpleSize,
    viewport.w * 0.95,
    exitProgress
  );

  const finalFrameHeight = lerp(
    purpleSize,
    viewport.h * 0.95,
    exitProgress
  );

  const FINAL_RADIUS = 42;

  const finalExitRadius =
    exitProgress > 0
      ? FINAL_RADIUS
      : purpleRadius;

  const frameTop = lerp(
    (viewport.h - purpleSize) / 2,
    0,
    exitProgress
  );

  /*
  ============================================================
  PANEL TRACK POSITION

  The purple frame can become larger than the viewport.

  Instead of starting the panel track at the frame's left edge,
  center the viewport-sized panel track inside the purple frame.

  This keeps the INTRO centered while the purple background is
  larger than the screen.
  ============================================================
  */

  const panelTrackLeft =
    (finalFrameWidth - viewport.w) / 2;

  /*
  ============================================================
  MOBILE INTRO GROWTH + SPOTLIGHT LIST

  Same idea as the desktop purple-frame growth above, just
  without the horizontal panel sweep. The whole thing stays
  pinned for one continuous scroll: the circle grows into a
  full-bleed frame fairly quickly near the top, the video
  fades out as it's enveloped, then a vertical list (intro
  line, then each stat) cycles through inside the frame —
  the line nearest "current" sits at full opacity, its
  neighbors dimmed, like the reference recording.
  ============================================================
  */

    const M_VIDEO_SIZE = 220;

  const M_GROWTH_END = 0.14;

  const mGrowth = mapRange(mobileProgress, 0.02, M_GROWTH_END, 0, 1);

  // both dimensions now target the actual viewport, not a hardcoded
  // height — that hardcoded "460" was capping the frame well short of
  // the screen's real height on every phone, which is why it never
  // reached true edge-to-edge like the reference.
  const mFrameWidth = lerp(M_VIDEO_SIZE, viewport.w * 1.02, mGrowth);
  const mFrameHeight = lerp(M_VIDEO_SIZE, viewport.h * 1.02, mGrowth);
 const mFrameTopRadius = lerp(M_VIDEO_SIZE / 2, 40, mGrowth);
  const mFrameBottomRadius = lerp(M_VIDEO_SIZE / 2, 40, mGrowth);
  const mVideoOpacity = mapRange(mobileProgress, 0.06, M_GROWTH_END, 1, 0);

  const mobileItems = [
    {
      isIntro: true,
      title: "One community. One YouTube channel.",
      body: "We bring creators together around one simple goal: consistently producing great videos for a shared channel.",
    },
    ...stats,
  ];

  const LIST_FADE_START = M_GROWTH_END;
  const LIST_FADE_END = M_GROWTH_END + 0.04;
  const LIST_START = LIST_FADE_END;
  const LIST_END = 0.96;

  const mListOpacity = mapRange(
    mobileProgress,
    LIST_FADE_START,
    LIST_FADE_END,
    0,
    1
  );

  const mCurrentIndex = mapRange(
    mobileProgress,
    LIST_START,
    LIST_END,
    0,
    mobileItems.length - 1
  );

  const M_ITEM_HEIGHT = 230;

  return (
    <section id="building" className="relative">

      {/* ==================================================
          MOBILE / TABLET VERSION

          The desktop sweep below relies on scroll-jacked
          horizontal panels sized off the viewport width, which
          only makes sense on wide screens. Mobile keeps the
          same "pin the whole thing while scrolling drives an
          animation" idea, just laid out vertically: the circle
          grows into a full-bleed frame near the top, then a
          vertical list (intro line, then each stat) cycles
          through — the line nearest "current" sits at full
          opacity, its neighbors dimmed, matching the reference
          recording.
          ================================================== */}

      <div className="lg:hidden bg-white">
        <div ref={mobileIntroRef} className="relative h-[550vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

            {/* GROWING PURPLE FRAME */}

            <div
              className="absolute overflow-hidden bg-brand"
              style={{
                width: `${mFrameWidth}px`,
                height: `${mFrameHeight}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: `${mFrameTopRadius}px ${mFrameTopRadius}px ${mFrameBottomRadius}px ${mFrameBottomRadius}px`,
                willChange: "width, height, border-radius",
              }}
            >
              <img
                src={vectorSwirl}
                alt=""
                className="absolute -top-[8%] left-[25%] w-[70%] opacity-40 pointer-events-none select-none"
              />
            </div>

            {/* VIDEO, fades out as the frame envelops it */}

            <div
              className="absolute left-1/2 top-1/2 z-10 w-[220px] h-[220px] rounded-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              style={{
                transform: "translate(-50%, -50%)",
                opacity: mVideoOpacity,
              }}
            >
              {!videoFailed ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={VIDEO_SRC} type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-black/40 text-xs font-body px-6 text-center">
                  Add "hero-video.mp4" to your /public folder
                </div>
              )}
            </div>

            {/* SPOTLIGHT LIST: intro line, then each stat. Every
                item sits stacked M_ITEM_HEIGHT apart; the whole
                stack shifts so "current" always centers in the
                frame, and each item's own opacity fades out the
                further it sits from current. */}

            <div
              className="absolute inset-x-8 top-1/2 z-10 text-center"
              style={{
                opacity: mListOpacity,
                transform: `translateY(${
                  -(mCurrentIndex * M_ITEM_HEIGHT) - M_ITEM_HEIGHT / 2
                }px)`,
              }}
            >
              {mobileItems.map((item, i) => {
                const distance = Math.abs(i - mCurrentIndex);
                const itemOpacity = mapRange(distance, 0, 2, 1, 0.35);

                return (
                  <div
                    key={item.isIntro ? "intro" : `${item.title}-${i}`}
                    style={{
                      height: `${M_ITEM_HEIGHT}px`,
                      opacity: itemOpacity,
                    }}
                    className="flex flex-col items-center justify-center"
                  >
                    {item.isIntro ? (
                      <>
                        <p className="font-display font-bold text-white text-[9vw] leading-[1.05] tracking-[-1px]">
                          {item.title}
                        </p>
                        <p className="mt-4 text-white/70 font-body text-sm max-w-sm">
                          {item.body}
                        </p>
                      </>
                    ) : (
                      <>
                        <span className="text-white/50 font-display font-semibold text-sm mb-2">
                          {item.num}
                        </span>
                        <p className="font-display font-bold text-white text-[12vw] leading-none tracking-[-1px]">
                          {item.title}
                        </p>
                        <p className="mt-3 text-white/70 font-body text-sm max-w-[280px]">
                          {item.body}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          DESKTOP VERSION (unchanged)
          ================================================== */}

    <div
      ref={trackRef}
      className="relative h-[450vh] hidden lg:block"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

        {/* PURPLE EXPANDING FRAME */}

        <div
          className="absolute overflow-hidden bg-brand"
          style={{
            width: `${finalFrameWidth}px`,
            height: `${finalFrameHeight}px`,
            borderRadius: `${finalExitRadius}px`,
            left: "50%",
            top: `${frameTop}px`,
            transform: "translateX(-50%)",
            transformOrigin: "center center",
            willChange:
              "width, height, top, border-radius",
            zIndex: 1,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">

            <img
              src={vectorSwirl}
              alt=""
              className="absolute -top-[6%] left-[38%] w-[52%] opacity-70 pointer-events-none select-none"
            />

            {/* PANEL TRACK */}

            <div
              className="absolute top-0 h-full flex"
              style={{
                left: `${panelTrackLeft}px`,
                width: `${panelCount * viewport.w}px`,
                transform: `translateX(${panelTranslateX}px)`,
                willChange: "transform",
              }}
            >

              {/* INTRO */}

              <div
                className="shrink-0 h-full flex flex-col items-center justify-center px-6 text-center"
                style={{
                  width: `${viewport.w}px`,
                  opacity: introOpacity,
                  transform: "translateX(0)",
                }}
              >
                <p className="font-display font-bold text-white text-[9vw] sm:text-[56px] md:text-[80px] leading-[0.95] tracking-[-2px] max-w-4xl">
                  One community. One YouTube channel.
                </p>

                <p className="mt-6 text-white/70 font-body text-sm md:text-base max-w-xl">
                  We bring creators together around one simple goal:
                  consistently producing great videos for a shared channel.
                </p>
              </div>

              {/* STAT PANELS */}

              <div
                className="flex h-full"
                style={{
                  opacity: contentOpacity,
                }}
              >
                {stats.map((s, i) => (
                  <div
                    key={`${s.title}-${i}`}
                    className="shrink-0 h-full flex items-center justify-center px-6"
                    style={{
                      width: `${viewport.w}px`,
                    }}
                  >
                    <div className="flex flex-col items-start text-left">

                      <span className="text-white/50 font-display font-semibold text-sm mb-4">
                        {s.num}
                      </span>

                      <p className="font-display font-bold text-white text-[13vw] sm:text-[80px] md:text-[100px] leading-none tracking-[-2px]">
                        {s.title}
                      </p>

                      <p className="mt-6 text-white/70 font-body text-sm md:text-base max-w-[280px]">
                        {s.body}
                      </p>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {Array.from({
                length: panelCount,
              }).map((_, i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-white/30"
                />
              ))}
            </div>

          </div>
        </div>

        {/* HERO VIDEO */}

        {showVideo && (
          <div
            className="absolute left-1/2 z-20"
            style={{
              width: `${VIDEO_SIZE}px`,
              height: `${VIDEO_SIZE}px`,
              left: "50%",
              top: `${videoCenterY}px`,
              transform: "translate(-50%, -50%)",
              opacity: videoOpacity,
              pointerEvents: "none",
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: "50%",
              }}
            >
              {!videoFailed ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source
                    src={VIDEO_SRC}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white/50 text-sm font-body px-8 text-center">
                  Add "hero-video.mp4" to your /public folder
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
    </section>
  );
}