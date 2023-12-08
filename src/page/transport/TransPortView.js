import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function TransLikeContainer({ transLikeState, onClick }) {
  if (transLikeState === null) {
    return <Spinner />;
  }
  return (
    <Flex gap={2}>
      <Box>찜하기</Box>
      <Button variant={"ghost"} onClick={onClick}>
        {transLikeState.transLikeState && (
          <Box>
            <FontAwesomeIcon icon={faHeart} style={{ color: "#f05656" }} />
          </Box>
        )}
        {transLikeState.transLikeState || (
          <FontAwesomeIcon icon={faHeart} color={"gray"} />
        )}
        <Text>{transLikeState.transLikeCount}</Text>
      </Button>
    </Flex>
  );
}

export function TransPortView() {
  const [value, setValue] = useState(0);
  const [trans, setTrans] = useState("");
  const [transLikeState, setTransLikeState] = useState(null);
  const navigate = useNavigate();

  const toast = useToast();

  const { isAuthenticated, isAdmin } = useContext(LoginContext);

  const handleChange = (value) => setValue(value);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/transport/id/" + id)
      .then((response) => setTrans(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/transLike/transport/" + id)
      .then((response) => setTransLikeState(response.data));
  }, []);

  if (trans === null) {
    return <Spinner />;
  }

  // 운송 상품 삭제 기능 시작 ----------------------------------------------------
  function handleTransDelete() {
    axios
      .delete("/api/transport/delete/" + id)
      .then(() => {
        toast({
          description: id + " 번 운송 상품이 삭제되었습니다.",
          colorScheme: "orange",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "운송 상품 삭제중 문제가 발생하였습니다.",
          status: "error",
        });
      });
  }
  // 운송 상품 삭제 기능 끝 ----------------------------------------------------

  // 찜하기 버튼 클릭시
  function handleLikeClick() {
    axios
      .post("/api/transLike", { transId: trans.tid })
      .then((response) => {
        setTransLikeState(response.data);
        toast({
          description: "찜 목록에 추가가 되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "로그인 해주세요 ",
          colorScheme: "orange",
        });
      });
  }

  return (
    <Center>
      <Box mt={10} w={"80%"} key={trans.tid}>
        <Flex alignItems="center" gap={"10px"}>
          <Button
            w={"100px"}
            h={"50px"}
            ml={"80%"}
            onClick={() => navigate("/transport/edit/" + trans.tid)}
          >
            수송 상품 수정
          </Button>
          <Button w={"100px"} h={"50px"} onClick={handleTransDelete}>
            수송 상품 삭제
          </Button>
        </Flex>
        <Flex justifyContent={"space-between"} mt={10}>
          <FormControl w={"750px"} h={"500px"} bg={"#d9d9d9"}>
            <FormLabel>메인 이미지</FormLabel>
            {trans.mainImage != null ? (
              <Image src={trans.mainImage.url} />
            ) : (
              <Box>빈값</Box>
            )}
          </FormControl>
          <Card w={"400px"} h={"500px"} bg={"#d9d9d9"}>
            <CardBody w={"80%"} bg={"#eeeccc"} ml={"10%"}>
              <Box bg={"#f3eeee"} w={"200px"} h={"100px"}>
                {trans.transTitle}
              </Box>
              <Box w={"80%"} h={"50px"} bg={"#f3eeee"}>
                가격 : {trans.transPrice}원
              </Box>
              <FormControl maxW="200px" bg={"white"} mt={4}>
                <Flex>
                  <FormLabel fontSize={"1rem"}>인원 : </FormLabel>
                  <NumberInput
                    w={"150px"}
                    max={50}
                    min={1}
                    defaultValue={1}
                    onChange={handleChange}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </FormControl>

              <Box w={"200px"} h={"80px"} bg={"#f3eeee"} mt={4}>
                <Flex>
                  <Box>출발일자 : </Box>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </Flex>
              </Box>
              <Box w={"200px"} h={"80px"} bg={"#f3eeee"} mt={4}>
                <Flex>
                  {trans.transAddress != null ? (
                    <Box>출발지 : {trans.transAddress}</Box>
                  ) : (
                    <Box>주소가 없는 데이터 입니다.</Box>
                  )}
                </Flex>
              </Box>
              <Flex justifyContent={"space-between"} mt={4}>
                <Button w={"165px"}>바로결제</Button>
                <Button w={"165px"}>장바구니</Button>
              </Flex>
              <TransLikeContainer
                transLikeState={transLikeState}
                onClick={handleLikeClick}
              />
            </CardBody>
          </Card>
        </Flex>
        <Box w={"100%"} bg={"#d9d9d9"} mt={10} mb={20}>
          상품 상세 이미지 및, 설명
          {trans.contentImages != null ? (
            <>
              {trans.contentImages.map((file) => (
                <Image src={file.url} key={file.id} />
              ))}
            </>
          ) : (
            <Box>빈값</Box>
          )}
          <Box> {trans.transContent}</Box>
        </Box>
      </Box>
    </Center>
  );
}
