import type { Variants, Transition } from "framer-motion";

export const easeLux: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: easeLux } },
};

export const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: easeLux } },
};

export const float: Variants = {
  show: { y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
};
