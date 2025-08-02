import { FaPlus } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { axiosInstance } from "../config/axios";
import UploadedFiles from "../components/UploadedFiles";
import { LoaderIcon, toast } from "react-hot-toast";
import { useAuthStore } from "../store/userStore";

const UploadFiles = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileURL, setFileURL] = useState("");
  const { darkMode, activePlan } = useAuthStore();

  async function handleFileUpload() {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      formData.append("planId", activePlan?.planId?._id);
      formData.append(
        "credits_per_unit",
        activePlan?.planId?.features[1]?.perUnitCreditCost
      );
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post(`chat/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setFileURL(res.data.fileUrl);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "File could not be uploaded");
      console.log(`Error in uploading file...`, error);
    } finally {
      setFile("");
      setLoading(false);
    }
  }

  return (
    <>
      <main className="md:p-8 ">
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
          <VscFilePdf /> Upload your pdf
        </h1>
        <p
          className={`${
            darkMode ? "text-zinc-200" : "text-zinc-700"
          } text-sm md:text-md ml-11`}
        >
          Let BuckBot Analyze and Chat with Your PDF Documents.
        </p>

        <section className="md:ml-11 mt-8">
          <label
            htmlFor="file"
            style={{
              boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
              background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
            }}
            className="md:w-1/6 rounded-4xl hover:bg-green-700 transition-all ease-in-out  px-5 py-2 bg-green-800 text-white flex items-center justify-center gap-2 shadow-md shadow-green-500/40 cursor-pointer"
          >
            <FaPlus /> Select pdf
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </section>

        {file && (
          <div className=" md:w-3/4 mt-5 md:ml-11 flex md:flex-row flex-col md:items-center justify-between">
            <p className="flex items-center gap-2 pl-2 py-2 ">
              <VscFilePdf size={16} />
              <span className="font-semibold">{file?.name}</span>
            </p>
            <div className="flex items-center gap-8">
              {/* <button onClick={() => setFile("")}>
                <RxCross2 className="text-red-500 cursor-pointer" />
              </button> */}
              <button
                onClick={handleFileUpload}
                className="bg-green-800 text-white rounded-4xl flex items-center gap-2 font-medium p-2 px-5 w-full  justify-center hover:bg-green-700 cursor-pointer "
                style={{
                  boxShadow: `inset 0 4px 6px rgba(255, 255, 255, 0.15), 
                inset 0 -4px 6px rgba(0, 0, 0, 0.5)`,
                  background: `linear-gradient(to bottom, #57C785, #3a9b5d)`,
                }}
              >
                {loading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <>
                    <FiUpload />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        <UploadedFiles fileURL={fileURL} />
      </main>
    </>
  );
};

export default UploadFiles;
