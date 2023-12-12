import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormLabel,
  Center,
  Card,
  CardHeader,
  Heading,
  CardBody,
  FormControl,
  Flex,
  useToast,
  Divider,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function HotelWrite() {
  // 호텔 추가
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfBed, setNumberOfBed] = useState("0");
  const [subImg1, setSubImg1] = useState(null);
  const [subImg2, setSubImg2] = useState(null);
  const [mapImg, setMapImg] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [lodgingType, setLodgingType] = useState();

  const toast = useToast();
  const navigate = useNavigate();

  function handleAddressClick() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setLocation(data.address);
      },
    }).open();
  }

  // 확인 버튼 클릭 시 처리하는 함수
  async function handleConfirmation() {
    try {
      // Step 1: 호텔 정보 삽입
      const hotelResponse = await axios.postForm("/api/hotel/write", {
        name,
        location,
        description,
        mainImg,
        numberOfBed,
        subImg1,
        subImg2,
        mapImg,
        lodgingType,
      });

      // // Step 2: 호텔 정보에서 생성된 hId 얻기
      // const hId = hotelResponse.data.hId;
      //
      // // Step 3: 객실 정보 삽입
      // await axios.postForm("/api/hotel/writeType", {
      //   hId,
      //   additionalRooms,
      // });

      // 성공적으로 처리된 경우
      toast({
        description: "호텔 상품 및 객실 정보 등록이 완료되었습니다.",
        status: "success",
      });

      // 페이지 이동 등 필요한 작업 수행
      navigate(-1);
    } catch (error) {
      // 오류가 발생한 경우
      console.error("호텔 및 객실 정보 등록 중 오류 발생:", error);
      toast({
        description: "호텔 및 객실 정보 등록에 실패하였습니다.",
        status: "error",
      });
    }
  }

  // const [additionalRooms, setAdditionalRooms] = useState([
  //   {
  //     roomtype: "",
  //     originalPriceWeekday: "",
  //     salePriceWeekday: "",
  //     originalPriceWeekend: "",
  //     salePriceWeekend: "",
  //     roomImg: null,
  //     hId: null,
  //   },
  // ]);

  // function handleAddRoom() {
  //   setAdditionalRooms((prevRooms) => [
  //     ...prevRooms,
  //     {
  //       roomtype: "",
  //       originalPriceWeekday: "",
  //       salePriceWeekday: "",
  //       originalPriceWeekend: "",
  //       salePriceWeekend: "",
  //       roomImg: null,
  //       hId: null,
  //     },
  //   ]);
  // }

  // function handleAdditionalRoomChange(index, key, value) {
  //   setAdditionalRooms((prevRooms) => {
  //     const updatedRooms = [...prevRooms];
  //     updatedRooms[index] = {
  //       ...updatedRooms[index],
  //       [key]: value,
  //     };
  //     return updatedRooms;
  //   });
  // }

  return (
    <Center>
      <Card w={"4xl"} p={"30px"} my={"30px"}>
        <CardHeader>
          <Heading textAlign={"center"}> 호텔 추가 </Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                호텔명{" "}
              </FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Flex>
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                위치{" "}
              </FormLabel>
              <Input
                value={location}
                readOnly
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <Button ml={4} onClick={handleAddressClick}>
                {" "}
                주소 검색
              </Button>
            </Flex>
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                상세 주소 및 설명{" "}
              </FormLabel>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Flex>

            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                숙소 타입{" "}
              </FormLabel>

              <Select
                value={lodgingType}
                onChange={(e) => {
                  setLodgingType(e.target.value);
                }}
              >
                <option value="호텔">호텔</option>
                <option value="모텔">모텔</option>
                <option value="민박">민박</option>
                <option value="게스트 하우스">게스트 하우스</option>
              </Select>
            </Flex>

            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                대표 이미지{" "}
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setMainImg(e.target.files)}
              />
            </Flex>

            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                부가 이미지 1{" "}
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSubImg1(e.target.files)}
              />
            </Flex>
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                부가 이미지 2{" "}
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setSubImg2(e.target.files)}
              />
            </Flex>
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                지도 이미지{" "}
              </FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setMapImg(e.target.files)}
              />
            </Flex>

            {/*<Heading textAlign={"center"} my={"15px"}>*/}
            {/*  객실 추가*/}
            {/*</Heading>*/}

            {/*<Table variant="simple" mt={4} maxW="100%">*/}
            {/*  /!* ... (unchanged code) *!/*/}
            {/*  <Th>객실 타입 </Th>*/}
            {/*  <Th>주중 입금가</Th>*/}
            {/*  <Th>주중 판매가</Th>*/}
            {/*  <Th>주말 입금가</Th>*/}
            {/*  <Th>주말 판매가</Th>*/}
            {/*  <Th>객실 이미지</Th>*/}
            {/*  <Tbody>*/}
            {/*    {additionalRooms.map((room, index) => (*/}
            {/*      <Tr key={index}>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            placeholder="타입"*/}
            {/*            value={room.roomtype}*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "roomtype",*/}
            {/*                e.target.value,*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            type="number"*/}
            {/*            placeholder="일 ~목"*/}
            {/*            value={room.originalPriceWeekday}*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "originalPriceWeekday",*/}
            {/*                e.target.value,*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            type="number"*/}
            {/*            placeholder="일~ 목"*/}
            {/*            value={room.salePriceWeekday}*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "salePriceWeekday",*/}
            {/*                e.target.value,*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            type="number"*/}
            {/*            placeholder="금, 토"*/}
            {/*            value={room.originalPriceWeekend}*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "originalPriceWeekend",*/}
            {/*                e.target.value,*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            type="number"*/}
            {/*            placeholder="금, 토"*/}
            {/*            value={room.salePriceWeekend}*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "salePriceWeekend",*/}
            {/*                e.target.value,*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*        <Td>*/}
            {/*          <Input*/}
            {/*            type="file"*/}
            {/*            accept="image/*"*/}
            {/*            onChange={(e) =>*/}
            {/*              handleAdditionalRoomChange(*/}
            {/*                index,*/}
            {/*                "roomImg",*/}
            {/*                e.target.files[0],*/}
            {/*              )*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Td>*/}
            {/*      </Tr>*/}
            {/*    ))}*/}
            {/*  </Tbody>*/}
            {/*</Table>*/}

            {/*<Button colorScheme="teal" mt={4} onClick={handleAddRoom}>*/}
            {/*  +*/}
            {/*</Button>*/}

            <Flex justifyContent={"flex-end"} mt={"30px"}>
              <Button colorScheme="teal" onClick={handleConfirmation}>
                확인
              </Button>
            </Flex>
          </FormControl>
        </CardBody>
      </Card>
    </Center>
  );
}
