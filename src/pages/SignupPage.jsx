import { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";
import { BsRobot } from "react-icons/bs";
import { LuLoaderCircle } from "react-icons/lu";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post(`user/signup`, {
        name,
        email,
        password,
      });
      console.log(res);
      toast.success(res.data.message || "Signup successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
      setEmail("");
      setName("");
      setPassword("");
    }
  }

  return (
    <main className="h-screen w-full grid md:grid-cols-2 place-items-center text-black">
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

      <form
        onSubmit={signup}
        className="flex bg-gradient-to-b from-green-50 to-green-100  flex-col gap-5 md:w-1/2  p-5 rounded-xl   shadow-xl shadow-zinc-500/30"
      >
        <div className="flex items-center my-5 gap-3">
          <span className="text-5xl">
            {" "}
            <BsRobot size={40} />
          </span>
          <p className="text-2xl font-bold  text-nowrap">Create an account</p>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          className="p-2 shadow-lg rounded-xl bg-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="flex items-center rounded-xl gap-2 justify-center bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] shadow-zinc-400 shadow-lg  py-2">
          {loading ? (
            <>
              <LuLoaderCircle className="animate-spin" size={20} />
            </>
          ) : (
            <>
              {" "}
              <TbLogin2 size={20} /> Signup{" "}
            </>
          )}
        </button>
        <Link to={"/login"} className="text-[#2A7B9B] text-xs">
          Already have an account ? Login here
        </Link>
      </form>
    </main>
  );
};

export default SignupPage;
