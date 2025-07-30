import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userStore";

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <main className="w-3/4 mx-auto relative">
      {/* Blurry background */}
      <div className="h-16 w-80 -z-10 blur-3xl bg-[#60e096] absolute left-5 " />

      <nav className="p-3 flex items-center justify-between">
        <Link to={"/"} className="text-xl font-semibold">
          🤖 BuckBot AI
        </Link>
        {user ? (
          <span className=" rounded-full bg-black/80 text-white w-10 h-10 flex items-center justify-center">
            {user.name[0].toUpperCase()}
          </span>
        ) : (
          <Link to={"/login"}>
            <button className="px-6 py-2 bg-[#57C785] cursor-pointer text-white rounded-xl font-medium hover:bg-[#609777]">
              Login
            </button>
          </Link>
        )}
      </nav>

      <section className="h-[85vh] bg-full flex items-center flex-col justify-center p-5 text-6xl text-center  font-bold">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#133a49] via-[#285c3e] to-[#8a8130]">
          Supercharge Your Bot. Track It. Tweak It. Own It
        </h1>
        <p className="text-lg mt-3 font-normal text-zinc-700">
          Stay in control of your chatbot's brain — from messages to metrics.
        </p>
        {user ? (
          <Link to={"/dashboard/pricing"}>
            <button className="font-medium text-sm my-10 py-3 px-8 border-2 rounded-full border-[#133a49] text-[#133a49] hover:text-white hover:bg-gradient-to-r cursor-pointer hover:from-[#133a49] via-[#285c3e] to-[#8a8130]">
              Get Started
            </button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="font-medium text-sm my-10 py-3 px-8 border-2 rounded-full border-[#133a49] text-[#133a49] hover:text-white hover:bg-gradient-to-r cursor-pointer hover:from-[#133a49] via-[#285c3e] to-[#8a8130]">
              Get Started
            </button>
          </Link>
        )}
      </section>
    </main>
  );
};

export default HomePage;
