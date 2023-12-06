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

export function ReservationList() {
  return (
    <Center m={10}>
      <Card w={"80%"}>
        <CardHeader textAlign={"center"} m={10}>
          <Heading>예약내역</Heading>
        </CardHeader>

        <CardBody>
          <Table>
            <Thead>
              <Tr>
                <Th>상품명</Th>
                <Th>이용일자</Th>
                <Th>내용</Th>
                <Th>예약번호</Th>
                <Th>가격</Th>
                <Th>상태</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </CardBody>
      </Card>
    </Center>
  );
}
