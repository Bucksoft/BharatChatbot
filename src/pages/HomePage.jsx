import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userStore";
import { LuLogIn } from "react-icons/lu";
import { BsFillPatchPlusFill, BsRobot } from "react-icons/bs";
import { featureCards } from "../lib/featureCards";
import { useEffect, useState } from "react";
import PricingPage from "./PricingPage";
import { TbReceiptRupee } from "react-icons/tb";
import { RiFireFill } from "react-icons/ri";
import { GoCheckCircleFill } from "react-icons/go";
import { axiosInstance } from "../config/axios";

const HomePage = () => {
  const { user } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const { allPlans, darkMode, setAllPlans } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchAllPlans() {
      try {
        const res = await axiosInstance.get("plan/all", {
          withCredentials: true,
        });
        setAllPlans(res.data);
      } catch (error) {
        console.log("Error in fetching plan details", error);
      }
    }
    fetchAllPlans();
  }, []);

  return (
    <main>
      <section className="bg-black min-h-screen relative overflow-hidden ">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className=" top-0 left-0 z-0 fixed"
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

        {/* Blurry background blob */}
        <div className="fixed top-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#60e096] opacity-40 rounded-full blur-[120px] z-0" />

        {/* Bot image behind heading */}
        {/* <img
          src={botImg}
          alt="Chatbot"
          className="absolute left-0 -bottom-10 z-0 w-[250px] sm:w-[350px] md:w-[400px]"
        /> */}

        <div className="w-[90%] max-w-[1200px] mx-auto relative z-10">
          {/* Navbar */}
          <nav
            className={`p-4 ${
              isScrolled &&
              "bg-white/20 backdrop-blur-3xl rounded-full border border-white/30"
            } md:fixed transition-all ease-in-out duration-150 mt-2 flex flex-row sm:flex-row md:w-[83%] w-full z-10 items-center justify-between gap-3`}
          >
            <Link
              to="/"
              className="md:text-xl text-xs flex items-center gap-2 font-semibold text-white"
            >
              <BsRobot size={30} />{" "}
              <span className="hidden md:block">Bharat Chatbot</span>
            </Link>

            <div className="text-white text-sm flex gap-5 items-center">
              <a
                href="#features"
                className="hover:text-green-500 transition-all ease-in-out duration-150"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-green-500 transition-all ease-in-out duration-150"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard/pricing"
                    className="text-xs font-semibold text-white"
                  >
                    Dashboard
                  </Link>
                  <span className="rounded-full bg-red-500/60 text-white  text-xs w-8 h-8 flex items-center justify-center">
                    {user.name[0].toUpperCase()}
                  </span>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2 bg-green-800 cursor-pointer text-white rounded-4xl font-medium hover:bg-green-700 transition-colors ease-in-out duration-150 flex items-center gap-2">
                    <LuLogIn /> Login
                  </button>
                </Link>
              )}
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-[85vh] flex items-center flex-col justify-center p-4 text-center font-bold relative -z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#226985] via-[#4aac73] to-[#c4b744] leading-tight">
              Supercharge Your Bot. Track It. Tweak It. Own It
            </h1>

            <p className="text-sm sm:text-base md:text-lg mt-4 font-normal text-zinc-300 max-w-xl">
              Stay in control of your chatbot's brain — from messages to
              metrics.
            </p>

            {user ? (
              <Link to="/dashboard/pricing">
                <button className="text-sm mt-8 px-8 sm:px-12 py-3 rounded-[2rem] bg-green-800 text-white font-semibold border border-green-100 cursor-pointer hover:bg-green-500 transition-all relative ease-in-out duration-300 overflow-hidden hover:text-black">
                  <svg
                    className="absolute top-0  left-0  md:block z-10 w-full h-full"
                    viewBox="0 0 1040 280"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
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
            ) : (
              <Link to="/login">
                <button className="text-sm mt-8 px-8 sm:px-12 py-3 rounded-[2rem] bg-green-800 text-white font-semibold border border-green-100 cursor-pointer hover:bg-green-500 transition-all relative ease-in-out duration-300 overflow-hidden hover:text-black">
                  <svg
                    className="absolute top-0  left-0  md:block z-10 w-full h-full"
                    viewBox="0 0 1040 280"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
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
            )}
          </section>
        </div>
      </section>

      {/* Features section */}
      <section
        id="features"
        className="min-h-screen md:h-screen  w-full text-white  flex flex-col bg-black items-center py-24 z-10"
      >
        <h1 className="font-bold md:text-5xl text-3xl mt-5 mb-10">Features</h1>

        {/* features */}
        <div className="flex w-3/4 md:flex-row flex-col items-center gap-3 mt-8">
          {featureCards?.map((feature) => (
            <div
              key={feature?.id}
              className="p-6 bg-gradient-to-b from-white/10 to-black backdrop-blur-2xl shadow-zinc-800/30 border border-white/20  rounded-lg md:w-1/3 shadow-md h-full flex flex-col justify-start"
            >
              <svg
                className="absolute top-0 left-0  md:block z-10 w-full h-full"
                viewBox="0 0 1040 280"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  fill="#60e096"
                  fillOpacity="0.05"
                  d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
                />
              </svg>
              <div className="flex items-center gap-5 mb-5  ">
                <p className="p-3  shadow-lg shadow-green-300/10 bg-green-500/10 rounded-full text-green-500">
                  {feature?.icon}
                </p>
                <h3 className="md:text-xl font-semibold ">{feature?.title}</h3>
              </div>
              <p className="md:text-sm text-xs text-gray-300 ">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing section */}
      <section
        id="pricing"
        className="min-h-screen pb-8  w-full text-white  flex flex-col bg-black items-center z-10"
      >
        <h1 className="font-bold md:text-5xl text-3xl mt-44 mb-10">Pricing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-2 md:w-3/4 w-full px-8 mx-auto gap-3">
          {allPlans?.map((plan) => (
            <div
              key={plan?._id}
              className={`border relative  ${
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
        </div>

        {/* Footer section */}
      </section>
    </main>
  );
};

export default HomePage;
