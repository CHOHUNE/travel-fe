import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { RecentViewed } from "../../component/RecentViewed";

function TransPage({ pageInfo, params }) {
  const navigate = useNavigate();
  const pageNumbers = [];
  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      {pageInfo.prevPageNumber && (
        <Button
          onClick={() =>
            navigate(
              "/transport/list?type=" +
                params +
                "&p=" +
                pageInfo.prevPageNumber,
            )
          }
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Button>
      )}

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() =>
            navigate("/transport/list?type=" + params + "&p=" + pageNumber)
          }
        >
          {pageNumber}
        </Button>
      ))}

      {pageInfo.nextPageNumber && (
        <Button
          onClick={() =>
            navigate(
              "/transport/list?type=" +
                params +
                "&p=" +
                pageInfo.nextPageNumber,
            )
          }
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </Button>
      )}
    </Box>
  );
}

export function TransPortList() {
  const [transList, setTransList] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const location = useLocation();
  // 파람의 p 가 처음 에 null 이면 1을 전달하는 page 변수 선언
  const page = params.get("p") ? parseInt(params.get("p"), 10) : 1;

  useEffect(() => {
    axios
      .get("/api/transport/list?type=" + params.get("type") + "&p=" + page)
      .then((response) => {
        setTransList(response.data.transList);
        setPageInfo(response.data.pageInfo);
      });
  }, [location]);

  if (transList === null) {
    <Spinner />;
  }

  return (
    <Box>
      <Box
        w={"100%"}
        h={"300px"}
        textAlign={"center"}
        lineHeight={"300px"}
        mt={4}
        bg={"#f5f8ec"}
      >
        버스 항공 이미지
      </Box>
      <Flex
        w={"85%"}
        h={"100px"}
        ml={"7.5%"}
        bg={"#d9d9d9"}
        mt={2}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Input
          w={"290px"}
          h={"60px"}
          bg={"white"}
          placeholder={"검색어를 입력해 주세요"}
        />
        <Button onClick={onOpen}>출발일</Button>

        <Button w={"50px"} h={"50px"} bg={"white"}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Flex>
      <Flex
        ml={"7.5%"}
        mt={4}
        w={"85%"}
        h={"50px"}
        justifyContent={"space-between"}
      >
        <Box
          w={"400px"}
          lineHeight={"50px"}
          bg={"#d9d9d9"}
          textAlign={"center"}
          fontSize={"2rem"}
        >
          {params.get("type") === "bus" && <Box>🚎 국내 버스 여행</Box>}
          {params.get("type") === "air" && <Box>🛫 국내 항공 여행</Box>}
        </Box>
        {/*{isAdmin() && (*/}
        <Box>
          <Button
            ml={2}
            onClick={() => navigate("/transport/write?" + params.toString())}
          >
            {params.get("type") === "bus" && <Box>버스 상품 등록</Box>}
            {params.get("type") === "air" && <Box>항공 상품 등록</Box>}
          </Button>
        </Box>
        {/*)}*/}
      </Flex>
      <Flex justifyContent={"center"} flexWrap={"wrap"}>
        <SimpleGrid columns={4} w={"85%"} my={"20px"} spacing={9}>
          {transList.map(
            (transport) =>
              params.get("type") === transport.typeName && (
                <Box
                  // w={"275px"}
                  // h={"275px"}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/transport/" + transport.tid)}
                  key={transport.tid}
                >
                  <Box position="relative" overflow={"hidden"}>
                    <Image src={transport.url} h={"100%"} />
                  </Box>
                  <Box p={6}>
                    <Box display="flex" alignItems="baseline">
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      ></Box>
                      <Box>
                        <Box
                          fontWeight="bold"
                          fontSize={"large"}
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {transport.transTitle}
                        </Box>
                        <Box
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                          fontWeight={"bold"}
                          color={"gray"}
                        >
                          [{transport.transStartLocation}] &nbsp;
                          <FontAwesomeIcon icon={faAnglesRight} />
                          &nbsp; [{transport.transArriveLocation}] &nbsp;
                        </Box>

                        <Box as="h4" lineHeight="tight" noOfLines={1}>
                          {transport.transAddress}
                        </Box>
                        <Box
                          display="flex"
                          mt="2"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            {transport.transPrice}
                            <Box as="span" color="gray.600" fontSize="sm">
                              &nbsp;원
                            </Box>
                          </Box>

                          <Box
                            position="fixed" // 절대 위치를 사용해 오버레이 설정
                            top="300" // 배너의 상단에서 시작
                            right="2" // 배너의 우측에서 시작
                            zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
                            p="4" // 패딩 값
                            bg="rgba(255, 255, 255, 0.3)" // 배경색
                            boxShadow="lg" // 그림자 효과
                            maxW="sm" // 최대 너비 설정
                            overflow="hidden" // 내용이 넘치면 숨김
                          >
                            <RecentViewed />
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        position="fixed" // 절대 위치를 사용해 오버레이 설정
                        top="300" // 배너의 상단에서 시작
                        right="2" // 배너의 우측에서 시작
                        zIndex="10" // 다른 요소보다 위에 오도록 z-index 설정
                        p="4" // 패딩 값
                        bg="rgba(255, 255, 255, 0.3)" // 배경색
                        boxShadow="lg" // 그림자 효과
                        maxW="sm" // 최대 너비 설정
                        overflow="hidden" // 내용이 넘치면 숨김
                      >
                        <RecentViewed />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ),
          )}
        </SimpleGrid>
      </Flex>

      <Flex w={"80%"} ml={"10%"} mt={10} justifyContent={"center"}>
        <TransPage params={params.get("type")} pageInfo={pageInfo} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Select Date and Time"
              type="date"
              bg={"white"}
              w={"200px"}
              h={"50px"}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
