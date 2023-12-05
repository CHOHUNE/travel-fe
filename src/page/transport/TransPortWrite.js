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
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export function TransPortWrite() {
  const [transMainImage, setTransMainImage] = useState("");
  const [transStartDay, setTransStartDay] = useState("");
  const [transTitle, setTransTitle] = useState("");
  const [transPrice, setTransPrice] = useState("");
  const [transContent, setTransContent] = useState("");
  const [transContentImages, setTransContentImages] = useState("");
  const [transStartLocation, setTransStartLocation] = useState("");
  const [transArriveLocation, setTransArriveLocation] = useState("");

  const navigate = useNavigate();

  const toast = useToast();

  const [params] = useSearchParams();
  const type = params.get("type");
  function handleSubmitTrans() {
    axios
      .postForm("/api/transport/add", {
        type,
        transMainImage,
        transStartDay,
        transTitle,
        transPrice,
        transContent,
        transContentImages,
        transStartLocation,
        transArriveLocation,
      })
      .then(() => {
        toast({
          description: "운송 상품 등록에 성공하였습니다.",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          title: "운송 상품 등록에 실패 했습니다.",
          description: "빈값이 있는지 확인해주세요.",
          status: "error",
        });
      });
  }

  return (
    <Center>
      <Card w={"70%"} textAlign={"center"} mt={8} mb={8}>
        <CardHeader>
          <Heading>운송 상품 등록</Heading>
        </CardHeader>

        <CardBody>
          <FormControl>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} fontSize={"1.1rem"}>
                메인 이미지
              </FormLabel>
              <Box>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTransMainImage(e.target.files[0])}
                />
                <FormHelperText>
                  파일 크기는 1MB 이하로 첨부하세요
                </FormHelperText>
              </Box>
            </Flex>
          </FormControl>
          <FormControl mt={2}>
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
                value={transStartDay}
                placeholder="Select Date and Time"
                size={"md"}
                type="datetime-local"
                onChange={(e) => setTransStartDay(e.target.value)}
              />
            </Flex>
          </FormControl>
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                제목
              </FormLabel>
              <Input
                type={"text"}
                value={transTitle}
                onChange={(e) => setTransTitle(e.target.value)}
              />
            </Flex>
          </FormControl>
          {/* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 (시작) --------------------------------------- */}
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                출발지
              </FormLabel>

              <Select
                placeholder="출발 지역을 선택해주세요"
                value={transStartLocation}
                onChange={(e) => setTransStartLocation(e.target.value)}
              >
                {type === "air" ? (
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
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                도착지
              </FormLabel>

              <Select
                placeholder="도착 지역을 선택해주세요"
                value={transArriveLocation}
                onChange={(e) => setTransArriveLocation(e.target.value)}
              >
                {type === "air" ? (
                  <>
                    <option disabled={transStartLocation === "서울/김포"}>
                      서울/김포
                    </option>
                    <option disabled={transStartLocation === "부산/김해"}>
                      부산/김해
                    </option>
                    <option disabled={transStartLocation === "포항/경주"}>
                      포항/경주
                    </option>
                    <option disabled={transStartLocation === "여수/순천"}>
                      여수/순천
                    </option>
                    <option disabled={transStartLocation === "진주/사천"}>
                      진주/사천
                    </option>
                    <option disabled={transStartLocation === "제주"}>
                      제주
                    </option>
                    <option disabled={transStartLocation === "광주"}>
                      광주
                    </option>
                    <option disabled={transStartLocation === "대구"}>
                      대구
                    </option>
                    <option disabled={transStartLocation === "울산"}>
                      울산
                    </option>
                    <option disabled={transStartLocation === "청주"}>
                      청주
                    </option>
                  </>
                ) : (
                  <>
                    <option disabled={transStartLocation === "서울"}>
                      서울
                    </option>
                    <option disabled={transStartLocation === "인천"}>
                      인천
                    </option>
                    <option disabled={transStartLocation === "고양"}>
                      고양
                    </option>
                    <option disabled={transStartLocation === "성남"}>
                      성남
                    </option>
                    <option disabled={transStartLocation === "강릉"}>
                      강릉
                    </option>
                    <option disabled={transStartLocation === "춘천"}>
                      춘천
                    </option>
                    <option disabled={transStartLocation === "세종"}>
                      세종
                    </option>
                    <option disabled={transStartLocation === "천안"}>
                      천안
                    </option>
                    <option disabled={transStartLocation === "충주"}>
                      충주
                    </option>
                    <option disabled={transStartLocation === "나주"}>
                      나주
                    </option>
                    <option disabled={transStartLocation === "군산"}>
                      군산
                    </option>
                    <option disabled={transStartLocation === "부산"}>
                      부산
                    </option>
                    <option disabled={transStartLocation === "구미"}>
                      구미
                    </option>
                  </>
                )}
              </Select>
            </Flex>
          </FormControl>
          {/* --------------------------------------- 출발지 도착지 경로 컬럼 추가 연습중 (끝)--------------------------------------- */}
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                가격
              </FormLabel>
              <Input
                value={transPrice}
                onChange={(e) => setTransPrice(e.target.value)}
              />
            </Flex>
          </FormControl>
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"33%"} textAlign={"center"} fontSize={"1.1rem"}>
                상품 설명 이미지
              </FormLabel>
              <Box>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setTransContentImages(e.target.files)}
                />
                <FormHelperText>
                  한 개 파일은 1MB 이내, 총 용량은 10MB 이내로 첨부하세요.
                </FormHelperText>
              </Box>
            </Flex>
          </FormControl>
          <FormControl mt={2}>
            <Flex>
              <FormLabel w={"50%"} textAlign={"center"} fontSize={"1.1rem"}>
                상품 설명 텍스트
              </FormLabel>
              <Textarea
                value={transContent}
                onChange={(e) => setTransContent(e.target.value)}
              />
            </Flex>
          </FormControl>
        </CardBody>
        <CardFooter>
          <Flex w={"90%"} ml={"5%"} gap={"5%"}>
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
