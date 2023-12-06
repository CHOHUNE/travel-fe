import React, { useState } from "react";
import axios from "axios";
import {
    Input,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    FormLabel,
    Center,
    Card,
    CardHeader,
    Heading,
    CardBody,
    FormControl,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function HotelWrite() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [numberOfBed, setNumberOfBed] = useState("");
    const [roomType, setRoomType] = useState("스탠다드");
    const [subImg1, setSubImg1] = useState(null);
    const [subImg2, setSubImg2] = useState(null);
    const [mapImg, setMapImg] = useState(null);
    const [numberOfBedRooms, setNumberOfBedRooms] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    const toast = useToast();
    const navigate = useNavigate();


    // 확인 버튼 클릭 시 처리하는 함수
    function handleConfirmation() {

        axios
            .postForm("/api/hotel/write",{
            name,
            location,
            description,
            mainImg,
            numberOfBed,
            roomType,
            subImg1,
            subImg2,
            mapImg,
            numberOfBedRooms,
            totalPrice
            })
            .then(() => {
                toast({
                    description: "호텔 상품 등록이 완료되었습니다.",
                    status: "success",
                });

                })
                .catch(() => {
                    toast({
                        description: "운송 상품 등록에 실패 했습니다.",
                        status: "error",
                    });
                })
                .finally(() => {
                    navigate(-1);
                })
    }

    return (
        <Center>
            <Card w={"4xl"} p={'30px'} my={'30px'}>
                <CardHeader>
                    <Heading textAlign={"center"}> 호텔 추가 </Heading>
                </CardHeader>

                <CardBody>
                    <FormControl>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex'
                                       alignItems={'center'}> 호텔명 </FormLabel>
                            <Input
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex'
                                       alignItems={'center'}> 위치 </FormLabel>
                            <Input
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                            />
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex'
                                       alignItems={'center'}> 설명 </FormLabel>
                            <Textarea
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </Flex>


                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 침대
                                수 </FormLabel>
                            <NumberInput
                                value={numberOfBed}
                                onChange={(e) => {
                                    setNumberOfBed(e);
                                }}
                                min={1}
                                max={5}
                            >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> Room
                                Type </FormLabel>
                            <Select
                                value={roomType}
                                onChange={(e) => {
                                    setRoomType(e.target.value);
                                }}
                            >
                                <option value="스탠다드">스탠다드</option>
                                <option value="디럭스">디럭스</option>
                                <option value="스위트">스위트</option>
                                {/* 필요에 따라 더 많은 Room Type을 추가하세요. */}
                            </Select>
                        </Flex>

                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 방
                                수 </FormLabel>
                            <NumberInput
                                value={numberOfBedRooms}
                                onChange={(e) => {
                                    setNumberOfBedRooms(e);
                                }}
                                min={1}
                                max={5}
                            >
                                <NumberInputField/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 총
                                가격 </FormLabel>
                            <Input
                                type="number"
                                value={totalPrice}
                                onChange={(e) => {
                                    setTotalPrice(e.target.value);
                                }}
                            />
                        </Flex>

                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 대표
                                이미지 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>setMainImg(e.target.files)}
                            />
                        </Flex>

                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 부가 이미지
                                1 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSubImg1(e.target.files)}
                            />
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 부가 이미지
                                2 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSubImg2(e.target.files)}
                            />
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 지도
                                이미지 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setMapImg(e.target.files)}
                            />
                        </Flex>

                        <Flex justifyContent={'flex-end'} mt={'30px'}>
                            <Button colorScheme="teal" onClick={handleConfirmation}>확인</Button>
                        </Flex>
                    </FormControl>
                </CardBody>
            </Card>
        </Center>
    )
}
