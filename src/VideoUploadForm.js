import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

function VideoUploadForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [category, setCategory] = useState("");
  const [progrossbar, setProgrossbar] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"));

        const response = await axios.get(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error.response.data.message || "Internal Server Error");
      }
    };

    fetchUserProfile();
  }, []);

  const author = userProfile && userProfile.map((item) => item.name);
  const authorImage = userProfile && userProfile.map((item) => item.imageUrl);

  const maxSize = 50000000;

  // console.log(authorImage);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("author", author);
    formData.append("authorImage", authorImage);
    formData.append("category", category);

    if (selectedFile === null) {
      toast.error("video file not selected");
    } else if (maxSize < (selectedFile && selectedFile.size)) {
      toast.error("File Too Large Max size 50mb");
    } else {
      try {
        await axios.post(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              setProgrossbar(Math.floor(event.loaded / event.total) * 100);
            },
          }
        );
        toast.success("Video uploaded successfully");
        navigate("/");
      } catch (error) {
        console.log("Error uploading video", error);
        toast.error(error.message);
      }
    }
    setSelectedFile(null);
  };

  return (
    <div className=" ">
      <div className="h-[100vh] w-[100%] flex flex-col justify-center items-center">
        <h2 className="text-[25px] md:mt-[40px] font-bold font-mono text-gray-900 m-4">
          Video Streaming Platform
        </h2>
        <form
          className="p-6 m-2 w-[95%] md:w-[40%] bg-white shadow-2xl rounded-lg flex flex-col   gap-2 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 ">
            <label className="text-[16px] font-semibold text-gray-700">
              Choose video file
            </label>
            <input
              className=" p-1 border border-gray-400"
              type="file"
              required
              name="video"
              accept="video/mp4"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <label className=" text-[16px] font-semibold text-gray-700">
              Select video cattegory
            </label>
            <select
              className=" text-[18px] mb-[10px] outline-none p-2 border bg-inherit border-gray-400"
              type="text"
              required
              placeholder="Enter category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option className=" text-gray-500 " value="">
                Select category
              </option>
              <option value="comedy">Comedy</option>
              <option value="song">Song</option>
              <option value="movie">Movie</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-blue-600 border border-2-solid rounded-md font-bold text-white shadow-md"
              type="submit"
            >
              UPLOAD
            </button>
          </div>
        </form>
        <div className="py-4 my-1">
          {progrossbar !== null && <p>Uploading {progrossbar}%</p>}
        </div>
      </div>
    </div>
  );
}

export default VideoUploadForm;
