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
  Card,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./style.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { LoginContext } from "../../component/LoginProvider";

export function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [roomtypeList, setRoomtypeList] = useState(null);

  const [reservation, setReservation] = useState({
    checkinDate: new Date(),
    checkoutDate: new Date(),
  });

  useEffect(() => {
    // 오늘과 내일의 날짜를 생성
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // reservation 상태 업데이트
    setReservation({
      checkinDate: today,
      checkoutDate: tomorrow,
    });
  }, []);

  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(1);

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
            selectedRoom: roomtype,
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
    <Center>
      <Box mt={2} w={"80%"}>
        {hotel && (
          <>
            {/* 관리자 네비 바 */}
            {isAdmin() && (
              <Box
                border={"1px solid grey.400"}
                shadow={"1px 1px 3px 1px #dadce0"}
                borderColor={"gray.400"}
                borderRadius={"10px"}
                h={"80px"}
                display={"flex"}
                alignItems={"center"}
                w={"100%"}
                mt={"10px"}
                my={"10px"}
                mb={"30px"}
              >
                <Text
                  fontWeight={"bold"}
                  mr={"15px"}
                  mt={"10px"}
                  ml={"5%"}
                  fontSize={"1.1rem"}
                >
                  판매 기간 :{hotel.salesFrom && hotel.salesFrom.split("T")[0]}{" "}
                  ~ {hotel.salesTo && hotel.salesTo.split("T")[0]}
                </Text>
                <Spacer />
                <ButtonGroup mr={"5%"} gap={3}>
                  <Button
                    onClick={() => navigate("/hotel/write/type/" + hotel.hid)}
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
                </ButtonGroup>
              </Box>
            )}
            <Box
              direction={{ base: "column" }}
              overflow="hidden"
              variant="outline"
              // mt={2}
              w={"95%"}
              ml={"2.5%"}
              // border={"1px"}
            >
              <Flex gap={3}>
                <Box
                  borderRadius={"10px"}
                  maxW={"800px"}
                  maxh={"800px"}
                  overflow={"hidden"}
                >
                  <Swiper
                    pagination={true}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      {" "}
                      <Image
                        src={hotel.mainImgUrl}
                        alt={"메인 이미지"}
                        w={"100%"}
                        h={"100%"}
                        border={"10"}
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
                {/*</Box>*/}

                <Box
                  w="100%"
                  h="600px"
                  flexDirection="column"
                  // justifyContent={"center"}
                  alignItems={"center"}
                  display={"flex"}
                  gap="10px"
                  shadow={"1px 1px 3px 1px #dadce0 inset"}
                  border={"1px solid #ced8de"}
                  borderRadius={10}
                >
                  <Box
                    my={"10px"}
                    h={"100px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Heading ml={"10px"}>{hotel.name}</Heading>
                  </Box>
                  <Box
                    my={"10px"}
                    h={"50px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0 inset"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Text ml={"10px"}>{hotel.location}</Text>
                  </Box>
                  <Box
                    my={"10px"}
                    h={"50px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0 inset"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Text ml={"10px"}>등급: {hotel.rating}</Text>
                  </Box>
                  <Box
                    my={"10px"}
                    h={"50px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0 inset"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Text ml={"10px"}>총 객실 수: {hotel.numberOfRoom}</Text>
                  </Box>
                  <Box
                    my={"10px"}
                    h={"50px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0 inset"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Text ml={"10px"}>체크인: 15:00, 체크아웃: 11:00</Text>
                  </Box>

                  <Box
                    mb={"20px"}
                    h={"180px"}
                    w={"90%"}
                    borderRadius={"10px"}
                    shadow={"1px 1px 3px 1px #dadce0 inset"}
                    // alignItems={"center"}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Box ml={"10px"} mt={"10px"}>
                      {/*<Box>{hotel.description}</Box>*/}
                      <Box mb={"5px"}>
                        {hotel.oceanview != null && "오션뷰"}
                      </Box>
                      <Box mb={"5px"}>{hotel.pool != null && "수영장"}</Box>
                      <Box mb={"5px"}>
                        {hotel.pet != null && "반려견 동반 가능"}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/*</Box>*/}
              </Flex>
            </Box>
            <Box
              my={"10px"}
              bg={"whitesmoke"}
              h={"100px"}
              w={"95%"}
              ml={"2.5%"}
              mt={4}
              shadow={"xl"}
              display="flex" // Flexbox 사용
              justifyContent={"center"}
              position={"sticky"}
              top={0}
              zIndex={2}
              fontSize={14}
              fontWeight={"500"}
              borderRadius={"10px"}
            >
              <Flex
                className="date-range-picker-container"
                height={"100%"}
                alignItems={"center"}
                gap={2}
              >
                <DatePicker
                  customInput={
                    <Input
                      w={"200px"}
                      h={"60px"}
                      fontWeight={"bold"}
                      fontSize={15}
                      style={{
                        background: "rgba(0, 0, 0, 0)",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  }
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
                  customInput={
                    <Input
                      w={"200px"}
                      h={"60px"}
                      fontWeight={"bold"}
                      fontSize={15}
                      style={{
                        background: "rgba(0, 0, 0, 0)",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  }
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

                <Text fontSize={20} fontWeight={"bold"} ml={"15px"}>
                  예약 기간:{" "}
                </Text>

                <Text fontWeight={"bold"} mr={"40px"}>
                  {reservation.checkinDate &&
                    reservation.checkoutDate &&
                    // "예약 기간 : " +
                    reservation.checkinDate.toLocaleDateString("ko-KR") +
                      " ~ " +
                      reservation.checkoutDate.toLocaleDateString("ko-KR")}
                </Text>

                <Text fontSize={20} fontWeight={"bold"} ml={"15px"}>
                  숙박 기간:{" "}
                </Text>

                <Text fontWeight={"bold"} mr={"20px"}>
                  {reservation.checkinDate &&
                    reservation.checkoutDate &&
                    `${(
                      (reservation.checkoutDate - reservation.checkinDate) /
                      (1000 * 60 * 60 * 24)
                    ).toFixed(0)}박 ${(
                      (reservation.checkoutDate - reservation.checkinDate) /
                        (1000 * 60 * 60 * 24) +
                      1
                    ).toFixed(0)}일`}
                </Text>
              </Flex>
            </Box>
            {/* 여기서 부터 객실 렌더링 */}
            <Tabs isFitted mt={"40px"}>
              <TabList mb="1em">
                <Tab fontWeight={"bold"} fontSize={"20px"}>
                  {" "}
                  객실{" "}
                </Tab>
                <Tab fontWeight={"bold"} fontSize={"20px"}>
                  상세 설명
                </Tab>
                <Tab fontWeight={"bold"} fontSize={"20px"}>
                  환불 및 유의사항
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid columns={1} spacing={5} my="20px">
                    {roomtypeList &&
                      roomtypeList.map((roomtype) => (
                        <Box
                          key={roomtype.hid}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={"gray.400"}
                          p="10px"
                          display="flex"
                          textAlign={"center"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          ml={"30px"}
                          w={"95%"}
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
                                roomTypePrices[
                                  roomtype.roomtype
                                ].toLocaleString("ko-KR", {
                                  style: "currency",
                                  currency: "KRW",
                                })}
                            </Text>
                            <Text>
                              {/* 변경된 부분: 날짜가 선택되지 않았을 때는 평일 요금 표시 */}
                              부가세 · 봉사료 10% 포함 (세금계산서 · 현금영수증
                              발행)
                            </Text>
                            <Text color="red" fontWeight={"semibold"}>
                              취소불가(취소수수료 발생)
                            </Text>
                          </VStack>

                          <Stack>
                            <Select onChange={(e) => setCount(e.target.value)}>
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
                </TabPanel>
                {/* 상세 페이지 */}
                <TabPanel>
                  <Box
                    w={"80%"}
                    ml={"10%"}
                    border={"1px solid "}
                    borderColor="gray.400"
                    h={"400px"}
                    mb={"15px"}
                    // display={"flex"}
                    // justifyContent={"center"}
                    // alignItems={"center"}
                    borderRadius={"lg"}
                    p={"10px"}
                  >
                    <Heading textColor={"orange.400"}>상세 설명</Heading>
                    <Box ml="10px" mt={"30px"}>
                      {hotel.description}
                    </Box>
                  </Box>
                  {/*주의 사항 탭*/}
                </TabPanel>
                <TabPanel>
                  <Box
                    w={"80%"}
                    ml={"10%"}
                    border={"1px solid "}
                    borderColor="gray.400"
                    h={"400px"}
                    mb={"15px"}
                    // display={"flex"}
                    // justifyContent={"center"}
                    // alignItems={"center"}
                    borderRadius={"lg"}
                    p={"10px"}
                  >
                    <Heading textColor={"red.400"}>
                      취소/환불/변경 유의사항
                    </Heading>
                    <Box ml={"10px"} mt={"30px"}>
                      <Text>{hotel.cautionMessage}</Text>
                      <Text>
                        - 예약 취소, 접수는 마이페이지를 통해 가능합니다. -
                        취소수수료가 발생하는 경우에는 마이페이지 상에서
                        불가능하오니 고객센터로 문의하시기 바랍니다. - 취소,
                        변경 규정은 업무 시간 기준으로 적용되며 영업시간 이후
                        취소, 변경은 익일 영업시간 기준으로 적용됩니다. -
                        근무시간 이후에 현지 프론트로 예약을 취소하셔도 환불이
                        불가능합니다. - 현지 프론트로 직접 취소하셔도 취소접수만
                        받으며, 현지에서는 환불에 대한 책임이 없습니다. -
                        당사에서 예약한 예약건은 취소 및 변경도 당사로
                        통보하셔야 합니다. - 변경 및 취소 약관은 당사에 준하며
                        숙박지사와는 무관하오니 고객님의 개별적인 숙박지사와의
                        취소는 당사에서 책임지지 않습니다. - 입실 후 개인사정에
                        의한 조기퇴실은 어떤 경우에라도 환불이 되지 않습니다. -
                        취소, 변경은 본사 근무 시간에 맞춰져 있습니다. -
                        예약취소 가능시간 월-금요일: 09:00- 17:00까지 / 토.일
                        공휴일은 휴무입니다. - 취소, 변경은 필히 당사로 하셔야
                        하며 유선으로만 접수합니다. 메일접수는 받지 않습니다. -
                        전화 : 02-535-0114
                      </Text>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
    </Center>
  );
}
