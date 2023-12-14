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
import { format } from "date-fns";

export function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [roomtypeList, setRoomtypeList] = useState(null);
  const [reservation, setReservation] = useState({
    checkinDate: null,
    checkoutDate: null,
    totalPrice: null,
  });

  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(0);

  const [showCheckInInput, setShowCheckInInput] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [roomTypePrices, setRoomTypePrices] = useState({});

  const saveToRecentViewed = (hotelData) => {
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    const updatedRecentViewed = [hotelData, ...recentViewed].slice(0, 5);
    localStorage.setItem("recentViewed", JSON.stringify(updatedRecentViewed));
  };

  useEffect(() => {
    axios.get("/api/hotel/reserv/id/" + id).then((response) => {
      setHotel(response.data);
      saveToRecentViewed(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get("/api/hotel/reserv/type/" + id).then((response) => {
      setRoomtypeList(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("/api/hotel/pay")
      .then((response) => setReservation(response.data));
  }, []);

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

  function isWeekend(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  const calculatePrice = (checkinDate, checkoutDate, roomtype) => {
    if (!checkinDate || !checkoutDate) {
      return 0;
    }

    let currentDate = new Date(checkinDate);
    let total = 0;

    while (currentDate < checkoutDate) {
      const isWeekendDay = isWeekend(currentDate);
      const price = isWeekendDay
        ? roomtype.salePriceWeekend
        : roomtype.salePriceWeekday || 0;
      total += price;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return total;
  };

  const updateRoomTypePrices = () => {
    const updatedPrices = {};
    if (roomtypeList && reservation.checkinDate && reservation.checkoutDate) {
      roomtypeList.forEach((roomtype) => {
        const price = calculatePrice(
          reservation.checkinDate,
          reservation.checkoutDate,
          roomtype,
        );
        updatedPrices[roomtype.roomtype] = price;
      });
    }
    setRoomTypePrices(updatedPrices);
  };

  useEffect(() => {
    updateRoomTypePrices();
  }, [reservation.checkinDate, reservation.checkoutDate, roomtypeList]);

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
            <Flex
              justifyContent={"flex-end"}
              textAlign={"center"}
              justifyItems={"center"}
            >
              <Text fontWeight={"bold"} mr={"15px"} mt={"10px"}>
                판매 기간 :{hotel.salesFrom && hotel.salesFrom.split("T")[0]} ~{" "}
                {hotel.salesTo && hotel.salesTo.split("T")[0]}
              </Text>
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

          <Box
            my={"10px"}
            h={"80px"}
            w={"80%"}
            mx={"10%"}
            border={"1px solid black"}
            borderRadius={"10px"}
          >
            <Flex className="date-range-picker-container" mt={"5px"} m={"10px"}>
              <DatePicker
                value={reservation.checkinDate}
                className="date-picker"
                selected={reservation.checkinDate}
                onChange={(date) =>
                  setReservation((prevReservation) => ({
                    ...prevReservation,
                    checkinDate: date,
                  }))
                }
                selectsStart
                startDate={reservation.checkinDate}
                endDate={reservation.checkinDate}
                isClearable={true}
                placeholderText="체크인"
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date()}
              />
              <DatePicker
                value={reservation.checkoutDate}
                className="date-picker"
                selected={reservation.checkoutDate}
                onChange={(date) =>
                  setReservation((prevReservation) => ({
                    ...prevReservation,
                    checkoutDate: date,
                  }))
                }
                selectsEnd
                startDate={reservation.checkinDate}
                endDate={reservation.checkoutDate}
                isClearable={true}
                placeholderText="체크아웃"
                dateFormat="yyyy년 MM월 dd일"
                minDate={reservation.checkinDate}
              />

              <Text fontWeight={"bold"} mr={"15px"} mt={"10px"}>
                예약 기간 :
                {reservation.checkinDate &&
                  reservation.checkinDate.toLocaleDateString("ko-KR")}{" "}
                ~{" "}
                {reservation.checkoutDate &&
                  reservation.checkoutDate.toLocaleDateString("ko-KR")}
              </Text>
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
                      총
                      {roomTypePrices[roomtype.roomtype] &&
                        roomTypePrices[roomtype.roomtype].toLocaleString()}
                      원
                    </Text>
                    <Text>
                      부가세 · 봉사료 10% 포함 (세금계산서 · 현금영수증 발행)
                    </Text>
                    <Text color="red">취소불가(취소수수료 발생)</Text>
                  </VStack>

                  <Stack>
                    <Select
                      placeholder="객실 수 "
                      onChange={(e) => setCount(e.target.value)}
                    >
                      <option value="1">객실 1개</option>
                      <option value="2">객실 2개</option>
                      <option value="3">객실 3개</option>
                      <option value="4">객실 4개</option>
                      <option value="5">객실 5개</option>
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
            <Heading>
              객실 예약시 주의사항 기입 목록
              {hotel.cautionMessage}
            </Heading>
          </Box>
        </>
      )}
    </Box>
  );
}
