import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios, { get } from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import * as PropTypes from "prop-types";

export function ReservationList() {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [toss, setToss] = useState([]);

  const [reservationNumber, setReservationNumber] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // 구매한 사용자의 핸드폰 번호 상태

  useEffect(() => {
    axios.get("/api/toss/id/" + params.get("userId")).then((response) => {
      setToss(response.data);
    });
  }, [location]);

  // ----------------------- 핸드폰번호 가져오기 -----------------------

  useEffect(() => {
    // 서버에서 사용자 정보를 가져오는 요청
    axios
      .get("/api/member?" + params.toString())
      .then((response) => {
        // 응답에서 사용자의 전화번호를 추출하여 상태에 저장
        const phoneNumber = response.data.phoneNumber; // response.data에 전화번호 필드가 있다고 가정
        setUserPhoneNumber(phoneNumber);
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는데 실패했습니다.", error);
        // 에러 핸들링 로직
      });
  }, [params]); // params가 변경될 때마다 이 useEffect가 실행됩니다.

  // ----------------------- 예약번호 문자 발송 -----------------------
  const handleSendSMS = async () => {
    try {
      const response = await axios.post("/api/member/sendSMS3", {
        userPhoneNumber: userPhoneNumber, // 구매한 사용자의 핸드폰 번호
        messageContent: messageContent, // Input 창에 입력된 메시지 내용
      });
      console.log(response);
      // 성공 시 처리 로직
    } catch (error) {
      console.error(error);
      // 실패 시 처리 로직
    }
  };

  return (
    <Center m={10}>
      <Card w={"80%"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              <CardHeader textAlign={"center"} m={5}>
                <Heading>항공 / 버스 예약 관리</Heading>
              </CardHeader>
            </Tab>
            <Tab>
              <CardHeader textAlign={"center"} m={5}>
                <Heading>호텔 예약 관리</Heading>
              </CardHeader>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardBody>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>상품명 </Th>
                      <Th>출발시간 </Th>
                      <Th>도작시간 </Th>
                      <Th>요청사항</Th>
                      <Th>예약번호</Th>
                      <Th>가격</Th>
                      {/*<Th>상태</Th>*/}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {toss.map((toss) => (
                      <Tr key={toss.id} _hover={{ cursor: "pointer" }}>
                        <Td>{toss.tossid}</Td>
                        <Td>{toss.transTitle}</Td>
                        <Td>{toss.transStartDate}</Td>
                        <Td>{toss.transEndDate}</Td>
                        <Td>{toss.request}</Td>
                        <Td>
                          <Flex gap={2}>
                            <Input
                              type="text"
                              value={messageContent}
                              onChange={(e) =>
                                setMessageContent(e.target.value)
                              }
                              placeholder="예약번호 입력"
                            />
                            <Button onClick={handleSendSMS}>확인</Button>
                          </Flex>
                        </Td>
                        <Td>{toss.amount}</Td>
                        {/*<Td>{toss.db 안만듬 }</Td>*/}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </TabPanel>
            <TabPanel>
              <CardBody>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>상품명 </Th>
                      <Th>체크 인 </Th>
                      <Th>체크 아웃 </Th>
                      <Th>요청사항</Th>
                      <Th>예약번호</Th>
                      <Th>가격</Th>
                      {/*<Th>상태</Th>*/}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/*{toss.map(() => (*/}
                    {/*  <Tr key={} _hover={{ cursor: "pointer" }}>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    <Td>{}</Td>*/}
                    {/*    /!*<Td>{toss.db 안만듬 }</Td>*!/*/}
                    {/*  </Tr>*/}
                    {/*))}*/}
                  </Tbody>
                </Table>
              </CardBody>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Center>
  );
}
