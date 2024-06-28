"use client";

import { DM_Sans } from "next/font/google";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const dmsans = DM_Sans({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});
const dmsans_light = DM_Sans({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

const dmsans_base = DM_Sans({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/cart/getCartItems",
          {
            params: { userId: localStorage.getItem("userId") },
          }
        );
        if (response.status === 200) {
          setCartItems(response.data.data);
        } else {
          toast.error(`Error: ${response.data.message}`);
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }
    };

    fetchCartItems();
  });

  return (
    <>
      <div className={dmsans.className}>
        <div className="flex justify-center text-5xl sm:text-9xl m-5 text-white">
          <h1>Cart</h1>
        </div>
      </div>

      <div className="w-full h-auto flex justify-center">
        <div className="w-full md:w-[50%] h-auto text-gray-200 sm:bg-gray-300 border-4 sm:border-black border-none  p-5 sm:shadow-2xl grid grid-cols-1 gap-1 ">
          {cartItems.length === 0 ? (
            <h1
              className={`${dmsans_light.className} text-center text-gray-200 sm:text-black text-6xl`}
            >
              Your cart is empty.
            </h1>
          ) : (
            cartItems.map((val) => {
              return (
                <>
                  <div className="w-full h-auto text-white bg-black rounded-md justify-center items-center flex">
                    <div className="w-[30%] md:w-[20%] relative overflow-hidden cursor-pointer border-2 border-black border-r-0">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <img
                          src={val.src}
                          alt="Product Image"
                          className="absolute top-0 left-0 h-full w-full object-cover transform hover:scale-125 transition-transform duration-500"
                        />
                      </div>
                      <div
                        className="w-full"
                        style={{ paddingBottom: "100%" }}
                      ></div>
                    </div>
                    <div className="w-[40%] md:w-[60%] h-full bg-gray-100 flex items-center  text-gray-900 border-2 border-black">
                      <div>
                        <h1
                          className={`${dmsans_base.className} text-lg md:text-2xl m-1`}
                        >
                          {val.title}
                        </h1>
                        <h1
                          className={`${dmsans_light.className} text-base m-1`}
                        >
                          ${val.price}.00
                        </h1>
                        <div className="flex items-center">
                          <FaPlusCircle
                            className="m-1 text-base md:text-xl hover:scale-125 transition-all duration-200 cursor-pointer"
                            onClick={async () => {
                              try {
                                await axios.put(
                                  "http://localhost:8000/api/cart/addQuantity",
                                  {
                                    userId: localStorage.getItem("userId"),
                                    title: val.title,
                                  }
                                );
                              } catch (error) {
                                toast.message(
                                  "Network Error. Please try again later."
                                );
                              }
                            }}
                          />
                          <div className="m-1 text-base md:text-xl">
                            {val.quantity}
                          </div>
                          <FaMinusCircle
                            className="m-1 text-base md:text-xl hover:scale-125 transition-all duration-200 cursor-pointer"
                            onClick={async () => {
                              try {
                                const res = await axios.put(
                                  "http://localhost:8000/api/cart/subtractQuantity",
                                  {
                                    userId: localStorage.getItem("userId"),
                                    title: val.title,
                                  }
                                );
                                if (res.status == 203) {
                                  toast.success(res.data.data);
                                }
                              } catch (error) {
                                toast.message(
                                  "Network Error. Please try again later."
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-[30%] md:w-[20%] h-auto text-gray-900 bg-gray-300 flex justify-center items-center text-2xl md:text-3xl border-2 border-black border-l-0"
                      style={{ aspectRatio: "1" }}
                      onClick={async () => {
                        try {
                          const message = await axios.delete(
                            `http://localhost:8000/api/cart/deleteCartItem/${encodeURIComponent(
                              val.title
                            )}/${encodeURIComponent(
                              localStorage.getItem("userId")
                            )}`
                          );

                          toast.success(message.data.data);
                        } catch (error) {
                          console.log("Error deleting from cart", error);
                        }
                      }}
                    >
                      <MdDeleteOutline className="cursor-pointer" />
                    </div>
                  </div>
                </>
              );
            })
          )}

          <div className={`${dmsans_base.className} text-center mt-3`}>
            <Link
              href={cartItems.length != 0 ? "/checkout" : ""}
              onClick={() => {
                if (cartItems.length == 0) {
                  toast.message("Cannot proceed with empty cart");
                }
              }}
              className="w-full  bg-gray-400 rounded-none flex justify-center items-center text-gray-900 text-lg hover:bg-gray-700 hover:text-gray-100  border-2 border-black hover:scale-95 transition-all duration-500 h-[8vh]"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
