import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Textarea,
  Select,
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
  Box,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

export function HotelEdit() {
  const [hotel, setHotel] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [removeFileId, setRemoveFileId] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);

  useEffect(() => {
    axios.get("/api/hotel/edit/id/" + id).then((response) => {
      setHotel(response.data);
    });
  }, [id]);

  function handleChange() {
    axios
      .putForm("/api/hotel/edit", {
        hid: id,
        name: hotel.name,
        location: hotel.location,
        description: hotel.description,
        mainImg: hotel.mainImg,
        numberOfBed: hotel.numberOfBed,
        lodgingType: hotel.lodgingType,
        subImg1: hotel.subImg1,
        subImg2: hotel.subImg2,
        mapImg: hotel.mapImg,
        salesFrom: hotel.salesFrom,
        salesTo: hotel.salesTo,
        rating: hotel.rating,
        cautionMessage: hotel.cautionMessage,
        removeFileId,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: id + "번" + hotel.name + " 상품 수정 완료 되었습니다",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: id + "호텔 상품 수정 중 문제가 발생 하였습니다",
          status: "error",
        });
      })
      .then(() => navigate(-2));
  }

  function handleAddressClick() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setHotel({ ...hotel, location: data.address });
      },
    }).open();
  }

  return (
    <Center>
      <Card w={"4xl"} p={"30px"} my={"30px"}>
        <CardHeader>
          <Heading textAlign={"center"}> 호텔 수정 </Heading>
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
                value={hotel.name || ""}
                onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
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
                value={hotel.location || ""}
                readOnly
                onChange={(e) =>
                  setHotel({ ...hotel, location: e.target.value })
                }
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
                설명{" "}
              </FormLabel>
              <Textarea
                value={hotel.description || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, description: e.target.value })
                }
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
                Room Type{" "}
              </FormLabel>
              <Select
                value={hotel.roomType || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, roomType: e.target.value })
                }
              >
                <option value="스탠다드">스탠다드</option>
                <option value="디럭스">디럭스</option>
                <option value="스위트">스위트</option>
                {/* 필요에 따라 더 많은 Room Type을 추가하세요. */}
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
                판매 기간{" "}
              </FormLabel>
              <Flex className="date-range-picker-container">
                <DatePicker
                  selected={hotel.salesFrom ? new Date(hotel.salesFrom) : null}
                  onChange={(date) => setHotel({ ...hotel, salesFrom: date })}
                  selectsStart
                  startDate={hotel.salesFrom ? new Date(hotel.salesFrom) : null}
                  endDate={hotel.salesTo ? new Date(hotel.salesTo) : null}
                  isClearable={true}
                  placeholderText="시작일"
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={new Date()}
                />
                <DatePicker
                  selected={hotel.salesTo ? new Date(hotel.salesTo) : null}
                  onChange={(date) => setHotel({ ...hotel, salesTo: date })}
                  selectsEnd
                  startDate={hotel.salesFrom ? new Date(hotel.salesFrom) : null}
                  endDate={hotel.salesTo ? new Date(hotel.salesTo) : null}
                  isClearable={true}
                  placeholderText="마감일"
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={hotel.salesTo ? new Date(hotel.salesTo) : null}
                />
              </Flex>
            </Flex>

            {/* 숙소 등급 */}
            <Flex>
              <FormLabel
                my={"15px"}
                w={100}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                숙소 등급{" "}
              </FormLabel>
              <Select
                value={hotel.rating || ""}
                onChange={(e) => setHotel({ ...hotel, rating: e.target.value })}
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

            {/* 숙소 타입 */}
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
                value={hotel.lodgingType || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, lodgingType: e.target.value })
                }
              >
                <option value="호텔">호텔</option>
                <option value="모텔">모텔</option>
                <option value="민박">민박</option>
                <option value="게스트 하우스">게스트 하우스</option>
              </Select>
            </Flex>

            {/* 상세 주소및 설명 */}
            <Box my={"10px"}>
              <FormLabel
                my={"15px"}
                w={"200px"}
                textAlign="center"
                display="flex"
                alignItems={"center"}
              >
                {" "}
                상세 주소및 설명{" "}
              </FormLabel>
              <Textarea
                value={hotel.description || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, description: e.target.value })
                }
              />
            </Box>

            {/* 주의사항 */}
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
                value={hotel.cautionMessage || ""}
                onChange={(e) =>
                  setHotel({ ...hotel, cautionMessage: e.target.value })
                }
              />
            </Box>

            {/* 대표 이미지 */}
            <Divider />
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
                onChange={(e) =>
                  setHotel({ ...hotel, mainImg: e.target.files })
                }
              />
            </Flex>

            {/* 부가 이미지 1 */}
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
                onChange={(e) =>
                  setHotel({ ...hotel, subImg1: e.target.files })
                }
              />
            </Flex>

            {/* 부가 이미지 2 */}
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
                onChange={(e) =>
                  setHotel({ ...hotel, subImg2: e.target.files })
                }
              />
            </Flex>

            {/* 지도 이미지 */}
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
                onChange={(e) => setHotel({ ...hotel, mapImg: e.target.files })}
              />
            </Flex>

            <Flex justifyContent={"flex-end"} mt={"30px"}>
              <Button colorScheme="teal" onClick={handleChange}>
                확인
              </Button>
            </Flex>
          </FormControl>
        </CardBody>
      </Card>
    </Center>
  );
}
