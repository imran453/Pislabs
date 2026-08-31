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
      className="px-6 py-24 min-h-[130vh]"
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
            RAINFALL STAGE
            ================================================= */}

        <div
          className="
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