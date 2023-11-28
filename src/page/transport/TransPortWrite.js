import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function TransPortWrite() {
  const [transMainImage, setTransMainImage] = useState(null);
  const [transStartDay, setTransStartDay] = useState(null);
  const [transTitle, setTransTitle] = useState(null);
  const [transPrice, setTransPrice] = useState(null);
  const [transSubImage, setTransSubImage] = useState(null);
  const [transContent, setTransContent] = useState(null);

  const navigate = useNavigate();

  const toast = useToast();

  const [params] = useSearchParams();
  const type = params.get("type");
  function handleSubmitTrans() {
    axios
      .post("/api/transport/add", {
        type,
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
      })
      .catch(() => {
        toast({
          description: "운송 상품 등록에 실패 했습니다.",
          status: "error",
        });
      })
      .finally(() => {
        navigate(-1);
      });
  }

  return (
    <Box w={"55%"} ml={"27.5%"} textAlign={"center"} mt={4}>
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
              type={"file"}
              value={transMainImage}
              onChange={(e) => setTransMainImage(e.target.value)}
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
            출발 일지
          </Th>
          <Td border={"1px solid gray"}>
            <DatePicker
              w={"200px"}
              h={"60px"}
              selected={transStartDay}
              onChange={(date) => setTransStartDay(date)}
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
  );
}
