import { useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../config/axios";
import { useAuthStore } from "../store/userStore";
import { FcGoogle } from "react-icons/fc";
import { LuLoaderCircle } from "react-icons/lu";
import { BsRobot } from "react-icons/bs";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  // const { setIsLoggedIn } = useStore();
  const login = useAuthStore((state) => state.login);

  async function handleLogin() {
    try {
      setLoading(true);
      const res = await axiosInstance.post(`user/login`, {
        email,
        password,
      });
      console.log(res);
      if (res.data.token) {
        login(res.data.user, res.data.token);
        toast.success(res.data.message);
        navigate("/dashboard/pricing");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href =
      "https://bharat-chatbot-backend.onrender.com/auth/google";
    navigate("/dashboard/pricing");
  };

  useEffect(() => {
    async function getUser() {
      const res = await axiosInstance.get("user/me", {
        withCredentials: true,
      });
      console.log(res);
      setUser(res.data.user);
    }
    getUser();
  }, []);

  return (
    <main className="h-screen w-full grid  md:grid-cols-2 place-items-center  text-black">
      <section className=" bg-black hidden md:flex items-center justify-center w-full md:h-screen relative">
        <svg
          className="absolute top-0 left-0 z-10 w-full h-full"
          viewBox="0 0 800 310"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#60e096"
            fillOpacity="0.3"
            d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
          />
        </svg>

        <div className="h-28 w-20 bg-green-500 absolute top-0 left-0 blur-3xl" />

        <div>
          <h1 className="text-white flex items-center gap-3 font-semibold text-5xl">
            {" "}
            <BsRobot size={52} />
            Bharat Chatbot
          </h1>
          <p className="text-green-500 pl-17">
            Empowering Conversations, the Indian Way.
          </p>
        </div>
      </section>

      <section className="md:w-1/2">
        <div className="flex flex-col gap-5 md:w-full p-5 bg-gradient-to-b from-green-50 to-green-100 rounded-lg  shadow-xl shadow-zinc-500/30">
          <div className="flex items-center mb-5 gap-4">
            <span className="text-5xl">
              {" "}
              <BsRobot size={40} />
            </span>
            <p className="text-2xl font-bold">Welcome back </p>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="p-2 shadow-lg rounded-xl bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 shadow-lg rounded-xl bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex items-center rounded-xl mt-5 gap-2 justify-center bg-gradient-to-r shadow-zinc-400 from-[#2A7B9B] via-[#57C785] to-[#EDDD53] p-2 shadow-lg "
          >
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin" size={20} />
              </>
            ) : (
              <>
                {" "}
                <TbLogin2 size={20} /> Login{" "}
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
            <span className="h-[0.05px] w-full bg-zinc-300" />
            <p>OR</p>
            <span className="h-[0.05px] w-full bg-zinc-300" />
          </div>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center rounded-xl justify-center p-2 gap-2 shadow-lg shadow-zinc-400 hover:bg-zinc-300 cursor-pointer bg-white"
          >
            <FcGoogle />
            Sign in with Google
          </button>
          <Link to={"/signup"} className="text-[#2A7B9B] text-xs">
            Don't have an account ? Signup here
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
