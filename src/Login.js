import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const status = { logInStatus: "logIn", logInTime: new Date() };

  const handleChange = (e) => {
    setError({});
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!data.name) {
      validationErrors.name = "username is required";
    }
    if (!data.password) {
      validationErrors.password = "pasword is required";
    }
    setError(validationErrors);
    toast.error(error.name);
    toast.error(error.password);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post(
            "https://fullstack-videostreaming-app-backend.onrender.com/user/login",
            data
          )
          .then((res) => {
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate("/");
            toast.success("Login successfully");
          });
        await axios.put(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/loginstatus",
          status,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("auth")),
            },
          }
        );
      } catch (err) {
        console.error(err);
        toast.error(err.response.data);
      }

      setData({
        name: "",
        password: "",
      });
    }
  };

  return (
    <section className="bg-white">
      <form className=" h-[95vh] md:mt-4 flex flex-col justify-center items-center ">
        <fieldset className=" pb-4  w-[90%] flex flex-col items-center justify-center  gap-3 lg:gap-5">
          <legend className=" text-right lg:text-center mr-5 p-1 text-purple-800 font-bold text-[30px]">
            Login
          </legend>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                Username
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter name"
                type="text"
                name="name"
                required
                value={data.name.toLocaleLowerCase().trim()}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="w-[80%] text-[14px] font-semibold ">
            <fieldset className="border shadow-lg rounded-md border-purple-700 p-1">
              <legend className=" ml-1 px-1 text-purple-900 font-semibold ">
                Password
              </legend>
              <input
                className="bg-inherit font-normal h-auto lg:h-[50px] w-[100%] text-[20px] outline-none text-gray-700  pl-2 "
                placeholder="Enter Password"
                type="password"
                name="password"
                required
                value={data.password.trim()}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="w-[80%] flex justify-center ">
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-1.5 w-[50%] lg:w-[25%] border rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700 shadow-lg "
            >
              LOGIN
            </button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-purple-900 text-[16px]">New User</p>
            <button
              type="click"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="text-purple-800 font-semibold underline text-[16px] lg:text-[20px] p-2"
            >
              REGISTER
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
