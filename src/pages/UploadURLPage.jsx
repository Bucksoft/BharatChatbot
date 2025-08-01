import { FaPlus } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { useAuthStore } from "../store/userStore";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { LuLoader } from "react-icons/lu";

const UploadURLPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { activePlan, allUrls, setAllUrls, darkMode } = useAuthStore();

  console.log(activePlan);

  async function handleUrlSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const planId = activePlan?.planId?._id;
      const urlFeature = activePlan?.planId?.features?.find(
        (f) => f.name === "url_upload"
      );
      const credits_per_unit = urlFeature?.perUnitCreditCost;

      console.log("Sending payload:", { url, planId, credits_per_unit });

      const res = await axiosInstance.post(
        "chat/url",
        { url, planId, credits_per_unit },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg || "Uploaded");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Upload failed");
    } finally {
      setLoading(false);
      setUrl("");
    }
  }

  useEffect(() => {
    async function getAllUrls() {
      try {
        const res = await axiosInstance.get("chat/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          setAllUrls(res.data.allUrls.website_urls);
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
    getAllUrls();
  }, [loading, isDeleted]);

  const handleDeleteUrl = async (url) => {
    try {
      setIsDeleted(false);
      const res = await axiosInstance.delete(`chat/url`, {
        data: { url },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
      }
      setIsDeleted(true);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const markURLasActive = async (url) => {
    try {
      setActivating(true);
      const res = await axiosInstance.put(
        "chat/url/active",
        {
          url,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setActivating(false);
    }
  };

  return (
    <main className="md:p-8">
      <svg
        className="absolute hidden md:block top-0 left-0 -z-10 w-full h-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#60e096"
          fillOpacity="0.4"
          d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
        />
      </svg>
      <h1
        className={`font-bold text-3xl ${
          darkMode ? "text-zinc-100" : "text-zinc-700"
        }  flex items-center gap-3`}
      >
        <FiLink /> Upload website URL
      </h1>
      <p
        className={` ${
          darkMode ? "text-zinc-200" : "text-zinc-700"
        }  text-sm ml-11`}
      >
        Let BuckBot Read and Understand Your Website — Just Share the Link{" "}
      </p>

      <form
        onSubmit={handleUrlSubmit}
        className="md:ml-11 mt-8 flex md:flex-row flex-col items-center gap-3"
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`py-2 px-3 rounded-4xl border ${
            darkMode ? "placeholder:text-zinc-500" : ""
          } border-zinc-400 md:w-5/6 w-full`}
          placeholder="https://buckbot-ai.com"
        />
        <button
          disabled={loading}
          className={` ${
            loading ? "bg-zinc-500/10 shadow-none" : ""
          } md:w-1/6 w-full hover:bg-green-700 transition-all ease-in-out  px-5 py-2 bg-green-800 flex items-center justify-center gap-2 shadow-md rounded-4xl shadow-green-500/40 cursor-pointer`}
        >
          {loading ? (
            <div className={` text-zinc-500 flex text-sm items-center gap-2  `}>
              <FiLoader size={24} className="animate-spin " /> Uploading...
            </div>
          ) : (
            <p className="text-white flex items-center gap-2">
              <FaPlus /> Upload URL
            </p>
          )}
        </button>
      </form>

      {allUrls?.length === 0 ? (
        <section className="h-full flex-col text-zinc-300 w-full py-8 flex items-center justify-center">
          <RiLinksFill size={80} />
          <span className="mt-1">No links uploaded yet</span>
        </section>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:px-11">
          {allUrls?.map((url, index) => (
            <div
              key={index}
              className={`${
                darkMode ? "border-zinc-700" : "border-zinc-300"
              }   bg-white/10 shadow-md border rounded-4xl p-4 flex flex-col items-center justify-between hover:shadow-lg transition-all`}
            >
              <Link
                to={url?.url}
                target="_blank"
                rel="noopener noreferrer"
                className={` ${
                  darkMode ? "text-blue-300" : "text-blue-500"
                }  hover:underline  truncate w-full`}
                title={url}
              >
                {url?.url}
              </Link>

              <div className="flex items-center justify-center mt-2 w-full">
                <button
                  onClick={() => markURLasActive(url?.url)}
                  className={` ${
                    darkMode
                      ? "text-green-400 bg-green-500/10"
                      : "text-green-600 bg-green-500/10"
                  } flex items-center text-xs   rounded-4xl py-2  px-3 justify-center text-nowrap  w-1/2  cursor-pointer`}
                >
                  {activating ? (
                    <LuLoader className="animate-spin " />
                  ) : (
                    <p>Mark as Active</p>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteUrl(url?.url)}
                  className={`${
                    darkMode ? "text-red-100 bg-red-500" : "bg-red-500/20"
                  }  rounded-4xl flex items-center justify-center gap-2 hover:text-red-700 text-xs ml-4 cursor-pointer  w-1/2  py-2 px-3`}
                  title="Delete"
                >
                  <GoTrash size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default UploadURLPage;
