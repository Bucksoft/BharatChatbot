import { FaPlus } from "react-icons/fa6";
import { RiLinksFill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { useAuthStore } from "../store/userStore";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { LuLoader, LuLoaderCircle } from "react-icons/lu";

const UploadURLPage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [fetchingUrls, setFetchingUrls] = useState(false);
  const { activePlan, allUrls, setAllUrls, darkMode } = useAuthStore();

  console.log(activePlan);

  async function handleUrlSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const planId = activePlan?.planId?._id;
      const urlFeature = activePlan?.planId?.features?.find(
        (f) => f.name === "Url_upload"
      );
      const credits_per_unit = urlFeature?.perUnitCreditCost;

      console.log("Sending payload:", { url, planId, credits_per_unit });
      if (!planId || !credits_per_unit) {
        toast.error("Missing plan details. Please check your subscription.");
        setLoading(false);
        return;
      }
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
        setFetchingUrls(true);
        const res = await axiosInstance.get("chat/all", {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          setAllUrls(res.data.allUrls);
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      } finally {
        setFetchingUrls(false);
      }
    }
    getAllUrls();
  }, [loading, isDeleted]);

  const handleDeleteUrl = async (url) => {
    try {
      setIsDeleted(false);
      setDeleting(true);
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
    } finally {
      setDeleting(false);
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
      {fetchingUrls ? (
        <>
          <div className="flex items-center gap-3 py-44 w-full justify-center">
            <LuLoaderCircle className="animate-spin" /> <span>Loading....</span>
          </div>
        </>
      ) : (
        <>
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
              style={{
                boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
              }}
              className={` ${
                loading ? "bg-zinc-500/10 shadow-none" : ""
              } md:w-1/6 w-full hover:bg-green-700 transition-all ease-in-out  px-5 py-2 bg-green-800 flex items-center justify-center gap-2 shadow-md rounded-4xl shadow-green-500/40 cursor-pointer`}
            >
              {loading ? (
                <div
                  className={` text-zinc-500 flex text-sm items-center gap-2  `}
                >
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:px-11">
              {allUrls?.map((url, index) => (
                <div
                  key={index}
                  className={`transition-all duration-200 rounded-3xl border shadow-md p-5 flex flex-col justify-between hover:shadow-lg group ${
                    darkMode
                      ? "bg-zinc-900 border-zinc-700 text-white"
                      : "bg-white border-zinc-200 text-zinc-800"
                  }`}
                >
                  <div className="w-full">
                    <Link
                      to={url?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium truncate block mb-2 ${
                        darkMode
                          ? "text-blue-300 group-hover:text-blue-400"
                          : "text-blue-600 group-hover:text-blue-700"
                      }`}
                      title={url?.url}
                    >
                      {url?.url}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between mt-4 space-x-3">
                    <button
                      onClick={() => markURLasActive(url?.url)}
                      className={`w-1/2 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-150 ${
                        darkMode
                          ? "bg-green-600/10 text-green-300 hover:bg-green-500/20"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {activating ? (
                        <LuLoader className="animate-spin text-sm" />
                      ) : (
                        "Mark as Active"
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteUrl(url?.url)}
                      className={`w-1/2 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 ${
                        darkMode
                          ? "bg-red-500/10 text-red-200 hover:bg-red-600/20"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                      title="Delete"
                    >
                      {deleting ? (
                        <LuLoaderCircle className="animate-spin text-sm" />
                      ) : (
                        <>
                          <GoTrash size={12} /> <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default UploadURLPage;
