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
        className={`h-screen md:p-5 gap-2 relative flex flex-col md:flex-row ${
          darkMode ? "bg-green-800/20" : "md:bg-green-900/60"
        }`}
      >
       
          {/* Background Waves */}
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute top-1/2 left-1/2 w-full max-w-[1440px] -translate-x-1/2 -translate-y-1/2 z-[-1]"
          >
            {/* Light Green Layer */}
            <path
              fill="#86efac"
              fillOpacity="0.5"
              d="M0,160L48,144C96,128,192,96,288,85.3C384,75,480,85,576,112C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96V320H0Z"
            />
            {/* Medium Green Layer */}
            <path
              fill="#4ade80"
              fillOpacity="0.5"
              d="M0,192L60,186.7C120,181,240,171,360,149.3C480,128,600,96,720,106.7C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96V320H0Z"
            />
            {/* Dark Green Layer */}
            <path
              fill="#22c55e"
              fillOpacity="0.6"
              d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,208C672,203,768,149,864,133.3C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224V320H0Z"
            />
          </svg>

         
         
        

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
