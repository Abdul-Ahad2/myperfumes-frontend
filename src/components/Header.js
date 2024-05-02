"use client";
import { DM_Sans, Dancing_Script } from "next/font/google";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

const dancing_script = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <>
      <div className="bg-black w-full h-[10vh] flex justify-between items-center relative">
        <Link
          href={"/"}
          className="text-white text-xl sm:text-3xl mx-7 cursor-pointer relative"
        >
          <AiOutlineHome />
        </Link>

        <div className={dancing_script.className}>
          <Link href={"/"} className="text-white text-4xl">
            MyPerfumes.
          </Link>
        </div>

        <Link href="/cart" className="text-white text-2xl sm:text-4xl mx-7">
          <CiShoppingCart />
        </Link>
      </div>
    </>
  );
}
