import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { RecentViewed } from "../../component/RecentViewed";
import { LoginContext } from "../../component/LoginProvider";

// 운송 상품 페이지 버튼 컴포넌트
function TransPage({ pageInfo, params }) {
  const navigate = useNavigate();
  const pageNumbers = [];
  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex gap={1}>
      {pageInfo.prevPageNumber && (
        <Button
          bg={"white"}
          shadow={"1px 1px 3px 1px #dadce0"}
          _hover={{
            shadow: "1px 1px 3px 1px #dadce0 inset",
            backgroundColor: "whitesmoke",
          }}
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
          bg={"white"}
          key={pageNumber}
          shadow={"1px 1px 3px 1px #dadce0"}
          _hover={{
            shadow: "1px 1px 3px 1px #dadce0 inset",
            backgroundColor: "whitesmoke",
          }}
          onClick={() =>
            navigate("/transport/list?type=" + params + "&p=" + pageNumber)
          }
        >
          {pageNumber}
        </Button>
      ))}

      {pageInfo.nextPageNumber && (
        <Button
          color={"white"}
          shadow={"1px 1px 3px 1px #dadce0"}
          _hover={{
            shadow: "1px 1px 3px 1px #dadce0 inset",
            backgroundColor: "whitesmoke",
          }}
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
    </Flex>
  );
}
// 검색 컴포넌트
function TransSearchComponent() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [params] = useSearchParams();

  async function handleSearch() {
    try {
      const response = await axios.get(
        "/api/transport/list?type=" + params.get("type") + "&k=" + keyword,
      ); // 검색어를 서버에 보내고 검색 결과를 받아옵니다.
      setSearchResults(response.data); // 검색 결과를 상태 변수에 저장합니다.
      navigate("/transport/list?type=" + params.get("type") + "&k=" + keyword); // 이동할 경로를 설정합니다.
    } catch (error) {
      console.error("검색 중 에러 발생:", error);
    }
  }

  return (
    <Flex justifyContent="center" w="100%">
      <Box w={"65%"} justifyContent={"center"} mt={"30px"}>
        {/* ------------------- 검색바 ------------------- */}
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          // border={"1px solid gray"}
          boxSizing="border-box"
          mb={10}
          w={"90%"}
          h={"90px"}
          ml={"5%"}
          borderRadius={"20px"}
          shadow={"1px 1px 3px 1px #dadce0"}
        >
          <Input
            w={"50%"}
            h={"60%"}
            border={"none"}
            placeholder="어디로 떠나시나요?"
            style={{ fontSize: "1.5rem" }}
            _focus={{
              boxShadow: "1px 1px 3px 1px #dadce0 inset", // 포커스 시 박스 그림자 제거
            }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <Button
            h={"50px"}
            color={"black"}
            borderRadius={"10px"}
            shadow={"1px 1px 3px 1px #dadce0"}
            backgroundColor={"gray.300"}
            _hover={{
              color: "white",
              backgroundColor: "blue.500",
              shadow: "1px 1px 3px 1px #dadce0 inset",
            }}
            onClick={handleSearch}
            fontSize={21}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Box>
      </Box>
      {searchResults.length > 0 && (
        <Box>
          <Text>검색 결과:</Text>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>{result.name}</li>
            ))}
          </ul>
        </Box>
      )}
    </Flex>
  );
}

export function TransPortList() {
  const [transList, setTransList] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  const location = useLocation();
  // 파람의 p 가 처음 에 null 이면 1을 전달하는 page 변수 선언
  const page = params.get("p") ? parseInt(params.get("p"), 10) : 1;

  const { isAdmin } = useContext(LoginContext);

  const keyword = params.get("k");

  useEffect(() => {
    let query = `/api/transport/list?type=${params.get("type")}&p=${page}`;
    if (keyword) {
      query += `&k=${keyword}`;
    }
    axios.get(query).then((response) => {
      setTransList(response.data.transList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location, params]);

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
        {params.get("type") === "bus" && (
          <Image
            src={
              "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/sourceFile/imgeFile/%E1%84%87%E1%85%A5%E1%84%89%E1%85%B3%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.jpg"
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.8,
            }}
          />
        )}
        {params.get("type") === "air" && (
          <Image
            src={
              "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/sourceFile/imgeFile/planemain.jpg"
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.8,
            }}
          />
        )}
      </Box>
      <Center w={"100%"} h={"100px"} mt={5}>
        {/*// 검색창 */}
        <TransSearchComponent />
      </Center>
      <Flex
        ml={"7.5%"}
        mt={4}
        w={"85%"}
        h={"50px"}
        justifyContent={"space-between"}
      >
        <Box
          w={"300px"}
          h={"50px"}
          textAlign={"center"}
          mb={10}
          lineHeight={"50px"}
        >
          <Box fontWeight={"900"} fontSize={"1.5rem"}>
            {params.get("type") === "bus" && (
              <Box color={"black"} fontSize={"40px"} fontSize={"1.8rem"}>
                버스 여행
              </Box>
            )}
            {params.get("type") === "air" && (
              <Box color={"black"} fontSize={"40px"} fontSize={"1.8rem"}>
                항공 여행
              </Box>
            )}
          </Box>
        </Box>
        {isAdmin() && (
          <Box>
            <Button
              ml={2}
              onClick={() => navigate("/transport/write?" + params.toString())}
            >
              {params.get("type") === "bus" && <Box>버스 상품 등록</Box>}
              {params.get("type") === "air" && <Box>항공 상품 등록</Box>}
            </Button>
          </Box>
        )}
      </Flex>
      <Flex justifyContent={"center"} flexWrap={"wrap"}>
        <SimpleGrid columns={4} w={"85%"} my={"20px"} spacing={9}>
          {transList.map(
            (transport) =>
              params.get("type") === transport.typeName && (
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  onClick={() => navigate("/transport/" + transport.tid)}
                  key={transport.tid}
                  shadow={"1px 1px 3px 1px #dadce0"}
                  _hover={{
                    shadow: "1px 1px 3px 1px #dadce0 inset",
                    backgroundColor: "whitesmoke",
                    cursor: "pointer",
                  }}
                >
                  <Box position="relative" overflow={"hidden"}>
                    <Image src={transport.url} h={"100%"} />
                  </Box>
                  <Box p={3}>
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
                          <Box
                            fontSize={"1.1rem"}
                            textColor={"#509896"}
                            fontWeight={"900"}
                          >
                            {parseInt(transport.transPrice).toLocaleString(
                              "ko-KR",
                            )}
                            {/*{transport.transPrice}*/}
                            &nbsp;원
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
      <Flex w={"80%"} ml={"10%"} mt={10} mb={10} justifyContent={"center"}>
        <TransPage params={params.get("type")} pageInfo={pageInfo} />
      </Flex>
    </Box>
  );
}
