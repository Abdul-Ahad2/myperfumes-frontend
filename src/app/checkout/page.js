import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  weight: "900",
  subsets: ["latin"],
});
const dmsans_light = DM_Sans({
  weight: "300",
  subsets: ["latin"],
});

const dmsans_base = DM_Sans({
  weight: "500",
  subsets: ["latin"],
});

export default function Checkout() {
  return (
    <>
      <div className={` ${dmsans.className}`}>
        <div className="flex justify-center text-6xl sm:text-9xl m-5 text-white">
          <h1>Checkout</h1>
        </div>
      </div>

      <div className=" w-full h-auto flex justify-center items-center mt-20">
        <div className="w-full md:mx-28 mx-2">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="h-auto w-full flex items-center justify-center bg-gray-600 p-4 rounded-lg shadow-2xl">
              <form
                className={`${dmsans_light.className} text-white  grid grid-cols-1 gap-2 w-full`}
              >
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <select className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white border-none">
                    <option>Select City</option>
                    <option>Islamabad</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Address 1"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Address 2 (Optional)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white "
                    placeholder="House No."
                  />
                </div>
                <div className="mt-3">
                  <label className="text-lg">Payment Method</label>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2  rounded-md bg-gray-500 placeholder:text-gray-300"
                    placeholder="Cash On Delivery"
                    disabled
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-gray-800 h-[7vh] rounded-md hover:bg-gray-700 transition-colors duration-300 "
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="w-full h-auto p-11 sm:p-0 bg-gray-800 sm:bg-transparent rounded-md sm:rounded-none">
              <div className=" border-b-4 border-white rounded-sm">
                <div className="text-white flex items-center justify-between">
                  <span className={`${dmsans_base.className} text-xl`}>
                    <p className="m-2">Scent - The Queen Saleo</p>
                    <p className="m-2 text-sm">Qty: 1</p>
                  </span>
                  <span className={`${dmsans_light.className} text-xl`}>
                    $90.00
                  </span>
                </div>
                <div className="text-white flex items-center justify-between">
                  <span className={`${dmsans_base.className} text-xl`}>
                    <p className="m-2">Local - Humongous Spacio</p>
                    <p className="m-2 text-sm">Qty: 2</p>
                  </span>
                  <span className={`${dmsans_light.className} text-xl`}>
                    $60.00
                  </span>
                </div>
                <div className="text-white flex items-center justify-between">
                  <span className={`${dmsans_base.className} text-xl`}>
                    <p className="m-2">Coach - The Black Nigga</p>
                    <p className="m-2 text-sm">Qty: 5</p>
                  </span>
                  <span className={`${dmsans_light.className} text-xl`}>
                    $50.00
                  </span>
                </div>
              </div>
              <div className="text-white flex items-center justify-between mt-3">
                <span className={`${dmsans.className} text-4xl`}>Total</span>
                <span className={`${dmsans_light.className} text-3xl`}>
                  $200.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
