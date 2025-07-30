import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { Link } from "react-router-dom";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { useAuthStore } from "../store/userStore";
import { IoMdCheckmark } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";

const UploadedFiles = ({ fileURL }) => {
  const [files, setFiles] = useState("");
  const [activeFile, setActiveFile] = useState("");
  const { darkMode } = useAuthStore();

  useEffect(() => {
    async function getAllFiles() {
      const res = await axiosInstance.get("chat/files", {
        withCredentials: true,
      });
      setFiles(res.data.files);
    }
    getAllFiles();
  }, [fileURL, activeFile]);

  const deleteFile = async (name) => {
    try {
      const res = await axiosInstance.delete(`chat/files/${name}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
      }
      toast.success("File deleted successfully");
    } catch (error) {
      console.log("ERROR IN DELETING FILE : ", error);
    }
  };

  const markFileAsActive = async (name) => {
    try {
      const res = await axiosInstance.post(
        `chat/files/active`,
        {
          name,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Marked as active");
        setActiveFile(name);
      }
    } catch (error) {
      console.log("ERROR IN MARKING FILE AS ACTIVE : ", error);
    }
  };

  return (
    <div>
      {files.length !== 0 ? (
        <div className="mt-8 grid grid-cols-4 gap-2">
          {files?.map((file) => (
            <div
              key={file._id}
              className={` mb-2 cursor-pointer border ${
                darkMode ? "border-zinc-700" : "border-zinc-300"
              }  rounded-4xl shadow-md  flex items-center flex-col ml-11  justify-between w-full bg-white/10 backdrop-blur-xl overflow-hidden  p-2 `}
            >
              <div
                className={`inset-shadow-sm ${
                  darkMode
                    ? "bg-zinc-500/20 "
                    : " inset-shadow-zinc-500 bg-zinc-500/10"
                }    w-full flex items-center justify-center p-12 rounded-4xl `}
              >
                <BsFileEarmarkPdfFill size={60} />
              </div>

              <div className="flex flex-col p-2 items-start justify-center  w-full ">
                <div key={file._id} className="p-2">
                  <span className="font-semibold flex items-center gap-3">
                    {file.name}
                  </span>
                </div>
                <div className="w-full space-x-2 flex">
                  <button
                    onClick={() => markFileAsActive(file.name)}
                    className={`text-xs text-green-700 rounded-4xl bg-green-500/10 px-3 font-medium hover:bg-green-500/20 cursor-pointer p-2 w-1/2  ${
                      file?.isActive && "border border-green-300"
                    }`}
                  >
                    {file?.isActive ? (
                      <span
                        className={` text-xs flex items-center justify-center gap-2`}
                      >
                        <CiCircleCheck size={16} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center justify-center text-nowrap">
                        <IoMdCheckmark /> Mark as Active
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => deleteFile(file.name)}
                    className=" text-xs text-red-500 rounded-4xl bg-red-500/10 px-3 font-medium hover:bg-red-500/20 cursor-pointer gap-2 p-2 w-1/2 flex items-center justify-center"
                  >
                    <GoTrash size={15} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <section className="h-full flex-col text-zinc-700 w-full py-8 flex items-center justify-center">
            <BsFileEarmarkPdfFill size={80} />
            <span className="mt-1">No files uploaded yet</span>
          </section>
        </>
      )}
    </div>
  );
};

export default UploadedFiles;
