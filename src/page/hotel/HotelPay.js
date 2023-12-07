import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Image,
  Divider,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useToast,
  Center,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Tab,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  extendTheme,
  ChakraProvider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Checkbox,
  Img,
  CardFooter,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function HotelPay() {
  const [hotel, setHotel] = useState({});

  const { id } = useParams();
  const toast = useToast();

  const [member, setMember] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/hotel/pay/${id}`)
      .then((response) => {
        setHotel(response.data);
      })
      .catch(() => {
        toast({
          description: "해당 호텔 정보 불러오기 실패",
          status: "error",
        });
      });
  }, []);

  const theme = extendTheme({
    styles: {
      global: {
        th: {
          textAlign: "center",
        },
      },
    },
  });

  const [emailDomain, setEmailDomain] = useState(""); // 상태 추가

  // ---------- 이메일 직접입력 또는 네이버 다음 등 버튼 ---------
  const handleDomainClick = (domain) => {
    setEmailDomain(domain);
  };

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

  return (
    <ChakraProvider theme={theme}>
      <Center m={20}>
        <Card w={"75%"}>
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
                    <Th>룸타입</Th>
                    <Th>옵션</Th>
                    <Th>이용일자</Th>
                    <Th>가격</Th>
                  </Tr>
                </Thead>

                {/* TODO :결제 한 상품 끌고와야함 */}
                <Tbody borderBottom={"1px solid #f5f6f6"}>
                  <Tr>
                    <Th>호텔</Th>
                    <Th>이미지</Th>
                    <Th>금호리조트</Th>
                    <Th>스탠다드더블</Th>
                    <Th>RoomOnly</Th>
                    <Th>
                      체크인 : 23년 12월 07일 (목) 체크아웃 : 23년 12월 08일
                      (금) 총 : 1박 / 1실
                    </Th>
                    <Th>176,000원</Th>
                  </Tr>
                </Tbody>
              </Table>
            </FormControl>

            {/* 안내사항 */}
            <FormControl mt={20}>
              <FormLabel
                border={"1px solid #f5f6f6"}
                background={"#f5f6f8"}
                h={"100px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                ·영업시간 종료 후, 또는 토 · 일 법정공휴일은 휴무로 예약이
                불가능 할 수 있습니다.
                <br />
                ·당일예약이 불가할 수 있으며 담당자가 확인 후 연락 드리겠습니다.
              </FormLabel>
            </FormControl>

            {/* 예약자 정보 */}
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
                <Input ml={5} mt={2} w={400} />
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
                  <Input ml={5} mt={2} w={200} />
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
                  <Input mt={2} w={200} value={emailDomain} />
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      background={"white"}
                      border={"1px solid #ededed"}
                      ml={"10px"}
                      mt="8px"
                    >
                      {emailDomain ? emailDomain : "직접입력"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleDomainClick("")}>
                        직접입력
                      </MenuItem>
                      <MenuItem onClick={() => handleDomainClick("naver.com")}>
                        naver.com
                      </MenuItem>
                      <MenuItem onClick={() => handleDomainClick("gmail.com")}>
                        gmail.com
                      </MenuItem>
                      <MenuItem onClick={() => handleDomainClick("daum.net")}>
                        daum.net
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
                  <Input ml={5} mt={2} w={100} />
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
                  <Input mt={2} w={100} />
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
                  <Input mt={2} w={100} />
                </Flex>
              </Flex>
            </FormControl>

            {/* 이용자 정보 */}
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
                <Input ml={5} mt={2} w={400} />
                <Checkbox ml={3} />
                <span
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    style={{
                      fontSize: "12px",
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
                  <Input ml={5} mt={2} w={100} />
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
                  <Input mt={2} w={100} />
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
                  <Input mt={2} w={100} />
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
                  w={"100px"}
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

            {/* 결제정보 */}

            <FormControl mt={20}>
              <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                결제 정보
              </FormLabel>
            </FormControl>

            <FormControl
              borderTop={"1px solid black"}
              borderBottom={"1px solid #ededed"}
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
                  fontSize={"13px"}
                >
                  결제수단
                </FormLabel>
                <Flex>
                  {/* 신용카드 */}
                  <Button
                    border={"1px solid #c3c3c3"}
                    fontSize={"13px"}
                    background={"white"}
                    ml={5}
                    mt={4}
                    w={"130px"}
                    h={"30px"}
                  >
                    신용카드
                  </Button>

                  {/* 네이버페이 */}
                  <Button
                    border={"1px solid #c3c3c3"}
                    background={"white"}
                    ml={5}
                    mt={4}
                    w={"130px"}
                    h={"30px"}
                  >
                    <Img src="https://www.gagopatour.com/img/ico-default-naverpay.png" />
                  </Button>

                  {/* 카카오페이 */}
                  <Button
                    border={"1px solid #c3c3c3"}
                    background={"white"}
                    ml={5}
                    mt={4}
                    w={"130px"}
                    h={"30px"}
                  >
                    <Img
                      src="https://www.gagopatour.com/img/kakao.png"
                      h={"20px"}
                    />
                  </Button>
                </Flex>
              </Flex>
            </FormControl>

            <FormControl mt={20}>
              <Flex>
                <FormLabel fontSize={"30px"} fontWeight={"bold"}>
                  최종 결제 금액
                  <span style={{ marginLeft: "5px", color: "#3e71da" }}>
                    <Box>176,000원</Box>
                  </span>
                  <Button
                    w={"150px"}
                    h={"50px"}
                    mt={"20px"}
                    background={"#4095D9"}
                    color={"white"}
                  >
                    결제하기
                  </Button>
                </FormLabel>
              </Flex>
            </FormControl>
          </CardBody>
        </Card>
      </Center>
    </ChakraProvider>
  );
}
