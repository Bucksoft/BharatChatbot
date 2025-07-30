import { useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../config/axios";
import { useAuthStore } from "../store/userStore";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  // const { setIsLoggedIn } = useStore();
  const login = useAuthStore((state) => state.login);

  async function handleLogin() {
    try {
      const res = await axiosInstance.post(`user/login`, {
        email,
        password,
      });
      console.log("LOGIN RESPONSE ", res);
      if (res.data.token) {
        login(res.data.userData, res.data.token);
        toast.success(res.data.msg);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.err || error.response.data.msg);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
    console.log("GOOGLE LOGIN CALLED ");
    navigate("/dashboard");
  };

  useEffect(() => {
    async function getUser() {
      const res = await axiosInstance.get("user/me", {
        withCredentials: true,
      });
      setUser(res.data);
    }
    getUser();
  }, []);

  return (
    <main className="h-screen w-full grid place-items-center  text-black">
      <section className="flex flex-col gap-5 w-1/4 p-5 border-rose-500/20 rounded-lg  shadow-xl shadow-zinc-500/30">
        <div className="flex items-center mb-5">
          <span className="text-5xl">🤖</span>
          <p className="text-2xl font-bold">Welcome back </p>
        </div>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="flex items-center rounded-xl mt-5 gap-2 justify-center bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] p-2 shadow-lg "
        >
          <TbLogin2 size={20} /> Login up
        </button>
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
          <span className="h-[0.05px] w-full bg-zinc-300" />
          <p>OR</p>
          <span className="h-[0.05px] w-full bg-zinc-300" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center rounded-xl justify-center p-2 gap-2 border border-zinc-300 hover:bg-zinc-300 cursor-pointer"
        >
          <FcGoogle />
          Sign in with Google
        </button>
        <Link to={"/signup"} className="text-[#2A7B9B] text-xs">
          Don't have an account ? Signup here
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
