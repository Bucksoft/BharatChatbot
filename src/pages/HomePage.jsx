import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userStore";
import { LuLogIn } from "react-icons/lu";
import botImg from "../assets/bot.png";

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <main className="bg-black min-h-screen relative overflow-hidden">
      {/* Blurry background blob */}
      <div className="absolute top-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#60e096] opacity-40 rounded-full blur-[120px] z-0" />

      {/* Bot image behind heading */}
      <img
        src={botImg}
        alt="Chatbot"
        className="absolute left-0 -bottom-10 z-0 w-[250px] sm:w-[350px] md:w-[400px]"
      />

      <section className="w-[90%] max-w-[1200px] mx-auto relative z-10">
        {/* Navbar */}
        <nav className="p-4 flex flex-row sm:flex-row  items-center justify-between gap-3">
          <Link to="/" className="md:text-xl text-xs font-semibold text-white">
            🤖 Bharat Chatbot
          </Link>

          <div className="flex items-center gap-3">
            {user && (
              <Link
                to="/dashboard/pricing"
                className="text-xs font-semibold text-white"
              >
                Dashboard
              </Link>
            )}
            {!user ? (
              <Link to="/login">
                <button className="px-6 py-2 bg-green-800 cursor-pointer text-white rounded-4xl font-medium hover:bg-green-700 transition-colors ease-in-out duration-150 flex items-center gap-2">
                  <LuLogIn /> Login
                </button>
              </Link>
            ) : (
              <span className="rounded-full bg-red-500/60 text-white  text-xs w-8 h-8 flex items-center justify-center">
                {user.name[0].toUpperCase()}
              </span>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center flex-col justify-center p-4 text-center font-bold relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#226985] via-[#4aac73] to-[#c4b744] leading-tight">
            Supercharge Your Bot. Track It. Tweak It. Own It
          </h1>

          <p className="text-sm sm:text-base md:text-lg mt-4 font-normal text-zinc-300 max-w-xl">
            Stay in control of your chatbot's brain — from messages to metrics.
          </p>

          {user ? (
            <Link to="/dashboard/pricing">
              <button className="text-sm mt-8 px-8 sm:px-12 py-3 rounded-[2rem] bg-green-800 text-white font-semibold border border-green-100 cursor-pointer">
                Get Started
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="font-medium text-sm mt-10 py-3 px-6 sm:px-8 border-2 rounded-full border-[#133a49] text-[#133a49] hover:text-white hover:bg-gradient-to-r cursor-pointer hover:from-[#133a49] via-[#285c3e] to-[#8a8130]">
                Get Started
              </button>
            </Link>
          )}
        </section>
      </section>
    </main>
  );
};

export default HomePage;
