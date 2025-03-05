"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "./components/ui/carousel"; // Adjust the import path as needed

export default function Home() {
  const [slides, setSlides] = useState([
    {
      title: "Slide 1",

      // src: URL HERE,
    },
    {
      title: "Slide 2",

      // src: URL HERE,
    },
    {
      title: "Slide 3",

      // src: URL HERE,
    },
    {
      title: "Slide 4",

      // src: URL HERE,
    },
  ]);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <Image
        src="/walking-icon.png"
        alt="Logo"
        width={180}
        height={38}
        priority
      />
      <h1 className="text-5xl font-bold text-center">Sofa to Strider</h1>
      {slides.length > 0 && <Carousel slides={slides} />}
    </main>
  );
}
