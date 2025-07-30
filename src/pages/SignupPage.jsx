import { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`user/signup`, {
        name,
        email,
        password,
      });
      toast.success(res.data.msg);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setEmail("");
      setName("");
      setPassword("");
    }
  }

  return (
    <main className="h-screen w-full grid place-items-center  text-black">
      <form
        onSubmit={signup}
        className="flex flex-col gap-5  w-1/4  p-5 rounded-xl  border-rose-500/20  shadow-xl shadow-zinc-500/30"
      >
        <div className="flex items-center my-5">
          <span className="text-5xl">🤖</span>
          <p className="text-2xl font-bold  text-nowrap">Create an account</p>
        </div>
        <input
          type="text"
          placeholder="Your Name"
          className=" p-2 border rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className=" p-2 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" p-2 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="flex items-center rounded-xl gap-2 justify-center bg-gradient-to-r from-[#2A7B9B] via-[#57C785] to-[#EDDD53] shadow-lg  py-2">
          <TbLogin2 size={20} /> Sign up
        </button>
        <Link to={"/login"} className="text-[#2A7B9B] text-xs">
          Already have an account ? Login here
        </Link>
      </form>
    </main>
  );
};

export default SignupPage;
