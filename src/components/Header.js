"use client";
import { DM_Sans, Dancing_Script } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_initialize from "./firebase-config";

import { signInController, signOutController } from "./googleAuth";

const dancing_script = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});

export default function Header() {
  const auth = getAuth(firebase_initialize);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);
  const [categoryHeight, setCategoryHeight] = useState("0px");
  const categoryRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        user.getIdToken().then((token) => setToken(token));
        localStorage.setItem("username", user.displayName);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.uid);
      } else {
        setUserName("");
        setUserEmail("");
        setToken("");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCategories = () => {
    setAreCategoriesVisible(!areCategoriesVisible);
  };

  useEffect(() => {
    if (areCategoriesVisible) {
      setCategoryHeight(`${categoryRef.current.scrollHeight}px`);
    } else {
      setCategoryHeight("0px");
    }
  }, [areCategoriesVisible]);

  return (
    <>
      <div className="bg-black w-full h-[10vh] flex justify-between items-center relative">
        <div
          onClick={toggleDrawer}
          className="text-white text-xl sm:text-3xl mx-7 cursor-pointer relative"
        >
          <RxHamburgerMenu />
        </div>

        <div className={dancing_script.className}>
          <Link href="/" className="text-white text-4xl">
            MyPerfumes.
          </Link>
        </div>

        <Link href="/cart" className="text-white text-2xl sm:text-4xl mx-7">
          <CiShoppingCart />
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-black text-white z-50 transition-transform transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } ${dmsans.className}`}
      >
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4 text-2xl"
        >
          <IoIosCloseCircle />
        </button>
        <div className="px-4 py-2 my-14">
          <p className="text-2xl text-white">{userName}</p>
          <p className="text-base text-gray-300">{userEmail}</p>
        </div>
        <nav className="flex flex-col mt-2 space-y-4">
          <Link href="/" className="text-xl px-4 py-2">
            <div className="flex">
              <GoHome className="mr-2 text-2xl" />
              Home
            </div>
          </Link>
          <Link href="/#explore-section" className="text-xl px-4 py-2">
            <div className="flex">
              <AiOutlineProduct className="mr-2 text-2xl" />
              Products
            </div>
          </Link>
          <Link href="/cart" className="text-xl px-4 py-2">
            <div className="flex">
              <CiShoppingCart className="mr-2 text-2xl" />
              Cart
            </div>
          </Link>
          <div>
            <h1
              onClick={toggleCategories}
              className="text-xl px-4 py-2 cursor-pointer flex items-center"
            >
              {areCategoriesVisible ? (
                <>
                  <IoIosArrowDown className="mr-2 text-2xl" />
                  Categories
                </>
              ) : (
                <>
                  <IoIosArrowForward className="mr-2 text-2xl" />
                  Categories
                </>
              )}
            </h1>
            <div
              ref={categoryRef}
              style={{ height: categoryHeight }}
              className="overflow-hidden transition-all duration-300"
            >
              <div className="flex flex-col space-y-2 ml-10 mt-3">
                <Link href="/perfumes/musks" className="text-lg px-4 py-1">
                  Musks
                </Link>
                <Link href="/perfumes/coaches" className="text-lg px-4 py-1">
                  Coaches
                </Link>
                <Link href="/perfumes/scents" className="text-lg px-4 py-1">
                  Scents
                </Link>
                <Link href="/perfumes/locals" className="text-lg px-4 py-1">
                  Locals
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 w-full">
          {!token ? (
            <>
              <button
                className="flex  items-center text-base px-4 py-8 w-full rounded-lg text-center font-extrabold bg-white text-black justify-center"
                onClick={signInController}
              >
                <FaGoogle className="text-5xl mr-2" />
                <span className=" underline">Sign in with Google</span>
              </button>
            </>
          ) : (
            <>
              <Link href={"/"}>
                <button
                  className="flex  items-center text-base px-4 py-8 w-full rounded-lg text-center font-extrabold bg-white text-black justify-center"
                  onClick={signOutController}
                >
                  <span className="text-2xl underline">Logout</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}
