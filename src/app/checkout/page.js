"use client";
import axios from "axios";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export default function Checkout() {
  const [orderItems, setOrderItems] = useState([]);
  const route = useRouter();
  const [userForm, setUserForm] = useState({
    customer_name: "",
    customer_email: "",
    shipping_city: "Select City",
    shipping_address_1: "",
    shipping_address_2: "",
    shipping_house_no: "",
  });
  useEffect(() => {
    (async () => {
      const items = (
        await axios.get("http://localhost:8000/api/cart/getCartItems", {
          params: { userId: localStorage.getItem("userId") },
        })
      ).data.data;
      setOrderItems(items);
    })();
  });
  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

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
                    name="customer_name"
                    value={userForm.customer_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Email"
                    name="customer_email"
                    value={userForm.customer_email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white border-none"
                    onChange={handleChange}
                    value={userForm.shipping_city}
                    name="shipping_city"
                  >
                    <option>Select City</option>
                    <option value={"Islamabad"}>Islamabad</option>
                    <option value={"Lahore"}>Lahore</option>
                    <option value={"Karachi"}>Karachi</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Address 1"
                    name="shipping_address_1"
                    value={userForm.shipping_address_1}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white"
                    placeholder="Address 2 (Optional)"
                    name="shipping_address_2"
                    value={userForm.shipping_address_2}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="h-[7vh] w-full px-2 rounded-md bg-gray-500 placeholder:text-white "
                    placeholder="House No."
                    name="shipping_house_no"
                    value={userForm.shipping_house_no}
                    onChange={handleChange}
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
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await axios.post(
                        "http://localhost:8000/api/order/placeOrder",
                        {
                          user_id: localStorage.getItem("userId"),
                          total_amount: totalPrice,
                          ...userForm,
                        }
                      );
                      toast.message(response.data.data);
                      if (response.data.data == "Order Placed!")
                        route.push("/#explore-section");
                    } catch (error) {
                      toast.message("Error in placing order. Try again later.");
                    }
                    setUserForm({
                      customer_name: "",
                      customer_email: "",
                      shipping_city: "Select City",
                      shipping_address_1: "",
                      shipping_address_2: "",
                      shipping_house_no: "",
                    });
                  }}
                >
                  Place Order
                </button>
              </form>
            </div>

            <div className="w-full h-auto p-11 sm:p-0 bg-gray-800 sm:bg-transparent rounded-md sm:rounded-none">
              <div className=" border-b-4 border-white rounded-sm">
                {orderItems.map((val) => {
                  return (
                    <>
                      <div className="text-white flex items-center justify-between">
                        <span className={`${dmsans_base.className} text-xl`}>
                          <p className="m-2">{val.title}</p>
                          <p className="m-2 text-sm">Qty: {val.quantity}</p>
                        </span>
                        <span className={`${dmsans_light.className} text-xl`}>
                          ${val.price}.00
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="text-white flex items-center justify-between mt-3">
                <span className={`${dmsans.className} text-4xl`}>Total</span>
                <span className={`${dmsans_light.className} text-3xl`}>
                  ${totalPrice}.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
