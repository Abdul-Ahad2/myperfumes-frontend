"use client";
import { useState } from "react";
import { DM_Sans } from "next/font/google";
import { homePageImages } from "@/components/homepage-image";
import Link from "next/link";

const dmsans = DM_Sans({
  weight: "900",
  subsets: ["latin"],
});

export default function Home() {
  const [isSmoothScrolling, setIsSmoothScrolling] = useState(false);

  const handleScrollToExplore = () => {
    setIsSmoothScrolling(true);
    const exploreSection = document.getElementById("explore-section");
    if (exploreSection) {
      exploreSection.scrollIntoView({
        behavior: "smooth",
      });
      setTimeout(() => {
        setIsSmoothScrolling(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-3">
        <div className="relative shadow-2xl">
          <video
            className="object-cover w-full h-[50vh] sm:h-[80vh] rounded-3xl"
            autoPlay
            loop
            muted
          >
            <source src="/homepage-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-3xl">
            <div className={dmsans.className}>
              <p className="text-white text-center text-5xl sm:text-9xl tracking-tighter leading-0">
                The best collection of Perfumes
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleScrollToExplore}
                  className="text-opacity-0 text-center bg-white px-7 py-5 mt-5 text-lg sm:text-xl transition-all duration-500 hover:rounded-xl"
                >
                  Get Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="explore-section" className={dmsans.className}>
        <div className="flex justify-center text-5xl sm:text-9xl m-5 text-white">
          <h1>Explore</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 px-5 sm:px-40 cursor-pointer">
        {homePageImages.map((value) => (
          <Link href={`/perfumes/${value.label}`} key={value.id}>
            <div className="relative shadow-2xl group overflow-hidden">
              <img
                className="object-cover w-full h-[40vh] sm:h-[70vh] rounded-3xl"
                src={value.src}
                alt={value.label}
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-3xl transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={dmsans.className}>
                  <p className="text-white text-[70px] tracking-tight m-7">
                    {value.label.charAt(0).toUpperCase() + value.label.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
