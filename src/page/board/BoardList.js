import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
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
  Stack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faLocationDot,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("/boardList?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}
function Pagination({ pageInfo }) {
  const pageNumbers = [];

  const navigate = useNavigate();

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      w="80%"
      ml="10%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <br />
      {pageInfo.prevPageNumber && (
        <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </PageButton>
      )}

      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          variant={
            pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
          }
          pageNumber={pageNumber}
        >
          {pageNumber}
        </PageButton>
      ))}

      {pageInfo.nextPageNumber && (
        <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
          <FontAwesomeIcon icon={faAngleRight} />
        </PageButton>
      )}
    </Box>
  );
}

function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  function handleSearch() {
    // /?k=keyword
    const params = new URLSearchParams();
    params.set("k", keyword);
    navigate("/boardList?" + params);
  }

  return (
    <Box w="80%" h={"60px"} ml="10%">
      <Flex justifyContent={"space-between"}>
        <select>
          <option value="Option1">전 체</option>
          <option value="Option2">제 목</option>
          <option value="Option3">내 용</option>
          <option value="Option3">작성자</option>
        </select>
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Box>
  );
}

function Kakao() {
  return (
    <Map
      center={{ lat: 37.56564, lng: 126.97939 }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: 37.56564, lng: 126.97939 }}>
        <Text style={{ color: "#000", textAlign: "center" }}>TRAVEL 투어</Text>
      </MapMarker>
    </Map>
  );
}

export function BoardList() {
  const [boardList, setBoardList] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [pageInfo, setPageInfo] = useState(null);
  const location = useLocation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get("/api/board/list?" + params).then((response) => {
      setBoardList(response.data.boardList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  if (boardList === null) {
    return <Spinner />;
  }

  function handleSearch() {
    new window.daum.Postcode({
      oncomplete: (data) => {
        // 우편번호 검색 완료 시 실행할 코드
        console.log(data);
      },
    }).open();
  }

  return (
    <Box w="80%" ml="10%">
      <br />
      <br />
      <Flex textAlign={"center"}>
        <Box w="20%" padding={"10px"}>
          <Card>
            <CardHeader>
              <Heading size="md">투어 고객센터</Heading>
            </CardHeader>

            <CardBody textAlign={"left"}>
              <Box>
                <Divider my="2" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/notice")}
                  >
                    자주 찾는 질문
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/boardList")}
                  >
                    게 시 판
                  </Text>
                </Box>
                {/* 구분선 추가 */}
                <Divider my="4" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/boardwrite")}
                  >
                    고객의 소리
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text
                    fontSize="md"
                    _hover={{ cursor: "pointer", color: "green" }}
                    onClick={() => navigate("/NoticeSound")}
                  >
                    소비자 중심 경영
                  </Text>
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>

        <Box w="60%" padding={"10px"}>
          {/*//여행사 카카오지도 모달 띠우기 */}
          <Box>
            <Button onClick={onOpen} borderRadius="50%">
              <FontAwesomeIcon icon={faLocationDot} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>대리점 찾기</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Kakao />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="green" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

          {/*<Box>*/}
          {/*  <h1> 우편번호 </h1>*/}
          {/*  <Button onClick={handleSearch}> 검색</Button>*/}
          {/*</Box>*/}

          {/*<kakao2 />*/}

          <br />
          <Heading textAlign={"center"} size="md" colorScheme="green">
            게시판 목록
          </Heading>
          <br />
          <SearchComponent />
          <br />

          <Table w="80%" h={"60px"} ml="10%">
            <Thead>
              <Tr>
                <Th>글 순서</Th>
                <Th>타이틀</Th>
                <Th>컨텐츠</Th>
                <Th>작성자</Th>
                <Th>작성일</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  key={board.id}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => navigate("/board/" + board.id)}
                >
                  <Td>{board.id}</Td>
                  <Td>{board.title}</Td>
                  <Td>{board.content}</Td>
                  <Td>{board.writer}</Td>
                  <Td>{board.inserted}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination pageInfo={pageInfo} />
        </Box>

        <Box w={"20%"} padding={"10px"}>
          <Card>
            <CardHeader>
              <Heading size="md">투어 고객센터</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 해외/국내 여행상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-5252
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 해외/국내 항공상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-5353
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 부산/대구출발 여행상담
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1544-6722
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    <Icon as={PhoneIcon} /> 기업행사/출장문의
                  </Heading>
                  <Text pt="2" fontSize="md" fontWeight="bold" color={"green"}>
                    1661-4873
                  </Text>
                  <Text pt="2" fontSize="sm" color={"gray"}>
                    https://biz.tour.com
                  </Text>
                </Box>
                <Box textAlign={"left"}>
                  <Heading size="xs" textTransform="uppercase" p="2">
                    <Icon as={InfoOutlineIcon} /> 상담시간 안내
                  </Heading>

                  <Text pt="2" fontSize="11px">
                    *해외/국내 여행 및 항공상담 평일 9:00 ~ 18:00 (토/일요일 및
                    공휴일 휴무)
                  </Text>
                  <Text pt="2" fontSize="11px">
                    *항공권은 전화상담 예약 시 항공료 외 별도의 취급 수수료가
                    발생합니다.
                  </Text>
                  <Text pt="2" fontSize="11px">
                    *항공 시스템 결제요청, 환불/변경 문의 평일 9:00 ~ 17:00
                    (토/일요일 및 공휴일 휴무)
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
