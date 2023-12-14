import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

  const [isChecked, setIsChecked] = useState(false);

  const [personName, setPersonName] = useState("");

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
  let a = member.phoneNumber ? member.phoneNumber.slice(0, 3) : "";
  let b = member.phoneNumber ? member.phoneNumber.slice(3, 7) : "";
  let c = member.phoneNumber ? member.phoneNumber.slice(7) : "";

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
  const [personChild, setPersonChild] = useState(""); // 소인 인원

  // ---------- 성인 인원선택 관련 ----------
  const handlePersonnelAdultClick = (person) => {
    setPersonAdult(person);
  };

  // ---------- 소인 인원선택 관련 ----------
  const handlePersonnelChildClick = (child) => {
    setPersonChild(child);
  };

  function handlePaymentClick() {
    //id는 ttoss , transprice= transport에 있음
    axios
      .post("/api/toss/save", { id, amount: trans.transPrice })
      .then((response) => {
        console.log(response.data);
        navigate(`/PaymentPage/${id}`, {
          state: { id, amount: trans.transPrice },
        });
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
              </FormLabel>
              <Table>
                <Thead>
                  <Tr>
                    <Th>구분</Th>
                    <Th>이미지</Th>
                    <Th>상품명</Th>
                    <Th>경로</Th>
                    <Th>출발지 주소</Th>
                    <Th>이용일자</Th>
                    <Th>가격</Th>
                  </Tr>
                </Thead>

                {/* TODO :결제 한 상품 끌고와야함 */}
                <Tbody borderBottom={"1px solid #f5f6f6"}>
                  <Tr>
                    <Th>{trans.typeName}</Th>
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
                    <Th>출발일 : 23년 12월 07일 (목)</Th>
                    <Th>{trans.transPrice}</Th>
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
                        <Input ml={5} mt={2} w={100} value={a} />
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
                        <Input mt={2} w={100} value={b} />
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
                        <Input mt={2} w={100} value={c} />
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
                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"60px"}
                        w={"102px"}
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
                        value={isChecked ? (member ? member.name : "") : ""}
                        onChange={(e) => setPersonName(e.target.value)}
                      />
                      <Checkbox
                        ml={3}
                        value={isChecked}
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
                          value={isChecked ? a : ""}
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
                        <Input mt={2} w={100} value={isChecked ? b : ""} />
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
                        <Input mt={2} w={100} value={isChecked ? c : ""} />
                      </Flex>
                    </Flex>

                    <Flex>
                      {/* 성인 인원 선택 */}
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
                        <span
                          style={{
                            marginLeft: "12px",
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
                            성인
                          </Box>
                        </span>
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

                      {/* 소인 인원 선택 */}
                      <Flex>
                        <span
                          style={{
                            marginLeft: "12px",
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
                            소인
                          </Box>
                        </span>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            background={"white"}
                            border={"1px solid #ededed"}
                            mt={"8px"}
                            fontSize={"13px"}
                          >
                            {personChild ? personChild : "1명"}
                          </MenuButton>

                          <MenuList>
                            <MenuItem
                              onClick={() => handlePersonnelChildClick("1명")}
                            >
                              1명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelChildClick("2명")}
                            >
                              2명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelChildClick("3명")}
                            >
                              3명
                            </MenuItem>
                            <MenuItem
                              onClick={() => handlePersonnelChildClick("4명")}
                            >
                              4명
                            </MenuItem>
                          </MenuList>
                        </Menu>

                        {/* 기준인원/최대인원 관련 */}
                        <span
                          style={{
                            marginLeft: "3px",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "13px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                              color: "blue",
                            }}
                          >
                            기준 2인 / 최대 3인
                          </Box>
                        </span>

                        {/* 해당 인원 초과시 추가요금 안내 */}
                        <span
                          style={{
                            marginLeft: "3px",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            style={{
                              fontSize: "13px",
                              verticalAlign: "middle",
                              margin: "0 8px",
                              color: "#737182",
                            }}
                          >
                            기준인원 초과 시 추가 비용 발생
                          </Box>
                        </span>
                      </Flex>
                    </Flex>

                    <Flex borderBottom={"1px solid #ededed"}>
                      <FormLabel
                        m={0}
                        background={"#f5f6f6"}
                        h={"88px"}
                        w={"113px"}
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
                          {isChecked ? (member ? member.name : "") : ""}
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