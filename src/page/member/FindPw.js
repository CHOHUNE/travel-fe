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
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function FindPw() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [sendSMS, setSendSMS] = useState("");
  const [sendSmsOk, setSendSmsOk] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  // ------------- 확인버튼 활성화/비활성화 -------------
  let submitAvailable = true;

  // 인증번호 확인 버튼 누르지 않으면 저장버튼 비활성화
  if (!sendSmsOk) {
    submitAvailable = false;
  }

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .post("api/member/findPw", {
        userId,
        userName,
        userPhoneNumber,
      })
      .then((response) => {
        navigate("/findPwChange");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "회원정보가 없습니다.",
            status: "warning",
          });
        } else {
          toast({
            description: "관리자에게 문의해주시기 바랍니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleSMSButton() {
    axios
      .post("/api/member/sendSMS", {
        userPhoneNumber,
      })
      .then(() => {
        toast({
          description: "인증번호가 발송되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast({
            description: "핸드폰 번호를 다시 입력해주시기 바랍니다.",
            status: "error",
          });
        } else {
          toast({
            description: "관리자에게 문의해주시기 바랍니다.",
            status: "error",
          });
        }
      });
  }

  function handleSMSOk() {
    axios
      .post("/api/member/sendSmsOk", {
        verificationCode: sendSMS,
        userPhoneNumber,
      })
      .then((response) => {
        setSendSmsOk(true);
        toast({
          description: "인증번호 확인되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // 인증되지 않거나 다른 값을 쓸 경우
          toast({
            description: "입력값을 확인해주세요",
            status: "error",
          });
        } else {
          toast({
            description: "관리자에게 문의해주시기 바랍니다.",
            status: "error",
          });
        }
      });
  }

  return (
    <Center m={20}>
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>비밀번호 찾기</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={134}
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
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={134}
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
                휴대전화
              </FormLabel>
              <Input
                type="number"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
              <Button onClick={handleSMSButton}>본인인증</Button>
            </Flex>
          </FormControl>

          {userPhoneNumber && (
            <FormControl mb={3}>
              <Flex gap={2}>
                <FormLabel
                  w={160}
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  인증번호
                </FormLabel>
                <Input
                  type="number"
                  value={sendSMS}
                  onChange={(e) => setSendSMS(e.target.value)}
                />
                <Button w={95} onClick={handleSMSOk}>
                  확인
                </Button>
              </Flex>
            </FormControl>
          )}
        </CardBody>

        <CardFooter>
          <Button
            mr={2}
            isDisabled={!submitAvailable || isSubmitting}
            colorScheme="blue"
            onClick={handleSubmit}
          >
            확인
          </Button>
          <Button onClick={() => navigate("/login")}>닫기</Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
