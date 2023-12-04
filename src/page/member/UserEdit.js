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
  FormErrorMessage,
  FormHelperText,
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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function UserEdit() {
  const [params] = useSearchParams();
  const id = params.get("userId");

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/member?" + params.toString()).then((response) => {
      setUser(response.data);
      setUserId(response.data.userId);
      setUserEmail(response.data.userEmail);
      setUserName(response.data.userName);
      setUserPhoneNumber(response.data.userPhoneNumber);
    });
  }, []);

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [emailAvailable, setEmailAvailable] = useState(false);
  const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------- 비밀번호 체크 -------------
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  // ------------- SMS 정보 -------------
  const [sendSMS, setSendSMS] = useState("");
  const [sendSmsOk, setSendSmsOk] = useState(false);

  // 기존 이메일과 같은지 다른지
  let sameOriginEmail = false;
  if (user !== null) {
    sameOriginEmail = user.userEmail === userEmail;
  }
  let emailChecked = sameOriginEmail || emailAvailable;

  // 기존 번호와 같은지 다른지
  let sameOriginPhoneNumber = false;
  if (user !== null) {
    sameOriginPhoneNumber = user.userPhoneNumber === userPhoneNumber;
  }
  let phoneNumberChecked = sameOriginPhoneNumber || phoneNumberAvailable;

  // 암호가 없으면 기존암호
  // 암호를 작성하면 새 암호, 암호확인 체크
  let passwordChecked = false;
  if (userPasswordCheck === userPassword) {
    passwordChecked = true;
  }
  if (userPassword.length === 0) {
    passwordChecked = true;
  }

  // ------------- toast / navigate -------------
  const toast = useToast();
  const navigate = useNavigate();

  // ------------- 모달창 -------------
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (user === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .put("/api/member/edit", {
        userId,
        userPassword,
        userPhoneNumber,
        userEmail,
      })
      .then(() => {
        toast({
          description: "회원 수정 되었습니다.",
          status: "success",
        });
        navigate("/user?" + params.toString());
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "수정 권한이 없습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "관리자에게 문의해주시기 바랍니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleEmailCheck() {
    const params1 = new URLSearchParams();
    params1.set("userEmail", userEmail);

    axios
      .get("/api/member/check?" + params1)
      .then(() => {
        setEmailAvailable(false);
        toast({
          description: "이미 사용중인 Email 입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setEmailAvailable(true);
          toast({
            description: "사용 가능한 Email 입니다.",
            status: "success",
          });
        }
      });
  }

  // ------------- SMS 인증 로직 -------------
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
        setPhoneNumberAvailable(true);
        setSendSmsOk(true);
        toast({
          description: "인증번호 확인되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        setPhoneNumberAvailable(false);
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
      <Card w={"xl"}>
        <CardHeader>
          <Heading textAlign={"center"}>{user.userId}님 회원수정</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={3} readOnly>
            <Flex>
              <FormLabel
                w={138}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                아이디
              </FormLabel>
              <Input
                value={userId}
                readOnly
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
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
                비밀번호
              </FormLabel>
              <Input
                type="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Flex>
            <FormHelperText>
              작성하지 않으면 기존 암호를 유지합니다.
            </FormHelperText>
          </FormControl>

          {userPassword.length > 0 && (
            <FormControl mb={3} isInvalid={userPassword !== userPasswordCheck}>
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
                  type="password"
                  value={userPasswordCheck}
                  onChange={(e) => {
                    setUserPasswordCheck(e.target.value);
                  }}
                />
              </Flex>
              <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
            </FormControl>
          )}

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
                readOnly
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
                  본인인증번호
                </FormLabel>
                <Input
                  type="number"
                  value={sendSMS}
                  onChange={(e) => {
                    setSendSMS(e.target.value);
                    setPhoneNumberAvailable(false);
                  }}
                />
                <Button
                  isDisabled={phoneNumberChecked}
                  w={95}
                  onClick={handleSMSOk}
                >
                  확인
                </Button>
              </Flex>
            </FormControl>
          )}

          {/* email을 변경하면 중복확인 다시 하도록 */}
          {/* 기존 email과 같으면 중복확인 안해도됨 */}
          <FormControl mb={3}>
            <Flex gap={2}>
              <FormLabel
                w={160}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                이메일
              </FormLabel>
              <Input
                type="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  setEmailAvailable(false);
                }}
              />
              <Button isDisabled={emailChecked} onClick={handleEmailCheck}>
                중복확인
              </Button>
            </Flex>
          </FormControl>
        </CardBody>

        <CardFooter alignItems={"center"}>
          <Button
            isDisabled={
              !emailChecked || !passwordChecked || !phoneNumberChecked
            }
            colorScheme="blue"
            onClick={onOpen}
          >
            수정
          </Button>
          <Button colorScheme="red" onClick={() => navigate("/")}>
            취소
          </Button>
        </CardFooter>

        {/* 수정 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>수정 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>수정 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button
                isDisabled={isSubmitting}
                onClick={handleSubmit}
                colorScheme="red"
              >
                수정
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Center>
  );
}
