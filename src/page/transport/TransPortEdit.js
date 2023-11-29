import { useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import axios from "axios";

export function TransPortEdit() {
  const [trans, setTrans] = useState(null);

  const [transMainImage, setTransMainImage] = useState(null);
  const [transStartDay, setTransStartDay] = useState("");
  const [transTitle, setTransTitle] = useState("");
  const [transPrice, setTransPrice] = useState("");
  const [transSubImage, setTransSubImage] = useState(null);
  const [transContent, setTransContent] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios.get("/api/transport/id/" + id).then((response) => {
      setTrans(response.data);
      setTransTitle(response.data.transTitle);
      setTransPrice(response.data.transPrice);
    });
  }, []);

  function handleSubmitTrans() {
    axios.put("/api/transport/edit", { id: id });
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
