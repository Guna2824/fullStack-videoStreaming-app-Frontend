import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import ReactPlayer from "react-player";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SwiperSlider from "./Swiper";

function Dashboard() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(true);
  const [showIndex, setShowIndex] = useState();
  const [showindex, setShowindex] = useState();
  const [showindexs, setShowindexs] = useState();
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [selectCategory, setSelectCategory] = useState("all");
  // console.log(data);

  useEffect(() => {
    try {
      axios
        .get(
          "https://fullstack-videostreaming-app-backend.onrender.com/user/get"
        )
        .then((res) => {
          setData(res.data);
        });
      // console.log("video get");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const share = [
    {
      name: (
        <button
          onClick={() => {
            ShareButton("https://wa.me/0123456789");
          }}
          className="px-3 py-3 bg-[#268b2c] rounded-[50%] font-bold text-white shadow-md"
        >
          {<WhatsAppIcon />}
        </button>
      ),
    },
    {
      name: (
        <button
          onClick={() => {
            ShareButton("https://www.facebook.com/sharer");
          }}
          className="px-3 py-3 bg-blue-700 rounded-[50%] font-bold text-white shadow-md"
        >
          {<FacebookIcon />}
        </button>
      ),
    },
    {
      name: (
        <button
          onClick={() => {
            ShareButton("https://www.instagram.com/share");
          }}
          className="px-3 py-3 bg-gradient-to-br from-purple-700 to-pink-500 rounded-[50%] font-bold text-white shadow-md"
        >
          {<InstagramIcon />}
        </button>
      ),
    },
  ];

  const kaatu = (e, index) => {
    e.preventDefault();
    setShowIndex(index);
    setShow(!show);
  };

  const kaaatu = (e, index) => {
    e.preventDefault();
    setShowindex(index);
    setLike(like + 1);
  };

  const kaaaatu = (e, index) => {
    e.preventDefault();
    setShowindexs(index);
    setDislike(dislike + 1);
  };

  const filterData =
    data && data.filter((item) => item.author.includes(searchUser));

  const Category = data && data.map((item) => item.category);
  const category =
    data && Category.filter((item, index) => Category.indexOf(item) === index);

  const indexCategory = data && data.filter((item) => item.category);

  const filterCategory = (e, index) => {
    e.preventDefault();
    const tea =
      data && indexCategory.filter((item) => item.category.includes(index));
    setSelectCategory(tea);
  };

  if (selectCategory === "all") {
    return (
      <div className="mx-[50px] pb-[40px] relative top-[65px] md:top-[100px]">
        {/* Search Bar */}
        <div className="fixed z-10 right-[2%] mt-2">
          <input
            className="px-6 text-[16px] font-normal text-gray-100 w-[300px] h-[50px] md:w-[500px] rounded-3xl outline-none bg-gray-600"
            type="text"
            value={searchUser.toLocaleLowerCase().trim()}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="search user"
          />
        </div>

        {/* category side list */}
        {!searchUser && (
          <div className="fixed z-10 right-[2%] mt-[60px]">
            <div className=" w-[120px] flex flex-col items-end ">
              {data && (
                <button
                  onClick={() => setSelectCategory("all")}
                  className="px-4 py-2 m-1 bg-gray-600 text-white font-semibold rounded-md shadow-xl focus:bg-blue-600"
                >
                  All
                </button>
              )}
              {data &&
                category.map((item) => {
                  return (
                    <button
                      key={item}
                      onClick={(e) => filterCategory(e, item)}
                      className="px-4 py-2 m-1 bg-gray-600 text-white font-semibold rounded-md shadow-xl focus:bg-blue-600"
                    >
                      {item}
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* dashboard top slider */}
        <div className="md:pt-[60px]">{!searchUser && <SwiperSlider />}</div>
        {/* dashboard videos */}
        <div className="mx-[2%] flex flex-col items-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:mx-[10%] ">
          {searchUser !== ""
            ? filterData &&
              filterData.map((item, index) => {
                return (
                  <div
                    key={item._id}
                    className="bg-[rgba(255,255,255,0.8)] p-2 w-[300px] h-[300px] m-2 flex flex-col gap-1 items-center rounded-lg shadow-lg"
                  >
                    <div className="w-[100%] h-[50%]">
                      <ReactPlayer
                        controls={true}
                        url={
                          `https://fullstack-videostreaming-app-backend.onrender.com/uploads/` +
                          item.name
                        }
                        width="100%"
                        height="100%"
                      />
                      {/* share button shows */}
                      <div className="flex">
                        {!show &&
                          showIndex === index &&
                          share.map((data) => {
                            return (
                              <div
                                key={data.name}
                                className="relative top-[-110px] mx-[23px] "
                              >
                                {data.name}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className=" ">
                      <div className=" py-2 flex justify-around gap-2 items-center">
                        {/* Like Button */}
                        <button
                          onClick={(e) => {
                            kaaatu(e, index);
                          }}
                          className="border px-2 py-1 bg-white text-green-700  rounded-md font-bold shadow-md"
                        >
                          {
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
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                              />
                            </svg>
                          }
                        </button>

                        {like > 0 && showindex === index && (
                          <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-green-700 text-white">
                            {like}
                          </p>
                        )}

                        {/* Share button */}
                        <button
                          className="border px-2 py-1 bg-blue-700 rounded-md font-bold text-white shadow-xl"
                          type="submit"
                          onClick={(e) => {
                            kaatu(e, index);
                          }}
                        >
                          {
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
                                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                              />
                            </svg>
                          }
                        </button>

                        {dislike > 0 && showindexs === index && (
                          <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-red-700 text-white">
                            {dislike}
                          </p>
                        )}

                        {/* Dislike Buttons */}
                        <button
                          onClick={(e) => {
                            kaaaatu(e, index);
                          }}
                          className="border px-2 py-1 bg-white text-red-700 rounded-md font-bold shadow-xl"
                        >
                          {
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
                                d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                              />
                            </svg>
                          }
                        </button>
                      </div>
                      <div className="p-2 w-[100%]  flex justify-start items-center gap-2">
                        <div className="h-[55px] w-[55px] ">
                          <img
                            className=" h-[100%] w-[100%] rounded-[50%]"
                            src={
                              "https://fullstack-videostreaming-app-backend.onrender.com/uploads/" +
                              item.authorImage
                            }
                            alt="Guna"
                          />
                        </div>

                        <div className="w-[200px] flex flex-col justify-start items-center gap-1">
                          <div className=" w-[100%]">
                            <strong>{item.author}</strong>
                          </div>
                          <div className=" overflow-hidden h-[40px] w-[100%] text-[12px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : data &&
              data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[rgba(255,255,255,0.8)] p-2 w-[300px] h-[300px] m-2 flex flex-col gap-1 items-center rounded-lg shadow-lg"
                  >
                    <div className="w-[100%] h-[50%]">
                      <ReactPlayer
                        className=""
                        controls={true}
                        url={
                          `https://fullstack-videostreaming-app-backend.onrender.com/uploads/` +
                          item.name
                        }
                        width="100%"
                        height="100%"
                      />
                      {/* share button shows */}
                      <div className="flex">
                        {!show &&
                          showIndex === index &&
                          share.map((data) => {
                            return (
                              <div
                                key={data.name}
                                className="relative top-[-110px] mx-[23px]"
                              >
                                {data.name}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className=" ">
                      <div className=" py-2 flex justify-around items-center">
                        {/* Like Button */}
                        <button
                          onClick={(e) => {
                            kaaatu(e, index);
                          }}
                          className="border px-2 py-1 bg-white text-green-700 rounded-md font-bold shadow-xl"
                        >
                          {
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
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                              />
                            </svg>
                          }
                        </button>

                        {like > 0 && showindex === index && (
                          <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-green-700 text-white">
                            {like}
                          </p>
                        )}

                        {/* Share button */}
                        <button
                          className="border px-2 py-1 bg-blue-700  rounded-md font-bold text-white shadow-xl"
                          type="submit"
                          onClick={(e) => {
                            kaatu(e, index);
                          }}
                        >
                          {
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
                                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                              />
                            </svg>
                          }
                        </button>

                        {dislike > 0 && showindexs === index && (
                          <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-red-700 text-white">
                            {dislike}
                          </p>
                        )}

                        {/* Dislike Buttons */}
                        <button
                          onClick={(e) => {
                            kaaaatu(e, index);
                          }}
                          className="border px-2 py-1 bg-white text-red-700 rounded-md font-bold shadow-xl"
                        >
                          {
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
                                d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                              />
                            </svg>
                          }
                        </button>
                      </div>
                      <div className="p-2 w-[100%]  flex justify-start items-center gap-2">
                        <div className="h-[55px] w-[55px] ">
                          <img
                            className=" h-[100%] w-[100%] rounded-[50%]"
                            src={
                              "https://fullstack-videostreaming-app-backend.onrender.com/uploads/" +
                              item.authorImage
                            }
                            alt="Guna"
                          />
                        </div>

                        <div className="w-[200px] flex flex-col justify-start items-center gap-1">
                          <div className=" w-[100%]">
                            <strong>{item.author}</strong>
                          </div>
                          <div className=" overflow-hidden h-[40px] w-[100%] text-[12px]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-[50px] pb-[40px] relative top-[65px] md:top-[100px]">
        {/* category side list */}
        <div className="fixed z-10 right-[2%] mt-[60px]">
          <div className=" w-[120px] flex flex-col items-end ">
            <button
              onClick={() => setSelectCategory("all")}
              className="px-4 py-2 m-1 bg-gray-600 text-white font-semibold rounded-md shadow-xl focus:bg-blue-600"
            >
              All
            </button>
            {data &&
              category.map((item) => {
                return (
                  <button
                    key={item}
                    onClick={(e) => filterCategory(e, item)}
                    className="px-4 py-2 m-1 bg-gray-600 text-white font-semibold rounded-md shadow-xl focus:bg-blue-600"
                  >
                    {item}
                  </button>
                );
              })}
          </div>
        </div>

        {/* dashboard top slider */}
        <div className="md:pt-[60px]">{/* <Swiper /> */}</div>
        {/* dashboard videos */}
        <div className="mx-[2%] flex flex-col items-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:mx-[10%] ">
          {selectCategory &&
            selectCategory.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-[rgba(255,255,255,0.8)] p-2 w-[300px] h-[300px] m-2 flex flex-col gap-1 items-center rounded-lg shadow-lg"
                >
                  <div className="w-[100%] h-[50%]">
                    <ReactPlayer
                      className=""
                      controls={true}
                      url={
                        `https://fullstack-videostreaming-app-backend.onrender.com/uploads/` +
                        item.name
                      }
                      width="100%"
                      height="100%"
                    />
                    {/* share button shows */}
                    <div className="flex">
                      {!show &&
                        showIndex === index &&
                        share.map((data) => {
                          return (
                            <div
                              key={data.name}
                              className="relative top-[-110px] mx-[23px] "
                            >
                              {data.name}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className=" ">
                    <div className=" py-2 flex justify-around gap-2 items-center">
                      {/* Like Button */}
                      <button
                        onClick={(e) => {
                          kaaatu(e, index);
                        }}
                        className="border px-2 py-1 bg-white text-green-700  rounded-md font-bold shadow-md"
                      >
                        {
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
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        }
                      </button>

                      {like > 0 && showindex === index && (
                        <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-green-700 text-white">
                          {like}
                        </p>
                      )}

                      {/* Share button */}
                      <button
                        className="border px-2 py-1 bg-blue-700 rounded-md font-bold text-white shadow-xl"
                        type="submit"
                        onClick={(e) => {
                          kaatu(e, index);
                        }}
                      >
                        {
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
                              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                            />
                          </svg>
                        }
                      </button>

                      {dislike > 0 && showindexs === index && (
                        <p className=" h-8 w-8 text-center p-1.5 font-semibold rounded-[50%] bg-red-700 text-white">
                          {dislike}
                        </p>
                      )}

                      {/* Dislike Buttons */}
                      <button
                        onClick={(e) => {
                          kaaaatu(e, index);
                        }}
                        className="border px-2 py-1 bg-white text-red-700 rounded-md font-bold shadow-xl"
                      >
                        {
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
                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                            />
                          </svg>
                        }
                      </button>
                    </div>
                    <div className="p-2 w-[100%]  flex justify-start items-center gap-2">
                      <div className="h-[55px] w-[55px] ">
                        <img
                          className=" h-[100%] w-[100%] rounded-[50%]"
                          src={
                            "https://fullstack-videostreaming-app-backend.onrender.com/uploads/" +
                            item.authorImage
                          }
                          alt="Guna"
                        />
                      </div>

                      <div className="w-[200px] flex flex-col justify-start items-center gap-1">
                        <div className=" w-[100%]">
                          <strong>{item.author}</strong>
                        </div>
                        <div className=" overflow-hidden h-[40px] w-[100%] text-[12px]">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Dashboard;

const ShareButton = (props) => {
  window.open(props, "_blank");
};
