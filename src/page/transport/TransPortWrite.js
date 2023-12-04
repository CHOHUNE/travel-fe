import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Select,
  Table,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export function TransPortWrite() {
  const [transMainImage, setTransMainImage] = useState(null);
  const [transStartDay, setTransStartDay] = useState(null);
  const [transTitle, setTransTitle] = useState(null);
  const [transPrice, setTransPrice] = useState(null);
  const [transSubImage, setTransSubImage] = useState(null);
  const [transContent, setTransContent] = useState(null);

  /* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 --------------------------------------- */

  const [transStartLocation, setTransStartLocation] = useState(null);
  const [transArriveLocation, setTransArriveLocation] = useState(null);

  /* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 --------------------------------------- */

  const navigate = useNavigate();

  const toast = useToast();

  const [params] = useSearchParams();
  const type = params.get("type");
  function handleSubmitTrans() {
    axios
      .postForm("/api/transport/add", {
        type,
        transMainImage,
        transStartDay,
        transTitle,
        transPrice,
        transContent,
      })
      .then(() => {
        toast({
          description: "운송 상품 등록에 성공하였습니다.",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          title: "운송 상품 등록에 실패 했습니다.",
          description: "빈값이 있는지 확인해주세요.",
          status: "error",
        });
      });
  }

  return (
    <Center>
      <Box w={"55%"} textAlign={"center"} mt={4}>
        <Heading>상품 등록</Heading>
        <Table
          mt={4}
          border={"1px solid gray"}
          style={{ borderCollapse: "collapse" }}
        >
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              메인 이미지
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setTransMainImage(e.target.files[0])}
              />
              <FormControl>
                <FormHelperText>
                  파일 크기는 1MB 이하로 첨부하세요
                </FormHelperText>
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              출발 일시
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                onChange={(e) => setTransStartDay(e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              제목
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                type={"text"}
                value={transTitle}
                onChange={(e) => setTransTitle(e.target.value)}
              />
            </Td>
          </Tr>
          {/* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 (시작) --------------------------------------- */}
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              출발지
            </Th>
            <Td border={"1px solid gray"}>
              <FormControl>
                <Select
                  placeholder="출발 지역을 선택해주세요"
                  value={transStartLocation}
                  onChange={(e) => setTransStartLocation(e.target.value)}
                >
                  <option>서울</option>
                  <option>부산</option>
                </Select>
              </FormControl>
            </Td>
          </Tr>
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              도착지
            </Th>
            <Td border={"1px solid gray"}>
              <FormControl>
                <Select
                  placeholder="도착 지역을 선택해주세요"
                  value={transArriveLocation}
                  onChange={(e) => setTransArriveLocation(e.target.value)}
                >
                  <option>서울</option>
                  <option>부산</option>
                </Select>
              </FormControl>
            </Td>
          </Tr>
          {/* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 (끝)--------------------------------------- */}
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              가격
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                value={transPrice}
                onChange={(e) => setTransPrice(e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Th
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              상품 설명 이미지
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                type={"file"}
                value={transSubImage}
                onChange={(e) => setTransSubImage(e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Th
              w={"180px"}
              h={"60px"}
              border={"1px solid gray"}
              textAlign={"center"}
              fontSize={"1.1rem"}
              bg={"#d9d9d9"}
            >
              상품 설명 텍스트
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                value={transContent}
                onChange={(e) => setTransContent(e.target.value)}
              />
            </Td>
          </Tr>
        </Table>
        <Flex w={"90%"} ml={"5%"} gap={"5%"} mt={8}>
          <Button
            w={"50%"}
            h={"60px"}
            colorScheme={"white"}
            color={"black"}
            border={"1px solid black"}
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
          <Button
            w={"50%"}
            h={"60px"}
            colorScheme={"blue"}
            onClick={handleSubmitTrans}
          >
            저장 하기
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
