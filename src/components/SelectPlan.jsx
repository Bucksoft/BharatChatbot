import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userStore";

const SelectPlan = ({ planId, planName }) => {
  const { darkMode } = useAuthStore();
  return (
    <main>
      <Link
        to={`/dashboard/${planId}`}
        className={` ${
          planName === "Pro"
            ? "bg-gradient-to-b  from-[#143c4d] to-[#2b6645] text-[#fff] border-2 border-transparent"
            : "border-2 border-[#143c4d]"
        } uppercase text-sm   px-5 py-2  rounded-full  mb-5 cursor-pointer `}
      >
        <button
          className="bg-[#4cb176] mb-12  cursor-pointer  hover:bg-[#57C785] text-white w-full py-2 rounded-[2rem] transition-all duration-150 ease-in-out"
          style={{
            boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
            background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
          }}
        >
          Select Plan
        </button>
      </Link>
    </main>
  );
};

export default SelectPlan;
