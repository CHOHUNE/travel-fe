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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

export function TransPortEdit() {
  // 운송 상품 관련
  const [trans, updateTrans] = useImmer([]);
  // 운송 상품 메인 이미지 관련
  const [mainImageSubmit, setMainImageSubmit] = useState(true);
  const [removeMainImageId, setRemoveMainImageId] = useState([]);
  const [transMainImage, setTransMainImage] = useState("");
  // 운송 상품 서브 이미지 관련
  const [removeContentImageIds, setRemoveContentImageIds] = useState([]);
  const [transContentImages, setTransContentImages] = useState([]);

  const navigate = useNavigate();

  const toast = useToast();

  const { id } = useParams();

  // useEffect(() => {
  //   axios.get("/api/transport/id/" + id).then((response) => {
  //     updateTrans(response.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get("/api/transport/id/" + id).then((response) => {
      const data = response.data;
      // 서버로부터 받은 날짜 문자열을 Date 객체로 변환
      data.transStartDate = data.transStartDate
        ? new Date(data.transStartDate)
        : null;
      data.transEndDate = data.transEndDate
        ? new Date(data.transEndDate)
        : null;
      // 이제 변환된 데이터를 상태로 설정
      updateTrans(data);
    });
  }, [id]);

  if (trans === null) {
    <Spinner />;
  }

  function handleSubmitTrans() {
    axios
      .putForm("/api/transport/edit", {
        transTitle: trans.transTitle,
        transPrice: trans.transPrice,
        transContent: trans.transContent,
        transAddress: trans.transAddress,
        transStartLocation: trans.transStartLocation,
        transArriveLocation: trans.transArriveLocation,
        transStartDate: trans.transStartDate,
        transEndDate: trans.transEndDate,
        tId: trans.tid,
        removeMainImageId,
        transMainImage,
        removeContentImageIds,
        transContentImages,
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

  // 시작일 수정 기능
  function handleStartDateChange(e) {
    updateTrans((draft) => {
      draft.transStartDate = e;
    });
  }

  // 마감일 수정 기능
  function handleEndDateChange(e) {
    updateTrans((draft) => {
      draft.transEndDate = e;
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

  // 해당 메인 이미지 삭제 스위치 기능
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

  // 선택한 상품 설명 이미지 삭제 스위치
  function handleRemoveContentImageSwitch(e) {
    console.log(e.target.value);
    if (e.target.checked) {
      setRemoveContentImageIds([...removeContentImageIds, e.target.value]);
    } else {
      setRemoveContentImageIds(
        removeContentImageIds.filter((item) => item !== e.target.value),
      );
    }
  }

  // 상품의 입금가 수정
  function handleInsertPriceChange(e) {
    updateTrans((draft) => {
      draft.transInsertPrice = e.target.value;
    });
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
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                제목
              </FormLabel>
              <Input value={trans.transTitle} onChange={handleTitleChange} />
            </Flex>
          </FormControl>
          <FormControl
            mt={2}
            // border={"2px solid black"}
            h={"60px"}
          >
            <Flex>
              <FormLabel
                w={"33%"}
                textAlign={"center"}
                fontSize={"1.1rem"}
                lineHeight={"60px"}
              >
                날짜선택
              </FormLabel>
              <Flex className="date-range-picker-container">
                <DatePicker
                  value={trans.transStartDate}
                  className="date-picker"
                  selected={trans.transStartDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={trans.transStartDate}
                  endDate={trans.transEndDate}
                  isClearable={true}
                  placeholderText="시작일"
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={new Date()}
                />
                <DatePicker
                  value={trans.transEndDate}
                  className="date-picker"
                  selected={trans.transEndDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={trans.transStartDate}
                  endDate={trans.transEndDate}
                  isClearable={true}
                  placeholderText="마감일"
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={trans.transStartDate}
                />
              </Flex>
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
                    <option>경기</option>
                    <option>충북</option>
                    <option>충남</option>
                    <option>대전</option>
                    <option>세종</option>
                    <option>강원</option>
                    <option>전북</option>
                    <option>전남</option>
                    <option>경북</option>
                    <option>경남</option>
                    <option>부산</option>
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
                    <option disabled={trans.transStartLocation === "경기"}>
                      경기
                    </option>
                    <option disabled={trans.transStartLocation === "충북"}>
                      충북
                    </option>
                    <option disabled={trans.transStartLocation === "충남"}>
                      충남
                    </option>
                    <option disabled={trans.transStartLocation === "대전"}>
                      대전
                    </option>
                    <option disabled={trans.transStartLocation === "세종"}>
                      세종
                    </option>
                    <option disabled={trans.transStartLocation === "강원"}>
                      강원
                    </option>
                    <option disabled={trans.transStartLocation === "전북"}>
                      전북
                    </option>
                    <option disabled={trans.transStartLocation === "전남"}>
                      전남
                    </option>
                    <option disabled={trans.transStartLocation === "경북"}>
                      경북
                    </option>
                    <option disabled={trans.transStartLocation === "경남"}>
                      경남
                    </option>
                    <option disabled={trans.transStartLocation === "부산"}>
                      부산
                    </option>
                  </>
                )}
              </Select>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                입금 가격
              </FormLabel>
              <Input
                type={"number"}
                value={trans.transInsertPrice}
                onChange={handleInsertPriceChange}
              />
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                판매 가격
              </FormLabel>
              <Input
                type={"number"}
                value={trans.transPrice}
                onChange={handlePriceChange}
              />
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
          <FormControl>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} fontSize={"1.1rem"}>
                기존 상품 설명 이미지
              </FormLabel>
              <Box w={"50%"}>
                {trans.contentImages != null ? (
                  <>
                    {trans.contentImages.map((file) => (
                      <Card>
                        <CardBody>
                          <Image
                            src={file.url}
                            key={file.id}
                            w={"90%"}
                            ml={"5%"}
                            mt={2}
                          />
                        </CardBody>
                        <CardFooter>
                          <FormControl
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <FormLabel m={0} p={0}>
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </FormLabel>
                            <Switch
                              value={file.id}
                              colorScheme="red"
                              onChange={handleRemoveContentImageSwitch}
                            />
                          </FormControl>
                        </CardFooter>
                      </Card>
                    ))}
                  </>
                ) : (
                  <Box>빈값</Box>
                )}
              </Box>
            </Flex>
          </FormControl>
          <FormControl mt={4}>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} lineHeight={"65px"}>
                추가할 상품 설명 이미지
              </FormLabel>
              <Box>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setTransContentImages(e.target.files);
                  }}
                />
                <FormHelperText>
                  한 개 파일은 1MB 이내, 총 용량은 10MB 이내로 첨부하세요.
                </FormHelperText>
              </Box>
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
