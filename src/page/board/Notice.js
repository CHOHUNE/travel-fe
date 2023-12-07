  import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,Text,
  Card, CardBody, CardHeader,
  Flex, Heading, Stack, StackDivider
} from "@chakra-ui/react";
export function Notice() {




    return(
      <Box>
        <Flex justifyContent={"space-between"}>
        <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                항공권 예약 문의는 어느 곳에서 해야 하나요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            항공권은 1544-5252 연결 후, 2번 또는 1544-5353으로 연결 요청드립니다.
            1544-5252 연결 후, 1번은 패키지 관련 상담입니다.

          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                국내 패키지 일정표 내 항공 시간이 없네요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            예약과 동시에 가능 여부 체크 진행이 되며 해당되는 좌석으로 실시간으로 항공 가격이 책정되어, 좌석 상황에 따라 항공료는 변동될 수 있습니다.
          </AccordionPanel>
        </AccordionItem>



        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                지금 해외 패키지 상품 예약이 가능한가요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            현재 코로나로 인하여 각 국가별 입국 가능 조건이 상이하며, 사전 고지 없이 변경될 수 있습니다. 자세한 사항은 당사 홈페이지 내 ‘국가별 입국 규정 안내’를 참고 부탁드립니다.

          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                호텔은 어디로 예약관련 및 상품권 사용 문의
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            호텔은 예약 상담 불가하며, 실시간 PC 및 모바일을 통해 실시간 예약만 가능합니다.
            상품권 사용의 경우 대부분 사용이 제한되고 있으나, 일부 가능 호텔의 경우 전화 문의는 불가하여, 실시간 예약 후 결제 시 상품권 결제 창 활성화될 경우 가능합니다.
            불편을 끼쳐드린 점 양해 부탁드립니다.

          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                항공권 예약 문의는 어느 곳에서 해야 하나요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            항공권은 1544-5252 연결 후, 2번 또는 1544-5353으로 연결 요청드립니다.
            1544-5252 연결 후, 1번은 패키지 관련 상담입니다.

          </AccordionPanel>
        </AccordionItem>


        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                아시아나 항공 마일리지 결제가 가능한 상품은 어떤 상품인가요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            아시아나 항공 이용하는 패키지 상품만 가능하며, 단품(항공, 호텔) 만은 이용 불가합니다.
          </AccordionPanel>
        </AccordionItem>




        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                항공 / 호텔 전화 연결이 어렵다는 문의
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            현재 근무시간 변경 및 내부 사정으로 인한 전화 연결이 상당히 어렵습니다.
            최대한 게시판을 이용해 주시길 부탁드립니다.
          </AccordionPanel>
        </AccordionItem>




        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                아시아나 항공 마일리지 결제가 가능한 상품은 어떤 상품인가요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            아시아나 항공 이용하는 패키지 상품만 가능하며, 단품(항공, 호텔) 만은 이용 불가합니다.
          </AccordionPanel>
        </AccordionItem>




        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                모두투어 상품권은 어떻게 이용하나요?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            모두투어 여행상품권은 모두투어 및 전국 모두투어 대리점에서 사용하실 수 있습니다.
            모두투어 여행상품권은 모두투어 여행상품과 교환하실 수 있습니다. (단, 항공권 및 각종 티켓과는 교환되지 않습니다.)
          </AccordionPanel>
        </AccordionItem>




      </Accordion>
          <Card>
            <CardHeader>
              <Heading size='md'> travel 투어 고객센터</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    해외/국내 여행상담
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    1544-5252
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    해외/국내 항공상담
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    1544-5353
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    부산/대구출발 여행상담
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    1544-6722
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    기업행사/출장문의
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    1661-4873
                    <br/>
                    https://biz.modetour.com
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>

        </Flex>
      </Box>
    );
  }

