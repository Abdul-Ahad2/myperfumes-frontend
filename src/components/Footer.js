"use client";
import axios from "axios";
import { DM_Sans } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { useState } from "react";
import {
  AiFillMail,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { toast } from "sonner";

const dmsans = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});

const dancing_script = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function Footer() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <>
      <div className={dmsans.className}>
        <div className="h-[25vh] w-full bg-black text-white mt-36 md:flex md:justify-between sm:justify-center items-center pt-1 sm:flex-row">
          <div className={dancing_script.className}>
            <h1 className="m-4 text-3xl text-center sm:pt-2">MyPerfumes.</h1>
          </div>
          <div className="text-center">
            <p>Subscribe to get latest updates.</p>
            <div className="">
              <input
                className="pl-3 pr-16 py-3 rounded-md text-black m-2 focus:outline-white"
                type="email"
                name="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              <button
                className="bg-gray-700 py-3 px-3 rounded-md"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      "https://myperfumes-backend.onrender.com/api/user/subscribeUser",
                      { email: userEmail }
                    );
                    toast.success(response.data.data);
                    setUserEmail("");
                  } catch (error) {
                    toast.success(error.response.data.data);
                  }
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex justify-center space-x-3 text-2xl m-4 sm:justify-center">
            <AiFillMail />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
          </div>
        </div>

        <div className=" sm:h-[5vh] h-[12vh] w-full bg-black flex justify-center items-center text-white text-sm md:text-base pt-4">
          © MyPerfumes. | All Rights Reserved | {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
