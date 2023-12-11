import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Spinner,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function TransPortEdit() {
  const [trans, updateTrans] = useImmer([]);
  const [removeMainImageId, setRemoveMainImageId] = useState([]);
  const [mainImageSubmit, setMainImageSubmit] = useState(true);
  const [transMainImage, setTransMainImage] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/transport/id/" + id).then((response) => {
      updateTrans(response.data);
    });
  }, []);

  if (trans === null) {
    <Spinner />;
  }

  function handleSubmitTrans() {
    axios
      .putForm("/api/transport/edit", {
        transStartDay: trans.transStartDay,
        transTitle: trans.transTitle,
        transPrice: trans.transPrice,
        transContent: trans.transContent,
        transAddress: trans.transAddress,
        transStartLocation: trans.transStartLocation,
        transArriveLocation: trans.transArriveLocation,
        tId: trans.tid,
        removeMainImageId,
        transMainImage,
      })
      .then(() => {
        toast({
          description: id + " 번 운송 상품 이 수정 되었습니다.",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "운송 상품 수정중 문제가 발생하였습니다.",
          status: "error",
        });
      });
  }

  // 제목 수정 기능
  function handleTitleChange(e) {
    updateTrans((draft) => {
      draft.transTitle = e.target.value;
    });
  }

  // 가격 수정 기능
  function handlePriceChange(e) {
    updateTrans((draft) => {
      draft.transPrice = e.target.value;
    });
  }

  // 출발일 수정 기능
  function handleStartDayChange(e) {
    updateTrans((draft) => {
      draft.transStartDay = e.target.value;
    });
  }

  // 출발 위치 수정 기능
  function handleStartLocationChange(e) {
    updateTrans((draft) => {
      draft.transStartLocation = e.target.value;
    });
  }

  // 도착 위치 수정 기능
  function handleArriveLocationChange(e) {
    updateTrans((draft) => {
      draft.transArriveLocation = e.target.value;
    });
  }

  function handleRemoveMainImageSwitch(e) {
    if (e.target.checked) {
      setMainImageSubmit(false);
      setRemoveMainImageId(e.target.value);
    } else {
      setMainImageSubmit(true);
      setRemoveMainImageId((prevRemoveMainImageId) => {
        // 이전 상태를 기반으로 새로운 객체를 생성하여 특정 속성 제거
        const { [e.target.value]: removedProperty, ...newRemoveMainImageId } =
          prevRemoveMainImageId;
        return newRemoveMainImageId;
      });
    }
  }

  // 상품 설명 텍스트 수정
  function handleContentChange(e) {
    updateTrans((draft) => {
      draft.transContent = e.target.value;
    });
  }

  function handleAddressChange(e) {
    updateTrans((draft) => {
      draft.transAddress = e.target.value;
    });
  }
  function handleAddressClick() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        updateTrans((draft) => {
          draft.transAddress = data.address;
        });
      },
    }).open();
  }

  return (
    <Center>
      <Card w={"70%"} textAlign={"center"} mt={8} mb={8}>
        <CardHeader>
          <Heading textAlign={"center"}>
            {id} 번 {trans.typeName} 운송 상품 수정 페이지
          </Heading>
        </CardHeader>

        <CardBody>
          <FormControl>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} fontSize={"1.1rem"}>
                기존 메인 이미지
              </FormLabel>
              <Box w={"50%"}>
                {trans.mainImage != null ? (
                  <Card>
                    <CardBody>
                      <Image src={trans.mainImage.url} />
                    </CardBody>
                    <CardFooter>
                      <FormControl display="flex" alignItems="center" gap={2}>
                        <FormLabel m={0} p={0}>
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </FormLabel>
                        <Switch
                          value={trans.mainImage.id}
                          colorScheme="red"
                          onChange={handleRemoveMainImageSwitch}
                        />
                      </FormControl>
                    </CardFooter>
                  </Card>
                ) : (
                  <Box>빈값</Box>
                )}
              </Box>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            {mainImageSubmit !== true ? (
              <Flex>
                <FormLabel w={"33%"} textAlign={"center"} lineHeight={"65px"}>
                  수정할 메인 이미지
                </FormLabel>
                <Box>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setTransMainImage(e.target.files[0]);
                    }}
                  />
                  <FormHelperText>
                    파일 크기는 1MB 이하로 첨부하세요
                  </FormHelperText>
                </Box>
              </Flex>
            ) : (
              <FormControl mt={5} mb={5}>
                <FormHelperText color={"red"}>
                  메인 이미지는 삭제가 되어야 추가가 가능합니다.
                </FormHelperText>
              </FormControl>
            )}
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel
                w={"50%"}
                textAlign={"center"}
                fontSize={"1.1rem"}
                alignItems={"center"}
              >
                출발 일시
              </FormLabel>
              <Input
                value={trans.transStartDay}
                placeholder="Select Date and Time"
                size={"md"}
                type="datetime-local"
                onChange={handleStartDayChange}
              />
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                제목
              </FormLabel>
              <Input value={trans.transTitle} onChange={handleTitleChange} />
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} fontSize={"1.1rem"}>
                상품 주소
              </FormLabel>
              <Flex>
                <Input
                  w={"450px"}
                  placeholder="상품 출발 주소"
                  value={trans.transAddress}
                  onChange={handleAddressChange}
                />
                <Button onClick={handleAddressClick}>주소검색</Button>
              </Flex>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                출발지
              </FormLabel>

              <Select
                placeholder="출발 지역을 선택해주세요"
                value={trans.transStartLocation}
                onChange={handleStartLocationChange}
              >
                {trans.typeName === "air" ? (
                  <>
                    <option>서울/김포</option>
                    <option>부산/김해</option>
                    <option>포항/경주</option>
                    <option>여수/순천</option>
                    <option>진주/사천</option>
                    <option>제주</option>
                    <option>광주</option>
                    <option>대구</option>
                    <option>울산</option>
                    <option>청주</option>
                  </>
                ) : (
                  <>
                    <option>서울</option>
                    <option>인천</option>
                    <option>고양</option>
                    <option>성남</option>
                    <option>강릉</option>
                    <option>춘천</option>
                    <option>세종</option>
                    <option>천안</option>
                    <option>충주</option>
                    <option>나주</option>
                    <option>군산</option>
                    <option>부산</option>
                    <option>구미</option>
                  </>
                )}
              </Select>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                도착지
              </FormLabel>

              <Select
                placeholder="도착 지역을 선택해주세요"
                value={trans.transArriveLocation}
                onChange={handleArriveLocationChange}
              >
                {trans.typeName === "air" ? (
                  <>
                    <option disabled={trans.transStartLocation === "서울/김포"}>
                      서울/김포
                    </option>
                    <option disabled={trans.transStartLocation === "부산/김해"}>
                      부산/김해
                    </option>
                    <option disabled={trans.transStartLocation === "포항/경주"}>
                      포항/경주
                    </option>
                    <option disabled={trans.transStartLocation === "여수/순천"}>
                      여수/순천
                    </option>
                    <option disabled={trans.transStartLocation === "진주/사천"}>
                      진주/사천
                    </option>
                    <option disabled={trans.transStartLocation === "제주"}>
                      제주
                    </option>
                    <option disabled={trans.transStartLocation === "광주"}>
                      광주
                    </option>
                    <option disabled={trans.transStartLocation === "대구"}>
                      대구
                    </option>
                    <option disabled={trans.transStartLocation === "울산"}>
                      울산
                    </option>
                    <option disabled={trans.transStartLocation === "청주"}>
                      청주
                    </option>
                  </>
                ) : (
                  <>
                    <option disabled={trans.transStartLocation === "서울"}>
                      서울
                    </option>
                    <option disabled={trans.transStartLocation === "인천"}>
                      인천
                    </option>
                    <option disabled={trans.transStartLocation === "고양"}>
                      고양
                    </option>
                    <option disabled={trans.transStartLocation === "성남"}>
                      성남
                    </option>
                    <option disabled={trans.transStartLocation === "강릉"}>
                      강릉
                    </option>
                    <option disabled={trans.transStartLocation === "춘천"}>
                      춘천
                    </option>
                    <option disabled={trans.transStartLocation === "세종"}>
                      세종
                    </option>
                    <option disabled={trans.transStartLocation === "천안"}>
                      천안
                    </option>
                    <option disabled={trans.transStartLocation === "충주"}>
                      충주
                    </option>
                    <option disabled={trans.transStartLocation === "나주"}>
                      나주
                    </option>
                    <option disabled={trans.transStartLocation === "군산"}>
                      군산
                    </option>
                    <option disabled={trans.transStartLocation === "부산"}>
                      부산
                    </option>
                    <option disabled={trans.transStartLocation === "구미"}>
                      구미
                    </option>
                  </>
                )}
              </Select>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                가격
              </FormLabel>
              <Input value={trans.transPrice} onChange={handlePriceChange} />
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                상품 설명 텍스트
              </FormLabel>
              <Textarea
                value={trans.transContent}
                onChange={handleContentChange}
              />
            </Flex>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Flex w={"90%"} ml={"5%"} gap={"5%"} mt={8}>
            <Button
              w={"50%"}
              h={"60px"}
              colorScheme={"white"}
              color={"black"}
              border={"1px solid black"}
              onClick={() => navigate(-1)}
            >
              취소
            </Button>
            <Button
              w={"50%"}
              h={"60px"}
              colorScheme={"blue"}
              onClick={handleSubmitTrans}
            >
              저장 하기
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}
