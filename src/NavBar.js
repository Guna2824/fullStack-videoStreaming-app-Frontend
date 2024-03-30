import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  // console.log(userProfile);

  const Token = JSON.parse(localStorage.getItem("auth"));

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
        // console.log(error.response.data.message || "Internal Server Error");
      }
    };

    fetchUserProfile();
  }, [Token]);

  const output = () => {
    setShow(!show);
  };

  const navigateHome = () => {
    navigate("/");
    setShow(!show);
  };

  const navigateShare = () => {
    navigate("/upload");
    setShow(!show);
  };

  const navigateUser = () => {
    navigate("/user");
    setShow(!show);
  };

  return (
    <div>
      <div className="fixed z-10 w-[100%] py-2 px-6 bg-gray-500 text-green-500 font-semibold text-xl">
        <div className=" flex flex-row justify-between items-center">
          <div className="">
            {/* top navbar logo */}
            <div className="hidden md:inline">
              <MainLogo />
            </div>
            {/* side navbar logo */}
            <div className=" md:hidden">
              <button className="p-2 text-white" onClick={output}>
                {show ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Search Bar */}
          {/* <div>
            <input
              className="px-6 text-[18px] font-normal text-gray-700 w-[300px] h-[50px] md:w-[500px] rounded-3xl outline-none"
              type="text"
              placeholder="search user"
            />
          </div> */}
          {/* top navbar buttons */}
          <div>
            <div className="hidden md:flex gap-2">
              {buttonStyleOne("Home", navigateHome)}
              {buttonStyleOne("Share", navigateShare)}
              {buttonStyleOne(
                Token === null
                  ? "User"
                  : userProfile && (
                      <img
                        className="h-[75px] w-[75px] object-cover rounded-[50%]"
                        src={userProfile.map(
                          (item) =>
                            "https://fullstack-videostreaming-app-backend.onrender.com/uploads/" +
                            item.imageUrl
                        )}
                        alt="User"
                      />
                    ),
                navigateUser
              )}
            </div>
          </div>
        </div>
      </div>

      {/* side navbar menu */}
      <div className="relative top-[67px] md:relative md:top-[100px] bg-[url('https://images.indianexpress.com/2023/12/Social-Media.jpg')] md:flex">
        {!show && (
          <div className="md:hidden w-[200px] h-[100vh] bg-gray-500 fixed z-10">
            <div className="pb-3 bg-white shadow-md  text-center mb-1">
              <span className=" font-bold text-[25px]">G-MAX</span> <br />
              <span className="p-1 text-md font-semibold bg-red-900 text-white">
                Stream Share Sensitive
              </span>
            </div>
            {/* side navbar buttons */}

            {buttonStyleTwo("Home", navigateHome)}
            {buttonStyleTwo("Share", navigateShare)}
            {buttonStyleTwo("User", navigateUser)}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

const buttonStyleOne = (props, fn) => {
  return (
    <button
      onClick={fn}
      className="h-[75px] w-[75px] object-cover bg-white  text-gray-500 font-semibold text-[18px] shadow-md underline rounded-[50%] hover:text-gray-900 hover:text-[20px] "
    >
      {props}
    </button>
  );
};

const buttonStyleTwo = (props, fn) => {
  return (
    <button
      onClick={fn}
      className="my-1 h-[40px] w-[100%] bg-white text-gray-500 font-bold text-[18px] shadow-md hover:text-[22px] hover:text-gray-900"
    >
      {props}
    </button>
  );
};

const MainLogo = () => {
  return (
    <div className="flex">
      <div className=" px-2  bg-white flex flex-col justify-center items-center  text-center">
        <h1 className="text-black font-extrabold pt-2 flex flex-col gap-1">
          <span className="text-[50px]">G</span>MAX
        </h1>
      </div>
      <div className=" flex flex-col bg-red-900 px-1 text-white ">
        <h2 className="text-lg ">Stream</h2>
        <h2 className="text-lg "> Share</h2>
        <h2 className="text-lg "> Sensitive</h2>
      </div>
    </div>
  );
};
