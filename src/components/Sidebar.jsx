import { sidebarLinks } from "../lib/sidebarLinks.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { axiosInstance } from "../config/axios.js";
import { useAuthStore } from "../store/userStore.js";
import toast from "react-hot-toast";
import { BsRobot } from "react-icons/bs";
import { CiLight } from "react-icons/ci";
import { LuSunMoon } from "react-icons/lu";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const { user, logout, setDarkMode, darkMode, activePlan } = useAuthStore();
  const navigate = useNavigate();
  async function logoutUser() {
    try {
      await axiosInstance.post("user/logout", {
        withCredentials: true,
      });
      navigate("/");
      toast.success("Logged out successfully");
      logout();
    } catch (error) {
      toast.error(error.response.data.msg || "Failed to log out");
    }
  }

  if (!user) {
    navigate("/login");
  }

  console.log(activePlan);

  return (
    <main
      className={`rounded-3xl min-h-full text-sm overflow-hidden border-r relative  ${
        darkMode
          ? " bg-[#040404] text-white  border-zinc-700"
          : "bg-zinc-100 text-black border-zinc-300 "
      }   backdrop-blur-lg shadow-lg `}
    >
      <svg
        className="absolute top-0 left-0 -z-10 w-full h-full"
        viewBox="0 0 800 310"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#60e096"
          fillOpacity="0.4"
          d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
        />
      </svg>
      <div className="flex items-center justify-between px-2  ">
        <h1 className="flex items-center justify-center p-5 text-center font-bold  bg-gradient-to-r from-[#1d556b] via-[#27583b] to-[#81792e] text-white w-4 h-4 shadow-md m-2  rounded-full">
          <Link to={"/"}>
            <BsRobot size={25} />
          </Link>
        </h1>
        <button onClick={() => setDarkMode()} className="cursor-pointer">
          {darkMode ? (
            <CiLight size={25} className="text-white" />
          ) : (
            <LuSunMoon size={25} className="text-black/50" />
          )}
        </button>
      </div>

      <div
        className={` ${
          darkMode ? "bg-zinc-800" : "bg-zinc-300"
        }   h-[0.3px] w-full `}
      />
      {/* blurred bubble */}
      <div className="absolute h-20 w-20 bottom-0 right-1/3 blur-xl rounded-full bg-green-500/20 -z-10"></div>

      <div className="mt-4 mx-2">
        {sidebarLinks?.map((data) => (
          <div key={data.id} className="py-1">
            <NavLink
              to={data.link}
              className={({ isActive }) => {
                const baseStyles =
                  "flex items-center gap-3 hover:bg-green-500/10 p-2 px-6 transition-all ease-in-out duration-200";
                const activeStyles = isActive
                  ? "bg-white/10 text-green-500 font-semibold backdrop-blur-2xl border-l-4 border-green-700"
                  : "";
                const textColor = darkMode
                  ? isActive
                    ? "text-green-500"
                    : "text-white"
                  : isActive
                  ? "text-green-700 bg-zinc-200"
                  : "text-black";

                return `${baseStyles} ${activeStyles} ${textColor}`;
              }}
            >
              <p>{data.icon}</p>
              <span>{data.label}</span>
            </NavLink>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full">
        {/* Low credits alert message */}
        {activePlan?.creditsLeft < 20 && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3 text-sm mb-4 mx-2">
            <ImCross />

            <span>
              <strong>Low Credits:</strong> You have only{" "}
              <b>{activePlan?.creditsLeft}</b> credits left.
            </span>
          </div>
        )}

        <div
          className={` flex flex-col gap-2 text-xs ${
            darkMode
              ? "bg-white/10 border-white/20"
              : "bg-black/10 border-white/10"
          }  backdrop-blur-md border-t   pt-2 text-center  text-white`}
        >
          <div
            className={`flex items-center   gap-1 pl-3 ${
              darkMode ? "text-white" : "text-black"
            } `}
          >
            <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <>
                  <img
                    src={user?.profilePicture}
                    loading="lazy"
                    width={20}
                    className="rounded-full object-cover"
                  />
                </>
              ) : (
                <span className="font-semibold">
                  {user?.name[0].toUpperCase()}
                </span>
              )}
            </div>
            <span className="truncate">{user?.email}</span>
          </div>
          <button
            onClick={logoutUser}
            className="bg-green-800/90 py-2 flex items-center justify-center gap-2 hover:bg-green-700 transition-all ease-in-out duration-200 font-medium cursor-pointer text-sm text-white rounded-b-md"
          >
            <LuLogOut /> Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
