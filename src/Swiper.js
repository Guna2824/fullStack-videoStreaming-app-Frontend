import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { RotatingLines } from "react-loader-spinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

function SwiperSlider() {
  const [data, setData] = useState();
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

  return (
    <div className="py-2">
      {data ? (
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data &&
            data.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ReactPlayer
                    style={{ marginBottom: "50px" }}
                    controls={true}
                    muted={true}
                    url={
                      `https://fullstack-videostreaming-app-backend.onrender.com/uploads/` +
                      item.name
                    }
                    width="80%"
                    height="100%"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      ) : (
        <p className=" md:flex md:justify-center">
          {
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
            />
          }
        </p>
      )}
    </div>
  );
}

export default SwiperSlider;
