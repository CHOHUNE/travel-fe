import {
    // ... (다른 import들)
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
    Checkbox,
    CheckboxGroup,

} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export function HotelEdit() {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [numberOfBed, setNumberOfBed] = useState('');
    const [roomType, setRoomType] = useState("스탠다드");

    const [mainImg, setMainImg] = useState();
    const [subImg1, setSubImg1] = useState();
    const [subImg2, setSubImg2] = useState();
    const [mapImg, setMapImg] = useState();

    const [numberOfBedRooms, setNumberOfBedRooms] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const [removeFileId, setRemoveFileId] = useState([])
    const [uploadFiles, setUploadFiles] = useState(null)

    const [hotel, setHotel] = useState([])
    const {id} = useParams()


    const toast = useToast()
    const navigate = useNavigate()


    useEffect(() => {
        axios
            .get('/api/hotel/edit/id/' + id)
            .then((response) => {
                setHotel(response.data)
                setName(response.data.name)
                setLocation(response.data.location)
                setDescription(response.data.description)
                setMainImg(response.data.mainImg)
                setNumberOfBed(response.data.numberOfBed)
                setRoomType(response.data.roomType)
                setSubImg1(response.data.subImg1)
                setSubImg2(response.data.subImg2)
                setMapImg(response.data.mainImg)
                setTotalPrice(response.data.totalPrice)
                setNumberOfBedRooms(response.data.numberOfBedRooms)

            })

    }, [])

    // 수정 요청
    function handleChange() {
        axios
            .putForm("/api/hotel/edit", {
                hid: id,
                name,
                location,
                description,
                mainImg,
                numberOfBed,
                roomType,
                subImg1,
                subImg2,
                mapImg,
                totalPrice,
                numberOfBedRooms,
                removeFileId,
                uploadFiles


            })
            .then(() => {
                toast({
                    hId: id,
                    description: id+"번"+ name + " 상품 수정 완료 되었습니다",
                    status: "success"
                });
            })
            .catch(() => {
                toast({
                    description: id + "호텔 상품 수정 중 문제가 발생 하였습니다",
                    status: "error"
                })
            })
            .then(
                ()=>navigate(-1)
            )
    }



    return (
        <Center>
            <Card w={"4xl"} p={'30px'} my={'30px'}>
                <CardHeader>
                    <Heading textAlign={"center"}> 호텔 수정 </Heading>
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
                                max={10}
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
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 방 수 </FormLabel>

                            <NumberInput
                                value={numberOfBedRooms}
                                onChange={(e) => {
                                    setNumberOfBedRooms(e);
                                }}
                                min={1}
                                max={20}
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
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 부가
                                이미지
                                1 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSubImg1(e.target.files)}
                            />
                        </Flex>
                        <Flex>
                            <FormLabel my={'15px'} w={100} textAlign='center' display='flex' alignItems={'center'}> 부가
                                이미지
                                2 </FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>setSubImg2(e.target.files)}
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
                            <Button colorScheme="teal" onClick={handleChange}>확인</Button>
                        </Flex>
                    </FormControl>
                </CardBody>
            </Card>
        </Center>
    );
}