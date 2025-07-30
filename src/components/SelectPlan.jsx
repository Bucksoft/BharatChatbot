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
        <button className="mb-12  cursor-pointer ">Select Plan</button>
      </Link>
    </main>
  );
};

export default SelectPlan;
