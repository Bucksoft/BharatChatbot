import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/userStore";

const DashboardLayout = () => {
  const { darkMode } = useAuthStore();
  return (
    <>
      <main
        className={`p-5 h-screen flex gap-2 ${
          darkMode ? "bg-black/10" : "bg-white"
        } `}
      >
        <section className="w-1/6 h-full ">
          <Sidebar />
        </section>

        <section
          className={`flex-1 relative h-full rounded-3xl overflow-y-auto ${
            darkMode ? "bg-[#040404] text-white" : "bg-zinc-100 text-black"
          }  backdrop-blur-2xl border border-zinc-200 shadow-lg p-5`}
        >
          <Outlet />
          <div className="absolute w-64 h-64 border-2 blur-3xl border-green-800 -z-40 bg-green-500/10 top-0 right-4 " />
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
