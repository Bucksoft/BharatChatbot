import { BiCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import SelectPlan from "../components/SelectPlan";
import { useAuthStore } from "../store/userStore";
import { TbReceiptRupee } from "react-icons/tb";
import { RiFireFill } from "react-icons/ri";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const { darkMode } = useAuthStore();

  useEffect(() => {
    async function fetchAllPlans() {
      try {
        const res = await axiosInstance.get("plan/all", {
          withCredentials: true,
        });
        console.log("PLANS ", res);
        setPlans(res.data);
      } catch (error) {
        console.log("Error in fetching plan details", error);
      }
    }
    fetchAllPlans();
  }, []);

  return (
    <main className="">
      {/* heading */}
      <div className="text-center py-10 font-bold text-4xl">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53]">
          Plans & Pricing
        </h1>
        <p className=" font-normal text-lg mt-2">
          Select the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <section className="grid grid-cols-3 px-2 w-3/4 mx-auto gap-3">
        {/* {plans.map((plan) => (
          <div
            key={plan?._id}
            className={` ${
              (plan.name === "Free" || plan.name === "Enterprise") &&
              "border-b-8 border-[#143c4d]"
            } shadow-md ${
              darkMode ? "border border-zinc-800" : "border border-zinc-200 "
            } rounded-lg overflow-hidden  `}
          >
            <div
              style={{
                clipPath: "circle(66.1% at 50% 9%)",
              }}
              className={`flex items-center py-8 flex-col gap-3  ${
                plan.name === "Pro"
                  ? " bg-gradient-to-b from-[#143c4d] to-[#2b6645] text-white"
                  : !darkMode
                  ? "bg-zinc-200 text-black "
                  : "bg-zinc-900"
              }`}
            >
              <span
                className={`font-semibold uppercase text-md ${
                  plan._id === 1 || plan._id === 3
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#2A7B9B] to-[#57C785] "
                    : ""
                }`}
              >
                {plan?.name}
              </span>
              <div
                className={`font-bold text-5xl flex flex-col items-center ${
                  plan._id === 1 || plan._id === 3
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#2A7B9B] to-[#57C785] "
                    : ""
                }`}
              >
                ${plan?.price}
                <span className="text-sm font-normal">per month</span>
              </div>
            </div>
            <div className="my-8 flex flex-col items-center justify-center">
              {plan?.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="w-3/4 p-1 flex text-nowrap gap-2 items-center text-sm"
                >
                  <BiCheck size={12} className="text-green-500" />{" "}
                  {feature?.maxUnitsAllowed}{" "}
                  {feature?.name.split("_").join(" ")}
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center cursor-pointer">
              <SelectPlan planId={plan?._id} planName={plan.name} />
            </div>
          </div>
        ))} */}

        {plans?.map((plan) => (
          <div
            className={`border relative ${
              darkMode && "bg-white/10"
            } bg-white backdrop-blur-3xl  ${
              darkMode && "border-zinc-700"
            } border-zinc-300 rounded-4xl p-4 px-5 ${
              plan?.name.toLowerCase() === "pro" &&
              "border-t-5 border-t-[#57C785]"
            }`}
          >
            {/* Logo */}
            <span>
              {plan?.name.toLowerCase() === "free" ? (
                <TbReceiptRupee size={20} color="#57C785" />
              ) : plan?.name.toLowerCase() === "pro" ? (
                <RiFireFill size={20} color="#57C785" />
              ) : (
                <BsFillPatchPlusFill size={20} color="#57C785" />
              )}
            </span>

            {/* popular tag */}
            {plan?.name.toLowerCase() === "pro" && (
              <p className="absolute bg-[rgb(87,199,133)] right-5 top-3 text-white rounded-4xl p-1 px-2 text-[10px]">
                Popular
              </p>
            )}

            <div className="mt-1">
              <h2 className="font-semibold ">{plan?.name}</h2>
              <p className="text-xs text-zinc-400 ">
                {plan?.name.toLowerCase() === "free"
                  ? "For learning"
                  : plan?.name.toLowerCase() === "pro"
                  ? "As your business scales"
                  : "For more complex business"}
              </p>
            </div>

            {/* plan pricing */}
            <div className="flex items-center justify-center p-5">
              <h1 className="text-4xl font-semibold">${plan?.price}</h1>
              <p>/month</p>
            </div>

            {/* select plan button */}
            <Link to={`/dashboard/${plan?._id}`}>
              <button className="bg-[#4cb176] hover:bg-[#57C785] cursor-pointer transition-all ease-in-out duration-150 py-2 text-white w-full rounded-4xl">
                Get {plan?.name}
              </button>
            </Link>

            {/* features  */}
            <div className="mt-8">
              <p className="text-xs font-semibold mt-5">Free features</p>
              {plan?.features?.map((feature, idx) => (
                <div
                  key={idx}
                  className="w-3/4 p-1 py-2 flex text-nowrap gap-2 items-center text-xs"
                >
                  <GoCheckCircleFill size={12} className="text-[#57C785]" />{" "}
                  {feature?.maxUnitsAllowed}{" "}
                  {feature?.name.split("_").join(" ")}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PricingPage;
