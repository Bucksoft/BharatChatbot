import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { HiKey } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { axiosInstance } from "../config/axios";
import { BiCopy } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/userStore";

const GenerateKeysPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { darkMode } = useAuthStore();

  // async function generateAPIKeys() {
  //   try {
  //     setLoading(true);
  //     const res = await axiosInstance.post(
  //       `chat/api-key`,
  //       {
  //         name,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     setData((prev) => [...prev, res.data.apiKey]);
  //   } catch (error) {
  //     console.error("ERROR : ", error);
  //   } finally {
  //     setShowPopup(false);
  //     setName("");
  //     setLoading(false);
  //   }
  // }

  function handleCopyApiKey(key) {
    navigator.clipboard.writeText(key);
    toast.success("Copied");
  }

  useEffect(() => {
    async function getAllApiKeys() {
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
    getAllApiKeys();
  }, []);

  console.log(data);

  return (
    <main className="p-8 relative">
      <h1
        className={`font-bold text-3xl ${
          darkMode ? "text-zinc-100" : "text-zinc-700"
        }  flex items-center gap-3`}
      >
        <IoKeyOutline /> Your API Keys
      </h1>
      <p className={` ${darkMode ? "text-zinc-200" : "text-zinc-700"}   ml-11`}>
        Manage and access your API keys securely in one place.
      </p>
      {/* <section className="ml-11 mt-8">
        <button
          onClick={() => setShowPopup(true)}
          className="hover:bg-green-700 rounded-xl transition-all ease-in-out  px-5 py-2 bg-green-800 text-white flex items-center gap-2 shadow-md shadow-green-500/40 cursor-pointer"
        >
          <FaPlus /> Generate New
        </button>
      </section> */}

      <section className="ml-11 mt-8">
        {data?.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center gap-3 text-zinc-400">
              <HiKey size={80} />
              <span>No API keys generated</span>
            </div>
          </>
        ) : (
          // <table
          //   className={`w-full border ${
          //     darkMode ? "border-zinc-600 " : "border-zinc-400"
          //   } `}
          // >
          //   <thead>
          //     <tr
          //       className={`border ${
          //         darkMode
          //           ? "bg-zinc-800 border-zinc-600"
          //           : "bg-zinc-300 border-zinc-400"
          //       }  `}
          //     >
          //       <th
          //         className={`text-center py-2 border-r ${
          //           darkMode ? "border-zinc-500" : "border-zinc-400"
          //         } `}
          //       >
          //         Name
          //       </th>
          //       <th
          //         className={`text-center py-2 border-r ${
          //           darkMode ? "border-zinc-500" : "border-zinc-400"
          //         } `}
          //       >
          //         Key
          //       </th>
          //       <th
          //         className={`text-center py-2 border-r ${
          //           darkMode ? "border-zinc-500" : "border-zinc-400"
          //         } `}
          //       >
          //         Created On
          //       </th>
          //       <th
          //         className={`text-center py-2  ${
          //           darkMode ? "border-zinc-500" : "border-zinc-400"
          //         } `}
          //       >
          //         Action
          //       </th>
          //     </tr>
          //   </thead>
          //   <tbody className="">
          //     {
          //       <>
          //         {data?.map((d, index) => (
          //           <tr
          //             key={index}
          //             className={`border-t ${
          //               darkMode ? " border-zinc-500" : "border-zinc-400"
          //             }  `}
          //           >
          //             <td
          //               className={`text-center py-2 ${
          //                 darkMode ? "border-zinc-500" : "border-zinc-400"
          //               } border-r `}
          //             >
          //               {d?.name}
          //             </td>
          //             <td
          //               className={`text-center py-2 ${
          //                 darkMode ? "border-zinc-500" : "border-zinc-400"
          //               } border-r `}
          //             >
          //               {d?.key.slice(0, 30)}.......
          //             </td>
          //             <td
          //               className={`text-center py-2 ${
          //                 darkMode ? "border-zinc-500" : "border-zinc-400"
          //               } border-r `}
          //             >
          //               {d?.createdAt.split("T")[0]}
          //             </td>
          //             <td
          //               className={`text-center py-2 ${
          //                 darkMode ? "border-zinc-500" : "border-zinc-400"
          //               } border-r `}
          //             >
          //               {new Date(d?.expiresIn) < new Date() ? (
          //                 <span className="ml-4 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
          //                   Expired
          //                 </span>
          //               ) : (
          //                 <button
          //                   onClick={() => handleCopyApiKey(d?.key)}
          //                   className={`${
          //                     darkMode ? "text-zinc-200" : "text-zinc-700"
          //                   } pl-4 cursor-pointer`}
          //                 >
          //                   <BiCopy />
          //                 </button>
          //               )}
          //             </td>
          //           </tr>
          //         ))}
          //       </>
          //     }
          //   </tbody>
          // </table>
          <div>
            {data?.map((d) => (
              <div
                className={`${
                  darkMode && "border-zinc-700 bg-white/10 "
                } backdrop-blur-3xl bg-white flex items-center justify-between p-5 shadow-lg rounded-4xl border border-zinc-300 text-sm`}
              >
                <div>
                  <h3 className="font-semibold text-center">Name</h3>
                  <p
                    className={`mt-3 ${
                      darkMode ? "text-green-500" : "text-green-700 "
                    }`}
                  >
                    {d?.name}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-center">Key</h3>
                  <p
                    className={`mt-3  ${
                      darkMode ? "text-green-500" : "text-green-700 "
                    }`}
                  >
                    {d?.key.slice(0, 30)}......
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-center">Added</h3>
                  <p
                    className={`mt-3  ${
                      darkMode ? "text-green-500" : "text-green-700 "
                    }`}
                  >
                    {d?.createdAt.split("T")[0]}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-center">Action</h3>
                  <button
                    onClick={() => handleCopyApiKey(d?.key)}
                    className={`${
                      darkMode ? "text-green-500" : "text-green-700"
                    } pl-4 cursor-pointer mt-3 `}
                  >
                    <BiCopy />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all ease-in-out duration-500">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-sm">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-rose-500 mr-3 text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={generateAPIKeys}
                className="text-[#57C785] border border-[#57C785] rounded-xl px-4 py-2  hover:bg-[#57C785] hover:text-white"
              >
                Generate
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default GenerateKeysPage;
