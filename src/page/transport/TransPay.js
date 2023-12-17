import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  ChakraProvider,
  Checkbox,
  extendTheme,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export function TransPay() {
  const [trans, setTrans] = useState({});
  // 고객 요청사항
  const [requested, setRequested] = useState("");

  const { id } = useParams();
  const toast = useToast();

  const navigate = useNavigate();

  // 예약자 휴대폰 번호
  const [member, setMember] = useState("");

  const [isChecked, setIsChecked] = useState(true);

  // 이용자 이름 설정
  const [personName, setPersonName] = useState("");
  // 이용자 휴대폰번호 설정
  const [personNumber1, setPersonNumber1] = useState("");
  const [personNumber2, setPersonNumber2] = useState("");
  const [personNumber3, setPersonNumber3] = useState("");
  const [personNumber, setPersonNumber] = useState("");

  useEffect(() => {
    setPersonNumber(`${personNumber1}-${personNumber2}-${personNumber3}`);
  }, [personNumber1, personNumber2, personNumber3]);

  // 운송 상품에서 보낸 주소지, 예약일, 탑승객 수
  const location = useLocation();
  const passenger = location.state.passenger;
  const [person, setPerson] = useState(passenger);

  // 예약시간 한글로 보이게 설정 시작 ------------------------------------------------
  const transReserveDay = location.state.transReserveDay;
  const reserveDate = new Date(transReserveDay);
  const reserveYear = reserveDate.getFullYear();
  const reserveMonth = (reserveDate.getMonth() + 1).toString().padStart(2, "0");
  const reserveDay = reserveDate.getDate().toString().padStart(2, "0");
  const reserveHour = reserveDate.getHours().toString().padStart(2, "0");
  const reserveMinute = reserveDate.getMinutes().toString().padStart(2, "0");
  const reserveFormat =
    reserveYear +
    "년 " +
    reserveMonth +
    "월 " +
    reserveDay +
    "일 " +
    reserveHour +
    "시 " +
    reserveMinute +
    "분";
  // 예약시간 한글로 보이게 설정 끝 ------------------------------------------------

  // 이용자 정보 입력 했을때에 일정 갯수 초과 하게 되면 다음 인풋으로 넘어가게 하기 시작 --------------------------
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  // 각 입력 필드의 onChange 핸들러
  const handleInputChange1 = (e) => {
    setPersonNumber1(e.target.value);
    if (e.target.value.length === 3) {
      inputRef2.current.focus();
    }
  };

  const handleInputChange2 = (e) => {
    setPersonNumber2(e.target.value);
    if (e.target.value.length === 4) {
      inputRef3.current.focus();
    }
  };

  const handleInputChange3 = (e) => {
    setPersonNumber3(e.target.value);
    // 여기서는 마지막 필드이므로 추가적인 포커스 이동이 필요하지 않습니다.
  };
  // 이용자 정보 입력 했을때에 일정 갯수 초과 하게 되면 다음 인풋으로 넘어가게 하기 끝 --------------------------

  useEffect(() => {
    axios
      .get(`/api/transport/pay/${id}`)
      .then((response) => {
        setTrans(response.data.trans);
        setMember(response.data.member);
      })
      .catch(() => {
        toast({
          description: "해당 운송상품 정보 불러오기 실패",
          status: "error",
        });
      });
  }, [id]);

  // ---------- 이메일 @ 기준으로 나누기 ---------
  let receiveEmail = member.email ? member.email.split("@") : ["", ""];
  let emailInput1 = receiveEmail[0];
  let emailInput2 = receiveEmail[1];

  // ---------- 핸드폰번호 수 기준으로 나누기 ---------
  let receivePhoneNumber = member.phoneNumber
    ? member.phoneNumber.split("-")
    : ["", "", ""];
  let phoneNum1 = receivePhoneNumber[0];
  let phoneNum2 = receivePhoneNumber[1];
  let phoneNum3 = receivePhoneNumber[2];

  const theme = extendTheme({
    styles: {
      global: {
        th: {
          textAlign: "center",
        },
      },
    },
  });

  function handlePaymentClick(response) {
    if (isChecked) {
      if (!member.name || !member.phoneNumber) {
        toast({
          description: "예약자 정보를 입력해 주세요.",
          status: "warning",
        });
      } else {
        navigate(`/PaymentPage/${id}`, {
          state: { id, amount: person * trans.transPrice, requested },
        });
      }
    } else {
      if (personName.length === 0) {
        toast({
          description: "이용자의 이름을 입력해 주세요.",
          status: "warning",
        });
      } else if (
        personNumber1.length === 0 ||
        personNumber2.length === 0 ||
        personNumber3.length === 0
      ) {
        toast({
          description: "이용자의 휴대폰 번호를 입력해 주세요.",
          status: "warning",
        });
      } else {
        navigate(`/PaymentPage/${id}`, {
          state: { id, amount: person * trans.transPrice, requested },
        });
      }
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Center m={20}>
        <Card w={"85%"}>
          <CardHeader borderBottom={"1px solid #f5f6f6"}>
            <Heading>예약/결제</Heading>
          </CardHeader>

          <CardBody>
            <FormControl>
              <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                상품정보
                <FormHelperText color={"gray"}>
                  해당 상품 금액은 1인당 가격으로 결제 되는 금액은 아래의 최종
                  결제 금액 에서 확인 부탁 드립니다.
                </FormHelperText>
              </FormLabel>
              <Table>
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>구분</Th>
                    <Th textAlign={"center"}>이미지</Th>
                    <Th textAlign={"center"}>상품명</Th>
                    <Th textAlign={"center"}>경로</Th>
                    <Th textAlign={"center"}>출발지 주소</Th>
                    <Th textAlign={"center"}>이용일자</Th>
                    <Th textAlign={"center"}>가격</Th>
                  </Tr>
                </Thead>

                {/* TODO :결제 한 상품 끌고와야함 */}
                <Tbody borderBottom={"1px solid #f5f6f6"}>
                  <Tr>
                    <Th>{trans.typeName === "air" ? "비행기" : "버스"}</Th>
                    <Th>
                      <Box w={"150px"}>
                        <Img src={trans.url} />
                      </Box>
                    </Th>
                    <Th>{trans.transTitle}</Th>
                    <Th>
                      {" "}
                      [{trans.transStartLocation}]&nbsp;
                      <FontAwesomeIcon icon={faAnglesRight} />
                      &nbsp; [{trans.transArriveLocation}]
                    </Th>
                    <Th>{trans.transAddress}</Th>
                    <Th>{reserveFormat}</Th>
                    <Th>
                      {parseInt(trans.transPrice).toLocaleString("ko-KR")}원
                    </Th>
                  </Tr>
                </Tbody>
              </Table>
            </FormControl>
            {/* 안내사항 */}
            <FormControl mt={20}>
              <FormLabel
                border={"1px solid #f5f6f6"}
                background={"#ffffff"}
                h={"100px"}
                display="flex"
                alignItems="center"
                justifyContent="left"
                textIndent={"20px"}
              >
                <Box>
                  <Box>
                    ·영업시간 종료 후, 또는 토 · 일 법정공휴일은 휴무로 예약이
                    불가능 할 수 있습니다.
                  </Box>
                  <br />
                  <Box mt={-5}>
                    ·당일예약이 불가할 수 있으며 담당자가 확인 후 연락
                    드리겠습니다.
                  </Box>
                </Box>
              </FormLabel>
            </FormControl>
            {/* 예약자 정보 */}
            <Flex>
              <Box w={"70%"}>
                <Box w={"90%"}>
                  <FormControl mt={20}>
                    <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                      예약자 정보
                    </FormLabel>
                  </FormControl>

                  <FormControl
                    borderTop={"1px solid black"}
                    borderBottom={"2px solid #ededed"}
                  >
                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        예약자명
                      </FormLabel>
                      <Input
                        _focus={{
                          boxShadow: "none",
                          borderColor: "transparent",
                        }}
                        ml={5}
                        mt={2}
                        w={400}
                        value={member ? member.name : ""}
                        readOnly
                      />
                    </Flex>

                    {/* 이메일 정보 */}
                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        이메일
                      </FormLabel>
                      <Flex>
                        <Input
                          ml={5}
                          mt={2}
                          w={200}
                          _focus={{
                            boxShadow: "none",
                            borderColor: "transparent",
                          }}
                          value={member ? emailInput1 : ""}
                          readOnly
                        />
                        <span
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                            }}
                          >
                            @
                          </Box>
                        </span>
                        <Input
                          mt={2}
                          w={200}
                          _focus={{
                            boxShadow: "none",
                            borderColor: "transparent",
                          }}
                          value={member ? emailInput2 : ""}
                          readOnly
                        />
                      </Flex>
                    </Flex>

                    {/* 휴대폰 정보 */}
                    <Flex>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        휴대폰번호
                      </FormLabel>
                      <Flex>
                        <Input
                          ml={5}
                          mt={2}
                          w={100}
                          value={phoneNum1}
                          _focus={{
                            boxShadow: "none",
                            borderColor: "transparent",
                          }}
                          readOnly
                        />
                        <span
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                            }}
                          >
                            -
                          </Box>
                        </span>
                        <Input
                          mt={2}
                          w={100}
                          value={phoneNum2}
                          _focus={{
                            boxShadow: "none",
                            borderColor: "transparent",
                          }}
                          readOnly
                        />
                        <span
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                            }}
                          >
                            -
                          </Box>
                        </span>
                        <Input
                          mt={2}
                          w={100}
                          value={phoneNum3}
                          _focus={{
                            boxShadow: "none",
                            borderColor: "transparent",
                          }}
                          readOnly
                        />
                      </Flex>
                    </Flex>
                  </FormControl>
                </Box>

                {/* 이용자 정보 */}
                <Box w={"90%"}>
                  <FormControl mt={20}>
                    <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                      이용자 정보
                    </FormLabel>
                  </FormControl>

                  <FormControl
                    borderTop={"1px solid black"}
                    borderBottom={"2px solid #ededed"}
                  >
                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        이용자명
                      </FormLabel>
                      <Input
                        ml={5}
                        mt={2}
                        w={400}
                        value={
                          isChecked ? (member ? member.name : "") : personName
                        }
                        onChange={(e) => setPersonName(e.target.value)}
                      />
                      <Checkbox
                        ml={3}
                        isChecked={isChecked}
                        value={isChecked}
                        defaultChecked
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <span
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          style={{
                            fontSize: "10px",
                            verticalAlign: "middle",
                            margin: "0 4px",
                          }}
                          onClick={() => setIsChecked(!isChecked)}
                        >
                          구매자와 이용자명이 동일합니다.
                        </Box>
                      </span>
                    </Flex>

                    {/* 휴대폰번호 정보 */}
                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        휴대폰번호
                      </FormLabel>
                      <Flex>
                        {/* -------- 휴대폰 인풋1 -------- */}
                        <Input
                          ref={inputRef1}
                          ml={5}
                          mt={2}
                          w={100}
                          maxLength={3}
                          value={isChecked ? phoneNum1 : personNumber1}
                          onChange={handleInputChange1}
                        />
                        <span
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                            }}
                          >
                            -
                          </Box>
                        </span>
                        {/* -------- 휴대폰 인풋2 -------- */}
                        <Input
                          ref={inputRef2}
                          mt={2}
                          w={100}
                          maxLength={4}
                          value={isChecked ? phoneNum2 : personNumber2}
                          onChange={handleInputChange2}
                        />
                        <span
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "16px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                            }}
                          >
                            -
                          </Box>
                        </span>
                        {/* -------- 휴대폰 인풋3 -------- */}
                        <Input
                          ref={inputRef3}
                          mt={2}
                          w={100}
                          maxLength={4}
                          value={isChecked ? phoneNum2 : personNumber3}
                          onChange={handleInputChange3}
                        />
                      </Flex>
                    </Flex>

                    <Flex>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        이용인원
                      </FormLabel>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          background={"white"}
                          border={"1px solid #ededed"}
                          mt={"8px"}
                          fontSize={"13px"}
                          value={person}
                          ml={5}
                        >
                          {person + "명"}
                        </MenuButton>

                        <MenuList>
                          <MenuItem onClick={() => setPerson(1)}>1명</MenuItem>
                          <MenuItem onClick={() => setPerson(2)}>2명</MenuItem>
                          <MenuItem onClick={() => setPerson(3)}>3명</MenuItem>
                          <MenuItem onClick={() => setPerson(4)}>4명</MenuItem>
                          <MenuItem onClick={() => setPerson(5)}>5명</MenuItem>
                          <MenuItem onClick={() => setPerson(6)}>6명</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>

                    <Flex
                      borderTop={"1px solid #ededed"}
                      borderBottom={"1px solid #ededed"}
                    >
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"95px"}
                        w={"100px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        요청사항
                      </FormLabel>
                      <Textarea
                        ml={5}
                        mt={2}
                        w={680}
                        mb={2}
                        value={requested}
                        placeholder={"요청 사항을 입력해 주세요."}
                        onChange={(e) => setRequested(e.target.value)}
                      />
                    </Flex>
                  </FormControl>
                </Box>
              </Box>

              {/* 결제정보 */}

              <Box w={"30%"} mt={10}>
                <FormControl
                  borderTop={"1px solid black"}
                  borderBottom={"2px solid #ededed"}
                  background={"#F2F3F6"}
                  mt={20}
                >
                  <Box h={"400px"}>
                    <Box
                      w={"80%"}
                      h={"130px"}
                      ml={"10%"}
                      mt={"10%"}
                      background={"white"}
                      textIndent={"10px"}
                    >
                      <Flex>
                        <FormLabel style={{ marginTop: "15px" }}>
                          · 예약자명 :
                        </FormLabel>
                        <Text
                          mt={"9px"}
                          ml={"-16px"}
                          justifyContent="center"
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                        >
                          {member ? member.name : ""}
                        </Text>
                      </Flex>

                      <Flex>
                        <FormLabel style={{ marginTop: "7px" }}>
                          · 이용자명 :
                        </FormLabel>
                        <Text
                          ml={"-16px"}
                          justifyContent="center"
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                        >
                          {isChecked ? (member ? member.name : "") : personName}
                        </Text>
                      </Flex>

                      <Flex>
                        <FormLabel
                          style={{ marginTop: "7px", marginBottom: "10px" }}
                        >
                          · 이용자 휴대폰번호 :
                        </FormLabel>
                        <Text
                          ml={"-16px"}
                          mt={"-3px"}
                          justifyContent="center"
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                        >
                          {isChecked ? member.phoneNumber : personNumber}
                        </Text>
                      </Flex>
                    </Box>
                    <Box
                      w={"80%"}
                      ml={"10%"}
                      mt={10}
                      borderTop={"1px solid #DDDDDD"}
                    >
                      <FormLabel mt={10} fontSize={"20px"} fontWeight={"bold"}>
                        최종 결제 금액
                        <span
                          style={{
                            marginTop: "10px",
                            marginLeft: "5px",
                            color: "#3e71da",
                          }}
                        >
                          <Box textAlign={"right"}>
                            {parseInt(person * trans.transPrice).toLocaleString(
                              "ko-KR",
                            )}
                            원
                          </Box>
                        </span>
                        <Button
                          w={"100%"}
                          h={"70px"}
                          mt={"20px"}
                          background={"#4095D9"}
                          color={"white"}
                          onClick={handlePaymentClick}
                        >
                          결제하기
                        </Button>
                      </FormLabel>
                    </Box>
                  </Box>
                </FormControl>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Center>
    </ChakraProvider>
  );
}
