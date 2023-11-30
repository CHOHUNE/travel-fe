import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Table,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
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

  const toast = useToast();

  const { id } = useParams();
  useEffect(() => {
    axios.get("/api/transport/id/" + id).then((response) => {
      setTrans(response.data);
      setTransStartDay(response.data.transStartDay);
      setTransTitle(response.data.transTitle);
      setTransPrice(response.data.transPrice);
      setTransContent(response.data.transContent);
    });
  }, []);

  function handleSubmitTrans() {
    axios
      .put("/api/transport/edit", {
        tid: id,
        transStartDay,
        transTitle,
        transPrice,
        transContent,
      })
      .then(() => {
        toast({
          description: id + " 번 운송 상품 이 수정 되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "운송 상품 수정중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .then(() => navigate(-1));
  }

  return (
    <Center w={"55%"} ml={"27.5%"} textAlign={"center"} mt={4} mb={10}>
      <Box>
        <Heading>{id} 번 운송 상품 수정 페이지</Heading>
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
              출발 일시
            </Th>
            <Td border={"1px solid gray"}>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={transStartDay}
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
