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
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
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
} from "@fortawesome/free-solid-svg-icons";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { RBanner } from "./Banner/RBanner";
import { LBanner } from "./Banner/LBanner";

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
        <Button colorScheme="blue" onClick={handleSearch}>
          검색
        </Button>
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

  return (
    <Box w="80%" ml="10%">
      <br />
      <br />
      <Flex textAlign={"center"}>
        <Box w="20%" padding={"10px"}>
          <LBanner />
        </Box>

        <Box w="60%" padding={"10px"}>
          {/*//여행사 카카오지도 모달 띠우기 */}
          {/*<Box>*/}
          {/*  <Button onClick={onOpen} borderRadius="50%">*/}
          {/*    <FontAwesomeIcon icon={faLocationDot} />*/}
          {/*  </Button>*/}
          {/*  <Text fontSize={"10px"} fontWeight={"bold"}>*/}
          {/*    대리점 찾기*/}
          {/*  </Text>*/}

          {/*  <Modal isOpen={isOpen} onClose={onClose}>*/}
          {/*    <ModalOverlay />*/}
          {/*    <ModalContent>*/}
          {/*      <ModalHeader>대리점 찾기</ModalHeader>*/}
          {/*      <ModalCloseButton />*/}
          {/*      <ModalBody>*/}
          {/*        <Kakao />*/}
          {/*      </ModalBody>*/}

          {/*      <ModalFooter>*/}
          {/*        <Button colorScheme="green" mr={3} onClick={onClose}>*/}
          {/*          Close*/}
          {/*        </Button>*/}
          {/*      </ModalFooter>*/}
          {/*    </ModalContent>*/}
          {/*  </Modal>*/}
          {/*</Box>*/}

          {/*<Box>*/}
          {/*  <h1> 우편번호 </h1>*/}
          {/*  <Button onClick={handleSearch}> 검색</Button>*/}
          {/*</Box>*/}

          {/*<kakao2 />*/}

          <Image src="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/41/aleksas-stan-R1W78UbWBbo-unsplash%20(1).jpg" />

          <br />
          <Heading textAlign={"center"} size="md" colorScheme="blue">
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
          <br />
          <Flex justifyContent={"flex-end"}>
            <Button
              size={"sm"}
              mr={"20px"}
              colorScheme="blue"
              onClick={() => navigate("../boardwrite")}
            >
              {" "}
              글 쓰기{" "}
            </Button>
          </Flex>
          <Pagination pageInfo={pageInfo} />
        </Box>

        <Box w={"20%"} padding={"10px"}>
          <RBanner />
        </Box>
      </Flex>
    </Box>
  );
}
