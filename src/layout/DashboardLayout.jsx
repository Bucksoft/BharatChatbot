import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/userStore";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
  const { darkMode } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <main
        className={`h-screen md:p-5 gap-2 flex flex-col md:flex-row ${
          darkMode ? "bg-green-800/20" : "md:bg-green-900/60"
        }`}
      >
        {/* Top Bar (only visible on small screens) */}
        <div
          className={`flex items-center justify-between p-4 md:hidden ${
            darkMode ? "bg-black rounded-bl-3xl rounded-br-3xl" : ""
          }`}
        >
          <h1 className="text-lg font-bold text-green-700">Bharat Chatbot</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={24} className="text-green-800" />
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`absolute md:relative z-50 md:z-auto top-0 left-0 md:left-0 h-full md:h-auto w-64 md:w-1/6 transform transition-transform duration-300 ease-in-out rounded-4xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        ${darkMode ? " text-white" : "bg-white"}
      `}
        >
          <Sidebar />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 md:hidden z-40"
          />
        )}

        {/* Main Content */}
        <section
          className={`flex-1 relative h-full overflow-y-auto rounded-t-3xl md:rounded-3xl  p-4 md:p-5 ${
            darkMode
              ? "bg-[#040404] text-white border-zinc-700"
              : "bg-zinc-100 text-black border-zinc-200"
          } backdrop-blur-2xl border  shadow-lg`}
        >
          <Outlet />

          {/* Decorative Element */}
          <div className="absolute w-64 h-64 border-2 blur-3xl border-green-800 -z-40 bg-green-500/10 top-0 right-4" />
        </section>
      </main>
    </>
  );
};

export default DashboardLayout;
