import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userStore";
import { LuLogIn } from "react-icons/lu";
import { BsFillPatchPlusFill, BsRobot } from "react-icons/bs";
import { featureCards } from "../lib/featureCards";
import { useEffect, useState } from "react";
import { TbReceiptRupee } from "react-icons/tb";
import { RiFireFill } from "react-icons/ri";
import { GoCheckCircleFill } from "react-icons/go";
import { axiosInstance } from "../config/axios";

const HomePage = () => {
  const { user, allPlans, setAllPlans } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchAllPlans() {
      try {
        const res = await axiosInstance.get("plan/all", {
          withCredentials: true,
        });
        setAllPlans(res.data.plans);
      } catch (error) {
        console.error("Error in fetching plan details", error);
      }
    }
    fetchAllPlans();
  }, [setAllPlans]);

  return (
    <main className="bg-black text-white">
      <section className="min-h-screen relative overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          className="fixed top-0 left-0 z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,-520 C360,240 1080,80 1440,160"
            stroke="#60e096"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0,-550 C400,320 1040,160 1440,240"
            stroke="#45b67e"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M0,-670 C300,400 1140,240 1440,320"
            stroke="#2f9e6f"
            strokeWidth="1"
            fill="none"
            opacity="0.1"
          />
        </svg>

        <div className="fixed top-10 left-10 w-[300px] h-[300px] bg-[#60e096] opacity-40 rounded-full blur-[120px] z-0" />

        <div className="w-[90%] max-w-[1200px] mx-auto relative z-10">
          <nav
            className={`p-4  ${
              isScrolled &&
              "md:bg-white/20 backdrop-blur-3xl rounded-full md:border md:border-white/30"
            } fixed w-full max-w-[1200px] mt-2 transition-all duration-150 flex items-center justify-between z-20`}
          >
            <Link
              to="/"
              className="text-xl flex items-center gap-2 font-semibold text-white"
            >
              <BsRobot size={30} />{" "}
              <span className="hidden md:block">Bharat Chatbot</span>
            </Link>
            <div className="hidden md:flex gap-5 text-sm">
              <a href="#features" className="hover:text-green-500 transition">
                Features
              </a>
              <a href="#pricing" className="hover:text-green-500 transition">
                Pricing
              </a>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard/pricing"
                    className="text-xs font-semibold text-white hover:text-green-500 transition-all ease-in-out duration-150"
                  >
                    Dashboard
                  </Link>
                  <span className="rounded-full bg-rose-500 text-white text-xs w-8 h-8 flex items-center justify-center mr-6 md:mr-0">
                    {user?.name[0]?.toUpperCase() || ""}
                  </span>
                </div>
              ) : (
                <Link to="/login">
                  <button
                    className="bg-[#4cb176] hover:bg-[#57C785] text-white py-2 rounded-[2rem] transition-all duration-150 ease-in-out md:px-8 px-4 flex items-center gap-3"
                    style={{
                      boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                      background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                    }}
                  >
                    <LuLogIn /> Login
                  </button>
                </Link>
              )}
            </div>
          </nav>

          <section className="min-h-[85vh] flex flex-col items-center justify-center p-4 text-center font-bold">
            <h1 className="text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#226985] via-[#4aac73] to-[#c4b744] bg-clip-text text-transparent">
              Supercharge Your Bot. Track It. Tweak It. Own It
            </h1>
            <p className="text-base md:text-lg mt-4 font-normal text-zinc-300 max-w-xl">
              Stay in control of your chatbot's brain — from messages to
              metrics.
            </p>
            <Link to={user ? "/dashboard/pricing" : "/login"}>
              <button className="mt-8 px-10 py-3 rounded-full bg-green-800 text-white font-semibold hover:bg-green-500 transition relative overflow-hidden hover:text-black">
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 1040 280"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#60e096"
                    fillOpacity="0.4"
                    d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
                  />
                </svg>
                Get Started
              </button>
            </Link>
          </section>
        </div>
      </section>

      <section
        id="features"
        className="min-h-screen flex flex-col items-center py-24"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Features</h1>
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
          {featureCards?.map((feature) => (
            <div
              key={feature?.id}
              className="bg-gradient-to-b from-white/10 to-black border border-white/20 rounded-lg mx-6 md:mx-0 p-6 w-full sm:w-[45%] md:w-[30%] backdrop-blur-lg shadow-lg relative"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="p-3 bg-green-500/10 rounded-full text-green-500 shadow-green-300/10 shadow-md">
                  {feature?.icon}
                </span>
                <h3 className="text-lg font-semibold">{feature?.title}</h3>
              </div>
              <p className="text-sm text-gray-300">{feature?.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="min-h-screen flex flex-col items-center pb-20 pt-36"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Pricing</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-6xl px-4">
          {allPlans?.map((plan) => (
            <div
              key={plan?._id}
              className={`relative border border-white/30 rounded-3xl p-6 bg-white/10 backdrop-blur-md ${
                plan?.name.toLowerCase() === "pro"
                  ? "border-t-4 border-t-[#57C785]"
                  : ""
              }`}
            >
              <div className="mb-2">
                {plan?.name.toLowerCase() === "free" ? (
                  <TbReceiptRupee size={20} color="#57C785" />
                ) : plan?.name.toLowerCase() === "pro" ? (
                  <RiFireFill size={20} color="#57C785" />
                ) : (
                  <BsFillPatchPlusFill size={20} color="#57C785" />
                )}
              </div>
              {plan?.name.toLowerCase() === "pro" && (
                <span className="absolute top-3 right-4 bg-[#57C785] text-white px-2 py-1 text-xs rounded-full">
                  Popular
                </span>
              )}
              <h2 className="text-xl font-semibold">{plan?.name}</h2>
              <p className="text-sm text-zinc-400 mb-4">
                {plan?.name.toLowerCase() === "free"
                  ? "For learning"
                  : plan?.name.toLowerCase() === "pro"
                  ? "As your business scales"
                  : "For more complex business"}
              </p>
              <div className="text-center my-4">
                <h3 className="text-4xl font-bold">${plan?.price}</h3>
                <p className="text-sm text-gray-300">/month</p>
              </div>
              <Link to={`/dashboard/${plan?._id}`}>
                <button
                  className="bg-[#4cb176] hover:bg-[#57C785] text-white w-full py-2 rounded-[2rem] transition-all duration-150 ease-in-out"
                  style={{
                    boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                    background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                  }}
                >
                  Get {plan?.name}
                </button>
              </Link>
              <div className="mt-6">
                <p className="text-sm font-semibold mb-2">Free features</p>
                {plan.features?.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-white mb-1"
                  >
                    <GoCheckCircleFill size={12} className="text-[#57C785]" />
                    {feature?.maxUnitsAllowed}{" "}
                    {feature?.name.replaceAll("_", " ")}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
