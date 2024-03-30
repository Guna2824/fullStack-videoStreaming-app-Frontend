import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

function Userpage() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  // console.log(userProfile);

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

  return (
    <div className="h-[100vh] w-[100%] flex flex-col gap-4 items-center justify-center ">
      {userProfile ? (
        userProfile.map((user) => {
          const name = user.name.toUpperCase();
          const name1 = name.split("");

          // console.log(user.imageUrl);

          return (
            <div
              key={user._id}
              className=" gap-6 flex flex-col justify-center items-center text-center text-[20px] "
            >
              <div
              // className="border flex flex-col justify-center items-center text-center text-[20px] font-bold"
              >
                <img
                  src={
                    `https://fullstack-videostreaming-app-backend.onrender.com/uploads/` +
                    user.imageUrl
                  }
                  alt={name1[0]}
                  className=" h-[100px] w-[100px] rounded-[50%] border border-slate-900 object-cover "
                />
              </div>
              <div>
                <table>
                  <tbody>
                    <tr
                      style={{
                        background: "white",
                      }}
                    >
                      <td style={{ padding: "10px" }}>Name</td>
                      <th
                        style={{
                          color: "red",
                          paddingLeft: "10px",
                          padding: "10px",
                        }}
                      >
                        {user.name.toUpperCase()}
                      </th>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>Phone</td>
                      <th style={{ padding: "10px" }}>{user.phone}</th>
                    </tr>
                    <tr
                      style={{
                        background: "white",
                      }}
                    >
                      <td style={{ padding: "10px" }}>E-mail</td>
                      <th
                        style={{
                          color: "red",
                          paddingLeft: "10px",
                          padding: "10px",
                        }}
                      >
                        {user.email}
                      </th>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px" }}>Status</td>
                      <th style={{ padding: "10px" }}>{user.logInStatus}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      )}
      <div className="">
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            navigate("/");
          }}
          className="px-6 py-2 text-[14px] border border-2-solid bg-blue-600 hover:bg-rose-600 text-white font-bold rounded-md shadow-lg"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default Userpage;
