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
    <Flex w={"100%"} gap={2} justifyContent={"space-between"}>
      <Button
        w={"70%"}
        shadow={"1px 1px 3px 1px #dadce0"}
        _hover={{
          backgroundColor: "#ef5656",
          color: "whitesmoke",
          transition:
            "background 0.5s ease-in-out, color 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
          shadow: "1px 1px 3px 1px #dadce0 inset",
        }}
        onClick={onClick}
      >
        찜하기
      </Button>
      <Button
        variant={"ghost"}
        bg={"white"}
        _hover={{ backgroundColor: "white", cursor: "default" }}
      >
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
  const [passenger, setPassenger] = useState(1);
  const [trans, setTrans] = useState("");
  const [transLikeState, setTransLikeState] = useState(null);
  const [transReserveDay, setTransReserveDay] = useState("");
  const [transTotalPrice, setTransTotalPrice] = useState(0);
  const navigate = useNavigate();

  const toast = useToast();

  const { isAuthenticated, isAdmin } = useContext(LoginContext);

  const { id } = useParams();

  // --------------------- 최근 본 상품 ----------------------
  const saveTransToRecentViewed = (transData) => {
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    const transViewed = {
      ...transData,
      mainImgUrl: transData.mainImage
        ? transData.mainImage.url
        : "default-image-url", // 여기서 기본 이미지 URL을 설정합니다.
      type: "transport",
    };
    const updatedRecentViewed = [transViewed, ...recentViewed].slice(0, 5);
    localStorage.setItem("recentViewed", JSON.stringify(updatedRecentViewed));
  };

  useEffect(() => {
    axios.get("/api/transport/id/" + id).then((response) => {
      setTrans(response.data);
      // --------------------- 최근 본 상품 ----------------------
      saveTransToRecentViewed(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get("/api/transLike/transport/" + id)
      .then((response) => setTransLikeState(response.data));
  }, [id]);

  useEffect(() => {
    if (trans && trans.transPrice) {
      setTransTotalPrice(passenger * trans.transPrice);
    }
  }, [passenger, trans]);

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

  function handleReserveDayChange(e) {
    setTransReserveDay(e);
  }

  function handleChange(e) {
    setPassenger(e);
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
          border={"0px"}
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
              shadow={"1px 1px 3px 1px #dadce0"}
            >
              <FormControl
                // bg={"#f3eeee"}
                w={"90%"}
                ml={"5%"}
                h={"100px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
                mt={5}
                shadow={"1px 1px 3px 1px #dadce0 inset"}
              >
                <Flex h={"100%"} alignItems={"center"} ml={2}>
                  <Box
                    fontSize={16}
                    fontFamily={"GmarketSansMedium"}
                    fontWeight={"700"}
                  >
                    {trans.transTitle}
                  </Box>
                  {/*[{trans.transStartLocation}]&nbsp;*/}
                  {/*<FontAwesomeIcon icon={faAnglesRight} />*/}
                  {/*&nbsp; [{trans.transArriveLocation}]*/}
                </Flex>
              </FormControl>
              <FormControl
                // bg={"#f3eeee"}
                w={"90%"}
                ml={"5%"}
                h={"60px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
                mt={4}
                shadow={"1px 1px 3px 1px #dadce0 inset"}
              >
                <Flex h={"100%"} alignItems={"center"} ml={2}>
                  <Box
                    fontSize={16}
                    fontFamily={"GmarketSansMedium"}
                    fontWeight={"700"}
                  >
                    경로 : [{trans.transStartLocation}]&nbsp;
                    <FontAwesomeIcon icon={faAnglesRight} />
                    &nbsp; [{trans.transArriveLocation}]
                  </Box>
                </Flex>
              </FormControl>
              <FormControl
                w={"90%"}
                h={"60px"}
                // bg={"#f3eeee"}
                ml={"5%"}
                mt={4}
                lineHeight={"50px"}
                border={"1px solid #ced8de"}
                borderRadius={10}
                shadow={"1px 1px 3px 1px #dadce0 inset"}
              >
                <Flex
                  h={"100%"}
                  alignItems={"center"}
                  ml={2}
                  justifyContent={"space-between"}
                >
                  <Box
                    fontSize={16}
                    fontFamily={"GmarketSansMedium"}
                    fontWeight={"700"}
                  >
                    가격 : {trans.transPrice}원
                  </Box>
                  <Box mr={2} color={"gray"}>
                    1인당 가격
                  </Box>
                </Flex>
              </FormControl>

              <FormControl
                w={"90%"}
                h="80px"
                bg={"white"}
                mt={4}
                ml="5%"
                border={"1px solid #ced8de"}
                borderRadius={10}
                shadow={"1px 1px 3px 1px #dadce0 inset"}
              >
                <Flex h={"100%"} alignItems={"center"} ml={2}>
                  <Box
                    w={"30%"}
                    fontSize={16}
                    fontFamily={"GmarketSansMedium"}
                    fontWeight={"700"}
                  >
                    출발위치 :
                  </Box>
                  {trans.transAddress != null ? (
                    <Box
                      w={"70%"}
                      fontSize={16}
                      fontFamily={"GmarketSansMedium"}
                      fontWeight={"700"}
                    >
                      {trans.transAddress}
                    </Box>
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
                  <TransLikeContainer
                    transLikeState={transLikeState}
                    onClick={handleLikeClick}
                  />
                </Flex>
              </FormControl>
            </CardBody>
          </Flex>
        </Card>
        {/*  */}
        <Card
          bg={"whitesmoke"}
          w={"95%"}
          ml={"2.5%"}
          h={"100px"}
          mt={4}
          shadow={"xl"}
          position={"sticky"}
          top={5}
          zIndex={2}
          fontSize={14}
          fontFamily={"GmarketSansMedium"}
          fontWeight={"500"}
        >
          <Flex alignItems={"center"} height={"100%"} gap={2}>
            <Flex
              w={"18%"}
              h={"90%"}
              ml={5}
              alignItems={"center"}
              // border={"1px solid #ced8de"}
              borderRadius={10}
            >
              <Box fontSize={14} fontWeight={"bold"} ml={2}>
                <Box fontSize={20}>상품 선택 기간</Box>
                {startFormat} 00시 부터
                <br />
                {endFormat} 24시 까지
              </Box>
            </Flex>

            <Flex
              w={"27%"}
              h={"90%"}
              // border={"1px solid #ced8de"}
              borderRadius={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Box
                h={"100%"}
                fontSize={20}
                fontWeight={"bold"}
                ml={2}
                display={"flex"}
                alignItems={"center"}
                w={"30%"}
              >
                출발일자 :
              </Box>
              <DatePicker
                customInput={
                  <Input
                    w={"200px"}
                    h={"60px"}
                    fontWeight={"bold"}
                    fontSize={15}
                  />
                }
                fontSize="4"
                showTimeSelect
                className="date-picker"
                dateFormat="yy년 MM월 dd일 HH:mm"
                minDate={new Date(trans.transStartDate)}
                maxDate={new Date(trans.transEndDate)}
                value={transReserveDay}
                selected={transReserveDay}
                isClearable={true}
                placeholderText="예약일"
                onChange={handleReserveDayChange}
              />
            </Flex>

            <Flex
              w={"15%"}
              h={"90%"}
              // border={"1px solid #ced8de"}
              borderRadius={10}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <Box
                h={"100%"}
                fontSize={20}
                fontWeight={"bold"}
                display={"flex"}
                alignItems={"center"}
              >
                인원 :
              </Box>
              <NumberInput
                w={"100px"}
                max={50}
                min={1}
                defaultValue={1}
                value={passenger}
                onChange={handleChange}
              >
                <NumberInputField h={"60px"} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex
              w={"20%"}
              h={"90%"}
              ml={5}
              alignItems={"center"}
              // border={"1px solid #ced8de"}
              borderRadius={10}
            >
              <Box fontSize={14} fontWeight={"bold"} alignItems={"center"}>
                <Flex
                  fontSize={20}
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                >
                  <Box>총 금액 : </Box>
                  <Input
                    fontSize={14}
                    w={"45%"}
                    placeholder={trans.transPrice}
                    value={transTotalPrice}
                    onChange={() => {
                      setTransTotalPrice(passenger * trans.transPrice);
                    }}
                    // border={"0px"}
                  />
                  <Box>원</Box>
                </Flex>
              </Box>
            </Flex>
            <Button
              w={"11%"}
              h={"70%"}
              onClick={() => navigate("/transport/pay/" + id)}
              shadow={"1px 1px 3px 1px #dadce0"}
              _hover={{
                backgroundColor: "#216aa4",
                color: "whitesmoke",
                transition:
                  "background 0.5s ease-in-out, color 0.5s ease-in-out, box-shadow 0.5s ease-in-out",
                shadow: "1px 1px 3px 1px #dadce0 inset",
              }}
              bg={"white"}
              border={"1px solid whitesmoke"}
              fontSize={16}
              fontFamily={"GmarketSansMedium"}
              fontWeight={"700"}
            >
              바로결제
            </Button>
          </Flex>
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
