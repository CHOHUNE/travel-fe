import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function TransPortList() {
  const [startDate, setStartDate] = useState(new Date());
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const [params] = useSearchParams();
  console.log(params.get("type"));

  useEffect(() => {
    axios.get("/api/transport/list").then((response) => {
      setList(response.data);
    });
  }, []);

  if (list === null) {
    <Spinner />;
  }

  return (
    <Box>
      <Box
        w={"100%"}
        h={"300px"}
        textAlign={"center"}
        lineHeight={"300px"}
        mt={4}
        bg={"#f5f8ec"}
      >
        버스 항공 이미지
      </Box>
      <Flex
        w={"85%"}
        h={"100px"}
        ml={"7.5%"}
        bg={"#d9d9d9"}
        mt={2}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Input w={"290px"} h={"60px"} bg={"white"} />
        <DatePicker
          w={"200px"}
          h={"60px"}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} w={"50px"} h={"50px"} />
      </Flex>
      <Flex
        ml={"7.5%"}
        mt={4}
        w={"85%"}
        h={"50px"}
        justifyContent={"space-between"}
      >
        <Box
          w={"400px"}
          lineHeight={"50px"}
          bg={"#d9d9d9"}
          textAlign={"center"}
          fontSize={"2rem"}
        >
          버스 게시글 목록
        </Box>
        <Box>
          <Button ml={2} onClick={() => navigate("/transport/write?type=0")}>
            버스 상품 등록
          </Button>
        </Box>
      </Flex>
      <SimpleGrid columns={4} w={"85%"} ml={"8.5%"} mt={4} spacing={"25px"}>
        {list.map((transport) => (
          <Card
            w={"275px"}
            h={"275px"}
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/transport/" + transport.tid)}
            key={transport.tid}
          >
            <CardHeader>
              {transport.tid}
              <br />
              제목 : {transport.transTitle}
            </CardHeader>
            <CardBody>
              가격 : {transport.transPrice} 원<br />
              출발일 : {transport.transStartDay}
            </CardBody>
            <CardFooter>
              <Button>장바구니</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Flex w={"80%"} ml={"10%"} mt={10} justifyContent={"center"}>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
      </Flex>
    </Box>
  );
}
