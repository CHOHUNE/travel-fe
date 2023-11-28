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
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserSignup() {
  // - - - - - - - 고객 정보 - - - - - - -
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress1, setUserAddress1] = useState("");
  const [userAddress2, setUserAddress2] = useState("");
  const [userAddress3, setUserAddress3] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // ------------- 비밀번호 체크 -------------
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  // ------------- Id 중복확인 -------------
  const [userIdCheck, setUserIdCheck] = useState(false);

  // ------------- toast / navigate -------------
  const toast = useToast();
  const navigate = useNavigate();

  // ------------- 가입버튼 활성화/비활성화 -------------
  let submitAvailable = true;

  // ------------- 중복확인 누르지 않을경우 가입버튼 비활성화 -------------
  if (!userIdCheck) {
    submitAvailable = false;
  }

  // ------------- 패스워드 일치하지 않으면 가입버튼 비활성화 -------------
  if (userPassword !== userPasswordCheck) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        userId,
        userPassword,
        userName,
        userAddress1,
        userAddress2,
        userAddress3,
        userPhoneNumber,
        userEmail,
      })
      .then(() => {
        toast({
          description: "회원가입이 완료되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "입력값을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "서버 오류가 발생하였습니다.",
            status: "error",
          });
        }
      });
  }

  // ------------- ID 중복확인 -------------
  function handleIdCheck() {
    const searchParams = new URLSearchParams();
    searchParams.set("userId", userId);

    axios
      .get("/api/member/check?" + searchParams.toString())
      .then(() => {
        setUserIdCheck(false);
        toast({
          description: "이미 사용중인 ID 입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        setUserIdCheck(true);
        if (error.response.status === 404) {
          toast({
            description: "사용 가능한 ID 입니다.",
            status: "success",
          });
        }
      });
  }

  return (
    <Center m={20}>
      <Card w={"xl"}>
        <CardHeader>
          <Heading textAlign={"center"}>회원가입</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={3}>
            <Flex gap={2}>
              <FormLabel
                w={160}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                아이디
              </FormLabel>
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <Button onClick={handleIdCheck}>중복확인</Button>
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                비밀번호
              </FormLabel>
              <Input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex textAlign={"center"} display={"flex"} alignItems={"center"}>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                비밀번호 확인
              </FormLabel>
              <Input
                value={userPasswordCheck}
                onChange={(e) => setUserPasswordCheck(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                이름
              </FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex gap={2}>
              <FormLabel
                w={160}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                우편번호
              </FormLabel>
              <Input
                placeholder="우편번호"
                mb={3}
                value={userAddress1}
                onChange={(e) => setUserAddress1(e.target.value)}
              />
              <Button>주소검색</Button>
            </Flex>

            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                상세주소
              </FormLabel>
              <Input
                mb={3}
                value={userAddress2}
                onChange={(e) => setUserAddress2(e.target.value)}
              />
            </Flex>

            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                나머지주소
              </FormLabel>
              <Input
                value={userAddress3}
                onChange={(e) => setUserAddress3(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex gap={2}>
              <FormLabel
                w={160}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                휴대전화
              </FormLabel>
              <Input
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
              <Button>본인인증</Button>
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                이메일
              </FormLabel>
              <Input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Flex>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button
            isDisabled={!submitAvailable}
            colorScheme="blue"
            onClick={handleSubmit}
          >
            가입
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
