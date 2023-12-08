import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export function Bucket() {
  // 승원 수정 start ---------------------------------------
  const [transBucket, setTransBucket] = useState(null);
  const [params] = useSearchParams();
  useEffect(() => {
    axios
      .get("/api/transport/bucket/id/" + params.get("userId"))
      .then((response) => {
        setTransBucket(response.data);
      });
  }, []);
  // 승원 수정 end ---------------------------------------

  const [hotelBucket, setHotelBucket] = useState(null)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // 대훈이형 정보
  useEffect(() => {


    axios.get(`/api/hotel/bucket/id/${searchParams.get("userId")}`)
        .then((response)=>{
          setHotelBucket(response.data);
        })
  }, []);

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
            <Tbody></Tbody>
          </Table>
        </CardBody>
      </Card>
    </Center>
  );
}
