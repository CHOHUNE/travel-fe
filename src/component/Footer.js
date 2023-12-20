import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Center w={"100%"} height={"150px"} backgroundColor={"#F5F3ED"}>
      <Box w={"65%"}>
        <Flex
          height={"100%"}
          backgroundColor={"#F5F3ED"}
          justifyContent={"space-between"}
        >
          <Box paddingTop={"20px"} width={"300px"} height={"150px"}>
            (주) TRAVEL
            <br />
            주소 : 서울시 마포구 신촌로 176 <br />
            관리자 : 조대훈 최재희 이승원 이정훈 <br />
            문의번호 : 000-0000-0000 <br />
            문의메일 : travel@gmail.com
          </Box>
          <Box>
            <Box>
              <Box ml={-2}>
                <Button bg={"#F5F3ED"}>
                  <a
                    href="https://github.com/CHOHUNE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    조대훈
                  </a>
                </Button>
                <Button bg={"#F5F3ED"}>
                  <a
                    href="https://github.com/Garbi93"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    이승원
                  </a>
                </Button>
                <Button bg={"#F5F3ED"}>
                  <a
                    href="https://github.com/travelerjh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    최재희
                  </a>
                </Button>
                <Button bg={"#F5F3ED"}>
                  <a
                    href="https://github.com/gns14585"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    이정훈
                  </a>
                </Button>
              </Box>
              <Box ml={2} paddingTop={4}>
                <Text color={"red"}>이름을 누르면 git 주소로 연동됩니다.</Text>
                <br />
                본 페이지는 졸업 프로젝트로 어떠한 영리적
                <br />
                활동도 하지 않는 사이트임을 알립니다.
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}
