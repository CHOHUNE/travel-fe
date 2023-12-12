import {
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function HotelTypeWrite() {
  const [roomtype, setRoomtype] = useState("");
  const [originalPriceWeekday, setOriginalPriceWeekday] = useState(0);
  const [salePriceWeekday, setSalePriceWeekday] = useState(0);
  const [originalPriceWeekend, setOriginalPriceWeekend] = useState(0);
  const [salePriceWeekend, setSalePriceWeekend] = useState(0);
  const [roomImg, setRoomImg] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  function handleConfirmation() {
    axios
      .postForm("/api/hotel/write/type", {
        roomtype,
        originalPriceWeekday,
        salePriceWeekday,
        originalPriceWeekend,
        salePriceWeekend,
        roomImg,
        hid: id,
      })
      .then(() => {
        toast({
          description: "객실 추가 완료",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "객실 추가 실패",
          status: "error",
        });
      });
  }

  return (
    <Center>
      <Card w={"4xl"} p={"30px"} my={"30px"}>
        <CardHeader>
          <Heading textAlign={"center"}>객실 추가</Heading>
        </CardHeader>
        <Divider />
        <Table variant="simple" mt={4} maxW="100%">
          <Th>객실 타입 </Th>
          <Th>주중 입금가</Th>
          <Th>주중 판매가</Th>
          <Th>주말 입금가</Th>
          <Th>주말 판매가</Th>
          <Th>객실 이미지</Th>
          <Tbody>
            <Tr>
              <Td>
                <Input
                  placeholder="타입"
                  value={roomtype}
                  onChange={(e) => setRoomtype(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  placeholder="일 ~목"
                  value={originalPriceWeekday}
                  onChange={(e) => setOriginalPriceWeekday(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  placeholder="일~ 목"
                  value={salePriceWeekday}
                  onChange={(e) => setSalePriceWeekday(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  placeholder="금, 토"
                  value={originalPriceWeekend}
                  onChange={(e) => setOriginalPriceWeekend(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  placeholder="금, 토"
                  value={salePriceWeekend}
                  onChange={(e) => setSalePriceWeekend(e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setRoomImg(e.target.files)}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex justifyContent={"flex-end"} mt={"30px"}>
          <Button colorScheme="teal" onClick={handleConfirmation}>
            확인
          </Button>
        </Flex>
      </Card>
    </Center>
  );
}
