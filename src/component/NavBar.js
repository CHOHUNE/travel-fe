import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { LoginContext } from "./LoginProvider";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel, Pagination, Navigation, Autoplay } from "swiper/modules";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams();
  const location = useLocation();

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("userId", login.userId);
  }

  const VerticalSwiper = () => {
    return (
      <>
        <Box style={{ border: "1px solid black" }}>
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Autoplay]}
            autoplay={{
              delay: 2500, // 각 슬라이드 간의 딜레이 (밀리초 단위)
              disableOnInteraction: false,
            }}
            className="mySwiper"
            style={{ width: "300px", height: "50px" }}
          >
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 1</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 2</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 3</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 4</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 5</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 6</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 7</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 8</SwiperSlide>
            <SwiperSlide style={{ fontSize: "15px" }}>Slide 9</SwiperSlide>
          </Swiper>
        </Box>
      </>
    );
  };

  function handleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => {
        fetchLogin();
      });
  }

  return (
    <Box mt={2}>
      {/* 헤더 네브바1 */}
      <Box w="80%" h={"80px"} ml="10%">
        <Flex justifyContent={"space-between"} textAlign={"center"}>
          {/* 프로젝트 로고 */}
          <Box
            w={"200px"}
            background="#b0daeb"
            lineHeight={"80px"}
            ml={2}
            onClick={() => navigate("/")}
          >
            <Img
              _hover={{ cursor: "pointer" }}
              src="https://img.freepik.com/premium-vector/travel-company-logo_18099-1527.jpg?w=1060"
              alt="프로젝트 로고"
              w="200px"
              h="80px"
              onClick={() => navigate("/")}
            />
          </Box>

          {/* 검색창 */}
          <Flex alignItems={"center"} gap={2} mr={"-200px"}>
            <Input _hover={{ color: "teal", cursor: "pointer" }} w={"400px"} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <p>인기검색어</p>
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            <VerticalSwiper />
          </Flex>

          {/* 회원정보, 회원가입, 로그인 버튼 */}
          <Flex alignItems={"center"}>
            {isAdmin() && (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                lineHeight={"80px"}
                background={"white"}
                onClick={() => navigate("/user/list")}
              >
                회원목록
              </Button>
            )}

            {isAuthenticated() && (
              <Button
                w={"50px"}
                h={"60px"}
                ml={5}
                borderRadius={0}
                fontSize={"0.8rem"}
                lineHeight={"80px"}
                background={"white"}
                onClick={() => navigate("/user?" + urlParams.toString())}
              >
                {login.userId}님
              </Button>
            )}

            {isAuthenticated() || (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                background={"white"}
                onClick={() => navigate("signup")}
              >
                회원가입
              </Button>
            )}
            {isAuthenticated() || (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                mr={2}
                background={"white"}
                onClick={() => navigate("login")}
              >
                로그인
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                w={"50px"}
                h={"60px"}
                borderRadius={0}
                fontSize={"0.8rem"}
                ml={4}
                mr={2}
                backgroundColor={"white"}
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
      {/* 헤더 네브바2 */}
      <Box borderTop={"1px solid #eeeeee"}></Box>
      <Box w="80%" h={"60px"} ml="10%">
        <Flex justifyContent={"space-between"} textAlign={"center"}>
          <Flex ml={2} lineHeight={"60px"} alignItems={"center"} mt={"10px"}>
            <Button w={"100px"} h={"40px"}>
              전체메뉴
            </Button>

            {/* 호텔 */}
            <Button
              w={"100px"}
              h={"40px"}
              ml={1}
              onClick={() => navigate("hotel")}
            >
              호텔 / 숙박
            </Button>

            {/* 운송 */}
            <Button
              w={"100px"}
              h={"40px"}
              ml={1}
              onClick={() => navigate("transport")}
            >
              항공 / 운송
            </Button>
          </Flex>
          <Button
            w={"100px"}
            h={"40px"}
            mr={2}
            mt={"10px"}
            fontSize={"0.8rem"}
            onClick={() => navigate("boardlist")}
          >
            게시판 / 커뮤니티
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
