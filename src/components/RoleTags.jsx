import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const tags = [
  {
    text: "Generate AI videos",
    bg: "#dbefe8",
    rotate: -8,
  },
  {
    text: "Follow the content brief",
    bg: "#ffe3d3",
    rotate: 4,
  },
  {
    text: "AI Video Creator",
    bg: "#7f56d9",
    color: "#fff",
    rotate: 6,
    big: true,
  },
  {
    text: "Monetization",
    bg: "#d8c0ff",
    rotate: 12,
  },
  {
    text: "Revenue",
    bg: "#fffac0",
    rotate: -6,
  },
  {
    text: "File notes",
    bg: "#c9fec4",
    rotate: 8,
  },
  {
    text: "Track steps",
    bg: "#ffc29f",
    rotate: -14,
  },
  {
    text: "Submit completed videos",
    bg: "#fef2ff",
    rotate: -10,
  },
  {
    text: "Finish report",
    bg: "#a7ff9f",
    rotate: 9,
  },
  {
    text: "CREATOR ROLE",
    bg: "#1f1d1d",
    color: "#fff",
    rotate: 10,
  },
  {
    text: "Free To Join",
    bg: "#ffea9f",
    rotate: 8,
  },
  {
    text: "Water plants",
    bg: "#9fa9ff",
    rotate: -18,
    strike: true,
  },
  {
    text: "M",
    bg: "#eaeaea",
    rotate: -2,
  },
  {
    text: "Content Direction",
    bg: "#ffd6e7",
    rotate: -7,
  },
  {
    text: "Channel Growth",
    bg: "#b9e7ff",
    rotate: 11,
  },
];

/*
============================================================
FINAL POSITIONS
============================================================

These are deliberately close together.

The tags are NOT spread around a huge empty area.

They settle into a compact arrangement similar to
the reference image.
*/

const finalPositions = [
  { left: "0%", top: "72%" },
  { left: "7%", top: "70%" },
  { left: "16%", top: "73%" },
  { left: "25%", top: "69%" },
  { left: "34%", top: "72%" },
  { left: "43%", top: "70%" },
  { left: "52%", top: "73%" },
  { left: "62%", top: "69%" },
  { left: "72%", top: "72%" },
  { left: "81%", top: "69%" },
  { left: "89%", top: "72%" },
  { left: "12%", top: "84%" },
  { left: "31%", top: "84%" },
  { left: "52%", top: "84%" },
  { left: "72%", top: "84%" },
];

/*
============================================================
INDIVIDUAL RAIN TAG
============================================================
*/

function RainTag({
  tag,
  index,
  progress,
}) {
  const position = finalPositions[index];

  /*
  ----------------------------------------------------------
  DIFFERENT STARTING HEIGHTS
  ----------------------------------------------------------

  Every tag begins at a different vertical point.

  Some start much higher than others.

  This creates the actual "rainfall" effect.
  */

  const startY =
    -700 +
    (index % 5) * 95 +
    Math.floor(index / 5) * 45;

  /*
  ----------------------------------------------------------
  DIFFERENT HORIZONTAL MOVEMENT
  ----------------------------------------------------------

  Small horizontal movement makes each tag feel
  independent instead of dropping like one column.
  */

  const startX =
    ((index % 7) - 3) * 45;

  /*
  ----------------------------------------------------------
  STAGGERED SCROLL RANGE
  ----------------------------------------------------------

  Tags don't fall simultaneously.

  The first tags begin falling first.

  Later tags follow behind them.
  */

  const start =
    0.08 + index * 0.025;

  const end =
    start + 0.28;

  /*
  ----------------------------------------------------------
  VERTICAL FALL
  ----------------------------------------------------------
  */

  const y = useTransform(
    progress,
    [start, end],
    [startY, 0]
  );

  /*
  ----------------------------------------------------------
  HORIZONTAL DRIFT
  ----------------------------------------------------------
  */

  const x = useTransform(
    progress,
    [start, end],
    [startX, 0]
  );

  /*
  ----------------------------------------------------------
  ROTATION
  ----------------------------------------------------------

  Starts slightly more rotated and settles into
  the final tag rotation.
  */

  const rotate = useTransform(
    progress,
    [start, end],
    [
      tag.rotate - 15,
      tag.rotate,
    ]
  );

  /*
  ----------------------------------------------------------
  OPACITY
  ----------------------------------------------------------

  Tags appear as they enter the rainfall.
  */

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.04),
      start + 0.06,
    ],
    [0, 1]
  );

  return (
    <motion.span
      style={{
        position: "absolute",

        left: position.left,
        top: position.top,

        backgroundColor: tag.bg,
        color: tag.color || "#000",

        y,
        x,
        rotate,
        opacity,

        zIndex: 10,
      }}
      className={`
        font-accent
        font-semibold
        px-4
        py-2.5
        rounded-xl
        whitespace-nowrap
        shadow-sm
        select-none

        ${tag.big ? "text-base" : "text-sm"}

        ${tag.strike ? "line-through" : ""}
      `}
    >
      {tag.text}
    </motion.span>
  );
}

/*
============================================================
MAIN COMPONENT
============================================================
*/

export default function RoleTags() {
  const tagsRef = useRef(null);

  /*
  ============================================================
  SCROLL PROGRESS
  ============================================================

  The animation is directly connected to scrolling.

  DOWN:
      tags fall

  UP:
      tags rise back

  There is no one-time animation.
  */

  const { scrollYProgress } = useScroll({
    target: tagsRef,

    offset: [
      "start 0.85",
      "end 0.20",
    ],
  });

  return (
    <section
      ref={tagsRef}
      className="px-6 py-24 lg:min-h-[130vh]"
    >
      <div
        className="
          max-w-[1380px]
          mx-auto
          flex
          flex-col
          items-center
        "
      >

        {/* =================================================
            HEADING
            ================================================= */}

        <Reveal
          className="
            flex
            flex-col
            items-center
            gap-8
          "
        >
          <span
            className="
              bg-surface
              border
              border-line
              text-[#8a8d95]
              text-[11px]
              font-semibold
              tracking-[1.32px]
              px-3.5
              py-1.5
              rounded-pill
            "
          >
            YOUR ROLE IS SIMPLE
          </span>

          <h2
            className="
              font-display
              font-bold
              text-3xl
              md:text-[40px]
              tracking-[-0.8px]
              text-center
              max-w-xl
            "
          >
            You create the videos. We handle the rest.
          </h2>
        </Reveal>

        {/* =================================================
            MOBILE / TABLET TAG CLOUD

            The desktop rainfall below places tags with absolute
            left% positions tuned for a ~1320px stage, then drops
            them in with up to 135px of horizontal drift. Neither
            of those numbers means anything on a phone-width
            screen — the tags land (and pass through) past the
            right edge no matter what. Mobile instead gets a
            plain wrapping flex layout: same colors/rotations,
            but it's real document flow, so it can never overflow
            the viewport.
            ================================================= */}

               <div className="lg:hidden mt-10 relative w-full max-w-[420px] h-[400px]">
          {/*
            Compact overlapping cluster, matching the reference — tags
            stack close together with real overlap and mixed rotation,
            not a neatly wrapped list. Positions are hand-placed
            percentages within this fixed-height stage, roughly mirroring
            the reference's 3-row cluster shape.
          */}
          {[
            { top: "2%", left: "2%" },
            { top: "0%", left: "34%" },
            { top: "4%", left: "62%" },
            { top: "14%", left: "0%" },
            { top: "16%", left: "58%" },
            { top: "26%", left: "20%" },
            { top: "24%", left: "68%" },
            { top: "38%", left: "4%" },
            { top: "40%", left: "44%" },
            { top: "50%", left: "16%" },
            { top: "48%", left: "70%" },
            { top: "60%", left: "38%" },
            { top: "62%", left: "0%" },
            { top: "70%", left: "56%" },
            { top: "72%", left: "20%" },
          ].map((pos, index) => {
            const tag = tags[index];
            return (
              <motion.span
                key={`${tag.text}-mobile-${index}`}
                initial={{
                  opacity: 0,
                  y: -80,
                  rotate: tag.rotate - 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: tag.rotate,
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 8) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "absolute",
                  top: pos.top,
                  left: pos.left,
                  backgroundColor: tag.bg,
                  color: tag.color || "#000",
                  zIndex: index,
                }}
                className={`
                  font-accent
                  font-semibold
                  px-3.5
                  py-2
                  rounded-xl
                  whitespace-nowrap
                  shadow-sm
                  select-none

                  ${tag.big ? "text-sm" : "text-xs"}

                  ${tag.strike ? "line-through" : ""}
                `}
              >
                {tag.text}
              </motion.span>
            );
          })}
        </div>

        {/* =================================================
            DESKTOP RAINFALL STAGE (unchanged)
            ================================================= */}

        <div
          className="
            hidden
            lg:block

            relative
            w-full
            max-w-[1320px]
            h-[600px]
            mt-10
            overflow-visible
          "
        >

          {tags.map((tag, index) => (
            <RainTag
              key={`${tag.text}-${index}`}
              tag={tag}
              index={index}
              progress={scrollYProgress}
            />
          ))}

        </div>

      </div>
    </section>
  );
}