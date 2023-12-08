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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function FindId() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const [sendSMS, setSendSMS] = useState("");
  const [sendSmsOk, setSendSmsOk] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { onOpen, onClose, isOpen } = useDisclosure();

  // ------------- 확인버튼 활성화/비활성화 -------------
  let submitAvailable = true;

  // 인증번호 확인 버튼 누르지 않으면 저장버튼 비활성화
  if (!sendSmsOk) {
    submitAvailable = false;
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
        setUserId(response.data.id);
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

  //
  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .post("/api/member/findId", {
        userName,
        userPhoneNumber,
      })
      .then(() => {
        // navigate("/findIdView");
        onOpen();
      })
      .catch((error) => {
        if (
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 400
        ) {
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

  return (
    <Center m={20}>
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>아이디 찾기</Heading>
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
            isDisabled={!submitAvailable || isSubmitting}
            onClick={handleSubmit}
            colorScheme="blue"
          >
            확인
          </Button>
        </CardFooter>

        {/* 아이디 알림 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>아이디 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>당신의 아이디는 {userId} 입니다.</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={() => navigate("/findPw")}
              >
                비밀번호 찾기
              </Button>
              <Button
                isDisabled={isSubmitting}
                onClick={() => navigate("/login")}
                colorScheme="red"
              >
                로그인
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Center>
  );
}
