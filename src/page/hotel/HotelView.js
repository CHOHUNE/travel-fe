import React, { useContext, useEffect, useState } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./style.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { LoginContext } from "../../component/LoginProvider";

export function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [roomtypeList, setRoomtypeList] = useState(null);

  const [reservation, setReservation] = useState({
    checkinDate: null,
    checkoutDate: null,
  });

  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState();
  const [roomTypePrices, setRoomTypePrices] = useState({});

  const { login, isAdmin } = useContext(LoginContext);

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

  // useEffect(() => {
  //   axios
  //     .get("/api/hotel/pay")
  //     .then((response) => setReservation(response.data));
  // }, []);

  function handleReservationClick(roomtype) {
    if (login !== "") {
      const selectedRoomPrice = roomTypePrices[roomtype.roomtype];

      if (selectedRoomPrice !== undefined) {
        const totalPrice = selectedRoomPrice * count;
        navigate("/hotel/pay/" + hotel.hid, {
          state: {
            reservation,
            roomTypePrices: { [roomtype.roomtype]: totalPrice },
          },
        });
      } else {
        toast({
          description: "객실 가격 정보를 찾을 수 없습니다.",
          status: "error",
        });
      }
    } else {
      toast({ description: "로그인 후 결제 해주세요.", status: "error" });
    }
  }

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
            border={"1px solid"}
            borderColor={"gray.400"}
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
              border={"1px solid"}
              borderColor={"gray.400"}
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
                    alt={"메인 이미지"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.subImgUrl1}
                    alt={"서브 이미지1"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.subImgUrl2}
                    alt={"서브 이미지2"}
                    w={"100%"}
                    h={"100%"}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={hotel.mapImgUrl}
                    alt={"맵 이미지1"}
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
                border={"1px solid"}
                borderColor={"gray.400"}
                mt={"10px"}
                h={"240px"}
                w={"65%"}
                borderRadius={"lg"}
              >
                <Heading>{hotel.name}</Heading>
                <Divider />
                <Box
                  fontWeight={"semibold"}
                  letterSpacing={"wide"}
                  fontSize={"medium"}
                  my={"10px"}
                  ml={"2"}
                  lineHeight={"2"}
                >
                  <Text>{hotel.location}</Text>
                  <Text>등급 :{hotel.rating}</Text>
                  <Text>총 객실 수: {hotel.numberOfBed}</Text>
                  <Text>체크인 : 15:00 체크아웃 : 11:00</Text>
                </Box>
              </Box>
              <Box display={"flex"}>
                <Box
                  border={"1px solid"}
                  borderColor={"gray.400"}
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
                  border={"1px solid"}
                  borderColor={"gray.400"}
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
            border={"1px solid"}
            borderColor={"gray.400"}
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

              <Text fontWeight={"bold"} ml={"40px"} mr={"40px"} mt={"17px"}>
                {reservation.checkinDate &&
                  reservation.checkoutDate &&
                  "예약 기간 : " +
                    reservation.checkinDate.toLocaleDateString("ko-KR") +
                    " ~ " +
                    reservation.checkoutDate.toLocaleDateString("ko-KR")}
              </Text>
              <Text fontWeight={"bold"} mr={"20px"} mt={"17px"}>
                {/* 변경된 부분: 날짜가 선택되지 않았을 때는 평일 요금 표시 */}

                {reservation.checkinDate &&
                  reservation.checkoutDate &&
                  "숙박 기간 : " +
                    `${
                      (reservation.checkoutDate - reservation.checkinDate) /
                      (1000 * 60 * 60 * 24)
                    }박 ${
                      (reservation.checkoutDate - reservation.checkinDate) /
                        (1000 * 60 * 60 * 24) +
                      1
                    }일`}
              </Text>
            </Flex>
          </Box>
          <SimpleGrid columns={1} spacing={5} my="20px" ml="10%" w="80%">
            {roomtypeList &&
              roomtypeList.map((roomtype) => (
                <Box
                  key={roomtype.hrtId}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={"gray.400"}
                  p="20px"
                  display="flex"
                  textAlign={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  // maxWidth="600px" // Set the maximum width for the box
                  // mx="auto" // Center the box horizontally
                >
                  <Image
                    ml={"20px"}
                    src={roomtype.roomImgUrl}
                    alt={roomtype.roomtype}
                    maxW="300px" // Set maximum width for the image
                    maxH="200px" // Set maximum height for the image
                    borderRadius={"10px"}
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
                      {/* 변경된 부분: 날짜가 선택되지 않았을 때는 평일 요금 표시 */}
                      숙박 요금 :
                      {roomTypePrices[roomtype.roomtype] &&
                        String(
                          roomTypePrices[roomtype.roomtype],
                        ).toLocaleString()}
                    </Text>

                    <Text>
                      {/* 변경된 부분: 날짜가 선택되지 않았을 때는 평일 요금 표시 */}
                      부가세 · 봉사료 10% 포함 (세금계산서 · 현금영수증 발행)
                    </Text>
                    <Text color="red" fontWeight={"semibold"}>
                      취소불가(취소수수료 발생)
                    </Text>
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
                      onClick={() => handleReservationClick(roomtype)}
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
            border={"1px solid "}
            color="gray.400"
            h={"400px"}
            mb={"15px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"lg"}
          >
            {hotel.cautionMessage}
          </Box>
        </>
      )}
    </Box>
  );
}
