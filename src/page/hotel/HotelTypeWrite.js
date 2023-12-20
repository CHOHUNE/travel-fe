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
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function HotelTypeWrite() {
  const [roomtypes, setRoomtypes] = useState([
    {
      roomtype: "",
      originalPriceWeekday: null,
      salePriceWeekday: null,
      originalPriceWeekend: null,
      salePriceWeekend: null,
      // roomImg: null,
      hrtId: null,
      maxMinPerRoom: null,
      ableCooking: "불가",
      numberOfBedRoom: null,
    },
  ]);

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
        originalPriceWeekday: null,
        salePriceWeekday: null,
        originalPriceWeekend: null,
        salePriceWeekend: null,
        // roomImg: null,
        hrtId: null,
        maxMinPerRoom: null,
        ableCooking: null,
        numberOfBedRoom: null,
      },
    ]);
  };

  // const handleRemoveRow = (index) => {
  //   setRoomtypes((prevRoomtypes) => {
  //     const updatedRoomtypes = [...prevRoomtypes];
  //     updatedRoomtypes.splice(index, 1);
  //     return updatedRoomtypes;
  //   });
  // };

  // ... (이전 코드)

  const handleConfirmation = () => {
    const promises = roomtypes.map((room) => {
      if (room.hrtId) {
        return axios.putForm(`/api/hotel/edit/type`, room);
      } else {
        return axios.postForm("/api/hotel/write/type", {
          ...room,
          hid: id,
        });
      }
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

  const handleRoomtypeDelete = (hrtId) => {
    axios
      .delete(`/api/hotel/delete/${id}/type/${hrtId}`)
      .then(() => {
        toast({
          description: "삭제가 완료 되었습니다.",
          colorScheme: "orange",
        });

        axios.get(`/api/hotel/reserv/type/${id}`).then((response) => {
          setRoomtypes(response.data);
        });
      })
      .catch(() => {
        toast({
          description: "객실 삭제가 실패 하였습니다",
          status: "error",
        });
      });
  };

  return (
    <Center>
      <Card w={"94%"} p={"30px"} my={"30px"}>
        <CardHeader>
          <Heading textAlign={"center"}>객실 관리</Heading>
        </CardHeader>
        <Divider />
        <Table variant="simple" mt={4} maxW="100%">
          <Th>객실 타입 </Th>
          <Th>주중 입금가</Th>
          <Th>주중 판매가</Th>
          <Th>주말 입금가</Th>
          <Th>주말 판매가</Th>
          <Th>침실 수</Th>
          <Th>기준/최대 인원</Th>
          <Th>취사 여부</Th>
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
                    w="100px"
                    value={room.numberOfBedRoom}
                    type={"text"}
                    placeholder="원룸(더블)"
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].numberOfBedRoom = value;
                        return updatedRoomtypes;
                      });
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type={"text"}
                    placeholder={"기준 2인/최대 2인"}
                    w={"150px"}
                    value={room.maxMinPerRoom}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].maxMinPerRoom = value;
                        return updatedRoomtypes;
                      });
                    }}
                  ></Input>
                </Td>
                <Td>
                  <Select
                    w={"80px"}
                    value={room.ableCooking}
                    onChange={(e) => {
                      const value = e.target.value;
                      setRoomtypes((prevRoomtypes) => {
                        const updatedRoomtypes = [...prevRoomtypes];
                        updatedRoomtypes[index].ableCooking = value;
                        return updatedRoomtypes;
                      });
                    }}
                  >
                    <option value="불가">불가</option>
                    <option value="가능">가능</option>
                  </Select>
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
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRoomtypeDelete(room.hrtId)}
                  >
                    -
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justifyContent={"flex-end"} mt={"30px"}>
          {/*<Button colorScheme="orange" onClick={handleRemoveRow} mr={4}>*/}
          {/*  -*/}
          {/*</Button>*/}
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
