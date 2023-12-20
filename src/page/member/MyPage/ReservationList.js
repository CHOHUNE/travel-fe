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

  // 키 찾는중
  const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
  const secretKey = apiSecretKey;
  const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

  function updateList() {
    axios.get("/api/toss/id/" + params.get("userId")).then((response) => {
      setTransToss(response.data.transToss);
      setHotelToss(response.data.hotelToss);
    });
  }
  // ------------------- 새로고침 안하고 바로 문구 바뀌는 로직 -------------------
  useEffect(() => {
    updateList();
  }, [location]);

  // -------------------- 운송상품용 문자 발송 및 DB에 예약번호 저장 --------------------
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
    axios.put("/api/toss/updateTransReservStatus", {
      reservStatus: "예약완료",
      tossId: tossId,
    });
  };

  // -------------------- 호텔상품용 문자 발송 및 DB에 예약번호 저장 --------------------
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
    axios.put("/api/toss/updateHotelReservStatus", {
      reservStatus: "예약완료",
      hotelTossId: hotelTossId,
    });
  };

  const handleIconClickTrans = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  const handleIconClickHotel = (plusMessage) => {
    setSelectedRequest(plusMessage);
    onOpen();
  };

  // ----------------------- 운송 관리자 취소요청 로직 -----------------------
  const handleAmdinTransCancelClick = (reservation, e) => {
    e.stopPropagation();
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
        toast({
          description: "결제 취소 되었습니다.",
          status: "success",
        });
      })
      .catch(function (error) {
        toast({
          description: "결제 취소중 오류 발생하였습니다.",
          status: "error",
        });
      });

    axios
      .put("/api/toss/updateTransReservStatus", {
        reservStatus: "취소완료",
        tossId: reservation.tossId,
      })
      .finally(() => updateList());
  };

  // ----------------------- 운송 관리자 취소요청 로직 -----------------------
  const handleAmdinHotelCancelClick = (reservation, e) => {
    e.stopPropagation();
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
        toast({
          description: "결제 취소 되었습니다.",
          status: "success",
        });
      })
      .catch(function (error) {
        toast({
          description: "결제 취소중 오류 발생하였습니다.",
          status: "error",
        });
      });

    axios
      .put("/api/toss/updateHotelReservStatus", {
        reservStatus: "취소완료",
        hotelTossId: reservation.hotelTossId,
      })
      .finally(() => updateList());
  };

  // ----------------------- 운송 상품 고객 취소요청 로직 -----------------------
  function handleUserTransCancelClick(t) {
    const updatedReservStatus = "취소중";

    axios
      .put("/api/toss/updateTransReservStatus", {
        reservStatus: updatedReservStatus,
        tossId: t.tossId,
      })
      .then((response) => {
        toast({
          description: "결제 취소 요청 되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description:
            "결제 취소 요청 중 오류 발생하였습니다. 관리자에게 문의해주세요.",
          status: "error",
        });
      })
      .finally(() => updateList());
  }

  // ----------------------- 호텔 상품 고객 취소요청 로직 -----------------------
  function handleUserHotelCancelClick(h) {
    const updatedReservStatus = "취소중";

    axios
      .put("/api/toss/updateHotelReservStatus", {
        reservStatus: updatedReservStatus,
        hotelTossId: h.hotelTossId,
      })
      .then((response) => {
        toast({
          description: "결제 취소 요청 되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description:
            "결제 취소 요청 중 오류 발생하였습니다. 관리자에게 문의해주세요.",
          status: "error",
        });
      })
      .finally(() => updateList());
  }

  // --------------------- 운송, 숙소 보이는 시간 설정 ---------------------
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");

    return `${year}년/${month}월/${day}일/${hour}시`;
  };

  function handleTransClick(t) {
    navigate(`/transport/${t.transId}`);
  }

  function handleHotelClick(h) {
    navigate(`/hotel/reserv/${h.hotelId}`);
  }

  return (
    <Center fontSize={"12px"} m={10}>
      <Card w={"100%"}>
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
                    {/* ----------------------- 항공 / 버스 상품 ----------------------- */}
                    <Tr>
                      <Th textAlign={"center"}>주문번호</Th>
                      <Th textAlign={"center"}>아이디</Th>
                      <Th textAlign={"center"}>상품명</Th>
                      <Th textAlign={"center"}>출발시간 </Th>
                      <Th textAlign={"center"} w={"100px"}>
                        요청사항
                      </Th>
                      <Th textAlign={"center"}>연락처</Th>
                      <Th textAlign={"center"} w={"100px"}>
                        예약번호
                      </Th>
                      <Th textAlign={"center"}>가격</Th>
                      <Th textAlign={"center"} w={"100px"}>
                        예약상태
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {transToss.map((t) => (
                      <Tr
                        onClick={() => handleTransClick(t)}
                        key={t.tossId}
                        _hover={{ cursor: "pointer" }}
                      >
                        <Td textAlign={"center"}>{t.tossId}</Td>
                        <Td textAlign={"center"}>{t.userId}</Td>
                        <Td textAlign={"center"} w={"250px"}>
                          {t.transTitle}
                        </Td>
                        <Td textAlign={"center"} w={"195px"}>
                          {formatDateTime(t.transStartDay)}
                        </Td>
                        <Td textAlign={"center"}>
                          {t.request ? (
                            <Icon
                              as={InfoIcon}
                              onClick={() => handleIconClickTrans(t.request)}
                              cursor="pointer"
                            />
                          ) : (
                            <></>
                          )}
                        </Td>
                        <Td textAlign={"center"}>{t.realUserPhoneNumber}</Td>
                        {isAdmin() && (
                          <Td textAlign={"center"}>
                            <Flex gap={2}>
                              <Input
                                type="text"
                                fontSize={"10px"}
                                w={"100px"}
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
                                w={"30px"}
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
                          <Td textAlign={"center"}>
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
                        <Td textAlign={"center"}>
                          {parseInt(t.amount).toLocaleString("ko-KR")}원
                        </Td>
                        <Td textAlign={"center"}>
                          {t.reservStatus === "예약접수" && (
                            <Text color={"black"}>예약접수</Text>
                          )}
                          {t.reservStatus === "예약완료" && (
                            <Text color={"blue"}>예약완료</Text>
                          )}
                          {t.reservStatus === "취소중" && (
                            <Text color={"orange"}>취소중</Text>
                          )}
                          {t.reservStatus === "취소완료" && (
                            <Text color={"red"}>취소완료</Text>
                          )}
                        </Td>
                        {isAdmin() && (
                          <Td textAlign={"center"}>
                            {t.reservStatus !== "취소완료" && (
                              <Button
                                color={"red"}
                                onClick={(e) =>
                                  handleAmdinTransCancelClick(t, e)
                                }
                              >
                                취소
                              </Button>
                            )}
                          </Td>
                        )}

                        {isAdmin() || (
                          <Td textAlign={"center"}>
                            {t.reservStatus !== "취소중" &&
                              t.reservStatus !== "취소완료" && (
                                <Button
                                  color={"red"}
                                  onClick={() => handleUserTransCancelClick(t)}
                                >
                                  취소요청
                                </Button>
                              )}
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
                    {/* ----------------------- 호텔 상품 ----------------------- */}
                    <Tr>
                      <Th textAlign={"center"} w={"80px"}>
                        주문번호
                      </Th>
                      <Th textAlign={"center"} w={"100px"}>
                        아이디
                      </Th>
                      <Th w={"250px"} textAlign={"center"}>
                        상품명
                      </Th>
                      <Th w={"210px"} textAlign={"center"}>
                        체크인{" "}
                      </Th>
                      <Th w={"210px"} textAlign={"center"}>
                        체크아웃{" "}
                      </Th>
                      <Th textAlign={"center"} w={"105px"}>
                        요청사항
                      </Th>
                      <Th textAlign={"center"}>연락처</Th>
                      <Th textAlign={"center"} w={"250px"}>
                        예약번호
                      </Th>
                      <Th w={"120px"} textAlign={"center"}>
                        가격
                      </Th>
                      <Th w={"100px"} textAlign={"center"}>
                        상태
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hotelToss.map((h) => (
                      <Tr
                        onClick={() => handleHotelClick(h)}
                        key={h.hotelTossId}
                        _hover={{ cursor: "pointer" }}
                      >
                        <Td textAlign={"center"}>{h.hotelTossId}</Td>
                        <Td textAlign={"center"}>{h.userId}</Td>
                        <Td w={"250px"} textAlign={"center"}>
                          {h.hotelName}
                        </Td>
                        <Td textAlign={"center"}>
                          {formatDateTime(h.checkinDate)}
                        </Td>
                        <Td textAlign={"center"}>
                          {formatDateTime(h.checkoutDate)}
                        </Td>
                        <Td textAlign={"center"} textAlign={"center"}>
                          {h.plusMessage ? (
                            <Icon
                              as={InfoIcon}
                              onClick={() =>
                                handleIconClickHotel(h.plusMessage)
                              }
                              cursor="pointer"
                            />
                          ) : (
                            <></>
                          )}
                        </Td>
                        <Td textAlign={"center"}>{h.cellPhoneNumber}</Td>
                        {isAdmin() && (
                          <Td textAlign={"center"}>
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
                          <Td textAlign={"center"}>
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
                        <Td textAlign={"center"}>
                          {parseInt(h.amount).toLocaleString("ko-KR")}원
                        </Td>
                        <Td textAlign={"center"}>
                          {h.reservStatus === "예약접수" && (
                            <Text color={"black"}>예약접수</Text>
                          )}
                          {h.reservStatus === "예약완료" && (
                            <Text color={"blue"}>예약완료</Text>
                          )}
                          {h.reservStatus === "취소중" && (
                            <Text color={"orange"}>취소중</Text>
                          )}
                          {h.reservStatus === "취소완료" && (
                            <Text color={"red"}>취소완료</Text>
                          )}
                        </Td>
                        {isAdmin() && (
                          <Td textAlign={"center"}>
                            {h.reservStatus !== "취소완료" && (
                              <Button
                                color={"red"}
                                onClick={(e) =>
                                  handleAmdinHotelCancelClick(h, e)
                                }
                              >
                                취소
                              </Button>
                            )}
                          </Td>
                        )}

                        {isAdmin() || (
                          <Td textAlign={"center"}>
                            {h.reservStatus !== "취소중" &&
                              h.reservStatus !== "취소완료" && (
                                <Button
                                  color={"red"}
                                  onClick={() => handleUserHotelCancelClick(h)}
                                >
                                  취소요청
                                </Button>
                              )}
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </TabPanel>
          </TabPanels>

          {/* ---------------------- 운송상품 요청사항 모달 창 ---------------------- */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>요청사항 상세</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{selectedRequest}</ModalBody>
            </ModalContent>
          </Modal>

          {/* ---------------------- 운송상품 취소요청 모달 창 ---------------------- */}
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

          {/* ---------------------- 호텔상품 고객 요청사항 모달 창 ---------------------- */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>요청사항 상세</ModalHeader>
              <ModalCloseButton />
              <ModalBody>고객 요청 사항 : {selectedRequest}</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setIsCancelModalOpen(false)}
                >
                  닫기
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* ---------------------- 호텔상품 취소요청 모달 창 ---------------------- */}
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
