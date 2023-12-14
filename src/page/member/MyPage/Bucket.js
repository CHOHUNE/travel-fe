import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Img,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export function Bucket() {
  // 승원 수정 start ---------------------------------------
  const [transBucket, setTransBucket] = useState([]);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/transport/bucket/id/" + params.get("userId"))
      .then((response) => {
        setTransBucket(response.data);
      });
  }, [location]);
  // 승원 수정 end ---------------------------------------

  const [hotelBucket, setHotelBucket] = useState([]);

  // 대훈이형 정보
  useEffect(() => {
    axios
      .get("/api/hotel/bucket/id/" + params.get("userId"))
      .then((response) => {
        setHotelBucket(response.data);
      });
  }, [location]);

  let number = 0;

  return (
    <Center m={10}>
      <Card w={"80%"}>
        <CardHeader textAlign={"center"} m={10}>
          <Heading>찜하기</Heading>
        </CardHeader>

        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>종류</Th>
                <Th>이미지</Th>
                <Th>상품명</Th>
                <Th>주소</Th>
                <Th>등록일</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transBucket.map((bucket) => (
                <Tr
                  _hover={{ cursor: "pointer" }}
                  key={bucket.userId}
                  onClick={() => navigate("/transport/" + bucket.tId)}
                >
                  <Th>{++number}</Th>
                  <Th>{bucket.typeName}</Th>
                  <Th>
                    <Box w={"150px"}>
                      <Img src={bucket.url} />
                    </Box>
                  </Th>
                  <Th>{bucket.transTitle}</Th>
                  <Th>{bucket.transStartLocation}</Th>
                  <Th>{bucket.ago}</Th>
                </Tr>
              ))}
              {hotelBucket.map((bucket) => (
                <Tr _hover={{ cursor: "pointer" }} key={bucket.id}>
                  <Th>{++number}</Th>
                  <Th>호텔</Th>
                  <Th>
                    <Box w={"150px"}>
                      <Img src={bucket.mainImgUrl} />
                    </Box>
                  </Th>
                  <Th>{bucket.name}</Th>
                  <Th>{bucket.location}</Th>
                  <Th>{bucket.ago}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Center>
  );
}
