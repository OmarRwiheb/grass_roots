"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import AboutSection from "./AboutSection";
import Stores from "./Stores";
import Game from "./Game";

const HomeContent = ({ products }) => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 200,
      once: true,
    });
  }, []);

  return (
    <main className="m-auto text-white overflow-x-clip">
      <Hero />
      <FeaturedProducts products={products} />
      <AboutSection />
      <Stores />
      <Game />
    </main>
  );
};

export default HomeContent;
