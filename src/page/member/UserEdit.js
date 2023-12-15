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
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export function UserEdit() {
  const [params] = useSearchParams();
  const id = params.get("userId");

  const [user, setUser] = useState(null);

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPostCode, setUserPostCode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userDetailAddress, setUserDetailAddress] = useState("");
  const [phonePart1, setPhonePart1] = useState("");
  const [phonePart2, setPhonePart2] = useState("");
  const [phonePart3, setPhonePart3] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  useEffect(() => {
    axios.get("/api/member?" + params.toString()).then((response) => {
      setUser(response.data);
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      setUserPostCode(response.data.userPostCode);
      setUserAddress(response.data.userAddress);
      setUserDetailAddress(response.data.userDetailAddress);

      const phoneParts = response.data.userPhoneNumber.split("-");
      const emailParts = response.data.userEmail.split("@");
      if (phoneParts.length === 3 && emailParts.length === 2) {
        setPhonePart1(phoneParts[0]);
        setPhonePart2(phoneParts[1]);
        setPhonePart3(phoneParts[2]);
        setEmailId(emailParts[0]);
        setEmailDomain(emailParts[1]);
      }
    });
  }, []);

  const combinedPhoneNumber = `${phonePart1}-${phonePart2}-${phonePart3}`;
  const combinedEmail = `${emailId}@${emailDomain}`;

  const [emailAvailable, setEmailAvailable] = useState(false);
  const [phoneNumberAvailable, setPhoneNumberAvailable] = useState(false);
  const [postCodeAvailable, setPostCodeAvailable] = useState(false);
  const [addressAvailable, setAddressAvailable] = useState(false);
  const [detailAddressAvailable, setDetailAddressAvailable] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------- 비밀번호 체크 -------------
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  // ------------- SMS 정보 -------------
  const [sendSMS, setSendSMS] = useState("");
  const [sendSmsOk, setSendSmsOk] = useState(false);

  // 기존 이메일과 같은지 다른지
  let sameOriginEmail = false;
  if (user !== null) {
    sameOriginEmail = user.userEmail === combinedEmail;
  }
  let emailChecked = sameOriginEmail || emailAvailable;

  // 기존 핸드폰번호와 같은지 다른지
  let sameOriginPhoneNumber = false;
  if (user !== null) {
    sameOriginPhoneNumber = user.userPhoneNumber === combinedPhoneNumber;
  }
  let phoneNumberChecked = sameOriginPhoneNumber || phoneNumberAvailable;

  // 기존 주소와 같은지 다른지
  let sameOriginPostCode = false;
  if (user !== null) {
    sameOriginPostCode = user.userPostCode || postCodeAvailable;
  }
  let sameOriginAddress = false;
  if (user !== null) {
    sameOriginAddress = user.userAddress || addressAvailable;
  }
  let sameOriginDetailAddress = false;
  if (user !== null) {
    sameOriginDetailAddress = user.userDetailAddress || detailAddressAvailable;
  }

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

  // ------------- 핸드폰번호 변경되었을때만 본인인증 Input창 나오도록 -------------
  const [isPhoneModified, setIsPhoneModified] = useState(false);

  const handlePhoneChange = (part, value) => {
    setIsPhoneModified(true);
    if (part === "part1") setPhonePart1(value);
    if (part === "part2") setPhonePart2(value);
    if (part === "part3") setPhonePart3(value);
  };

  if (user === null) {
    return <Spinner />;
  }

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .put("/api/member/edit", {
        userId,
        userPassword,
        userPhoneNumber: combinedPhoneNumber,
        userEmail: combinedEmail,
        userPostCode,
        userAddress,
        userDetailAddress,
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
          navigate("/");
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

  // ---------- 이메일 중복체크 ----------
  function handleEmailCheck() {
    const params1 = new URLSearchParams();
    params1.set("userEmail", combinedEmail);

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

  // ---------- 카카오 우편번호 API 로직 ----------
  const handleDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        handleAddressComplete(data);
      },
    }).open();
  };
  const handleComplete = (data) => {
    let extraAddress = "";
    let address = data.address;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    handleAddressComplete({
      zonecode: data.zonecode,
      address: address,
    });
  };
  const handleAddressComplete = (data) => {
    setUserPostCode(data.zonecode);
    setUserAddress(data.address);
    setUserDetailAddress(""); // 주소를 클릭할 때 상세주소를 초기화하거나 필요한 처리 수행
  };

  // ------------- SMS 인증 로직 -------------
  function handleSMSButton() {
    axios
      .post("/api/member/sendSMS", {
        userPhoneNumber: combinedPhoneNumber,
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
      .post("/api/member/sendSmsOk2", {
        verificationCode: sendSMS,
        userPhoneNumber: combinedPhoneNumber,
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
            <FormHelperText w={"63%"} ml={120}>
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
                우편번호
              </FormLabel>
              <Input
                placeholder="우편번호"
                mb={3}
                value={userPostCode}
                onChange={(e) => setUserPostCode(e.target.value)} // 주소검색 버튼 클릭 시 팝업 열도록 설정
              />
              <Button onClick={handleDaumPostcode}>주소검색</Button>
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
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
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
                value={userDetailAddress}
                onChange={(e) => setUserDetailAddress(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3}>
            <Flex gap={2}>
              <FormLabel
                w={320}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                휴대전화
              </FormLabel>
              <Flex>
                <Input
                  type="number"
                  value={phonePart1}
                  w={93}
                  onChange={(e) => handlePhoneChange("part1", e.target.value)}
                />
                <Box mt={2} mx={2}>
                  -
                </Box>
                <Input
                  type="number"
                  value={phonePart2}
                  w={100}
                  onChange={(e) => handlePhoneChange("part2", e.target.value)}
                />
                <Box mt={2} mx={2}>
                  -
                </Box>
                <Input
                  type="number"
                  value={phonePart3}
                  w={100}
                  onChange={(e) => handlePhoneChange("part3", e.target.value)}
                />
              </Flex>
              <Button
                isDisabled={phoneNumberChecked}
                w={"170px"}
                onClick={handleSMSButton}
              >
                본인인증
              </Button>
            </Flex>
          </FormControl>

          {isPhoneModified && (
            <FormControl mb={3}>
              <Flex gap={2}>
                <FormLabel
                  w={98}
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  본인인증번호
                </FormLabel>
                <Input
                  type="number"
                  value={sendSMS}
                  width={150}
                  onChange={(e) => {
                    setSendSMS(e.target.value);
                    setPhoneNumberAvailable(false);
                  }}
                />
                <Button w={95} onClick={handleSMSOk}>
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
              <Flex>
                <Input
                  type="email"
                  value={emailId}
                  w={155}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <Box mt={2} mx={2}>
                  @
                </Box>
                <Input
                  type="email"
                  value={emailDomain}
                  w={155}
                  onChange={(e) => setEmailDomain(e.target.value)}
                />
              </Flex>
              <Button isDisabled={emailChecked} onClick={handleEmailCheck}>
                중복확인
              </Button>
            </Flex>
          </FormControl>
        </CardBody>

        <CardFooter alignItems={"center"}>
          <Flex gap={2}>
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
          </Flex>
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
