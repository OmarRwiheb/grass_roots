"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return null;
};

export default SmoothScroll;
