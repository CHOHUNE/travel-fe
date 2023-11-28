import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function TransPortView() {
  const [value, setValue] = useState(0);
  const [trans, setTrans] = useState("");
  const handleChange = (value) => setValue(value);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/transport/id/" + id)
      .then((response) => setTrans(response.data));
  }, []);

  return (
    <Box mt={10} w={"80%"} ml={"10%"} key={trans.tid}>
      <Flex alignItems="center" gap={"10px"}>
        <Button w={"100px"} h={"50px"} ml={"80%"}>
          수송 상품 수정
        </Button>
        <Button w={"100px"} h={"50px"}>
          수송 상품 삭제
        </Button>
      </Flex>
      <Flex justifyContent={"space-between"} mt={10}>
        <Box w={"750px"} h={"500px"} bg={"#d9d9d9"}>
          메인 이미지
        </Box>
        <Card w={"400px"} h={"500px"} bg={"#d9d9d9"}>
          <CardHeader bg={"#f3eeee"} w={"350px"} h={"100px"} ml={"25px"} mt={4}>
            {trans.transTitle}
          </CardHeader>
          <CardBody>
            <Flex justifyContent={"space-between"} ml={"25px"}>
              <Box w={"185px"} h={"50px"} bg={"#f3eeee"}>
                가격 : {trans.transPrice}원
              </Box>
              <NumberInput
                maxW="100px"
                min={1}
                defaultValue={1}
                mr="2rem"
                value={value}
                onChange={handleChange}
                bg={"white"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Box w={"200px"} h={"80px"} bg={"#f3eeee"} ml={"25px"} mt={4}>
              출발일자 : {trans.transStartDay}
            </Box>
            <Flex justifyContent={"space-between"} ml={"25px"} mt={4}>
              <Button w={"165px"}>바로결제</Button>
              <Button w={"165px"}>장바구니</Button>
            </Flex>
            <Button w={"165px"} mt={4} ml={"25px"}>
              ❤️ 찜하기
            </Button>
          </CardBody>
        </Card>
      </Flex>
      <Box w={"100%"} h={"500px"} bg={"#d9d9d9"} mt={10} mb={20}>
        상품 상세 이미지 및, 설명
        <Box> 상품이미지들</Box>
        <Box> {trans.transContent}</Box>
      </Box>
    </Box>
  );
}
