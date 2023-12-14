import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  FormHelperText,
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
import { faAnglesRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

function TransLikeContainer({ transLikeState, onClick }) {
  const toast = useToast();
  if (transLikeState === null) {
    return <Spinner />;
  }

  return (
    <Flex gap={2}>
      <Button onClick={onClick}>찜하기</Button>
      <Button variant={"ghost"}>
        {transLikeState.like && (
          <FontAwesomeIcon icon={faHeart} style={{ color: "#f05656" }} />
        )}
        {transLikeState.like || (
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
  const [transReservDay, setTransReservDay] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  const { isAuthenticated, isAdmin } = useContext(LoginContext);

  const handleChange = (value) => setValue(value);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/transport/id/" + id)
      .then((response) => setTrans(response.data));
  }, [id]);

  useEffect(() => {
    axios
      .get("/api/transLike/transport/" + id)
      .then((response) => setTransLikeState(response.data));
  }, [id]);

  if (trans === null) {
    return <Spinner />;
  }

  // 시작일 연월일로 보이게 설정 ------------------------------------------------
  const transStartDate = trans.transStartDate;
  const startDate = new Date(transStartDate);
  const startYear = startDate.getFullYear();
  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const startDay = startDate.getDate().toString().padStart(2, "0");
  const startFormat = startYear + "년 " + startMonth + "월 " + startDay + "일";

  // 마감일 연월일로 보이게 설정 ------------------------------------------------
  const transEndDate = trans.transEndDate;
  const endDate = new Date(transEndDate);
  const endYear = endDate.getFullYear();
  const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
  const EndDay = endDate.getDate().toString().padStart(2, "0");
  const endFormat = endYear + "년 " + endMonth + "월 " + EndDay + "일";

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
    console.log("handle like click");
    console.log(transLikeState);
    if (transLikeState.like === true) {
      axios
        .post("/api/transLike", { transId: trans.tid })
        .then((response) => {
          setTransLikeState(response.data);
          toast({
            description: "찜 목록에서 삭제가 되었습니다.",
            status: "error",
          });
        })
        .catch(() => {
          toast({
            description: "로그인 해주세요 ",
            colorScheme: "orange",
          });
        });
    } else if (transLikeState.like === false) {
      axios
        .post("/api/transLike", { transId: trans.tid })
        .then((response) => {
          setTransLikeState(response.data);
          toast({
            description: "찜 목록에 추가 되었습니다.",
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
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <FormLabel ml={2} pt={"25"}>
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
                h="60px"
                bg={"white"}
                mt={4}
                ml="5%"
                border={"1px solid #ced8de"}
                borderRadius={10}
              >
                <Box ml={2}>
                  시작일 : {startFormat}
                  <br />
                  마감일 : {endFormat}
                </Box>
              </FormControl>

              {/*<FormControl*/}
              {/*  w={"90%"}*/}
              {/*  h="40px"*/}
              {/*  bg={"white"}*/}
              {/*  mt={4}*/}
              {/*  ml="5%"*/}
              {/*  lineHeight={"40px"}*/}
              {/*  border={"1px solid #ced8de"}*/}
              {/*  borderRadius={10}*/}
              {/*  overflow={"visible"}*/}
              {/*>*/}
              {/*  <Flex overflow={"visible"}>*/}
              {/*    <FormLabel w={"40%"} ml={2}>*/}
              {/*      출발일자 :*/}
              {/*    </FormLabel>*/}
              {/*    <DatePicker*/}
              {/*      value={null}*/}
              {/*      className="date-picker"*/}
              {/*      selected={null}*/}
              {/*      // onChange={handleStartDateChange}*/}
              {/*      selectsStart*/}
              {/*      startDate={null}*/}
              {/*      endDate={null}*/}
              {/*      isClearable={true}*/}
              {/*      placeholderText="출발일을 선택해 주세요"*/}
              {/*      dateFormat="yyyy년 MM월 dd일"*/}
              {/*      minDate={new Date()}*/}
              {/*    />*/}
              {/*  </Flex>*/}
              {/*</FormControl>*/}
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
                  <Button
                    w={"39%"}
                    onClick={() => navigate("/transport/pay/" + id)}
                  >
                    바로결제
                  </Button>
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
        {/*  */}
        <Card w={"95%"} ml={"2.5%"} h={"100px"} mt={4}>
          <Flex alignItems={"center"} height={"100%"} gap={2}>
            <Flex
              w={"20%"}
              h={"90%"}
              ml={5}
              alignItems={"center"}
              border={"1px solid #ced8de"}
              borderRadius={10}
            >
              <Box fontSize={14} fontWeight={"bold"} ml={2}>
                <Box fontSize={20}>상품 선택 기간</Box>
                {startFormat} 00시 부터
                <br />
                {endFormat} 00시 까지
              </Box>
            </Flex>

            <Flex
              w={"20%"}
              h={"90%"}
              ml={2}
              border={"1px solid #ced8de"}
              borderRadius={10}
            >
              <Box w={"20%"} alignItems={"center"} h={"100%"}>
                출발일자 :
              </Box>
              <DatePicker
                value={null}
                className="date-picker"
                selected={null}
                // onChange={handleStartDateChange}
                selectsStart
                startDate={null}
                endDate={null}
                isClearable={true}
                placeholderText="출발일을 선택해 주세요"
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date()}
              />
            </Flex>
          </Flex>
          <Box></Box>
        </Card>
        {/*  */}
        <Card w={"95%"} mt={3} mb={20} ml="2.5%">
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
