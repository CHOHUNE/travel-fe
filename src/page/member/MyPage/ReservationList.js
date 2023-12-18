import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  useDisclosure,
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
import { InfoIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

export function ReservationList() {
  const { fetchLogin, isAdmin } = useContext(LoginContext);

  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [toss, setToss] = useState([]);

  const [reservationNumber, setReservationNumber] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState(""); // 구매한 사용자의 핸드폰 번호 상태

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState("");

  useEffect(() => {
    axios.get("/api/toss/id/" + params.get("userId")).then((response) => {
      setToss(response.data);
    });
  }, [location]);

  // ----------------------- 예약번호 문자 발송 -----------------------
  const handleSendSMS = async (realUserPhoneNumber) => {
    try {
      const response = await axios.post(
        "/api/member/sendSMS3?userPhoneNumber=" + realUserPhoneNumber,
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

  const handleIconClick = (request) => {
    setSelectedRequest(request);
    onOpen();
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
                        <Td textAlign={"center"}>
                          {toss.request ? (
                            <Icon
                              as={InfoIcon}
                              onClick={() => handleIconClick(toss.request)}
                              cursor="pointer"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faClipboard}
                              onClick={() => handleIconClick(toss.request)}
                              cursor="pointer"
                            />
                          )}
                        </Td>
                        <Td>{toss.realUserPhoneNumber}</Td>
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
                                onClick={() =>
                                  handleSendSMS(toss.realUserPhoneNumber)
                                }
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
                        <Td>
                          {parseInt(toss.amount).toLocaleString("ko-KR")}원
                        </Td>
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
                      <Th>체크인 </Th>
                      <Th>체크아웃 </Th>
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
          {/* 모달 창 */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>요청사항 상세</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{selectedRequest}</ModalBody>
            </ModalContent>
          </Modal>
        </Tabs>
      </Card>
    </Center>
  );
}
