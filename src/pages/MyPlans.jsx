import { useEffect } from "react";
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

const MyPlans = () => {
  const { setActivePlan, activePlan, darkMode } = useAuthStore();

  useEffect(() => {
    async function getMySubscription() {
      try {
        const res = await axiosInstance.get("subscription", {
          withCredentials: true,
        });
        setActivePlan(res.data?.subscription);
        console.log("SUBSCRIPTION ", res.data);
      } catch (error) {
        console.log("ERROR IN FETCHING  ", error);
      }
    }
    getMySubscription();
  }, []);

  return (
    <main className="p-8">
      <h1
        className={`font-bold text-3xl ${
          darkMode ? "text-zinc-100 " : "text-zinc-700 "
        }  flex items-center gap-3`}
      >
        <SlHandbag /> My Plans
      </h1>
      <p className={` ${darkMode ? "text-zinc-200" : "text-zinc-700"}   ml-11`}>
        Manage your BuckBot subscription and track usage details.
      </p>

      {activePlan ? (
        <section className="p-5 px-11">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline /> Active Plan :{" "}
            </label>
            <h1 className="font-semibold text-green-500 rounded-full bg-green-500/10 p-1 px-4">
              {activePlan?.planId?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label className="flex items-center gap-2">
              <IoCalendarNumberOutline /> Duration :{" "}
            </label>
            <h1 className="font-semibold">
              {activePlan?.planId?.durationInDays} days
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label className="flex items-center gap-2">
              {" "}
              <AiOutlineDollarCircle /> Price :{" "}
            </label>
            <h1 className="font-semibold">${activePlan?.planId?.price}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <label className="flex items-center gap-2">
              {" "}
              <BsCalendarX /> Expiry :{" "}
            </label>
            <h1 className="font-semibold">
              {/* {activePlan?.planExpiresAt.split("T")[0]} */}
              {activePlan?.userId?.planExpiresAt?.split("T")[0]}
            </h1>
          </div>

          {/* Uploaded data */}
          <div className="grid grid-cols-3 gap-2">
            <div
              className={`p-2 my-8 shadow-md rounded-lg border ${
                darkMode ? "shadow-zinc-900 border-zinc-800" : "border-zinc-300"
              }`}
            >
              <h2 className="font-semibold">Total PDFs</h2>
              <p className="text-3xl text-green-500">
                {activePlan?.userId?.files.length}
              </p>
            </div>

            <div
              className={`p-2 my-8 shadow-md rounded-lg border ${
                darkMode ? "shadow-zinc-900 border-zinc-800" : "border-zinc-300"
              }`}
            >
              <h2 className="font-semibold">Total APIs</h2>
              <p className="text-3xl text-green-500">
                {activePlan?.userId?.apiKeys.length}
              </p>
            </div>

            <div
              className={`p-2 my-8 shadow-md rounded-lg border ${
                darkMode ? "shadow-zinc-900 border-zinc-800" : "border-zinc-300"
              }`}
            >
              <h2 className="font-semibold">Total URLs</h2>
              <p className="text-3xl text-green-500">
                {activePlan?.userId?.website_urls.length}
              </p>
            </div>
          </div>

          <div className=" w-full flex items-center justify-start">
            <TotalCredits
              totalCredits={activePlan?.totalCredits}
              creditsUsed={activePlan?.creditsUsed}
            />
          </div>
        </section>
      ) : (
        // Display if plan is not there
        <>
          <div className="ml-11 mt-8">
            <h1>You are currently on a Free plan.</h1>
            <Link to={"/dashboard/pricing"}>
              <button className="bg-green-800 text-white rounded-lg p-2 px-4 mt-2 flex items-center gap-2">
                <AiTwotoneThunderbolt size={20} /> Upgrade to Pro
              </button>
            </Link>

            <div className="mt-5">
              <h2 className="text-xl font-semibold">Free Plan Usage</h2>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default MyPlans;
