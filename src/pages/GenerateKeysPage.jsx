import { useEffect, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { HiKey } from "react-icons/hi";
import { axiosInstance } from "../config/axios";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/userStore";
import { LuLoaderCircle } from "react-icons/lu";

const GenerateKeysPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { darkMode } = useAuthStore();

  function handleCopyApiKey(key) {
    navigator.clipboard.writeText(key);
    toast.success("Copied");
  }

  useEffect(() => {
    async function getMyApiKeys() {
      try {
        setLoading(true);
        const res = await axiosInstance.get("chat/keys", {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        toast.error(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    }
    getMyApiKeys();
  }, []);

  return (
    <main className="md:p-8 p-5 ">
      {loading ? (
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
            className={`w-full s font-bold text-3xl ${
              darkMode ? "text-zinc-100" : "text-zinc-700"
            }  flex items-center gap-3`}
          >
            <IoKeyOutline /> Your API Keys
          </h1>
          <p
            className={` ${
              darkMode ? "text-zinc-200" : "text-zinc-700"
            }   ml-11`}
          >
            Manage and access your API keys securely in one place.
          </p>

          <section className="md:ml-11 mt-8">
            {data?.length === 0 ? (
              <>
                <div className="flex flex-col items-center justify-center gap-3 text-zinc-400">
                  <HiKey size={80} />
                  <span>No API keys generated</span>
                </div>
              </>
            ) : (
              <div>
                {data?.map((d, index) => (
                  <div
                    key={index}
                    className={`${
                      darkMode && "border-zinc-700 bg-white/10 "
                    } backdrop-blur-3xl mb-2 bg-white flex md:flex-row flex-col md:items-center justify-between p-5  shadow-lg md:rounded-4xl rounded-md border border-zinc-300 text-sm`}
                  >
                    <div className="">
                      <h3 className="font-semibold md:text-center">Name</h3>
                      <p
                        className={` ${
                          darkMode ? "text-green-500" : "text-green-700 "
                        }`}
                      >
                        {d?.name}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-semibold md:text-center">Key</h3>
                      <p
                        className={`${
                          darkMode ? "text-green-500" : "text-green-700 "
                        }`}
                      >
                        {d?.key.slice(0, 30)}......
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-semibold md:text-center">Added</h3>
                      <p
                        className={`  ${
                          darkMode ? "text-green-500" : "text-green-700 "
                        }`}
                      >
                        {d?.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <h3 className="font-semibold md:text-center">Action</h3>
                      <button
                        onClick={() => handleCopyApiKey(d?.key)}
                        className={`${
                          darkMode ? "text-green-500" : "text-green-700"
                        } md:pl-4 cursor-pointer  `}
                      >
                        <BiCopy />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default GenerateKeysPage;
