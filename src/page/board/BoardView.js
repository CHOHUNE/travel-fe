import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Card,
  Image,
  Spinner,
  Textarea,
  useToast,
  CardBody,
  CardHeader,
  Divider,
  Text,
  Spacer,
  ButtonGroup,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  StackDivider, Icon,
} from "@chakra-ui/react";
import { CommentContainer } from "../../page/comment/CommentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {InfoOutlineIcon, PhoneIcon} from "@chakra-ui/icons";


export function BoardView() {
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios.delete("/api/board/remove/" + id).then(() => {
      toast({ description: "삭제되었습니다.", status: "error" });
      navigate("/");
    });
  }


  function handleLike() {
    axios
      .post("/api/boardLike", { boardId: board.id })
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }
  return (


    <Box w="80%" ml="10%">

      <br/>
      <br/>
      <Flex textAlign={"center"} >
        <Box w="20%" padding={"10px"}>

          <Card>
            <CardHeader>
              <Heading size='md'>투어 고객센터</Heading>
            </CardHeader>


            <CardBody textAlign={"left"}>
              <Box>
                <Divider my="2" />
                <Box>
                  <Text  fontSize='md' _hover={{cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/notice")}>
                    자주 찾는 질문
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text fontSize='md' _hover={{ cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/boardList")}>
                    게 시 판
                  </Text>
                </Box>
                {/* 구분선 추가 */}
                <Divider my="4" />
                <Box>
                  <Text fontSize='md'  _hover={{ cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/boardwrite")}>
                    고객의 소리
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text fontSize='md' _hover={{ cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/NoticeSound")}>
                    소비자 중심 경영
                  </Text>
                </Box>
              </Box>
            </CardBody>
          </Card>
        </Box>



        <Box  w="60%" padding={"10px"}>
          <Flex justifyContent="space-between">
            <Heading size="xl">{board.id}번 글 보기</Heading>
            <Button variant="ghost" size="xl" onClick={handleLike}>
              <FontAwesomeIcon icon={faHeart} size="xl" />
            </Button>
          </Flex>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={board.title} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea value={board.content} readOnly />
          </FormControl>

          {board.files.map((file) => (
            <Card key={file.id} my={5}>
              <CardBody>
                <Image width="100%" src={file.url} alt={file.name} />
              </CardBody>
            </Card>
          ))}

          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input value={board.writer} readOnly />
          </FormControl>
          <FormControl>
            <FormLabel>작성일시</FormLabel>
            <Input value={board.inserted} readOnly />
          </FormControl>

          <br />

          <Flex justifyContent={"space-between"}>
            <Button colorScheme={"green"} onClick={() => navigate("/edit/" + id)}>
              수정
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              삭제
            </Button>
          </Flex>

          <CommentContainer boardId={id}/>
        </Box>


        <Box w={"20%" }padding={"10px"}>
          <Card>
            <CardHeader>
              <Heading size='md'>투어 고객센터</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    <Icon as={PhoneIcon}/> 해외/국내 여행상담
                  </Heading>
                  <Text pt='2' fontSize='md' fontWeight="bold" color={"green"}>
                    1544-5252
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    <Icon as={PhoneIcon}/>  해외/국내 항공상담
                  </Heading>
                  <Text  pt='2' fontSize='md' fontWeight="bold" color={"green"}>
                    1544-5353
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    <Icon as={PhoneIcon}/>  부산/대구출발 여행상담
                  </Heading>
                  <Text pt='2' fontSize='md' fontWeight="bold" color={"green"}>
                    1544-6722
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    <Icon as={PhoneIcon}/>  기업행사/출장문의
                  </Heading>
                  <Text  pt='2' fontSize='md' fontWeight="bold" color={"green"} >
                    1661-4873
                  </Text>
                  <Text  pt='2' fontSize='sm'  color={"gray"} >
                    https://biz.tour.com
                  </Text>
                </Box>
                <Box textAlign={"left"}>
                  <Heading size='xs'  textTransform='uppercase'  p='2'>
                    <Icon as={InfoOutlineIcon}/> 상담시간 안내
                  </Heading>

                  <Text  pt='2' fontSize='11px'  >
                    *해외/국내 여행 및 항공상담
                    평일 9:00 ~ 18:00 (토/일요일 및 공휴일 휴무)
                  </Text>
                  <Text  pt='2' fontSize='11px'  >
                    *항공권은 전화상담 예약 시 항공료 외 별도의 취급 수수료가 발생합니다.
                  </Text>
                  <Text  pt='2' fontSize='11px'  >
                    *항공 시스템 결제요청, 환불/변경 문의
                    평일 9:00 ~ 17:00 (토/일요일 및 공휴일 휴무)
                  </Text>

                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>

      </Flex>
    </Box>


  );
}
