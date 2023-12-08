  import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Text,
  Card, CardBody, CardHeader,
  Flex, Heading, Stack, StackDivider, Spacer, ButtonGroup, Button, Center, SimpleGrid, Input, VStack, Divider
} from "@chakra-ui/react";
  import React, {useEffect, useState} from "react";
  import {useNavigate} from "react-router-dom";
  import axios from "axios";
  import { Icon } from '@chakra-ui/react';
  import {InfoOutlineIcon, PhoneIcon} from "@chakra-ui/icons";
export function Notice() {
  const [noticeList, setNoticeList] = useState([]); //map이 안된 이유 초기값이 없어서 []
  const navigate = useNavigate();


  function handleSwitch(type) {

    axios.get(("/api/notice/list?type="+type))
      .then((response)=>setNoticeList(response.data))
      .catch(()=>console.log("b"))
      .finally(()=>console.log("d"))

  }

  return(
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
                    <Text  fontSize='md' _hover={"pointer"} onClick={() => navigate("/notice")}>
                      자주 찾는 질문
                    </Text>
                  </Box>

                  <Divider my="4" />
                  <Box>
                    <Text fontSize='md' _hover={"pointer"} onClick={() => navigate("/boardList")}>
                      게 시 판
                    </Text>
                  </Box>
                  {/* 구분선 추가 */}
                  <Divider my="4" />
                  <Box>
                    <Text fontSize='md'>
                      고객의 소리
                    </Text>
                  </Box>

                  <Divider my="4" />
                  <Box>
                    <Text  fontSize='md'>
                      소비자 중심 경영
                    </Text>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Box>
          <Box  w="60%" padding={"10px"}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <Heading size='md'> 자주 찾는 질문</Heading>
            <br></br>
            <Stack direction='row' spacing={3} padding={"5px"} >
            <Button size={"sm"} variant='outline' color={"green"} onClick={()=>handleSwitch(1)}> 급상승 질문  </Button>
            <Button size={"sm"} variant='outline' color={"green"} onClick={()=>handleSwitch(2)} > 패키지 여행  </Button>
            <Button size={"sm"} variant='outline' color={"green"} onClick={()=>handleSwitch(3)}> 자유 여행 </Button>
            <Button size={"sm"} variant='outline' color={"green"} onClick={()=>handleSwitch(4)}>  항 공 </Button>
            <Button size={"sm"} variant='outline' color={"green"} onClick={()=>handleSwitch(5)}>  호 텔  </Button>
            </Stack>
          <br></br>

            {noticeList.map((notice) => (
              <AccordionItem key={notice.id}>
                <h2>
                  <AccordionButton>
                    <Box as="span" padding={"15px"} flex='1' fontSize={"13px"} as='b' textAlign='left'>
                      {notice.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {notice.content}
                </AccordionPanel>
              </AccordionItem>
            ))}
      </Accordion>
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

