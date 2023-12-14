import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box, Img } from "@chakra-ui/react";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={650}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoHeight
      >
        <SwiperSlide
          style={{ width: "100%", height: "600px", borderRadius: "10px" }}
        >
          <Img src="https://www.condo24.com/TechBean/banner/main_20231115[10].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231120[2].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231117[7].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231117[11].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231115[2].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231117[9].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231121[2].jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100%", height: "600px" }}>
          <Img src="https://www.condo24.com/TechBean/banner/main_20231121[1].jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
