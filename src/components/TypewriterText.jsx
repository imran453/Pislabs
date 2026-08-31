import { useEffect, useState } from "react";

/**
 * Faithful recreation of the sendpotion.com hero interaction: a word is
 * typed out character by character, pauses, then deletes character by
 * character before the next word types in — with a blinking text-cursor
 * the whole time. (Not a slide/fade swap — an actual typewriter.)
 */
export default function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseAfterType = 1400,
  pauseAfterDelete = 300,
  className = "",
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(
          () => setPhase("pausing"),
          pauseAfterType
        );
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(
        () => setPhase("deleting"),
        0
      );
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
      } else {
        timeout = setTimeout(() => {
          setWordIndex(
            (i) => (i + 1) % words.length
          );

          setPhase("typing");
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    phase,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  const longest = words.reduce((a, b) =>
    a.length > b.length ? a : b
  );

  return (
    <span
      className={`relative inline-block text-left align-bottom ${className}`}
    >
      {/* Invisible spacer reserves width of the longest word so the
          layout never reflows as characters are typed/deleted */}
      <span className="invisible">
        {longest}_
      </span>

      {/* Typewriter text + cursor */}
      <span className="absolute inset-0 text-black whitespace-nowrap">
        {text}

        {/* Blinking black cursor */}
        <span className="inline-block w-[0.06em] animate-caret">
          _
        </span>
      </span>
    </span>
  );
}