import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Input,
  Flex,
  useToast,
  Text,
  SimpleGrid,
  Badge,
  Spacer,
  Spinner,
  Center,
  Stack,
} from "@chakra-ui/react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";
import App from "./App";
import {
  faAngleLeft,
  faAngleRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons/faBed";
import { RecentViewed } from "../../component/RecentViewed";
import { LoginContext } from "../../component/LoginProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectFade,
  Pagination as SwiperPagination,
  Navigation,
} from "swiper/modules";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  function handleClick() {
    params.set("p", pageNumber);
    const queryString = params.toString();
    navigate(`/hotel/?${queryString}`);
    // navigate("/?" + params);
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
    <Box mt={5}>
      <Center>
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
      </Center>
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

    const queryString = params.toString();
    navigate(`/hotel/?${queryString}`);
    // navigate("/?" + params);
  }

  return (
    <Center mt={5}>
      <Flex my={"30px"}>
        <Input
          w={"500px"}
          value={keyword}
          placeholder={"호텔명, 지명, 숙소 타입, 테마"}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Center>
  );
}

export function Hotel() {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const [params] = useSearchParams();
  const [hotelList, setHotelList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  const [hotelHeartbeats, setHotelHeartbeats] = useState([]);

  useEffect(() => {
    axios.get("/api/hotel/list?" + params).then((response) => {
      setHotelList(response.data.hotelList);
      setPageInfo(response.data.pageInfo);
    });
  }, [location]);

  // useEffect(() => {x
  //   axios.get("/api/hotel/price").then((response) => {
  //     const price = response.data.hotelList.map((hotel) => hotel.price);
  //     setHotelList(price);
  //   });
  // }, [location]);

  // // TODO : Login 하고 Hotel 페이지 접속시 userId 정보 얻기
  // useEffect(() => {
  //   axios
  //     .get(`/api/hotel/wishList/` + params.get("userId"))
  //     .then((response) => {
  //       setWishlist(response.data);
  //       console.log(response.data);
  //     });
  // }, []);

  const handleUpdateToWishlist = (hotelId) => {
    axios.get(`/api/hotel/reserv/id/${hotelId}`).then((response) => {
      const hotelData = response.data;

      axios.post("/api/wishlist", {
        hotelId,
        name: hotelData.name,
        mainImgUrl: hotelData.mainImgUrl,
        location: hotelData.location,
        lodgingType: hotelData.lodgingType,
      });
    });
  };
  // 메인 화면에서 유저가 좋아요한 목록 불러오기 ------------------------------------------------------
  // useEffect(() => {
  //   axios.get("/api/hotel/list?" + params).then((response) => {
  //     setHotelList(response.data.hotelList);
  //     setPageInfo(response.data.pageInfo);
  //     // 새로운 배열 생성
  //     const newHotelIdArray = response.data.hotelList.map((hotel) => hotel.hid);
  //
  //     // 새로운 배열을 상태로 설정
  //     setHotelIdArray(newHotelIdArray);
  //   });
  // }, [location]);

  // useEffect(() => {
  //     // 위시리스트를 저장할 임시 배열
  //     let newWishlist = [];
  //
  //     // 모든 호텔 ID에 대해 위시리스트 정보를 가져옴
  //     const fetchWishList = async () => {
  //       for (const hotelId of hotelIdArray) {
  //         try {
  //           const response = await axios.get(`/api/hotel/wishList/${hotelId}`);
  //           // 각 요청의 결과를 임시 배열에 추가
  //           newWishlist = [...newWishlist, ...response.data];
  //         } catch (error) {
  //           console.error(
  //             "Error fetching wishlist for hotel ID:",
  //             hotelId,
  //             error,
  //           );
  //         }
  //       }
  //
  //       // 위시리스트 상태 업데이트
  //       setWishlist(newWishlist);
  //     };
  //
  //     // hotelIdArray가 비어있지 않으면 위시리스트 정보를 가져옴
  //     if (hotelIdArray.length > 0) {
  //       fetchWishList();
  //     }
  //   }, [hotelIdArray]); // hotelIdArray가 변경될 때마다 이 useEffect를 다시 실행
  // ------------------------------------------------------------------------------------------

  const toggleWishlist = (hotelId) => {
    if (login !== "") {
      if (wishlist.includes(hotelId)) {
        setWishlist((prev) => prev.filter((id) => id !== hotelId));
        handleUpdateToWishlist(hotelId);
        toast({
          description: "찜 삭제 완료.",
          colorScheme: "orange",
        });
      } else {
        handleUpdateToWishlist(hotelId);
        setWishlist((prev) => [...prev, hotelId]);
        toast({
          description: "찜 추가 완료.",
          status: "success",
        });
      }
      setHotelHeartbeats((prevHeartbeats) => ({
        ...prevHeartbeats,
        [hotelId]: true,
      }));

      // Reset the heartbeat state after the animation duration (500ms)
      setTimeout(() => {
        setHotelHeartbeats((prevHeartbeats) => ({
          ...prevHeartbeats,
          [hotelId]: false,
        }));
      }, 500);
    } else {
      toast({ description: "로그인 후 이용 가능 합니다.", status: "error" });
    }
  };

  const { login, isAdmin } = useContext(LoginContext);

  if (hotelList == null) {
    return <Spinner />;
  }
  const GrayscaleImageWithText = ({ imageUrl, text, navi }) => (
    <Center>
      <Box
        position="relative"
        mt={"40px"}
        w={"70px"}
        opacity={"45%"}
        _hover={{ cursor: "pointer", color: "black", opacity: 1 }}
        onClick={() => navigate(navi)}
      >
        <Image brightness={"60%"} src={imageUrl} boxSize={"35px"} />
        <Box
          position="absolute"
          top="50px"
          left="-15px"
          textAlign="center"
          width="100%"
          h={"100px"}
        >
          <Text fontSize="0.8rrem" opacity={"85%"}>
            {text}
          </Text>
        </Box>
      </Box>
    </Center>
  );

  return (
    <Box>
      <Box boxShadow={"5px 5px 5px 5px gray"} w={"100%"} h={"100%"}>
        {/* 여기에 App 컴포넌트 내용 */}
        <Box w={"100%"} h={"100%"}>
          <App />
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        w={"80%"}
        ml={"10%"}
      >
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"
          text="해변가"
          navi={"/hotel/?k=바다"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg"
          text="캠핑, 글램핑"
          navi={"/hotel/?k=바다"}
        />

        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
          text="전망"
          navi={"/hotel/?k=전망"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg"
          text="촌캉스"
          navi={"/hotel/?k=촌캉스"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/51f5cf64-5821-400c-8033-8a10c7787d69.jpg"
          text="한옥"
          navi={"/hotel/?k=한옥"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
          text="자연가옥"
          navi={"/hotel/?k=자연가옥"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg"
          text="서핑"
          navi={"/hotel/?k=서핑"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/46/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg"
          text="스키"
          navi={"/hotel/?k=스키"}
        />
        <GrayscaleImageWithText
          imageUrl="https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/board/47/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
          text="수영장"
          navi={"/hotel/?k=수영장"}
        />
      </Box>
      {/* 검색 버튼 */}
      <Box mt={"50px"}>
        <SearchComponent />
      </Box>
      <Box w={"80%"} ml={"10%"}>
        <Flex minWidth={"max-content"} alignItems={"center"} gap={"2"}>
          <Spacer />

          {isAdmin() && (
            <Button
              // ml={"300px"}
              mr={"80px"}
              variant={"solid"}
              color={"green"}
              onClick={() => navigate("/hotel/write/")}
            >
              호텔 추가
            </Button>
          )}
          {/*<Button*/}
          {/*  ml={"20px"}*/}
          {/*  variant={"solid"}*/}
          {/*  color={"green"}*/}
          {/*  onClick={() => navigate("/reserv/" + id)}*/}
          {/*>*/}
          {/*  호텔 삭제*/}
          {/*</Button>*/}
        </Flex>
      </Box>

      {/* 호텔 정보 렌더링 */}
      <Flex justifyContent={"center"} flexWrap="wrap">
        <SimpleGrid columns={3} spacing={9} my={"20px"}>
          {hotelList.map((hotel) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Box position="relative">
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  modules={[SwiperPagination]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <Image
                      onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                      src={hotel.mainImgUrl}
                      alt={hotel.name}
                      cursor={"pointer"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                      src={hotel.subImgUrl1}
                      alt={hotel.name}
                      cursor={"pointer"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                      src={hotel.subImgUrl2}
                      alt={hotel.name}
                      cursor={"pointer"}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                      src={hotel.mapImgUrl}
                      alt={hotel.name}
                      cursor={"pointer"}
                    />
                  </SwiperSlide>
                </Swiper>

                <Box
                  position="absolute"
                  top="2"
                  right="2"
                  zIndex={999}
                  onClick={() => toggleWishlist(hotel.hid)}
                  cursor="pointer"
                  style={{
                    transform: hotelHeartbeats[hotel.hid]
                      ? "scale(1.5)"
                      : "scale(1)",
                    transition: "transform 0.5s ease-in-out",
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} color={"#80d9d0"} size="2x" />
                </Box>
              </Box>
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  ></Box>
                </Box>
                <Box
                  fontWeight="bold"
                  fontSize={"large"}
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {hotel.name}
                  <Box display="flex" alignItems="baseline" flexWrap="wrap">
                    <Box>
                      <Badge>{hotel.lodgingType}</Badge>
                      {hotel.lodgingType === "호텔" && (
                        <Badge>{hotel.rating}</Badge>
                      )}
                    </Box>
                    {hotel.pool != null && (
                      <Badge color={"blue"}>{hotel.pool}</Badge>
                    )}
                    {hotel.pet != null && (
                      <Badge ml={"3px"} color={"green"}>
                        {hotel.pet}
                      </Badge>
                    )}
                    {hotel.oceanview != null && (
                      <Badge ml={"3px"} color={"blue"}>
                        {hotel.oceanview}
                      </Badge>
                    )}
                    {hotel.romanticMood != null && (
                      <Badge ml={"3px"} color={"hotpink"}>
                        {hotel.romanticMood}
                      </Badge>
                    )}
                    {hotel.familyMood != null && (
                      <Badge ml={"3px"} color={"purple"}>
                        {hotel.familyMood}
                      </Badge>
                    )}
                  </Box>
                </Box>

                {hotel.location}

                <Box
                  display="flex"
                  mt="2"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Box as="span" color="gray.600" fontSize="sm">
                      <Flex>
                        <Text
                          fontWeight={"900"}
                          fontSize={"1.1rem"}
                          color={"#509896"}
                        >
                          {parseInt(hotel.minSalePriceWeekday).toLocaleString(
                            "ko-KR",
                          )}{" "}
                          원 / 1박 ~
                        </Text>
                      </Flex>
                    </Box>
                  </Box>

                  <ButtonGroup spacing="2" size="sm" variant="outline">
                    <Button
                      // colorScheme={"#509896"}
                      color="#509896"
                      onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                    >
                      예약하기
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        toggleWishlist(hotel.hid);
                      }}
                    >
                      찜하기
                    </Button>
                  </ButtonGroup>
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
                    borderRadius="15px"
                  >
                    <RecentViewed />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>

      <Pagination pageInfo={pageInfo} />
    </Box>
  );
}
