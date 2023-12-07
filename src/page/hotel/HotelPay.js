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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

export function HotelPay() {
  const [hotel, setHotel] = useState({});
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const { id } = useParams();
  const toast = useToast();

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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleReserveClick = () => {
    // 예약 로직 추가
    alert(`예약이 완료되었습니다!`);
  };

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

  const handleDomainClick = (domain) => {
    setEmailDomain(domain);
  };

  return (
    <ChakraProvider theme={theme}>
      <Center m={20}>
        <Card w={"80%"}>
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

            <FormControl mt={20}>
              <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                예약자 정보
              </FormLabel>
            </FormControl>

            <FormControl
              borderTop={"1px solid black"}
              borderBottom={"1px solid black"}
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
                  예약자명
                </FormLabel>
                <Input ml={5} mt={2} w={400} />
              </Flex>

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

              <Flex>
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

            <FormControl mt={20}>
              <FormLabel fontSize={"20px"} fontWeight={"bold"}>
                이용자 정보
              </FormLabel>
            </FormControl>
          </CardBody>
        </Card>
      </Center>
    </ChakraProvider>
  );
}
