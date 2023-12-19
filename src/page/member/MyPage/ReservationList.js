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
  ModalFooter,
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
  useToast,
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
import { Buffer } from "buffer";
export function ReservationList() {
  const { fetchLogin, isAdmin } = useContext(LoginContext);

  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [transToss, setTransToss] = useState([]);
  const [hotelToss, setHotelToss] = useState([]);

  const [messageContent, setMessageContent] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState("");

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedForCancellation, setSelectedForCancellation] = useState(null);

  const [isCancelModalOpen2, setIsCancelModalOpen2] = useState(false);
  const [selectedForCancellation2, setSelectedForCancellation2] =
    useState(null);

  const toast = useToast();

  // let clientID = process.env.REACT_APP_CLIENT_KEY;
  // let secretKey = process.env.REACT_APP_SECRET_KEY;
  //
  // let encodedCredentials = Buffer.from(clientID + ":" + secretKey).toString(
  //   "base64",
  // );

  // let authorizationHeader = "Basic " + encodedCredentials;

  // 키 찾는중
  const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
  const secretKey = apiSecretKey;
  const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

  useEffect(() => {
    axios.get("/api/toss/id/" + params.get("userId")).then((response) => {
      setTransToss(response.data.transToss);
      setHotelToss(response.data.hotelToss);
    });
  }, [location]);

  // 문자 발송 및 DB에 예약번호 저장 ------------ 운송상품용
  const handleConfirmation = async (
    tossId,
    realUserPhoneNumber,
    messageContent,
  ) => {
    try {
      // 문자 발송 처리
      const smsResponse = await axios.post(
        `/api/member/sendSMS3?userPhoneNumber=${realUserPhoneNumber}`,
        {
          messageContent,
        },
      );
      toast({
        description: "예약번호 발송되었습니다.",
        status: "success",
      });

      // DB에 예약번호 저장
      const saveResponse = await axios.put(
        `/api/toss/sendAndSave?tossId=${tossId}&reservNumber=${messageContent}`,
      );
      console.log("DB 저장 성공: ", saveResponse);
    } catch (error) {
      console.error("처리 에러: ", error);
    }
  };

  // 문자 발송 및 DB에 예약번호 저장 ------------ 호텔상품용
  const handleConfirmation2 = async (
    hotelTossId,
    cellPhoneNumber,
    messageContent2,
  ) => {
    try {
      // 문자 발송 처리
      const smsResponse = await axios.post(
        `/api/member/sendSMS4?userPhoneNumber=${cellPhoneNumber}`,
        {
          messageContent: messageContent2,
        },
      );
      toast({
        description: "예약번호 발송되었습니다.",
        status: "success",
      });

      // DB에 예약번호 저장
      const saveResponse = await axios.put(
        `/api/toss/sendAndSave2?hotelTossId=${hotelTossId}&reservNumber=${messageContent2}`,
      );
      console.log("DB 저장 성공: ", saveResponse);
    } catch (error) {
      console.error("처리 에러: ", error);
    }
  };

  const handleIconClick = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  // -------------------- 결제 취소 -------------------
  const handleCancelClick = (reservation) => {
    // 결제 취소 로직 실행
    // 결제 취소 시 필요 데이터 입니다.
    const requestData = {
      orderId: reservation.orderId,
      amount: reservation.amount,
      paymentKey: reservation.paymentKey,
    };

    // 실질적 결제 취소 로직
    var options = {
      method: "POST",
      url: `https://api.tosspayments.com/v1/payments/${requestData.paymentKey}/cancel`,
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      data: { cancelReason: "고객이 취소를 원함" },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  function handleCancelClick2(h) {
    setSelectedForCancellation2(h);
    setIsCancelModalOpen2(true);
  }

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
                      <Th>예약상태</Th>
                      {/*<Th>상태</Th>*/}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {transToss.map((t) => (
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
                            <></>
                          )}
                        </Td>
                        <Td>{t.realUserPhoneNumber}</Td>
                        {isAdmin() && (
                          <Td>
                            <Flex gap={2}>
                              <Input
                                type="text"
                                fontSize={"12px"}
                                value={t.messageContent || t.reservNumber}
                                onChange={(e) =>
                                  setTransToss(
                                    transToss.map((item) =>
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
                                  handleConfirmation(
                                    t.tossId,
                                    t.realUserPhoneNumber,
                                    t.messageContent,
                                  )
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
                              {t.reservNumber !== null ? (
                                <Input
                                  readOnly
                                  type="text"
                                  value={t.reservNumber}
                                  placeholder="관리자가 승인하면 예약번호가 발생됩니다."
                                />
                              ) : (
                                <Box></Box>
                              )}
                            </Flex>
                          </Td>
                        )}
                        <Td>{parseInt(t.amount).toLocaleString("ko-KR")}원</Td>
                        <Td>
                          {t.reservNumber !== null ? (
                            <Text color={"blue"}>예약완료</Text>
                          ) : (
                            <Text>예약접수</Text>
                          )}
                        </Td>
                        {isAdmin() && (
                          <Td>
                            {t.cancels === null ? (
                              <Button
                                color={"red"}
                                onClick={() => handleCancelClick(t)}
                              >
                                취소
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Td>
                        )}

                        {isAdmin() || (
                          <Td>
                            <Button
                              color={"red"}
                              onClick={() => handleCancelClick(t)}
                            >
                              취소요청
                            </Button>
                          </Td>
                        )}
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
                      <Th>연락처</Th>
                      <Th>예약번호</Th>
                      <Th>가격</Th>
                      <Th>상태</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hotelToss.map((h) => (
                      <Tr key={h.hotelTossId} _hover={{ cursor: "pointer" }}>
                        <Td>{h.hotelTossId}</Td>
                        <Td>{h.hotelName}</Td>
                        <Td>{h.checkinDate}</Td>
                        <Td>{h.checkoutDate}</Td>
                        <Td>{h.plusMessage}</Td>
                        <Td>{h.cellPhoneNumber}</Td>
                        {isAdmin() && (
                          <Td>
                            <Flex gap={2}>
                              <Input
                                fontSize={"13px"}
                                type="text"
                                value={h.messageContent2 || h.reservNumber}
                                onChange={(e) =>
                                  setHotelToss(
                                    hotelToss.map((item) =>
                                      item.hotelTossId === h.hotelTossId
                                        ? {
                                            ...h,
                                            messageContent2: e.target.value,
                                          }
                                        : item,
                                    ),
                                  )
                                }
                                placeholder="예약번호 입력"
                              />
                              <Button
                                onClick={() =>
                                  handleConfirmation2(
                                    h.hotelTossId,
                                    h.cellPhoneNumber,
                                    h.messageContent2,
                                  )
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
                              {h.reservNumber !== null ? (
                                <Input
                                  readOnly
                                  type="text"
                                  value={h.reservNumber}
                                  placeholder="관리자가 승인하면 예약번호가 발생됩니다."
                                />
                              ) : (
                                <Box></Box>
                              )}
                            </Flex>
                          </Td>
                        )}

                        <Td>{h.reservNumber}</Td>
                        <Td>{parseInt(h.amount).toLocaleString("ko-KR")}원</Td>
                        <Td>
                          {h.reservNumber !== null ? (
                            <Text color={"blue"}>예약완료</Text>
                          ) : (
                            <Text>예약접수</Text>
                          )}
                        </Td>
                        {isAdmin() && (
                          <Td>
                            <Button
                              color={"red"}
                              onClick={() => handleCancelClick2(h)}
                            >
                              취소
                            </Button>
                          </Td>
                        )}

                        {isAdmin() || (
                          <Td>
                            <Button
                              color={"red"}
                              onClick={() => handleCancelClick2(h)}
                            >
                              취소요청
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </TabPanel>
          </TabPanels>

          {/* ---------------------- 운송상품 고객 취소요청 모달 창 ---------------------- */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>요청사항 상세</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{selectedRequest}</ModalBody>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>예약 취소 요청</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontWeight={"700"} fontFamily={"GmarketSansMedium"}>
                <Text>
                  예약 번호: {selectedForCancellation?.reservNumber}
                  <Box>
                    취소요청 해주시면 관리자 승인에 따라 취소처리 될 예정이며
                    <br />
                    전액 환불됩니다.
                  </Box>
                  <br />
                  <Box>이용해주셔서 감사합니다.</Box>
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsCancelModalOpen(false)}
                >
                  닫기
                </Button>
                <Button bg={"red"} color={"white"}>
                  취소요청
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* ---------------------- 호텔상품 고객 취소요청 모달 창 ---------------------- */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>요청사항 상세</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{selectedRequest}</ModalBody>
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isCancelModalOpen2}
            onClose={() => setIsCancelModalOpen2(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>예약 취소 요청</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontWeight={"700"} fontFamily={"GmarketSansMedium"}>
                <Text>
                  예약 번호: {selectedForCancellation2?.reservNumber}
                  <Box>
                    취소요청 해주시면 관리자 승인에 따라 취소처리 될 예정이며
                    <br />
                    전액 환불됩니다.
                  </Box>
                  <br />
                  <Box>이용해주셔서 감사합니다.</Box>
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsCancelModalOpen2(false)}
                >
                  닫기
                </Button>
                <Button bg={"red"} color={"white"}>
                  취소요청
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Tabs>
      </Card>
    </Center>
  );
}
