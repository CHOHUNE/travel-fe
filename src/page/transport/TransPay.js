import React, { useEffect, useState } from "react";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export function TransPay() {
  const [trans, setTrans] = useState({});

  const { id } = useParams();
  const toast = useToast();

  const navigate = useNavigate();

  const [member, setMember] = useState("");

  const [isChecked, setIsChecked] = useState(true);

  const [personName, setPersonName] = useState("");

  // 운송 상품에서 보낸 주소지, 예약일, 탑승객 수
  const location = useLocation();
  const transTotalPrice = location.state.transTotalPrice;
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

  useEffect(() => {
    axios
      .get(`/api/transport/pay/${id}`)
      .then((response) => {
        setTrans(response.data.trans);
        setMember(response.data.member);
      })
      .catch(() => {
        toast({
          description: "해당 호텔 정보 불러오기 실패",
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

  const [personAdult, setPersonAdult] = useState(""); // 성인 인원

  // ---------- 성인 인원선택 관련 ----------
  const handlePersonnelAdultClick = (person) => {
    setPersonAdult(person);
  };


  function handlePaymentClick(response) {
    navigate(`/PaymentPage/${id}`, {
      state: { id, amount: trans.transPrice },
    });
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
                    <Th>{trans.transPrice}원</Th>
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
                      ></Input>
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
                        />
                      </Flex>
                    </Flex>
                  </FormControl>
                </Box>

                {/* 이용자 정보 */}
                <Box w={"60%"}>
                  <FormControl mt={20}>
                    <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                      이용자 정보
                    </FormLabel>
                  </FormControl>

                  <FormControl
                    borderTop={"1px solid black"}
                    borderBottom={"2px solid #ededed"}
                  >
                    <Flex>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"200px"}
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
                    <Flex>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"200px"}
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
                          value={isChecked ? phoneNum1 : ""}
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
                          value={isChecked ? phoneNum2 : ""}
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
                          value={isChecked ? phoneNum3 : ""}
                        />
                      </Flex>
                    </Flex>

                    <Flex>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"200px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        이용인원
                      </FormLabel>
                      {/*<Input*/}
                      {/*  ml={5}*/}
                      {/*  mt={2}*/}
                      {/*  value={person}*/}
                      {/*  onChange={(e) => setPerson(e.target.value)}*/}
                      {/*/>*/}
                      <Flex>
                        <NumberInput
                          w={"100px"}
                          ml={5}
                          max={50}
                          min={1}
                          defaultValue={1}
                          value={person}
                          onChange={(e) => setPerson(e)}
                        >
                          <NumberInputField h={"100%"} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>{" "}
                        <Box>명</Box>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Flex>
                        <FormLabel
                          m={0}
                          background={"#f5f6f6"}
                          h={"60px"}
                          w={"200px"}
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
                          >
                            {personAdult ? personAdult : "1명"}
                          </MenuButton>

                          <MenuList>
                            <MenuItem
                              onClick={() => handlePersonnelAdultClick("1명")}
                            >
                              1명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelAdultClick("2명")}
                            >
                              2명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelAdultClick("3명")}
                            >
                              3명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelAdultClick("4명")}
                            >
                              4명
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Flex>

                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"88px"}
                        w={"200px"}
                        justifyContent="center"
                        display={"flex"}
                        alignItems={"center"}
                        fontSize={"14px"}
                      >
                        요청사항
                      </FormLabel>
                      <Textarea ml={5} mt={2} w={680} />
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
                          · 이용자 휴대폰번호 :{" "}
                        </FormLabel>
                        <Text
                          ml={"-16px"}
                          mt={"-3px"}
                          justifyContent="center"
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"16px"}
                        >
                          {isChecked ? member.phoneNumber : ""}
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
                          <Box textAlign={"right"}>{trans.transPrice}원</Box>
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
