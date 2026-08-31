import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

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
============================================================
*/

export default function HowItWorks() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });


  /*
  ============================================================
  HEADING
  ============================================================

  Visible only when the section is exactly at the beginning.

  As soon as scrolling starts:
      opacity = 0

  It stays completely invisible while scrolling.

  It only appears again when the section returns
  completely to the top.

  There is NO background/frame behind the heading.
  ============================================================
  */

  const headingOpacity = useTransform(
  scrollYProgress,
  (value) => (value <= 0 ? 1 : 0)
);

  /*
  ============================================================
  TRACK
  ============================================================

  rowHeight controls the distance between each step.

  titleSpacing gives the first card/content extra breathing
  room below the heading.

  The same amount is added to the total track movement so
  the LAST CARD stays in the same position as before.
  ============================================================
  */

  const rowHeight = 560;

  // Extra space between the heading area and the first content.
  const titleSpacing = 120;

  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      -(
        rowHeight * (steps.length - 1) +
        titleSpacing
      ),
    ]
  );


  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="
        relative
        h-[400vh]
        bg-black
        text-white
      "
    >

      {/* ====================================================
          STICKY FRAME
          ==================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-black
        "
      >


        {/* ==================================================
            HEADING

            NO BACKGROUND.

            ONLY THE TEXT.

            It is centered at the top.

            It disappears completely once scrolling starts.
            ================================================== */}

        <motion.div
          style={{
            opacity: headingOpacity,
          }}
          className="
            absolute
            top-[55px]

            left-1/2
            -translate-x-1/2

            z-[500]

            flex
            flex-col
            items-center
            justify-center

            text-center

            pointer-events-none
            whitespace-nowrap

            w-max
          "
        >

          {/* FIRST LINE */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <span
              className="
                font-display
                font-bold

                text-[38px]
                md:text-[48px]

                leading-none
              "
            >
              How
            </span>


            <span
              className="
                bg-brand
                text-black

                px-3
                py-1

                rounded-full

                font-display
                font-bold

                text-[38px]
                md:text-[48px]

                leading-none
              "
            >
              PIS labs
            </span>

          </div>


          {/* SECOND LINE */}

          <span
            className="
              font-display
              font-bold

              text-[38px]
              md:text-[48px]

              leading-none

              mt-1
            "
          >
            works
          </span>

        </motion.div>


        {/* ==================================================
            CONTENT FRAME

            overflow-visible is preserved so the final card
            does NOT get clipped.
            ================================================== */}

        <div
          className="
            absolute
            inset-0

            max-w-[1100px]
            mx-auto

            px-6
            md:px-10

            overflow-visible
          "
        >

          {/* =================================================
              VERTICAL TRACK

              EXTRA TOP SPACING IS ADDED HERE.

              This pushes the first card/content lower,
              creating a clear gap below the heading.

              The bottom spacing remains unchanged so the
              final card behavior is preserved.
              ================================================= */}

          <motion.div
            style={{
              y: trackY,
            }}
            className="
              relative
              w-full

              flex
              flex-col

              overflow-visible

              pt-[calc((100vh-560px)/2+120px)]
              pb-[calc((100vh-560px)/2)]
            "
          >

            {steps.map((step, index) => (
              <StepRow
                key={step.num}
                step={step}
                index={index}
              />
            ))}

          </motion.div>

        </div>


        {/* ==================================================
            STEP INDICATORS
            ================================================== */}

        <div
          className="
            absolute

            right-6
            md:right-10

            bottom-8

            z-[600]

            flex
            flex-col
            gap-2
          "
        >

          {steps.map((_, index) => (
            <StepIndicator
              key={index}
              index={index}
              progress={scrollYProgress}
            />
          ))}

        </div>

      </div>

    </section>
  );
}


/*
============================================================
STEP ROW
============================================================
*/

function StepRow({ step }) {
  return (
    <div
      className="
        relative

        h-[560px]
        w-full

        shrink-0

        flex
        items-center

        overflow-visible
      "
    >

      {/* ==================================================
          LEFT CONTENT
          ================================================== */}

      <div
        className="
          w-[46%]

          flex
          flex-col
          justify-center

          pr-6
          md:pr-10
        "
      >

        {/* NUMBER */}

        <p
          className="
            font-display
            font-semibold

            text-[42px]
            md:text-[52px]

            leading-none

            text-white
          "
        >
          {step.num}
        </p>


        {/* TITLE */}

        <p
          className="
            font-display
            font-bold

            text-[32px]
            md:text-[42px]

            leading-[1.05]

            tracking-[-1px]

            text-white

            mt-5
          "
        >
          {step.title}
        </p>


        {/* BODY */}

        <p
          className="
            font-display
            font-normal

            text-[20px]
            md:text-[25px]

            leading-[1.15]

            text-white/70

            mt-2

            max-w-[400px]
          "
        >
          {step.body}
        </p>

      </div>


      {/* ==================================================
          RIGHT VIDEO CARD
          ================================================== */}

      <div
        className="
          w-[54%]

          flex
          items-center
          justify-center

          pl-4

          overflow-visible
        "
      >

        <div
          className="
            relative

            w-[250px]
            md:w-[280px]
            lg:w-[320px]

            aspect-[9/14]

            rounded-[20px]

            overflow-hidden

            shrink-0

            shadow-[0_25px_70px_rgba(0,0,0,0.35)]
          "
          style={{
            backgroundColor: step.cardBg,
          }}
        >

          {/* VIDEO */}

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover
            "
          >

            <source
              src={step.video}
              type="video/mp4"
            />

          </video>


          {/* OVERLAY */}

          <div
            className="
              absolute
              inset-0

              bg-black/[0.03]

              pointer-events-none
            "
          />


          {/* BORDER */}

          <div
            className="
              absolute
              inset-0

              rounded-[20px]

              border
              border-white/10

              pointer-events-none
            "
          />

        </div>

      </div>

    </div>
  );
}


/*
============================================================
STEP INDICATOR
============================================================
*/

function StepIndicator({ index, progress }) {

  const start = index / steps.length;
  const center = (index + 0.5) / steps.length;
  const end = (index + 1) / steps.length;


  const opacity = useTransform(
    progress,
    [
      Math.max(0, start),
      center,
      Math.min(1, end),
    ],
    [
      0.3,
      1,
      0.3,
    ]
  );


  const scale = useTransform(
    progress,
    [
      Math.max(0, start),
      center,
      Math.min(1, end),
    ],
    [
      1,
      1.5,
      1,
    ]
  );


  return (
    <motion.span
      style={{
        opacity,
        scale,
      }}
      className="
        block
        size-2
        rounded-full
        bg-white
      "
    />
  );
}