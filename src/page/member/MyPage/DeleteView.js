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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function DeleteView() {
  const [user, setUser] = useState(null);
  const [params] = useSearchParams();

  // --------- 탈퇴 모달 HOOK ---------
  const { onClose, onOpen, isOpen } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phonePart1, setPhonePart1] = useState("");
  const [phonePart2, setPhonePart2] = useState("");
  const [phonePart3, setPhonePart3] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => {
        const user = response.data;
        setUser(user);

        const phoneParts = user.userPhoneNumber.split("-");
        if (phoneParts.length === 3) {
          setPhonePart1(phoneParts[0]);
          setPhonePart2(phoneParts[1]);
          setPhonePart3(phoneParts[2]);
        }

        // 이메일 분리
        const emailParts = user.userEmail.split("@");
        if (emailParts.length === 2) {
          setEmailId(emailParts[0]);
          setEmailDomain(emailParts[1]);
        }
      })
      .catch((error) => {
        navigate("/login");
        toast({
          description: "권한이 없습니다.",
          status: "warning",
        });
      });
  }, []);

  if (user === null) {
    return <Spinner />;
  }

  function handleDelete() {
    setIsSubmitting(true);

    axios
      .delete("/api/member?" + params.toString())
      .then(() => {
        toast({
          description: "회원 탈퇴하였습니다.",
          status: "success",
        });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
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
        onClose();
      });
  }

  return (
    <Center m={20}>
      <Card w={"xl"}>
        <CardHeader>
          <Heading textAlign={"center"}>{user.userId}님 정보</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={2}>
            <FormLabel>이름</FormLabel>
            <Input type="text" value={user.userName} readOnly />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>password</FormLabel>
            <Input type="password" value={user.userPassword} readOnly />
          </FormControl>

          <FormControl>
            <FormLabel>휴대전화</FormLabel>
            <Flex>
              <Input type="number" value={phonePart1} readOnly w="30%" />
              <Box mt={2} mx={2}>
                -
              </Box>
              <Input type="number" value={phonePart2} readOnly w="30%" />
              <Box mt={2} mx={2}>
                -
              </Box>
              <Input type="number" value={phonePart3} readOnly w="30%" />
            </Flex>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Flex>
              <Input value={emailId} readOnly w="50%" />
              <Box mt={2} x mx={2}>
                @
              </Box>
              <Input value={emailDomain} readOnly w="45%" />
            </Flex>
          </FormControl>

          <FormControl mt={10}>
            <FormLabel
              border={"1px solid #f5f6f6"}
              background={"#F5F6F8"}
              h={"100px"}
              display="flex"
              alignItems="center"
              justifyContent="left"
              textIndent={"20px"}
            >
              <Box>
                <Box fontSize={"13px"}>
                  ·회원탈퇴 버튼을 클릭하면 관리자 승인 없이 즉시 탈퇴됩니다.
                </Box>
                <br />
                <Box fontSize={"13px"} mt={-5}>
                  ·회원 탈퇴 후에는 회원 서비스를 더 이상 이용 할 수 없습니다.
                </Box>
                <br />
                <Box fontSize={"13px"} mt={-5}>
                  ·서비스를 이용 중인 회원은 탈퇴와 동시에 서비스가 중단됩니다.
                </Box>
                <br />
                <Box fontSize={"13px"} mt={-5} color={"red"}>
                  ·탈퇴 전에 다시한번 확인바랍니다.
                </Box>
              </Box>
            </FormLabel>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Flex gap={2}>
            <Button onClick={() => onOpen()} colorScheme="red">
              탈퇴
            </Button>
          </Flex>
        </CardFooter>
      </Card>

      {/* 탈퇴 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="red">
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
