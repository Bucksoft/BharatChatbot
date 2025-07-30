import React, { useState } from "react";
import { useAuthStore } from "../store/userStore";

const TotalCredits = ({ totalCredits, creditsUsed }) => {
  const [usedCredits, setUsedCredits] = useState(0);
  const { activePlan, darkMode } = useAuthStore();
  const remainingCredits = +activePlan?.activePlan?.totalCredits - usedCredits;

  const handleUseCredit = () => {
    if (remainingCredits > 0) {
      setUsedCredits((prev) => prev + 1);
    }
  };

  return (
    <div
      className={`w-60 p-3 rounded-xl shadow-lg  ${
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

      {/* <input
        type="range"
        min="0"
        max={+activePlan?.activePlan?.totalCredits}
        value={usedCredits}
        readOnly
        className="w-full accent-green-500"
      />

      <button
        onClick={handleUseCredit}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all disabled:bg-gray-400"
        disabled={remainingCredits <= 0}
      >
        Use Credit
      </button> */}
    </div>
  );
};

export default TotalCredits;
