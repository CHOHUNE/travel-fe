import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  useToast,
  Stack,
  Spacer,
  IconButton,
  Center,
  Input,
  SimpleGrid,
  ButtonGroup,
  Heading,
  Divider,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./style.css";
import DatePicker from "react-datepicker";

export function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [roomtypeList, setRoomtypeList] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(0);
  const [reservation, setReservation] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  // 호텔 ID를 사용하여 호텔 데이터를 가져오는 함수

  const [showCheckInInput, setShowCheckInInput] = useState(false);

  // ---------------------- 최근 본 상품 ----------------------
  const saveToRecentViewed = (hotelData) => {
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    const updatedRecentViewed = [hotelData, ...recentViewed].slice(0, 5); // 최대 5개만 저장
    localStorage.setItem("recentViewed", JSON.stringify(updatedRecentViewed));
  };

  useEffect(() => {
    axios.get("/api/hotel/reserv/id/" + id).then((response) => {
      setHotel(response.data);
      // --------------------- 최근 본 상품 ----------------------
      saveToRecentViewed(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/api/hotel/reserv/type/" + id).then((response) => {
      setRoomtypeList(response.data);
    });
  }, []);

  // 삭제
  function handleHotelDelete() {
    axios
      .delete("/api/hotel/delete/" + id)
      .then(() => {
        toast({
          description: hotel.name + " 상품이 삭제 되었습니다",
          colorScheme: "orange",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "상품 삭제가 실패 하였습니다",
          status: "error",
        });
      });
  }

  function handleRoomtypeDelete(hrtId) {
    axios
      .delete("/api/hotel/delete/" + id + "/type/" + hrtId)
      .then(() => {
        toast({
          description: "삭제가 완료 되었습니다.",
          colorScheme: "orange",
        });

        axios.get("/api/hotel/reserv/type/" + id).then((response) => {
          setRoomtypeList(response.data);
        });
      })
      .catch(() => {
        toast({
          description: "객실 삭제가 실패 하였습니다",
          status: "error",
        });
      });
    //
  }

  // useEffect(() => {
  //   axios.get("/api/");
  // }, []);

  // 시작일 연월일로 보이게 설정 ------------------------------------------------
  // const transStartDate = trans.transStartDate;
  // // const startDate = new Date(transStartDate);
  // const startYear = startDate.getFullYear();
  // const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
  // const startDay = startDate.getDate().toString().padStart(2, "0");
  // const startFormat = startYear + "년 " + startMonth + "월 " + startDay + "일";
  //
  // // 마감일 연월일로 보이게 설정 ------------------------------------------------
  // // const transEndDate = trans.transEndDate;
  // // const endDate = new Date(transEndDate);
  // const endYear = endDate.getFullYear();
  // const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
  // const EndDay = endDate.getDate().toString().padStart(2, "0");
  // const endFormat = endYear + "년 " + endMonth + "월 " + EndDay + "일";

  return (
    <Box>
      {hotel && (
        <>
          <Box
            border={"1px solid black"}
            borderRadius={"10px"}
            w={"80%"}
            ml={"10%"}
            mt={"10px"}
          >
            <Flex justifyContent={"flex-end"}>
              <Button
                onClick={() => navigate("/hotel/write/type/" + hotel.hid)}
                mr={"20px"}
              >
                {" "}
                객실 관리{" "}
              </Button>

              <Button onClick={() => navigate("/hotel/edit/" + hotel.hid)}>
                {" "}
                호텔 수정{" "}
              </Button>
              <Button ml={"20px"} onClick={handleHotelDelete}>
                {" "}
                호텔 삭제{" "}
              </Button>
            </Flex>
          </Box>
          <Box w={"80%"} ml={"15%"} display={"flex"} gap={"10px"}>
            <Box
              border={"1px solid black"}
              h={"500px"}
              w={"600px"}
              my={"10px"}
              borderRadius={"lg"}
            >
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="hoteViewlImg"
              >
                <SwiperSlide>
                  {" "}
                  <Image
                    src={hotel.mainImgUrl}
                    alt={"숙소 이미지1"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.subImgUrl1}
                    alt={"숙소 이미지1"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.subImgUrl2}
                    alt={"숙소 이미지1"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.mapImgUrl}
                    alt={"숙소 이미지1"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
              </Swiper>
            </Box>

            <Box
              w={"100%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              mt={"50px"}
            >
              <Box
                border={"1px solid black"}
                mt={"10px"}
                h={"240px"}
                w={"65%"}
                borderRadius={"lg"}
              >
                <Heading>{hotel.name}</Heading>
                <Divider />
                <Box>
                  <Text>{hotel.location}</Text>
                  <Text>등급 :{hotel.rating}</Text>
                  <Text>총 객실 수: {hotel.numberOfBed}</Text>
                  <Text>체크인 : 15:00 체크아웃 : 11:00</Text>
                </Box>
              </Box>
              <Box display={"flex"}>
                <Box
                  border={"1px solid black"}
                  cursor={"pointer"}
                  w={"150px"}
                  h={"100px"}
                  borderRadius={"10px"}
                  display={"flex"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Heading>예약하기</Heading>
                </Box>
                <Box
                  border={"1px solid black"}
                  cursor={"pointer"}
                  w={"150px"}
                  h={"100px"}
                  borderRadius={"10px"}
                  display={"flex"}
                  textAlign={"center"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  ml={"20px"}
                >
                  <Heading>찜하기</Heading>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* 객실 및 인원 선택 창 */}
          <Box
            my={"10px"}
            h={"80px"}
            w={"80%"}
            mx={"10%"}
            border={"1px solid black"}
            borderRadius={"10px"}
          >
            {" "}
            <Flex className="date-range-picker-container">
              {/*<DatePicker*/}
              {/*  value={null}*/}
              {/*  className="date-picker"*/}
              {/*  selected={null}*/}
              {/*  // onChange={handleStartDateChange}*/}
              {/*  selectsStart*/}
              {/*  startDate={null}*/}
              {/*  endDate={null}*/}
              {/*  isClearable={true}*/}
              {/*  placeholderText="출발일을 선택해 주세요"*/}
              {/*  dateFormat="yyyy년 MM월 dd일"*/}
              {/*  minDate={new Date()}*/}
              {/*/>{" "}*/}
              {/*<DatePicker*/}
              {/*  value={null}*/}
              {/*  className="date-picker"*/}
              {/*  selected={null}*/}
              {/*  // onChange={handleStartDateChange}*/}
              {/*  selectsStart*/}
              {/*  startDate={null}*/}
              {/*  endDate={null}*/}
              {/*  isClearable={true}*/}
              {/*  placeholderText="출발일을 선택해 주세요"*/}
              {/*  dateFormat="yyyy년 MM월 dd일"*/}
              {/*  minDate={new Date()}*/}
              {/*/>*/}
            </Flex>
          </Box>
          {showCheckInInput && (
            <Box position zIndex={999} ml={"10%"} w={"200px"}>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
          )}
          <SimpleGrid columns={1} spacing={5} my="20px" ml="10%" w="80%">
            {roomtypeList &&
              roomtypeList.map((roomtype) => (
                <Box
                  key={roomtype.hrtId}
                  borderRadius="lg"
                  border="1px solid black"
                  p="20px"
                  display="flex"
                  textAlign={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image
                    ml={"20px"}
                    src={roomtype.roomImgUrl}
                    alt={roomtype.roomtype}
                  />
                  <Text ml={"50px"} fontSize="xl" fontWeight="bold">
                    {roomtype.roomtype}
                  </Text>
                  <Spacer />
                  <VStack textAlign={"right"}>
                    <Text> 객실 인원 :{roomtype.maxMinPerRoom}</Text>
                    <Text> 취사 여부 :{roomtype.ableCooking}</Text>
                    <Text> 침실 수 :{roomtype.numberOfBedRoom}</Text>
                  </VStack>
                  <Spacer />
                  <VStack mr="40px">
                    <Text fontSize="xl" fontWeight="bold">
                      가격: {roomtype.salePriceWeekday.toLocaleString()}원
                    </Text>
                    <Text>
                      부가세 · 봉사료 10% 포함 (세금계산서 · 현금영수증 발행)
                    </Text>
                    <Text color="red">취소불가(취소수수료 발생)</Text>
                  </VStack>

                  <Stack>
                    <Select placeholder="객실 수 ">
                      <option value="option1">객실 1개</option>
                      <option value="option1">객실 2개</option>
                      <option value="option1">객실 3개</option>
                      <option value="option1">객실 4개</option>
                      <option value="option1">객실 5개</option>
                    </Select>
                    <Button
                      variant={"outline"}
                      colorScheme={"green"}
                      onClick={() => navigate("/hotel/pay/" + hotel.hid)}
                    >
                      {" "}
                      예약하기{" "}
                    </Button>
                  </Stack>
                </Box>
              ))}
          </SimpleGrid>
          <Box
            w={"80%"}
            ml={"10%"}
            border={"1px solid black"}
            h={"400px"}
            mb={"15px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"lg"}
          >
            <Heading>객실 예약시 주의사항 기입 목록</Heading>
          </Box>
        </>
      )}
    </Box>
  );
}
