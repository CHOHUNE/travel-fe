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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";

export function HotelView() {
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [roomtypeList, setRoomtypeList] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(0);

  const [selectedRoom, setSelectedRoom] = useState();
  // 호텔 ID를 사용하여 호텔 데이터를 가져오는 함수

  const [showCheckInInput, setShowCheckInInput] = useState(false);

  useEffect(() => {
    axios.get("/api/hotel/reserv/id/" + id).then((response) => {
      setHotel(response.data);
    });
  }, []);

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

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decreaseCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

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
                객실 추가{" "}
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
          <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
            <Box
              border={"1px solid black"}
              h={"450px"}
              w={"100%"}
              my={"10px"}
              borderRadius={"lg"}
            >
              {/* 호텔 이미지1 */}
              <Image
                src={hotel.mainImgUrl}
                alt={"숙소 이미지1"}
                w={"100%"}
                h={"100%"}
              />
            </Box>

            <Box
              w={"100%"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
            >
              <Box
                border={"1px solid black"}
                mt={"10px"}
                h={"220px"}
                w={"100%"}
                borderRadius={"lg"}
              >
                {/* 호텔 이미지2 */}
                <Image
                  src={hotel.subImgUrl1}
                  alt={"숙소 이미지2"}
                  w={"100"}
                  h={"100%"}
                />
              </Box>
              <Box
                border={"1px solid black"}
                mb={"5px"}
                h={"220px"}
                w={"100%"}
                borderRadius={"lg"}
              >
                {/* 호텔 이미지3 */}
                <Image
                  src={hotel.subImgUrl2}
                  alt={"숙소 이미지3"}
                  w={"100"}
                  h={"100%"}
                />
              </Box>
            </Box>
          </Box>
          {/* 호텔 설명 창 */}
          <Box
            w={"80%"}
            h={"130px"}
            ml={"10%"}
            display={"flex"}
            gap={"10px"}
            border={"1px solid black"}
            my={"10px"}
            textAlign={"center"}
          >
            <Stack>
              <Text fontSize="2xl">{hotel.name}</Text>

              <Text>{hotel.location}</Text>
              <Text>
                <StarIcon /> {hotel.rating} /5
              </Text>
              {hotel.numberOfBed}
              {hotel.description}
            </Stack>
          </Box>

          {/* 객실 및 인원 선택 창 */}
          <Box
            my={"10px"}
            border={"1px solid black"}
            borderRadius={"l"}
            h={"80px"}
            w={"80%"}
            mx={"10%"}
          >
            <Flex>
              <Box
                border={"1px solid black"}
                borderRadius={"xl"}
                h={"80px"}
                w={"120px"}
                onClick={() => {
                  setShowCheckInInput((prev) => !prev);
                }}
              >
                <Text color={"grey"} mt={"10px"} textAlign={"center"}>
                  체크인
                </Text>
              </Box>

              <Box
                border={"1px solid black"}
                borderRadius={"xl"}
                h={"80px"}
                w={"120px"}
              >
                <Text color={"grey"} mt={"10px"} textAlign={"center"}>
                  체크아웃
                </Text>
              </Box>
              <Box
                border={"1px solid black"}
                borderRadius={"xl"}
                h={"80px"}
                w={"120px"}
              >
                <Text color={""} mt={"10px"} textAlign={"center"}>
                  객실 및 인원
                </Text>
                <Center>
                  <IconButton
                    variant={"ghost"}
                    colorScheme={"black"}
                    aria-label={"Done"}
                    fontSize={"20px"}
                    isRound={true}
                    size={"m"}
                    icon={<AddIcon />}
                    onClick={increaseCount}
                    mt={"5px"}
                    mr={"5px"}
                  />
                  {count}
                  <IconButton
                    variant={"ghost"}
                    colorScheme={"black"}
                    aria-label={"Done"}
                    fontSize={"20px"}
                    isRound={true}
                    size={"m"}
                    icon={<MinusIcon />}
                    onClick={decreaseCount}
                    mt={"5px"}
                    ml={"5px"}
                  />
                </Center>
              </Box>
              <Spacer />
              <Box
                backgroundColor={"#f0eded"}
                borderRadius={"xl"}
                h={"80px"}
                w={"200px"}
                ml={"20px"}
              >
                <Stack>
                  <Text fontWeight={"bold"} mt={"10px"} ml={"10px"}>
                    포함사항
                  </Text>
                  <Text ml={"10px"}>세금/봉사료 포함</Text>
                </Stack>
              </Box>

              <Box
                backgroundColor={"#f0eded"}
                borderRadius={"xl"}
                h={"80px"}
                w={"200px"}
                ml={"20px"}
              >
                <Stack>
                  <Text fontWeight={"bold"} mt={"10px"} ml={"10px"}>
                    현지 추가 지불 사항
                  </Text>
                  <Text ml={"10px"}>세금/봉사료 포함</Text>
                </Stack>
              </Box>
            </Flex>
          </Box>
          {showCheckInInput && (
            <Box position zIndex={999} ml={"10%"} w={"200px"}>
              <Input placeholder="Select Date and Time" size="md" type="date" />
            </Box>
          )}
          <SimpleGrid
            columns={1}
            spacing={5}
            my="20px"
            ml="10%"
            w="80%"
            border="1px solid black"
          >
            {roomtypeList &&
              roomtypeList.map((roomtype) => (
                <Box
                  key={roomtype.hrtid}
                  borderRadius="lg"
                  border="1px solid black"
                  p="20px"
                  display="flex"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    room type:{roomtype.roomtype}
                  </Text>
                  <Spacer />

                  <Text>Sale Price (Weekday): {roomtype.salePriceWeekday}</Text>
                  <Spacer />

                  <Text>Sale Price (Weekend): {roomtype.salePriceWeekend}</Text>
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
            <Image
              src={hotel.mapImgUrl}
              alt={"지도 이미지"}
              w={"100%"}
              h={"100%"}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
