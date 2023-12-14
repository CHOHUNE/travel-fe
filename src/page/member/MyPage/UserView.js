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
import UserNavBar from "../navbar/UserNavBar";

export function UserView() {
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

  return (
    <Box>
      <Center m={20}>
        <Card w={"lg"}>
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
                <Box mt={2} mx={2}>
                  @
                </Box>
                <Input value={emailDomain} readOnly w="45%" />
              </Flex>
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
            </Flex>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  );
}
