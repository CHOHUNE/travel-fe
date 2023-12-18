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

  const [messageContent, setMessageContent] = useState("");

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
                    {toss.map((t) => (
                      <Tr key={t.tossId} _hover={{ cursor: "pointer" }}>
                        <Td>{t.tossId}</Td>
                        <Td>{t.userId}</Td>
                        <Td>{t.transTitle}</Td>
                        <Td>{t.transStartDay}</Td>
                        <Td textAlign={"center"}>
                          {t.request ? (
                            <Icon
                              as={InfoIcon}
                              onClick={() => handleIconClick(t.request)}
                              cursor="pointer"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faClipboard}
                              onClick={() => handleIconClick(t.request)}
                              cursor="pointer"
                            />
                          )}
                        </Td>
                        <Td>{t.realUserPhoneNumber}</Td>
                        {isAdmin() && (
                          <Td>
                            <Flex gap={2}>
                              <Input
                                type="text"
                                value={t.messageContent}
                                onChange={(e) =>
                                  // setMessageContent(e.target.value)
                                  setToss(
                                    toss.map((item) =>
                                      item.tossId === t.tossId
                                        ? {
                                            ...t,
                                            messageContent: e.target.value,
                                          }
                                        : item,
                                    ),
                                  )
                                }
                                placeholder="예약번호 입력"
                              />
                              <Button
                                onClick={() =>
                                  handleSendSMS(t.realUserPhoneNumber)
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
                        <Td>{parseInt(t.amount).toLocaleString("ko-KR")}원</Td>
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
