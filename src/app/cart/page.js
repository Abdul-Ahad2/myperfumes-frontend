import { DM_Sans } from "next/font/google";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import Link from "next/link";

const dmsans = DM_Sans({
  weight: "900",
  subsets: ["latin"],
});
const dmsans_light = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});

const dmsans_base = DM_Sans({
  weight: "600",
  subsets: ["latin"],
});

export default function Cart() {
  return (
    <>
      <div className={dmsans.className}>
        <div className="flex justify-center text-5xl sm:text-9xl m-5 text-white">
          <h1>Cart</h1>
        </div>
      </div>

      <div className="w-full h-auto flex justify-center">
        <div className="w-full md:w-[50%] h-auto text-white sm:bg-slate-700  px-5 py-5 sm:shadow-2xl grid grid-cols-1 gap-1 rounded-md">
          <div className="w-full sm:h-auto h-[10vh]  text-white bg-black rounded-md justify-center items-center flex">
            <div className="w-[30%] md:w-[20%] h-full bg-slate-500 rounded-l-md overflow-hidden cursor-pointer">
              <img
                src="https://images.pexels.com/photos/965731/pexels-photo-965731.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Product Image"
                className="h-full w-full object-cover transform hover:scale-125 transition-transform duration-200"
              />
            </div>
            <div className="w-[70%] md:w-[60%] h-full bg-slate-800 flex items-center p-3">
              <div>
                <h1
                  className={`${dmsans_base.className} text-lg md:text-2xl m-1`}
                >
                  Product Name
                </h1>
                <h1 className={`${dmsans_light.className} text-base m-1`}>
                  $12.00
                </h1>
                <div className="flex items-center">
                  <FaPlusCircle className="m-1 text-base md:text-xl hover:scale-125 transition-all duration-200 cursor-pointer" />
                  <div className="m-1 text-base md:text-xl">1</div>
                  <FaMinusCircle className="m-1 text-base md:text-xl hover:scale-125 transition-all duration-200 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="w-[20%] md:w-[20%] h-full bg-slate-900 rounded-r-md flex justify-center items-center text-2xl md:text-3xl hover:text-3xl md:hover:text-5xl transition-all duration-200">
              <MdDeleteOutline className="cursor-pointer" />
            </div>
          </div>

          <div className={`${dmsans_light.className} text-center mt-3`}>
            <Link
              href={"/checkout"}
              className="w-full sm:h-[8vh] bg-gray-900 rounded-md flex justify-center items-center text-gray-200 text-lg hover:bg-gray-800 hover:scale-95 transition-all duration-500 h-[5vh]"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
