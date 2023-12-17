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
  Box,
  Checkbox,
  Stack,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

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
  const [lodgingType, setLodgingType] = useState("");
  const [salesFrom, setSalesFrom] = useState(null);
  const [salesTo, setSalesTo] = useState(null);
  const [rating, setRating] = useState(null);
  const [cautionMessage, setCautionMessage] = useState(null);

  const [pool, setPool] = useState("");
  const [pet, setPet] = useState("");
  const [oceanview, setOceanview] = useState("");
  const [familyMood, setFamilyMood] = useState("");
  const [romanticMood, setRomanticMood] = useState("");
  const [campingMood, setCampingMood] = useState("");

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
        salesFrom,
        salesTo,
        rating,
        cautionMessage,
        pool,
        oceanview,
        pet,
        familyMood,
        romanticMood,
        campingMood,
      });

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

  return (
    <Center>
      <Card w={"800px"} p={"30px"} my={"30px"}>
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
                w={"15%"}
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
                <option value="캠핑/카라반">캠핑/카라반</option>
                <option value="리조트">리조트</option>
                <option value="게스트 하우스">게스트 하우스</option>
              </Select>
            </Flex>
            <Flex>
              <FormLabel
                my={"15px"}
                w={"15%"}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                호텔 등급{" "}
              </FormLabel>

              <Select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                color={"grey"}
              >
                <option value={""}>등급 없음</option>
                <option value={"1성"}>1성</option>
                <option value={"2성"}>2성</option>
                <option value={"3성"}>3성</option>
                <option value={"4성"}>4성</option>
                <option value={"5성"}>5성</option>
              </Select>
            </Flex>
            <FormControl
              mt={2}
              // border={"2px solid black"}
              h={"60px"}
            >
              <Flex>
                <FormLabel w={"15%"} fontSize={"1.1rem"} lineHeight={"60px"}>
                  판매 기간
                </FormLabel>
                <Flex className="date-range-picker-container">
                  <DatePicker
                    value={salesFrom}
                    className="date-picker"
                    selected={salesFrom}
                    onChange={(date) => setSalesFrom(date)}
                    selectsStart
                    startDate={salesFrom}
                    endDate={salesTo}
                    isClearable={true}
                    placeholderText="시작일"
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={new Date()}
                  />
                  <DatePicker
                    value={salesTo}
                    className="date-picker"
                    selected={salesTo}
                    onChange={(date) => setSalesTo(date)}
                    selectsEnd
                    startDate={salesFrom}
                    endDate={salesTo}
                    isClearable={true}
                    placeholderText="마감일"
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={salesTo}
                  />
                </Flex>
              </Flex>
            </FormControl>
            <Box my={"10px"}>
              <FormLabel
                my={"15px"}
                w={"200px"}
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
            </Box>
            <Divider />
            <Box my={"10px"}>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                주의 사항
              </FormLabel>
              <Textarea
                value={cautionMessage}
                onChange={(e) => setCautionMessage(e.target.value)}
              />
            </Box>
            <Divider />
            <FormLabel
              my={"15px"}
              w={"200px"}
              textAlign="center"
              display="flex"
              alignItems={"center"}
            >
              {" "}
              테마{" "}
            </FormLabel>

            <CheckboxGroup colorScheme="green">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Checkbox
                  value="반려견 동반"
                  onChange={(e) =>
                    setPet(e.target.checked ? "반려견 동반" : null)
                  }
                  isChecked={pet === "반려견 동반"}
                >
                  반려견 동반
                </Checkbox>
                <Checkbox
                  value="오션뷰"
                  onChange={(e) =>
                    setOceanview(e.target.checked ? "오션뷰" : null)
                  }
                  isChecked={oceanview === "오션뷰"}
                >
                  오션뷰
                </Checkbox>
                <Checkbox
                  value="가족, 친구"
                  onChange={(e) =>
                    setFamilyMood(e.target.checked ? "가족, 친구" : null)
                  }
                  isChecked={familyMood === "가족, 친구"}
                >
                  가족, 친구
                </Checkbox>
                <Checkbox
                  value="연인"
                  onChange={(e) =>
                    setRomanticMood(e.target.checked ? "연인" : null)
                  }
                  isChecked={romanticMood === "연인"}
                >
                  연인
                </Checkbox>
                <Checkbox
                  value="캠핑, 카라반"
                  onChange={(e) =>
                    setCampingMood(e.target.checked ? "캠핑, 카라반" : null)
                  }
                  isChecked={campingMood === "캠핑, 카라반"}
                >
                  캠핑, 카라반
                </Checkbox>
                <Checkbox
                  value="수영장"
                  onChange={(e) => setPool(e.target.checked ? "수영장" : null)}
                  isChecked={pool === "수영장"}
                >
                  수영장
                </Checkbox>
              </Stack>
            </CheckboxGroup>

            <Flex mt={"20px"}>
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
