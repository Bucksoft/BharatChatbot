import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/userStore";
import { BiCheck, BiCopy } from "react-icons/bi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { HiKey } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { LuLoaderCircle } from "react-icons/lu";

const PaymentPage = () => {
  const { id } = useParams();
  const { user, activePlan } = useAuthStore();
  const [paymentResponse, setPaymentResponse] = useState();
  const [APIvisibility, setAPIvisibility] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("USER ", user);

  useEffect(() => {
    async function getPlanById() {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`plan/${id}`, {
          withCredentials: true,
        });
        setCurrentPlan(res.data.plan);
      } catch (error) {
        console.log("ERROR IN FETCHING CURRENT PLAN DETAIlS : ", error);
      } finally {
        setLoading(false);
      }
    }
    getPlanById();
  }, []);

  const handlePayment = async () => {
    if (activePlan && activePlan?.planId?.name?.toLowerCase() !== "free") {
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
    <main className="md:p-2 relative  ">
      {loading ? (
        <>
          <div className="flex items-center gap-3 py-44 w-full justify-center">
            <LuLoaderCircle className="animate-spin" /> <span>Loading....</span>
          </div>
        </>
      ) : (
        <>
          <section className="w-full rounded-lg md:p-2 h-full flex items-center justify-start px-8 gap-2">
            <div className="w-full ">
              <div className="flex md:flex-row flex-col border-b pb-5 border-b-zinc-200 w-full items-center justify-between">
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
                    ${currentPlan?.price}{" "}
                    <span className="text-sm">per month</span>
                  </div>
                </div>
                {paymentResponse && (
                  <div className="md:w-3/5 h-full md:p-3 text-right ">
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
                      {feature?.maxUnitsAllowed}{" "}
                      {feature.name.split("_").join(" ")}
                    </div>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {currentPlan?.features?.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 shadow-md border transition-all duration-300 ${
                      darkMode
                        ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                        : "bg-white border-zinc-200 text-zinc-700"
                    }`}
                  >
                    <h3 className="text-sm font-semibold mb-2 capitalize text-green-600">
                      {feature.name.replaceAll("_", " ")}
                    </h3>

                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={` ${
                          darkMode ? "text-zinc-400" : "text-zinc-600"
                        } `}
                      >
                        Per Unit Credit:
                      </span>
                      <span className="font-medium text-green-500">
                        {feature.perUnitCreditCost} credits
                      </span>
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                      <span
                        className={` ${
                          darkMode ? "text-zinc-400" : "text-zinc-600"
                        } `}
                      >
                        Max Units Allowed:
                      </span>
                      <span className="font-medium">
                        {feature.maxUnitsAllowed}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span
                        className={` ${
                          darkMode ? "text-zinc-400" : "text-zinc-600"
                        } `}
                      >
                        Allocated Credits:
                      </span>
                      <span className="font-medium">
                        {feature.allocatedCredits}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {paymentResponse ? (
                <button
                  style={{
                    boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                    background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                  }}
                  className="flex items-center rounded-xl gap-2 px-5 py-2 bg-[#57C785] hover:bg-green-500 transition-all ease-in-out  duration-300 cursor-pointer my-8 text-black hover:"
                  onClick={() => setAPIvisibility(true)}
                >
                  <HiKey size={15} /> Get API key
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  className="flex items-center rounded-xl gap-2 px-5 py-2  transition-all ease-in-out duration-300 cursor-pointer my-8 text-black "
                  style={{
                    boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                    background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                  }}
                >
                  <RiMoneyRupeeCircleFill />
                  {currentPlan?.name?.toLowerCase() === "free" ? (
                    <span>Use Free Plan</span>
                  ) : (
                    <span>Pay using Razorpay</span>
                  )}
                </button>
              )}
              {APIvisibility && (
                <div
                  className={`w-full md:max-w-full ${
                    darkMode ? "bg-zinc-700" : "bg-zinc-200"
                  } p-3 flex items-center justify-between text-xs rounded-lg gap-2`}
                >
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {paymentResponse?.key?.key.slice(0, 130)}......
                  </div>
                  <button
                    className="p-1 bg-white text-black rounded-full cursor-pointer shrink-0"
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
        </>
      )}
      {isActive && (
        <div className="h-1/3 md:w-1/2  flex items-center md:justify-end justify-center md:pr-11 pr-6 transform translate-y-2 transition-all ease-in-out duration-1000 absolute md:-bottom-12 bottom-0  right-0 ">
          <div
            className={`z-10 bg-green-800 p-3  rounded-xl ${
              darkMode ? "text-white" : "text-white"
            }`}
          >
            <p className="flex items-center">
              You are already on a active plan
              <span
                onClick={() => setIsActive(false)}
                className="ml-5 p-2 bg-white text-green-800 rounded-full"
              >
                <RxCross2 />
              </span>
            </p>
            <button
              className={`text-sm px-4 rounded-xl text-black bg-white py-1 mt-1`}
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
