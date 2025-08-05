import React, { useState } from "react";
import { useAuthStore } from "../store/userStore";

const TotalCredits = ({ totalCredits, creditsUsed }) => {
  const [usedCredits, setUsedCredits] = useState(0);
  const { activePlan, darkMode } = useAuthStore();

  console.log(activePlan);

  return (
    <main className=" w-full flex items- md:flex-row flex-col gap-2">
      <div
        className={`md:w-60 w-full p-3 rounded-xl shadow-lg  ${
          darkMode ? "bg-zinc-900 " : "bg-white"
        } `}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-zinc-300" : ""
          }  dark:text-white`}
        >
          Plan Credits
        </h2>

        <div className="mb-4 text-center">
          <div className="text-3xl font-bold text-green-600">
            {(totalCredits - creditsUsed).toFixed(2)} / {+totalCredits}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Credits Remaining
          </p>
        </div>
      </div>
      <div
        className={`md:w-60 w-full p-3 rounded-xl shadow-lg  ${
          darkMode ? "bg-zinc-900 " : "bg-white"
        } `}
      >
        <h2
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-zinc-300" : ""
          }  dark:text-white`}
        >
          Total API hits
        </h2>

        <div className="mb-4 text-center">
          <div className="text-3xl font-bold text-green-600">
            {activePlan?.totalApiHits}
          </div>
          {/* <p className="text-sm text-gray-500 dark:text-gray-300">
            Credits Remaining
          </p> */}
        </div>
      </div>
    </main>
  );
};

export default TotalCredits;
