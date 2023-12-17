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
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios, { get } from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { LoginContext } from "../../../component/LoginProvider";

export function ReservationList() {
  const { fetchLogin, isAdmin } = useContext(LoginContext);

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

  // ----------------------- 예약번호 문자 발송 -----------------------
  const handleSendSMS = async (phoneNumber) => {
    try {
      const response = await axios.post(
        "/api/member/sendSMS3?userPhoneNumber=" + phoneNumber,
        {
          messageContent: messageContent,
        },
      );
      console.log("response : ", response);
      // 성공 시 처리 로직
    } catch (error) {
      console.error("에러 : ", error);
      // 실패 시 처리 로직
    }
  };

  return (
    <Center m={10}>
      <Card w={"80%"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              <Text
                fontSize={"2.2rem"}
                fontWeight={"bold"}
                textAlign={"center"}
                m={5}
              >
                <Text>항공 / 버스 예약 관리</Text>
              </Text>
            </Tab>
            <Tab>
              <Text
                fontSize={"2.2rem"}
                fontWeight={"bold"}
                textAlign={"center"}
                m={5}
              >
                <Text>숙소 예약 관리</Text>
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CardBody>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>주문번호</Th>
                      <Th>아이디</Th>
                      <Th>상품명 </Th>
                      <Th>출발시간 </Th>
                      <Th>도작시간 </Th>
                      <Th>요청사항</Th>
                      <Th>연락처</Th>
                      <Th>예약번호</Th>
                      <Th>가격</Th>
                      {/*<Th>상태</Th>*/}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {toss.map((toss) => (
                      <Tr key={toss.id} _hover={{ cursor: "pointer" }}>
                        <Td>{toss.tossid}</Td>
                        <Td>{toss.userId}</Td>
                        <Td>{toss.transTitle}</Td>
                        <Td>{toss.transStartDate}</Td>
                        <Td>{toss.transEndDate}</Td>
                        <Td>{toss.request}</Td>
                        <Td>{toss.phoneNumber}</Td>
                        {isAdmin() && (
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
                              <Button
                                onClick={() => handleSendSMS(toss.phoneNumber)}
                              >
                                확인
                              </Button>
                            </Flex>
                          </Td>
                        )}

                        {isAdmin() || (
                          <Td>
                            <Flex gap={2}>
                              <Input
                                readOnly
                                type="text"
                                value={""}
                                placeholder="관리자가 승인하면 예약번호가 발생됩니다."
                              />
                            </Flex>
                          </Td>
                        )}

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
