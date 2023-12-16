import {
  Badge,
  border,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import App from "../page/hotel/App";
import React, { useEffect, useRef, useState } from "react";
import { RecentViewed } from "./RecentViewed";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { differenceInCalendarDays } from "date-fns";
import "./Calendar.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function HomeBody() {
  const navigate = useNavigate();

  const [listBus, setListBus] = useState([]);
  const [listAir, setListAir] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get("/api/transport/listPopularBusEight")
      .then((response) => setListBus(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/transport/listPopularAirEight")
      .then((response) => setListAir(response.data));
  }, []);

  /*

  이미지 동그라미 만드는법
  w={"224px"} ,
  h={"224px"} ,
  borderRadius={"50%"}

   */

  // ------------------- 날짜 선택 ------------------
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;
  const wrapperRef = useRef(""); // 컴포넌트 참조를 위한 ref
  const [isOpen, setIsOpen] = useState(false);
  const [hotelList, setHotelList] = useState([]);

  // ------------------- 날짜선택시 몇박인지 조회 ------------------
  const totalNights =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;

  useEffect(() => {
    // 외부 클릭 감지를 위한 이벤트 핸들러
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false); // 외부 클릭 시 달력 닫기
      }
    }
    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);
  };

  const CustomInput = ({ value, onClick }) => (
    <Button
      onClick={onClick}
      bg={"white"}
      color="black"
      _hover={{ color: "blue.600" }}
    >
      {value || "날짜 선택"}
      {totalNights > 0 && (
        <Box as="span" color="blue.500" ml="2">
          ({totalNights}박)
        </Box>
      )}
    </Button>
  );

  // ------------------- 인원 선택 ------------------
  const [personAdult, setPersonAdult] = useState("1명"); // 성인 인원
  const [personChild, setPersonChild] = useState(""); // 소인 인원

  const handlePersonnelAdultClick = (person) => {
    setPersonAdult(person);
  };

  const handlePersonnelChildClick = (child) => {
    setPersonChild(child);
  };

  // ------------------- 검색하기 -------------------
  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);

    const queryString = params.toString();
    navigate(`/hotel/?${queryString}`);
    // navigate("/?" + params);
  }

  // ------------------- 호텔상품 -------------------

  const [params] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/hotel/list?" + params).then((response) => {
      setHotelList(response.data.hotelList);
    });
  }, [location]);

  if (hotelList === null) {
    return <Spinner />;
  }

  // ------------------- 특정 글자 수 넘어가면 ... 표시 -------------------
  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  return (
    <Box fontWeight={"700"} fontFamily={"GmarketSansMedium"}>
      {/* ------------------- 배너이미지 ------------------- */}
      <Box boxShadow={"5px 5px 5px 5px gray"} w={"100%"} h={"520px"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Box w={"100%"} h={"500px"} mt={"20px"}>
            <App />
          </Box>
          {/* ------------------- 최근 본 상품 ------------------- */}
          <Box
            position="fixed" // 절대 위치를 사용해 오버레이 설정
            top="300" // 배너의 상단에서 시작
            right="2" // 배너의 우측에서 시작
            zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
            p="4" // 패딩 값
            bg="rgba(255, 255, 255, 0.5)" // 배경색
            boxShadow="lg" // 그림자 효과
            maxW="sm" // 최대 너비 설정
            overflow="hidden" // 내용이 넘치면 숨김
            borderRadius="15px"
          >
            <RecentViewed />
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent="center" w="100%">
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          {/* ------------------- 검색바 ------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            border={"1px solid gray"}
            boxSizing="border-box"
            mb={10}
            w={"90%"}
            h={"90px"}
            ml={"5%"}
            borderRadius={"20px"}
            boxShadow={"0px 8px 15px #0000001A"}
          >
            <VStack alignItems={"flex-start"}>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "-10px",
                  marginLeft: "17px",
                  color: "gray",
                }}
              >
                여행지 숙소명
              </p>
              <Input
                fontSize={"16px"}
                w={"220px"}
                border={"none"}
                placeholder="숙소명 어디로 가시나요?"
                style={{ fontSize: "15px" }}
                _focus={{
                  boxShadow: "none", // 포커스 시 박스 그림자 제거
                }}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </VStack>

            {/* ------------------- 검색바 달력 ------------------- */}

            <VStack alignItems={"flex-start"}>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "-10px",
                  color: "gray",
                  marginLeft: "16px",
                }}
              >
                숙박 날짜
              </p>
              <Box ref={wrapperRef} style={{ position: "relative" }}>
                <DatePicker
                  className="react-datepicker"
                  locale={ko}
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleChange}
                  customInput={<CustomInput />}
                  popperPlacement="bottom"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "0px, 8px",
                    },
                    preventOverflow: {
                      enabled: true,
                      boundariesElement: "viewport",
                    },
                  }}
                  dateFormat="yyyy.MM.dd(eee)" // 포맷 지정
                  monthsShown={2} // 2달치 달력 보여줌
                  formatWeekDay={(nameOfDay) => {
                    switch (nameOfDay) {
                      case "일요일":
                        return "일";
                      case "월요일":
                        return "월";
                      case "화요일":
                        return "화";
                      case "수요일":
                        return "수";
                      case "목요일":
                        return "목";
                      case "금요일":
                        return "금";
                      case "토요일":
                        return "토";
                      default:
                        return nameOfDay;
                    }
                  }}
                />
              </Box>
            </VStack>

            {/* ------------------- 인원 수 ------------------- */}
            <VStack alignItems={"flex-start"}>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "-25px",
                  color: "gray",
                  marginLeft: "9px",
                }}
              >
                인원 수
              </p>
              <Flex mt={2}>
                <Flex style={{ fontSize: "16px" }}>
                  <Box
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      verticalAlign: "middle",
                      margin: "0 8px",
                      marginTop: "15px",
                    }}
                  >
                    성인
                  </Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      background={"white"}
                      border={"1px solid #ededed"}
                      mt={"13px"}
                      fontSize={"13px"}
                      w={"67px"}
                      h={"30px"}
                    >
                      {personAdult ? personAdult : "1명"}
                    </MenuButton>

                    <MenuList>
                      <MenuItem
                        onClick={() => handlePersonnelAdultClick("1명")}
                      >
                        1명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelAdultClick("2명")}
                      >
                        2명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelAdultClick("3명")}
                      >
                        3명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelAdultClick("4명")}
                      >
                        4명
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>

                <Flex>
                  <Box
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      verticalAlign: "middle",
                      margin: "0 8px",
                      marginTop: "15px",
                    }}
                  >
                    소인
                  </Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      background={"white"}
                      border={"1px solid #ededed"}
                      mt={"13px"}
                      fontSize={"13px"}
                      w={"67px"}
                      h={"30px"}
                    >
                      {personChild ? personChild : "1명"}
                    </MenuButton>

                    <MenuList>
                      <MenuItem
                        onClick={() => handlePersonnelChildClick("1명")}
                      >
                        1명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelChildClick("2명")}
                      >
                        2명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelChildClick("3명")}
                      >
                        3명
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePersonnelChildClick("4명")}
                      >
                        4명
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
            </VStack>
            <Button
              h={"50px"}
              bg={"blue.500"}
              color={"white"}
              borderRadius={"30px"}
              onClick={handleSearch}
              fontSize={21}
            >
              <Text mt={1}>검색하기</Text>
            </Button>
          </Box>
        </Box>
      </Flex>

      {/* --------------------------------- 호텔상품 ---------------------------------  */}
      <Flex justifyContent="center" w="100%">
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          <Card
            w={"200px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/hotel")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box fontWeight={900} fontSize={"1.2rem"}>
              호텔 목록
            </Box>
          </Card>
          <Text fontSize={"1.5rem"} mb={-5}>
            실시간 인기 숙소
          </Text>
          <Center w={"100%"} h={"300px"} mb={15}>
            <Flex justifyContent={"space-between"} flexWrap="wrap">
              <SimpleGrid columns={5} spacing={20} my={"20px"} w={"full"}>
                {hotelList &&
                  hotelList.slice(0, 5).map((hotel) => (
                    <Box
                      transition="0.2s ease-in-out"
                      _hover={{
                        transform: "scale(1.20)",
                      }}
                      maxW="sm"
                      w={"170px"}
                      overflow="hidden"
                    >
                      <Box
                        w={"170px"}
                        h={"170px"}
                        borderRadius={"50%"}
                        position="relative"
                      >
                        <Image
                          onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                          src={hotel.mainImgUrl}
                          alt={hotel.name}
                          cursor={"pointer"}
                          w={"170px"}
                          h={"170px"}
                          borderRadius={"50%"}
                        />
                      </Box>
                      <Box mt={5}>
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          ></Box>
                        </Box>
                        <Box
                          fontWeight="bold"
                          fontSize={"14px"}
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          textAlign={"center"}
                          ml={"12px"}
                        >
                          {hotel.name}
                          <Badge ml={"5px"}>{hotel.lodgingType}</Badge>

                          {hotel.lodgingType == "호텔" && (
                            <Badge ml={"5px"}>{hotel.rating}</Badge>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </SimpleGrid>
            </Flex>
          </Center>
        </Box>
      </Flex>

      <Flex w={"100%"} justifyContent={"center"}>
        <Box w={"65%"} mb={"-7"} fontSize={"1.5rem"}>
          취향저격 숙소찾기
        </Box>
      </Flex>

      <Center w={"100%"} h={"auto"} mb={30} mt={30}>
        <Flex justifyContent={"center"} flexWrap="wrap" w={"65%"}>
          <SimpleGrid columns={5} spacing={5} my={"20px"} w={"full"}>
            {hotelList && hotelList.length > 0 && (
              <>
                <Box
                  w={"auto"}
                  overflow="hidden"
                  position="relative"
                  onMouseMove={(e) => {
                    const x = e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY;
                    e.currentTarget.style.transform = `perspective(350px) rotateX(${
                      (4 / 30) * y - 20
                    }deg) rotateY(${(-1 / 5) * x + 20}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(350px) rotateY(0deg) rotateX(0deg)";
                  }}
                  transition="all 0.1s"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="300px"
                    bg="linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)"
                    filter="brightness(1.1) opacity(0)"
                    mixBlendMode="color-dodge"
                    backgroundSize="150% 150%"
                    backgroundPosition="100%"
                    transition="all 0.1s"
                    zIndex="1"
                  />
                  <Image
                    onClick={() => navigate("/")}
                    src="https://www.gagopatour.com/data/item/1646033618/7Iuk64K07IiY7JiB7J6l.jpg"
                    cursor={"pointer"}
                    w={"100%"}
                    h={"300px"}
                    borderRadius={"10px"}
                    transition="0.2s ease-in-out"
                    _hover={{
                      transform: "scale(1.07)",
                    }}
                    zIndex="2"
                  />
                  <Box mt={5} zIndex="2">
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      />
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize={"14px"}
                      as="h4"
                      lineHeight="tight"
                      textAlign={"center"}
                      ml={"12px"}
                    >
                      <Text>수영장 있는 숙소</Text>
                      <Badge ml={"5px"}>{hotelList.lodgingType}</Badge>
                      {hotelList.lodgingType === "호텔" && (
                        <Badge ml={"5px"}>{hotelList.rating}</Badge>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  w={"auto"}
                  overflow="hidden"
                  position="relative"
                  onMouseMove={(e) => {
                    const x = e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY;
                    e.currentTarget.style.transform = `perspective(350px) rotateX(${
                      (4 / 30) * y - 20
                    }deg) rotateY(${(-1 / 5) * x + 20}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(350px) rotateY(0deg) rotateX(0deg)";
                  }}
                  transition="all 0.1s"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="300px"
                    bg="linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)"
                    filter="brightness(1.1) opacity(0)"
                    mixBlendMode="color-dodge"
                    backgroundSize="150% 150%"
                    backgroundPosition="100%"
                    transition="all 0.1s"
                    zIndex="1"
                  />
                  <Image
                    onClick={() => navigate("/")}
                    src="https://www.condo24.com/conphoto/171522810779.jpg"
                    cursor={"pointer"}
                    w={"100%"}
                    h={"300px"}
                    borderRadius={"10px"}
                    transition="0.2s ease-in-out"
                    _hover={{
                      transform: "scale(1.07)",
                    }}
                    zIndex="2"
                  />
                  <Box mt={5} zIndex="2">
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      />
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize={"14px"}
                      as="h4"
                      lineHeight="tight"
                      textAlign={"center"}
                      ml={"12px"}
                    >
                      <Text>글램핑, 카라반 숙소</Text>
                      <Badge ml={"5px"}>{hotelList.lodgingType}</Badge>
                      {hotelList.lodgingType === "호텔" && (
                        <Badge ml={"5px"}>{hotelList.rating}</Badge>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  w={"auto"}
                  overflow="hidden"
                  position="relative"
                  onMouseMove={(e) => {
                    const x = e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY;
                    e.currentTarget.style.transform = `perspective(350px) rotateX(${
                      (4 / 30) * y - 20
                    }deg) rotateY(${(-1 / 5) * x + 20}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(350px) rotateY(0deg) rotateX(0deg)";
                  }}
                  transition="all 0.1s"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="300px"
                    bg="linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)"
                    filter="brightness(1.1) opacity(0)"
                    mixBlendMode="color-dodge"
                    backgroundSize="150% 150%"
                    backgroundPosition="100%"
                    transition="all 0.1s"
                    zIndex="1"
                  />
                  <Image
                    onClick={() => navigate("/")}
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjdfMTY2%2FMDAxNjk4MzMyOTUwMTU0.abdxZp1psY9qPJl1XrSuCt710v-oHg1B_jKuLAKTjqAg.GDUgM5VOFfY8pETBtsdiJ2Z46O7_R9V43s55Tl6oJWog.JPEG.rkgp3310%2F1698332948530.jpg&type=sc960_832"
                    cursor={"pointer"}
                    w={"100%"}
                    h={"300px"}
                    borderRadius={"10px"}
                    transition="0.2s ease-in-out"
                    _hover={{
                      transform: "scale(1.07)",
                    }}
                    zIndex="2"
                  />
                  <Box mt={5} zIndex="2">
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      />
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize={"14px"}
                      as="h4"
                      lineHeight="tight"
                      textAlign={"center"}
                      ml={"12px"}
                    >
                      <Text>반려견 동반 숙소</Text>
                      <Badge ml={"5px"}>{hotelList.lodgingType}</Badge>
                      {hotelList.lodgingType === "호텔" && (
                        <Badge ml={"5px"}>{hotelList.rating}</Badge>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  w={"auto"}
                  overflow="hidden"
                  position="relative"
                  onMouseMove={(e) => {
                    const x = e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY;
                    e.currentTarget.style.transform = `perspective(350px) rotateX(${
                      (4 / 30) * y - 20
                    }deg) rotateY(${(-1 / 5) * x + 20}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(350px) rotateY(0deg) rotateX(0deg)";
                  }}
                  transition="all 0.1s"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="300px"
                    bg="linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)"
                    filter="brightness(1.1) opacity(0)"
                    mixBlendMode="color-dodge"
                    backgroundSize="150% 150%"
                    backgroundPosition="100%"
                    transition="all 0.1s"
                    zIndex="1"
                  />
                  <Image
                    onClick={() => navigate("/")}
                    src="https://www.condo24.com/conphoto/165300963191.jpg"
                    cursor={"pointer"}
                    w={"100%"}
                    h={"300px"}
                    borderRadius={"10px"}
                    transition="0.2s ease-in-out"
                    _hover={{
                      transform: "scale(1.07)",
                    }}
                    zIndex="2"
                  />
                  <Box mt={5} zIndex="2">
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      />
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize={"14px"}
                      as="h4"
                      lineHeight="tight"
                      textAlign={"center"}
                      ml={"12px"}
                    >
                      <Text>가족, 친구들과 함께 갈 숙소</Text>
                      <Badge ml={"5px"}>{hotelList.lodgingType}</Badge>
                      {hotelList.lodgingType === "호텔" && (
                        <Badge ml={"5px"}>{hotelList.rating}</Badge>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  w={"auto"}
                  overflow="hidden"
                  position="relative"
                  onMouseMove={(e) => {
                    const x = e.nativeEvent.offsetX;
                    const y = e.nativeEvent.offsetY;
                    e.currentTarget.style.transform = `perspective(350px) rotateX(${
                      (4 / 30) * y - 20
                    }deg) rotateY(${(-1 / 5) * x + 20}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(350px) rotateY(0deg) rotateX(0deg)";
                  }}
                  transition="all 0.1s"
                >
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="300px"
                    bg="linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)"
                    filter="brightness(1.1) opacity(0)"
                    mixBlendMode="color-dodge"
                    backgroundSize="150% 150%"
                    backgroundPosition="100%"
                    transition="all 0.1s"
                    zIndex="1"
                  />
                  <Image
                    onClick={() => navigate("/")}
                    src={hotelList[4].mainImgUrl}
                    alt={hotelList.name}
                    cursor={"pointer"}
                    w={"100%"}
                    h={"300px"}
                    borderRadius={"10px"}
                    transition="0.2s ease-in-out"
                    _hover={{
                      transform: "scale(1.07)",
                    }}
                    zIndex="2"
                  />
                  <Box mt={5} zIndex="2">
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      />
                    </Box>
                    <Box
                      fontWeight="bold"
                      fontSize={"14px"}
                      as="h4"
                      lineHeight="tight"
                      textAlign={"center"}
                      ml={"12px"}
                    >
                      <Text>연인과 가는 아늑한 숙소</Text>
                      <Badge ml={"5px"}>{hotelList.lodgingType}</Badge>
                      {hotelList.lodgingType === "호텔" && (
                        <Badge ml={"5px"}>{hotelList.rating}</Badge>
                      )}
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </SimpleGrid>
        </Flex>
      </Center>

      <Flex bor justifyContent="center" w="100%" mt={5}>
        <Box w={"65%"} justifyContent={"center"} mt={"30px"} mb={8}>
          <Image src="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/sourceFile/imgeFile/%E1%84%87%E1%85%A2%E1%84%82%E1%85%A51.png" />
        </Box>
      </Flex>

      {/* ------------------- 버스 상품 ------------------- */}
      <Flex bor justifyContent="center" w="100%" mt={5} bg={"#F5F6F6"}>
        <Box w={"65%"} justifyContent={"center"} mt={"30px"} mb={8}>
          <Card
            w={"200px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box fontWeight={900} fontSize={"1.2rem"}>
              버스 목록
            </Box>
          </Card>

          <Flex>
            <SimpleGrid columns={4} spacing={10}>
              {listBus.map(
                (bus) =>
                  bus.typeName === "bus" && (
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => navigate("/transport/" + bus.tid)}
                      key={bus.tid}
                    >
                      <Box bg={"white"}>
                        <Box position="relative" overflow={"hidden"}>
                          <Image
                            src={bus.url}
                            h={"200px"}
                            transition="0.2s ease-in-out"
                            _hover={{
                              transform: "scale(1.20)",
                            }}
                          />
                        </Box>
                        <Box mt={2} pt={0}>
                          <Center>
                            <Box>
                              <Box textColor={"black"} fontWeight={"bold"}>
                                {truncateString(
                                  `[${bus.transStartLocation}] → [${bus.transArriveLocation}] ${bus.transTitle}`,
                                  20,
                                )}
                              </Box>
                              <FormControl>
                                <Flex>
                                  <FormLabel
                                    fontSize={"1.1rem"}
                                    textColor={"#509896"}
                                    fontWeight={"900"}
                                  >
                                    가격 :
                                  </FormLabel>
                                  <Box
                                    fontSize={"1.1rem"}
                                    textColor={"#509896"}
                                    fontWeight={"900"}
                                  >
                                    {parseInt(bus.transPrice).toLocaleString(
                                      "ko-KR",
                                    )}
                                  </Box>
                                </Flex>
                              </FormControl>
                            </Box>
                          </Center>
                        </Box>
                      </Box>
                    </Box>
                  ),
              )}
            </SimpleGrid>
          </Flex>
        </Box>
      </Flex>

      {/* ------------------- 항공상품 ------------------- */}
      <Flex
        justifyContent="center"
        mb={"10"}
        w="100%"
        position="relative" // 부모를 relative로 설정
        h="700px" // 적절한 높이 설정
      >
        <Box
          position="absolute" // 배경 이미지를 위한 절대 위치
          top="0"
          left="0"
          w="full"
          h="800px"
          bgImage="url('https://cdn.pixabay.com/photo/2020/04/22/15/26/sky-5078664_1280.jpg')"
          bgSize="cover"
          bgPosition="center"
          zIndex="-1" // 다른 내용물 뒤로 보내기
        >
          {/* 투명도 오버레이 */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            bg="blackAlpha.500" // 검정색 오버레이, 여기서 투명도 조정
            zIndex="-1"
          />
        </Box>
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          <Card
            w={"200px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box bg={"#ebebeb"} fontWeight={900} fontSize={"1.2rem"}>
              항공 목록
            </Box>
          </Card>

          <Flex>
            <SimpleGrid columns={4} spacing={10}>
              {listAir.map(
                (air) =>
                  air.typeName === "air" && (
                    <Box
                      bg={"white"}
                      maxW="sm"
                      borderRadius="lg"
                      overflow="hidden"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => navigate("/transport/" + air.tid)}
                      key={air.tid}
                    >
                      <Box position="relative" overflow={"hidden"}>
                        <Image
                          src={air.url}
                          h={"200px"}
                          w={"100%"}
                          transition="0.2s ease-in-out"
                          _hover={{
                            transform: "scale(1.20)",
                          }}
                        />
                      </Box>
                      <Box mt={2} pt={0}>
                        <Center>
                          <Box>
                            <Box textColor={"black"} fontWeight={"bold"}>
                              {truncateString(
                                `[${air.transStartLocation}] → [${air.transArriveLocation}] ${air.transTitle}`,
                                20,
                              )}
                            </Box>
                            <FormControl>
                              <Flex>
                                <FormLabel
                                  fontSize={"1.1rem"}
                                  textColor={"#509896"}
                                  fontWeight={"900"}
                                >
                                  가격 :
                                </FormLabel>
                                <Box
                                  fontSize={"1.1rem"}
                                  textColor={"#509896"}
                                  fontWeight={"900"}
                                >
                                  {parseInt(air.transPrice).toLocaleString(
                                    "ko-KR",
                                  )}
                                </Box>
                              </Flex>
                            </FormControl>
                          </Box>
                        </Center>
                      </Box>
                    </Box>
                  ),
              )}
            </SimpleGrid>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
