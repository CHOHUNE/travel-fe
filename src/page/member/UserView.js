import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import axios from "axios";

export function UserView() {
  const [user, setUser] = useState(null);
  const [params] = useSearchParams();

  // --------- 탈퇴 모달 HOOK ---------
  const { onClose, onOpen, isOpen } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setUser(response.data));
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
        navigate("/");
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
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>{user.userId}님 정보</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={2}>
            <FormLabel>password</FormLabel>
            <Input type="password" value={user.userPassword} readOnly />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>이름</FormLabel>
            <Input type="text" value={user.userName} readOnly />
          </FormControl>

          <FormControl>
            <FormLabel>휴대전화</FormLabel>
            <Input type="number" value={user.userPhoneNumber} readOnly />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Input value={user.userEmail} readOnly />
          </FormControl>
        </CardBody>

        <CardFooter>
          <Flex gap={2}>
            <Button
              onClick={() => navigate("/user/edit?" + params.toString())}
              colorScheme="purple"
            >
              수정
            </Button>
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
            <Button
              isDisabled={isSubmitting}
              onClick={handleDelete}
              colorScheme="red"
            >
              탈퇴
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
