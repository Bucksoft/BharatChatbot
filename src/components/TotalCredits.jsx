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
  );
};

export default TotalCredits;
