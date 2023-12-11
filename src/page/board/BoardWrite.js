import {
  Alert,
  Box,
  Button, Card, CardBody, CardHeader, Divider,
  Flex,
  flexbox,
  FormControl, FormHelperText,
  FormLabel, Heading, Icon, Image,
  Input, Stack, StackDivider, Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {CommentContainer} from "../comment/CommentContainer";
import {InfoOutlineIcon, PhoneIcon} from "@chakra-ui/icons";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .postForm("/api/board/add", { title, content, writer,uploadFiles })
      .then((response) => {
        console.log(response.data);
        toast({ description: "글이 작성되었습니다.", status: "success" });
        navigate("/boardList");
      })
      .catch(() => {
        toast({ description: "글이 작성 안됬습니다.", status: "error" });
      })
      .finally(() => {
        console.log("done");
        setIsSubmitting(false);
      });
  }

  let selectedOption;

  function handleOptionChange() {}

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
                  <Text  fontSize='md' _hover={{cursor: 'pointer', color: 'green' }} onClick={() => navigate("/notice")}>
                    자주 찾는 질문
                  </Text>
                </Box>

                <Divider my="4" />
                <Box>
                  <Text fontSize='md' _hover={{cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/boardList")}>
                    게 시 판
                  </Text>
                </Box>
                {/* 구분선 추가 */}
                <Divider my="4" />
                <Box>
                  <Text fontSize='md' _hover={{ cursor: 'pointer', color: 'green'  }} onClick={() => navigate("/boardwrite")}>
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

          <br />
          <Heading size='md'>게시글 작성</Heading>
          <br />

          <Box>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <br />
            </FormControl>

            <FormControl>
              <FormLabel>본문</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Textarea>
              <br />
            </FormControl>
            <FormControl>
              <FormLabel> 이미지</FormLabel>
              <Input type="file" accept="image/*"  multiple  onChange={(e)=>setUploadFiles(e.target.files)}/>
              <FormHelperText>
                한 개 파일은 1MB 이내 총 용량은 10MB 이내로 첨부하세요
              </FormHelperText>
              <br />
            </FormControl>
            <FormControl>
              <FormLabel>작성자</FormLabel>
              <Input
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
              ></Input>
              <br />
            </FormControl>
            <br />
            <Button
              isDisabled={isSubmitting}
              onClick={handleSubmit}
              colorScheme="green"
            >
              {" "}
              저장{" "}
            </Button>
          </Box>
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
