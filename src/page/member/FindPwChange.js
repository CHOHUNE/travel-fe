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
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function FindPwChange() {
  const [params] = useSearchParams();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  // ------------- 연속 클릭 방지 -------------
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ------------- 수정 활성화/비활성화 -------------
  let submitAvailable = true;

  // ------------- 패스워드 일치하지 않으면 가입버튼 비활성화 -------------
  if (userPassword !== userPasswordCheck) {
    submitAvailable = false;
  }

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .put("/api/member/findPwChange", {
        userPassword,
      })
      .then((response) => {
        toast({
          description: "비밀번호 변경하였습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          toast({
            description: "관리자에게 문의해주시기 바랍니다.",
            status: "error",
          });
        }
      })
      .finally(() => {
        navigate("/");
        setIsSubmitting(false);
      });
  }

  return (
    <Center m={20}>
      <Card w={"lg"}>
        <CardHeader>
          <Heading textAlign={"center"}>비밀번호 변경</Heading>
        </CardHeader>

        <CardBody>
          <FormControl mb={3}>
            <Flex>
              <FormLabel
                w={170}
                textAlign={"center"}
                display={"flex"}
                alignItems={"center"}
              >
                새로운 비밀번호
              </FormLabel>
              <Input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Flex>
          </FormControl>

          <FormControl mb={3} isInvalid={userPassword !== userPasswordCheck}>
            <Flex>
              <FormLabel
                w={170}
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
            <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button
            isDisabled={!submitAvailable || isSubmitting}
            colorScheme="blue"
            onClick={handleSubmit}
          >
            수정
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
