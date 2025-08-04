import { useEffect, useState } from "react";
import { SlHandbag } from "react-icons/sl";
import { axiosInstance } from "../config/axios";
import { useAuthStore } from "../store/userStore";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCalendarX } from "react-icons/bs";
import TotalCredits from "../components/TotalCredits";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaFilePdf, FaKey, FaLink } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";

const MyPlans = () => {
  const { setActivePlan, activePlan, darkMode } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMySubscription() {
      try {
        setLoading(true);
        const res = await axiosInstance.get("subscription", {
          withCredentials: true,
        });
        if (res.data?.subscription) {
          setActivePlan(res.data?.subscription);
        } else {
          setActivePlan(null);
        }
      } catch (error) {
        console.log("ERROR IN FETCHING", error);
        setActivePlan(null);
      } finally {
        setLoading(false);
      }
    }
    getMySubscription();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center gap-3 py-44 w-full justify-center">
            <LuLoaderCircle className="animate-spin" /> <span>Loading....</span>
          </div>
        </>
      ) : (
        <>
          <main className="p-4 sm:p-6 md:p-8">
            <svg
              className="absolute top-0 left-0 hidden md:block -z-10 w-full h-full"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                fill="#60e096"
                fillOpacity="0.4"
                d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
              />
            </svg>

            {/* Heading */}
            <h1
              className={`font-bold text-2xl sm:text-3xl flex items-center gap-3 ${
                darkMode ? "text-zinc-100" : "text-zinc-700"
              }`}
            >
              <SlHandbag /> My Plans
            </h1>

            <p
              className={`mt-1 text-sm sm:text-base ${
                darkMode ? "text-zinc-200" : "text-zinc-700"
              } ml-2 sm:ml-11`}
            >
              Manage your BuckBot subscription and track usage details.
            </p>

            {activePlan ? (
              <section className="p-4 sm:p-5 md:px-11">
                {/* Plan Info */}
                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2">
                      <IoMdCheckmarkCircleOutline /> Active Plan:
                    </label>
                    <h1 className="font-semibold text-green-500 bg-green-500/10 p-1 px-4 rounded-full">
                      {activePlan?.planId?.name}
                    </h1>
                    <Link
                      to={"/dashboard/pricing"}
                      className="bg-[#4cb176] hover:bg-[#57C785] text-white  py-2 rounded-[2rem] transition-all flex items-center gap-3 duration-150 ease-in-out px-8"
                      style={{
                        boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                        background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                      }}
                    >
                      <AiTwotoneThunderbolt size={20} />
                      Upgrade to Pro
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2">
                      <IoCalendarNumberOutline /> Duration:
                    </label>
                    <h1 className="font-semibold">
                      {activePlan?.planId?.durationInDays} days
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2">
                      <AiOutlineDollarCircle /> Price:
                    </label>
                    <h1 className="font-semibold">
                      ${activePlan?.planId?.price}
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2">
                      <BsCalendarX /> Started:
                    </label>
                    <h1 className="font-semibold">
                      {activePlan?.subscriptionStart?.split("T")[0]}
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2">
                      <BsCalendarX /> Expiry:
                    </label>
                    <h1 className="font-semibold">
                      {activePlan?.subscriptionEnd?.split("T")[0]}
                    </h1>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  <div
                    className={`flex items-center justify-between p-4 shadow-md rounded-lg border  ${
                      darkMode
                        ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <div>
                      <h2 className="font-semibold">Total PDFs</h2>
                      <p className="text-3xl text-green-500">
                        {activePlan?.userId?.files.length}
                      </p>
                    </div>
                    <FaFilePdf size={40} className="text-zinc-200" />
                  </div>

                  <div
                    className={`p-4 flex items-center justify-between shadow-md rounded-lg border  ${
                      darkMode
                        ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <div>
                      <h2 className="font-semibold">Total APIs</h2>
                      <p className="text-3xl text-green-500">
                        {activePlan?.userId?.apiKeys.length}
                      </p>
                    </div>
                    <FaKey size={40} className="text-zinc-200" />
                  </div>

                  <div
                    className={`p-4 flex items-center justify-between shadow-md rounded-lg border  ${
                      darkMode
                        ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                        : "bg-white border-zinc-300"
                    }`}
                  >
                    <div>
                      <h2 className="font-semibold">Total URLs</h2>
                      <p className="text-3xl text-green-500">
                        {activePlan?.userId?.website_urls.length}
                      </p>
                    </div>
                    <FaLink size={40} className="text-zinc-200" />
                  </div>
                </div>

                {/* Credits Component */}
                <div className="w-full flex items-center justify-start mt-4">
                  <TotalCredits
                    totalCredits={activePlan?.totalCredits}
                    creditsUsed={activePlan?.creditsUsed}
                  />
                </div>
              </section>
            ) : (
              // Fallback when no active plan
              <div className="ml-2 sm:ml-11 mt-8">
                <h1
                  className={`text-lg sm:text-xl font-semibold mb-2 ${
                    darkMode ? "text-zinc-100" : "text-zinc-800"
                  }`}
                >
                  You are currently on a Free Plan.
                </h1>

                <Link to="/dashboard/pricing">
                  <button
                    className="bg-[#4cb176] hover:bg-[#57C785] text-white w-full py-2 rounded-[2rem] transition-all duration-150 ease-in-out"
                    style={{
                      boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                      background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                    }}
                  >
                    <AiTwotoneThunderbolt size={20} /> Upgrade to Pro
                  </button>
                </Link>

                {/* Styled usage stats similar to active plan */}
                <div className="mt-6">
                  <h2
                    className={`text-lg font-semibold mb-3 ${
                      darkMode ? "text-zinc-100" : "text-zinc-700"
                    }`}
                  >
                    Free Plan Usage
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                      className={`flex items-center justify-between p-4 shadow-md rounded-lg border  ${
                        darkMode
                          ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                          : "bg-white border-zinc-300"
                      }`}
                    >
                      <div>
                        <h2 className="font-semibold">Total PDFs</h2>
                        <p className="text-3xl text-green-500">
                          {activePlan?.userId?.files?.length || 0}
                        </p>
                      </div>
                      <FaFilePdf size={40} className="text-zinc-200" />
                    </div>

                    <div
                      className={`p-4 flex items-center justify-between shadow-md rounded-lg border  ${
                        darkMode
                          ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                          : "bg-white border-zinc-300"
                      }`}
                    >
                      <div>
                        <h2 className="font-semibold">Total APIs</h2>
                        <p className="text-3xl text-green-500">
                          {activePlan?.userId?.apiKeys?.length || 0}
                        </p>
                      </div>
                      <FaKey size={40} className="text-zinc-200" />
                    </div>

                    <div
                      className={`p-4 flex items-center justify-between shadow-md rounded-lg border  ${
                        darkMode
                          ? "shadow-zinc-900 border-zinc-600 bg-white/10 backdrop-blur-2xl"
                          : "bg-white border-zinc-300"
                      }`}
                    >
                      <div>
                        <h2 className="font-semibold">Total URLs</h2>
                        <p className="text-3xl text-green-500">
                          {activePlan?.userId?.website_urls?.length || 0}
                        </p>
                      </div>
                      <FaLink size={40} className="text-zinc-200" />
                    </div>
                  </div>

                  {/* Credits Component (pass 0 if unavailable) */}
                  <div className="w-full flex items-center justify-start mt-4">
                    <TotalCredits
                      totalCredits={activePlan?.totalCredits || 0}
                      creditsUsed={activePlan?.creditsUsed || 0}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default MyPlans;
