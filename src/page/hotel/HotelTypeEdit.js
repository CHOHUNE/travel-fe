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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function HotelTypeEdit() {
  const [roomtypes, setRoomtypes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // 호텔객실 데이터를 불러오는 API 호출
    axios.get(`/api/hotel/reserv/type/${id}`).then((response) => {
      setRoomtypes(response.data);
    });
  }, [id]);

  const handleAddRow = () => {
    setRoomtypes((prevRoomtypes) => [
      ...prevRoomtypes,
      {
        roomtype: "",
        originalPriceWeekday: 0,
        salePriceWeekday: 0,
        originalPriceWeekend: 0,
        salePriceWeekend: 0,
        roomImg: null,
      },
    ]);
  };

  const handleConfirmation = () => {
    const promises = roomtypes.map((room) => {
      // 호텔객실 수정 API 호출
      return axios.put(`/api/hotel/edit/type/${room.hrtId}`, {
        ...room,
        hid: id,
      });
    });

    Promise.all(promises)
      .then(() => {
        toast({
          description: "객실 수정 완료",
          status: "success",
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "객실 수정 실패",
          status: "error",
        });
      });
  };

  return (
    <Center>
      <Card w={"4xl"} p={"30px"} my={"30px"}>
        <CardHeader>
          <Heading textAlign={"center"}>객실 수정</Heading>
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
            {roomtypes.map((room, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    placeholder="타입"
                    value={room.roomtype}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].roomtype = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="일 ~목"
                    value={room.originalPriceWeekday}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].originalPriceWeekday = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="일~ 목"
                    value={room.salePriceWeekday}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].salePriceWeekday = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="금, 토"
                    value={room.originalPriceWeekend}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].originalPriceWeekend = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    placeholder="금, 토"
                    value={room.salePriceWeekend}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].salePriceWeekend = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].roomImg = files;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justifyContent={"flex-end"} mt={"30px"}>
          <Button colorScheme="teal" onClick={handleAddRow} mr={4}>
            +
          </Button>
          <Button colorScheme="teal" onClick={handleConfirmation}>
            확인
          </Button>
        </Flex>
      </Card>
    </Center>
  );
}
