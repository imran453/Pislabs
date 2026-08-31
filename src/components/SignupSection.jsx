import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

function Field({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required,
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <label className="text-brand text-[11px] font-semibold tracking-[1.32px]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          bg-surface
          border
          border-line
          h-[46px]
          rounded-[10px]
          px-4
          text-sm
          text-black
          placeholder:text-[#8a8d95]
          outline-none
          focus:border-brand
          transition-colors
          w-full
        "
      />
    </div>
  );
}

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  experience: "",
};

export default function SignupSection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <section
      id="signup"
      className="
        bg-brand
        px-6
        py-24
        flex
        flex-col
        items-center
      "
    >

      {/* ==================================================
          SECTION INTRO
          ================================================== */}

      <Reveal
        className="
          flex
          flex-col
          gap-6
          items-center
          text-center
          max-w-[700px]
        "
      >

        <span
          className="
            bg-white
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
          JOIN WAITLIST
        </span>

        <h2
          className="
            font-display
            font-bold
            text-3xl
            md:text-[40px]
            text-white
            tracking-[-0.8px]
          "
        >
          Be there when the channel starts.
        </h2>

        <p
          className="
            text-white/65
            text-[17px]
            leading-[1.55]
            max-w-[560px]
          "
        >
          We're building the first generation of creators behind Stiteramp.
          Join early and help shape what the channel becomes.
        </p>

      </Reveal>


      {/* ==================================================
          SIGNUP FORM
          ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 32,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.3,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mt-12
          bg-white
          rounded-[20px]
          p-6
          sm:p-10
          w-full
          max-w-[560px]
          overflow-hidden
        "
      >

        <AnimatePresence mode="wait">

          {!submitted ? (

            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                flex
                flex-col
                gap-5
              "
            >

              {/* FORM TITLE */}

              <p
                className="
                  text-[#8a8d95]
                  text-[11px]
                  font-semibold
                  tracking-[1.32px]
                "
              >
                CREATOR APPLICATION
              </p>


              {/* ==================================================
                  NAME + EMAIL
                  ================================================== */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-5
                "
              >

                <Field
                  label="Full name"
                  placeholder="Your name"
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                />

                <Field
                  label="Email"
                  placeholder="you@email.com"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  required
                />

              </div>


              {/* ==================================================
                  WHATSAPP NUMBER
                  ================================================== */}

              <Field
                label="WhatsApp number"
                placeholder="+234 800 000 0000"
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={update}
                required
              />


              {/* ==================================================
                  VIDEO EDITING EXPERIENCE
                  ================================================== */}

              <div className="flex flex-col gap-2">

                <label
                  className="
                    text-brand
                    text-[11px]
                    font-semibold
                    tracking-[1.32px]
                  "
                >
                  Video editing experience
                </label>

                <select
                  name="experience"
                  value={form.experience}
                  onChange={update}
                  required
                  className="
                    bg-surface
                    border
                    border-line
                    h-[46px]
                    rounded-[10px]
                    px-4
                    text-sm
                    text-black
                    outline-none
                    focus:border-brand
                    transition-colors
                    w-full
                  "
                >

                  <option value="" disabled>
                    Select your experience level
                  </option>

                  <option value="Beginner">
                    Beginner
                  </option>

                  <option value="Intermediate">
                    Intermediate
                  </option>

                  <option value="Advanced">
                    Advanced
                  </option>

                  <option value="Professional">
                    Professional
                  </option>

                </select>

              </div>


              {/* ==================================================
                  SUBMIT BUTTON
                  ================================================== */}

              <button
                type="submit"
                className="
                  bg-brand
                  text-white
                  text-[15px]
                  font-medium
                  py-4
                  rounded-pill
                  hover:bg-brand-dark
                  transition-colors
                "
              >
                Join the Founding Community
              </button>


              {/* DISCLAIMER */}

              <p
                className="
                  text-[#8a8d95]
                  text-[13px]
                  text-center
                "
              >
                Free to join. No guaranteed earnings.
              </p>

            </motion.form>

          ) : (

            /* ==================================================
               SUCCESS MESSAGE
               ================================================== */

            <motion.div
              key="success"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="
                flex
                flex-col
                items-center
                text-center
                gap-4
                py-6
              "
            >

              {/* CHECK ICON */}

              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2,
                }}
                className="
                  size-16
                  rounded-full
                  bg-[#f0ebfd]
                  flex
                  items-center
                  justify-center
                "
              >

                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5b2bd9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>

              </motion.div>


              {/* SUCCESS TITLE */}

              <p
                className="
                  font-display
                  font-bold
                  text-2xl
                  text-black
                "
              >
                You're on the list
                {form.name
                  ? `, ${form.name.split(" ")[0]}`
                  : ""}
                !
              </p>


              {/* SUCCESS MESSAGE */}

              <p
                className="
                  text-[#54585f]
                  text-[15px]
                  leading-relaxed
                  max-w-[380px]
                "
              >
                We'll reach out at{" "}
                {form.email || "the email you provided"}{" "}
                as soon as the founding creator community
                opens up. Keep an eye on your inbox.
              </p>


              {/* RESET */}

              <button
                onClick={resetForm}
                className="
                  mt-2
                  text-brand-dark
                  text-sm
                  font-medium
                  hover:underline
                "
              >
                Submit another application
              </button>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </section>
  );
}