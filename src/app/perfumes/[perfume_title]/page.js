import { DM_Sans } from "next/font/google";
import { IoIosThumbsDown } from "react-icons/io";
import { IoIosThumbsUp } from "react-icons/io";

const dmsans = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});
const dmsans_bold = DM_Sans({
  weight: "900",
  subsets: ["latin"],
});

const dmsans_base = DM_Sans({
  weight: "600",
  subsets: ["latin"],
});

export default function product(context) {
  const { perfume_title } = context.params;
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
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
            <div className="w-full sm:h-[57vh] h-[47vh] bg-gray-600 rounded-md shadow-2xl relative">
              <div className="sm:h-[40vh] h-[30vh] w-full relative">
                <img
                  src="https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Product Image"
                  className="h-full w-full object-cover rounded-t-md"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity rounded-t-md flex items-center justify-center h-auto duration-300 p-10">
                  <div>
                    <p className="text-white text-xl text-center">
                      A sophisticated blend of floral and woody notes, ideal for
                      everyday elegance and allure.
                    </p>
                    <div className="text-white flex justify-center h-auto text-2xl">
                      <IoIosThumbsUp className="m-2 hover:text-gray-500 hover:scale-125 cursor-pointer transition-all duration-300 " />
                      <div className="text-base m-2 ">12.3k</div>
                      <IoIosThumbsDown className="m-2 hover:text-gray-500 hover:scale-125 cursor-pointer transition-all duration-300 " />
                      <div className="text-base m-2">10.7k</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[7vh] w-full bg-gray-700 flex items-center justify-center text-gray-200 text-2xl">
                <div className={`${dmsans_base.className} tracking-tighter`}>
                  Perfume Title
                </div>
              </div>
              <div className="h-[10vh] w-full flex">
                <div className="w-[40%] bg-gray-800 rounded-bl-md flex items-center justify-center text-gray-200 text-2xl">
                  <h1 className="tracking-tighter">$1,200.00</h1>
                </div>
                <button className="w-[60%] bg-gray-900 rounded-br-md flex items-center justify-center text-gray-200 text-2xl hover:bg-gray-600 hover:scale-95 transition-transform duration-200">
                  <h1 className={`${dmsans_bold.className} tracking-tighter`}>
                    Add To Cart
                  </h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
