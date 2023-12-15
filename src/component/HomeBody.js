import {
  border,
  Box,
  Button,
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
  VStack,
} from "@chakra-ui/react";
import App from "../page/hotel/App";
import React, { useEffect, useRef, useState } from "react";
import { RecentViewed } from "./RecentViewed";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "../component/Calendar.css";

export function HomeBody() {
  const navigate = useNavigate();

  const [listBus, setListBus] = useState([]);
  const [listAir, setListAir] = useState([]);

  useEffect(() => {
    axios
      .get("/api/transport/listPopularBus")
      .then((response) => setListBus(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/transport/listPopularAir")
      .then((response) => setListAir(response.data));
  }, []);

  /*

  이미지 동그라미 만드는법
  w={"224px"} ,
  h={"224px"} ,
  borderRadius={"50%"}

   */

  // ------------------- 날짜 선택 ------------------
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const wrapperRef = useRef(null); // 컴포넌트 참조를 위한 ref
  const [isOpen, setIsOpen] = useState(false);

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
    </Button>
  );

  return (
    <Box>
      {/* ---------- 배너이미지  */}
      <Box boxShadow={"5px 5px 5px 5px gray"} w={"100%"} h={"520px"}>
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Box w={"100%"} h={"500px"} mt={"20px"}>
            <App />
          </Box>
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
          >
            <RecentViewed />
          </Box>
        </Flex>
      </Box>

      {/* ------------------- 버스상품 중간정렬 ------------------- */}
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
              />
            </VStack>

            {/* 달력 구현 해야함 */}

            <VStack alignItems={"flex-start"}>
              <p
                style={{
                  fontSize: "12px",
                  marginBottom: "-10px",
                  color: "gray",
                  marginLeft: "15px",
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

            {/* 성인, 소인 인원선택 구현해야함 */}
            <div style={{ fontSize: "16px" }}>성인 2, 객실 1</div>
            <Button bg={"#4caf50"} color={"white"} borderRadius={"20px"}>
              검색하기
            </Button>
          </Box>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box
              fontWeight={900}
              fontSize={"1.2rem"}
              style={{ fontFamily: "Pretendard-Regular" }}
            >
              🚎 버스 상품
            </Box>
          </Card>

          <Flex>
            {listBus.map(
              (bus) =>
                bus.typeName === "bus" && (
                  <Card
                    key={bus.tid}
                    w={"450px"}
                    mr={7}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "#eeecec",
                      transition: "background 0.5s ease-in-out",
                    }}
                    onClick={() => navigate("/transport/" + bus.tid)}
                  >
                    <CardHeader mb={0} pb={0}>
                      <Center>
                        <Box w={"90%"}>
                          <Image src={bus.url} />
                        </Box>
                      </Center>
                    </CardHeader>
                    <CardBody mt={2} pt={0}>
                      <Center>
                        <Box>
                          <Box textColor={"black"} fontWeight={"bold"}>
                            [{bus.transStartLocation}] &nbsp;
                            <FontAwesomeIcon icon={faAnglesRight} />
                            &nbsp; [{bus.transArriveLocation}] &nbsp;{" "}
                            {bus.transTitle}
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
                                {bus.transPrice}원
                              </Box>
                            </Flex>
                          </FormControl>
                        </Box>
                      </Center>
                    </CardBody>
                  </Card>
                ),
            )}
          </Flex>
        </Box>
      </Flex>

      {/* ------------------- 항공상품 중간정렬 ------------------- */}
      <Flex justifyContent="center" w="100%" bg={"#eeeeee"} mt={5}>
        <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
          <Card
            w={"400px"}
            h={"50px"}
            textAlign={"center"}
            mb={10}
            onClick={() => navigate("/transport")}
            _hover={{ cursor: "pointer", color: "#509896" }}
            lineHeight={"50px"}
          >
            <Box fontWeight={900} fontSize={"1.2rem"}>
              🛫 항공 상품
            </Box>
          </Card>
          <Flex>
            {listAir.map(
              (air) =>
                air.typeName === "air" && (
                  <Card
                    mb={5}
                    key={air.tid}
                    w={"450px"}
                    mr={7}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "#eeecec",
                      transition: "background 0.5s ease-in-out",
                    }}
                    onClick={() => navigate("/transport/" + air.tid)}
                  >
                    <CardHeader mb={0} pb={0}>
                      <Center>
                        <Box w={"90%"}>
                          <Image src={air.url} />
                        </Box>
                      </Center>
                    </CardHeader>
                    <CardBody mt={2} pt={0}>
                      <Center>
                        <Box>
                          <Box textColor={"black"} fontWeight={"bold"}>
                            [{air.transStartLocation}] &nbsp;
                            <FontAwesomeIcon icon={faAnglesRight} />
                            &nbsp; [{air.transArriveLocation}] &nbsp;{" "}
                            {air.transTitle}
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
                                {air.transPrice}원
                              </Box>
                            </Flex>
                          </FormControl>
                        </Box>
                      </Center>
                    </CardBody>
                  </Card>
                ),
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
