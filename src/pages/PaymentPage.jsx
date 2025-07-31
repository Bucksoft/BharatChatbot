import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/userStore";
import { BiCheck, BiCopy } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { HiKey } from "react-icons/hi";

const PaymentPage = () => {
  const { id } = useParams();
  const { user, activePlan } = useAuthStore();
  const [paymentResponse, setPaymentResponse] = useState();
  const [APIvisibility, setAPIvisibility] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isActive, setIsActive] = useState(false);

  console.log(activePlan);

  useEffect(() => {
    async function getPlanById() {
      try {
        const res = await axiosInstance.get(`plan/${id}`, {
          withCredentials: true,
        });
        setCurrentPlan(res.data);
      } catch (error) {
        console.log("ERROR IN FETCHING CURRENT PLAN DETAIlS : ", error);
      }
    }
    getPlanById();
  }, []);

  const handlePayment = async () => {
    if (activePlan) {
      setIsActive(true);
      return;
    }
    try {
      const amountInPaise = currentPlan?.price * 100;
      const res = await axiosInstance.post(
        "payment/create-order",
        {
          amount: amountInPaise,
          currency: "INR",
        },
        {
          withCredentials: true,
        }
      );
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: "INR",
        name: "BuckBot",
        description: `Payment for ${currentPlan?.name} plan`,
        order_id: res.data.orderId,
        handler: async function (response) {
          console.log(response);
          try {
            const verifyRes = await axiosInstance.post("payment/verify-order", {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: user?._id,
              planType: currentPlan?.name,
              planId: currentPlan?._id,
              planCredits: currentPlan?.totalCredits,
              price: currentPlan?.price,
            });
            if (verifyRes.data.success) {
              setPaymentResponse(verifyRes?.data);
            }
            if (verifyRes.data.success) {
              toast.success("Payment successfull");
            }
          } catch (error) {
            toast.error("Payment verification failed");
            console.log("ERRROR", error);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#528FF0",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("ERROR IN MAKING PAYMENT, ", error);
    }
  };

  const { darkMode } = useAuthStore();

  return (
    <main className="p-2 ">
      <section className="w-full  rounded-lg p-2 h-full flex items-center justify-start px-8 gap-2">
        <div className="w-full ">
          <div className="flex border-b pb-5 border-b-zinc-200 w-full items-center justify-between">
            <div className="w-full">
              <h1
                className={`text-4xl font-bold my-5 ${
                  darkMode ? "text-zinc-100" : "text-zinc-700"
                } `}
              >
                Place an order
              </h1>
              <p className={`${darkMode ? "text-zinc-200" : ""}`}>
                Place an order for your {currentPlan?.name} plan.
              </p>
              <div className="font-bold text-5xl my-4 ">
                ${currentPlan?.price} <span className="text-sm">per month</span>
              </div>
            </div>
            {paymentResponse && (
              <div className="w-3/5 h-full p-3 text-right ">
                <span className="border px-5 py-2 rounded-full text-xs border-green-600 text-green-700">
                  Active plan
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <h4 className="text-sm font-medium">
              What this plan offers to you ?
            </h4>
            <ul>
              {currentPlan?.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="w-3/4 p-1 flex text-nowrap gap-2 items-center text-sm"
                >
                  <BiCheck size={12} className="text-green-500" />{" "}
                  {feature?.maxUnitsAllowed} {feature.name.split("_").join(" ")}
                </div>
              ))}
            </ul>
          </div>

          <table
            className={`w-3/4 mt-4 text-xs border-collapse border ${
              darkMode ? "border-zinc-800" : "border-zinc-300"
            }  `}
          >
            <thead>
              <tr className={` ${darkMode ? "bg-zinc-900" : ""} bg-zinc-100 `}>
                <th
                  className={`border ${
                    darkMode ? "border-zinc-700" : "border-zinc-300"
                  }   px-2 py-1 text-left`}
                >
                  Feature
                </th>
                <th
                  className={`border ${
                    darkMode ? "border-zinc-700" : "border-zinc-300"
                  }   px-2 py-1 text-left`}
                >
                  Per Unit Credit
                </th>
                <th
                  className={`border ${
                    darkMode ? "border-zinc-700" : "border-zinc-300"
                  }   px-2 py-1 text-left`}
                >
                  Total Units
                </th>
                <th
                  className={`border ${
                    darkMode ? "border-zinc-700" : "border-zinc-300"
                  }   px-2 py-1 text-left`}
                >
                  Total Credits
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPlan?.features?.map((feature, idx) => (
                <tr key={idx}>
                  <td
                    className={`border ${
                      darkMode ? "border-zinc-700" : "border-zinc-300"
                    }  px-2 py-1 capitalize`}
                  >
                    {feature.name.replaceAll("_", " ")}
                  </td>
                  <td
                    className={`border ${
                      darkMode ? "border-zinc-700" : "border-zinc-300"
                    }  px-2 py-1 capitalize`}
                  >
                    {feature.perUnitCreditCost} credits
                  </td>
                  <td
                    className={`border ${
                      darkMode ? "border-zinc-700" : "border-zinc-300"
                    }  px-2 py-1 capitalize`}
                  >
                    {feature.maxUnitsAllowed}
                  </td>
                  <td
                    className={`border ${
                      darkMode ? "border-zinc-700" : "border-zinc-300"
                    }  px-2 py-1 capitalize`}
                  >
                    {feature.allocatedCredits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paymentResponse ? (
            <button
              className="flex items-center rounded-xl gap-2 px-5 py-2 bg-[#57C785] hover:bg-green-500 transition-all ease-in-out  duration-300 cursor-pointer my-8 text-black hover:"
              onClick={() => setAPIvisibility(true)}
            >
              <HiKey size={15} /> Get API key
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="flex items-center rounded-xl gap-2 px-5 py-2 bg-green-700 hover:bg-green-500 transition-all ease-in-out duration-300 cursor-pointer my-8 text-black hover:"
            >
              <RiMoneyRupeeCircleFill />
              {currentPlan?.name.toLowerCase() === "free" ? (
                <span>Use Free Plan</span>
              ) : (
                <span>Pay using Razorpay</span>
              )}
            </button>
          )}
          {APIvisibility && (
            <div className="max-w-full bg-zinc-200 p-3 flex items-center justify-between text-xs rounded-lg ">
              {paymentResponse?.key?.key.slice(0, 130)}......
              <button
                className="p-1 bg-white rounded-full cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(paymentResponse?.key?.key);
                  toast.success("Copied");
                }}
              >
                <BiCopy size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
      {isActive && (
        <div className="h-1/3 w-1/2 flex items-center justify-end pr-11 transform translate-y-2 transition-all ease-in-out duration-1000 absolute -top-12 right-0 ">
          <div
            className={`z-10 bg-green-800 p-3 rounded-xl ${
              darkMode ? "text-white" : "text-white"
            }`}
          >
            You are already on a active plan
            <button
              className={`text-sm px-4 rounded-xl text-black bg-white py-1 ml-3`}
            >
              <Link to={"/dashboard/plans"}>View Plan</Link>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default PaymentPage;
