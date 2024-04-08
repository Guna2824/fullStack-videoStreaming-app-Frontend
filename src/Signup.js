import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const maxSize = 2000000;

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!name) {
      validationErrors.name = "username is required";
    }
    if (!phone) {
      validationErrors.phone = "phonenumber is required";
    } else if (phone.length !== 10) {
      validationErrors.phone = "enter correct phonenumber";
    }
    if (!email) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "enter correct email formate";
    }
    if (!password) {
      validationErrors.password = "pasword is required";
    } else if (password.length < 5) {
      validationErrors.password = "password must 6 digit";
    }
    if (maxSize < (imageUrl && imageUrl.size)) {
      validationErrors.imageUrl = "File Too Large max size 2mb";
    }
    setError(validationErrors);
    toast.error(error.name);
    toast.error(error.email);
    toast.error(error.phone);
    toast.error(error.password);
    toast.error(error.imageUrl);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imageUrl", imageUrl);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const uploadResponse = await axios.post(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/imageupload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = uploadResponse.data.imageUrl;
        // console.log(uploadResponse);

        await axios.post(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/register",
          {
            name,
            phone,
            email,
            password,
            imageUrl,
          }
        );
        toast.success("user signup successfully");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
      } catch (err) {
        // console.log(err.response.data);
        toast.error(err.response.data);
      }
      navigate("/login");
    }
  };

  return (
    <section className="bg-white ">
      <form className="h-[85vh] lg:mt-[7%] flex flex-col items-center mt-[50px] md:pt-[50px]">
        <fieldset className=" pb-4 h-[85vh] overflow-y-auto w-[90%] flex flex-col items-center  gap-2 md:gap-3">
          <legend className="text-right lg:text-center mr-5 p-1">
            <h1 className="text-purple-800 font-bold text-[30px]">SignUp</h1>
          </legend>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                User name <span className="text-red-500">*</span>
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter user name"
                type="text"
                required
                value={name.trim()}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                Phone number <span className="text-red-500">*</span>
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter phone number"
                type="number"
                required
                value={phone.trim()}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                E-mail <span className="text-red-500">*</span>
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter e-mail"
                type="text"
                required
                value={email.trim()}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                Password <span className="text-red-500">*</span>
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                Choose user image
              </legend>
              <input
                className=" w-[100%] text-[14px] p-1 lg:p-3  text-gray-700 outline-none pl-2 "
                placeholder="Choose logo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </fieldset>
          </div>

          <div className="w-[80%] flex justify-center ">
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-1.5 w-[50%] lg:w-[25%] border rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 shadow-lg "
            >
              REGISTER
            </button>
          </div>

          <div className="w-[80%] flex flex-col items-center justify-center gap-2 ">
            <p className="text-purple-900">allready registered user</p>
            <button
              type="submit"
              className="underline py-1.5 w-[40%] lg:w-[15%] text-purple-800 font-semibold lg:text-[20px] "
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              LOGIN
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Signup;
