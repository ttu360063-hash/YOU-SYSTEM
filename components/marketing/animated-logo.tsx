"use client";

import { useEffect, useState } from "react";

export function AnimatedLogo() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setAnimate(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <img
      src="/logo-home.png"
      alt="You System"
      className={`mx-auto h-[360px] w-auto max-w-full object-contain sm:h-[460px] lg:h-[560px] ${
        animate ? "logo-enter-active" : "logo-enter-pre"
      }`}
    />
  );
}
