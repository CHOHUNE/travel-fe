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
import { useNavigate, useSearchParams } from "react-router-dom";

export function FindPwChange() {
  const [params] = useSearchParams();
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("/api/member?" + params.toString()).then((response) => {
  //     setUserId(response.data.userId);
  //   });
  // }, []);

  function handleSubmit() {
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
      .finally(() => navigate("/"));
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

          <FormControl mb={3}>
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
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            확인
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
