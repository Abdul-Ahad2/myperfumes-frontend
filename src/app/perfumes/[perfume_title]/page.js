"use client";

import axios from "axios";
import { DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { IoIosThumbsDown } from "react-icons/io";
import { IoIosThumbsUp } from "react-icons/io";
import { Toaster, toast } from "sonner";

const dmsans_bold = DM_Sans({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

export default function product(context) {
  const [products, setProducts] = useState([]);
  const { perfume_title } = context.params;
  useEffect(() => {
    (async () => {
      try {
        setProducts(
          (
            await axios.get(
              `http://localhost:8000/api/products/get${perfume_title}`
            )
          ).data.data
        );
      } catch (error) {
        toast.message("Network Error. Please try again later.");
      }
    })();
  });

  return (
    <>
      <div>
        <div className={` ${dmsans_bold.className}`}>
          <div className="flex justify-center text-6xl sm:text-9xl m-5 text-white">
            <h1>
              {perfume_title.charAt(0).toUpperCase() + perfume_title.slice(1)}
            </h1>
          </div>
        </div>

        <div className="w-full sm:px-24 sm:py-10 p-4">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-10">
            {products.map((val) => {
              return (
                <>
                  <div className="w-full sm:h-[57vh] h-[47vh] bg-gray-100 border-8 border-gray-100  shadow-2xl relative">
                    <div className="sm:h-[40vh] h-[30vh] w-full relative">
                      <img
                        src={val.src}
                        className="h-full w-full object-cover rounded-none"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity rounded-none flex items-center justify-center h-auto duration-300 p-10">
                        <div>
                          <p className="text-white text-xl text-center">
                            {val.description}
                          </p>
                          <div className="text-white flex justify-center h-auto text-2xl">
                            <IoIosThumbsUp className="m-2 hover:text-gray-500 hover:scale-125 cursor-pointer transition-all duration-300 " />
                            <div className="text-base m-2 ">{val.likes}</div>
                            <IoIosThumbsDown className="m-2 hover:text-gray-500 hover:scale-125 cursor-pointer transition-all duration-300 " />
                            <div className="text-base m-2">{val.dislikes}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[9vh] flex items-center p-2 w-full bg-gray-100 text-gray-900 text-2xl justify-between">
                      <div>
                        <div
                          className={`${dmsans_bold.className} tracking-tighter`}
                        >
                          {val.title}
                        </div>
                        <div className="text-base">{val.small_desc}</div>
                      </div>
                      <h1
                        className={`${dmsans_bold.className} tracking-tighter`}
                      >
                        ${val.price}.00
                      </h1>
                    </div>

                    <div className="h-[6vh] w-full flex">
                      <button
                        className="w-full bg-gray-700  flex items-center justify-center text-gray-100 text-2xl hover:bg-gray-900 hover:scale-95 transition-all hover:text-gray-100 duration-500 border-2 rounded-md"
                        onClick={async () => {
                          try {
                            const check = await axios.post(
                              "http://localhost:8000/api/cart/addCartItem",
                              {
                                user_id: localStorage.getItem("userId"),
                                title: val.title,
                                price: val.price,
                                src: val.src,
                              }
                            );
                            toast.success(check.data.data);
                          } catch (error) {
                            toast.error("Error in adding to cart");
                          }
                        }}
                      >
                        <h1
                          className={`${dmsans_bold.className} tracking-tighter`}
                        >
                          Add To Cart
                        </h1>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
