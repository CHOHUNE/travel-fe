import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faHeart } from "@fortawesome/free-solid-svg-icons";

function TransLikeContainer({ transLikeState, onClick }) {
  if (transLikeState === null) {
    return <Spinner />;
  }
  return (
    <Flex gap={2}>
      <Button onClick={onClick}>찜하기</Button>
      <Button variant={"ghost"} onClick={onClick}>
        {transLikeState.transLikeState && (
          <FontAwesomeIcon icon={faHeart} style={{ color: "#f05656" }} />
        )}
        {transLikeState.transLikeState || (
          <FontAwesomeIcon icon={faHeart} color={"gray"} />
        )}
        <Text ml={1}>{transLikeState.transLikeCount}</Text>
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
      <Box mt={2} w={"80%"} key={trans.tid}>
        <Box alignItems="center">
          <Flex justifyContent={"flex-end"} gap={2}>
            <Button
              w={"130px"}
              h={"30px"}
              onClick={() => navigate("/transport/edit/" + trans.tid)}
            >
              수송 상품 수정
            </Button>
            <Button w={"130px"} h={"30px"} onClick={handleTransDelete}>
              수송 상품 삭제
            </Button>
          </Flex>
        </Box>

        {/**/}
        <Card
          direction={{ base: "column" }}
          overflow="hidden"
          variant="outline"
          // mt={2}
          w={"95%"}
          ml={"2.5%"}
        >
          <Flex gap={3} mt={2}>
            {trans.mainImage != null ? (
              <Image
                src={trans.mainImage.url}
                objectFit="cover"
                h={"100%"}
                w={"65%"}
                ml={2}
                mb={2}
                borderRadius={10}
              />
            ) : (
              <Box>빈값</Box>
            )}

            <CardBody
              w={"25%"}
              mr={2}
              mb={2}
              borderRadius={10}
              border={"1px solid #ced8de"}
            >
              <FormControl
                // bg={"#f3eeee"}
                w={"90%"}
                ml={"5%"}
                h={"100px"}
                lineHeight={"100px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <FormLabel ml={2}>
                  [{trans.transStartLocation}]&nbsp;
                  <FontAwesomeIcon icon={faAnglesRight} />
                  &nbsp; [{trans.transArriveLocation}] &nbsp;{trans.transTitle}
                </FormLabel>
              </FormControl>
              <FormControl
                w={"90%"}
                h={"50px"}
                // bg={"#f3eeee"}
                ml={"5%"}
                mt={2}
                lineHeight={"50px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <FormLabel ml={2}>가격 : {trans.transPrice}원</FormLabel>
              </FormControl>
              <FormControl
                w={"90%"}
                h="40px"
                bg={"white"}
                mt={4}
                ml="5%"
                lineHeight={"40px"}
              >
                <Flex>
                  <FormLabel fontSize={"1rem"} ml={2}>
                    인원 :{" "}
                  </FormLabel>
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

              <FormControl
                w={"90%"}
                h="40px"
                bg={"white"}
                mt={4}
                ml="5%"
                lineHeight={"40px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <Flex>
                  <FormLabel w={"40%"} ml={2}>
                    출발일자 :
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                  />
                </Flex>
              </FormControl>
              <FormControl
                w={"90%"}
                h="40px"
                bg={"white"}
                mt={4}
                ml="5%"
                lineHeight={"40px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <Flex>
                  <FormLabel ml={2}>위치 : </FormLabel>
                  {trans.transAddress != null ? (
                    <Box>{trans.transAddress}</Box>
                  ) : (
                    <Box>주소가 없는 데이터 입니다.</Box>
                  )}
                </Flex>
              </FormControl>
              <FormControl
                w={"90%"}
                h="40px"
                bg={"white"}
                mt={4}
                ml="5%"
                lineHeight={"40px"}
              >
                <Flex justifyContent={"space-between"} mt={4} gap={"2%"}>
                  <Button w={"39%"}>바로결제</Button>
                  <TransLikeContainer
                    w={"49%"}
                    transLikeState={transLikeState}
                    onClick={handleLikeClick}
                  />
                </Flex>
              </FormControl>
            </CardBody>
          </Flex>
        </Card>
        {/**/}
        <Card w={"90%"} mt={3} mb={20} ml="5%">
          <CardBody>
            {trans.contentImages != null ? (
              <>
                {trans.contentImages.map((file) => (
                  <Image
                    src={file.url}
                    key={file.id}
                    w={"90%"}
                    ml={"5%"}
                    mt={2}
                  />
                ))}
              </>
            ) : (
              <Box>빈값</Box>
            )}
          </CardBody>
          <CardFooter>
            <FormControl
              w={"90%"}
              mt={5}
              mb={10}
              ml="5%"
              border={"1px solid #ced8de"}
              borderRadius={10}
            >
              <FormLabel ml={2} mt={2}>
                상품 설명
              </FormLabel>
              <Box ml={2} mt={2} mb={2}>
                {trans.transContent}
              </Box>
            </FormControl>
          </CardFooter>
        </Card>
      </Box>
    </Center>
  );
}
