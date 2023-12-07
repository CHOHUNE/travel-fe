import React, { useEffect, useState } from "react";
import {Box, Button, ButtonGroup, Text, Image, Flex, AspectRatio, useToast} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export function HotelView() {
    const { id } = useParams();
    const [hotel, setHotel] = useState([]);
    const navigate= useNavigate();
    const toast=useToast()

    // 호텔 ID를 사용하여 호텔 데이터를 가져오는 함수

    useEffect(() => {
        axios
            .get('/api/hotel/reserv/id/'+id)
            .then((response)=> {
                setHotel(response.data);
            })
        }, []);

    // 삭제
    function handleHotelDelete(){
        axios
            .delete("/api/hotel/delete/"+id)
            .then( ()=>{
                toast({
                    description: hotel.name + " 상품이 삭제 되었습니다" ,
                    colorScheme:"orange"
                })
                navigate(-1);
            })
            .catch( ()=>{
                toast({
                    description:"상품 삭제가 실패 하였습니다",
                    status:"error"
                })
            })
    }

    return (
        <Box>
            {hotel && (
                <>
                    <Box border={'1px solid black'} borderRadius={'10px'} w={'80%'} ml={'10%'} mt={'10px'} >
                        <Flex justifyContent={'flex-end'}>
                        <Button onClick={()=>navigate('/hotel/edit/'+hotel.hid)}> 호텔 수정 </Button>
                        <Button ml={'20px'} onClick={handleHotelDelete} > 호텔 삭제 </Button>
                        </Flex>
                    </Box>
                    <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"} >
                        <Box border={"1px solid black"} h={"420px"} w={"100%"} my={"10px"} borderRadius={'lg'}>
                            {/* 호텔 이미지1 */}
                            <Image src={hotel.mainImgUrl} alt={"숙소 이미지1"} w={"100%"} h={"100%"} />
                        </Box>

                        <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"10px"}>
                            <Box border={"1px solid black"} my={"10px"} h={"195px"} w={"100%"} borderRadius={'lg'}>
                                {/* 호텔 이미지2 */}
                                <Image src={hotel.subImgUrl1} alt={"숙소 이미지2"} w={"100"} h={"100%"} />
                            </Box>
                            <Box border={"1px solid black"} my={"10px"} h={"195px"} w={"100%"} borderRadius={'lg'} >
                                {/* 호텔 이미지3 */}
                                <Image src={hotel.subImgUrl2} alt={"숙소 이미지3"} w={"100"} h={"100%"} />
                            </Box>
                        </Box>
                    </Box>
                    <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
                        <Box border={"1px solid black"} h={"200px"} w={"60%"} my={"10px"} borderRadius={'lg'}>
                            {/* 숙소 정보 */}
                            <Text fontSize={"2xl"}>{hotel.name}</Text>
                            <Text>{hotel.description}</Text>

                        </Box>
                        <Box
                            border={"1px solid black"}
                            borderRadius={'lg'}
                            h={"200px"}
                            w={"60%"}
                            my={"10px"}
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Box>
                                {/* 숙소 가격 */}
                                <Text fontSize={"2xl"}> ₩{hotel.totalPrice} 원 / 1박</Text>
                            </Box>
                            <Box>
                                {/* 버튼 그룹 */}
                                <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"} justifyContent={"center"}>
                                    <Button>체크인</Button>
                                    <Button>체크아웃</Button>
                                </ButtonGroup>
                                <Button variant={"outline"}>인원</Button>
                                <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"} justifyContent={"center"}>
                                    <Button variant={'solid'} colorScheme={'red'} onClick={()=>navigate('/hotel/pay/'+id)} >예약</Button>
                                    <Button variant={'solid'} colorScheme={'blue'}>장바구니</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box w={"80%"} ml={"10%"} border={"1px solid black"} h={"400px"} mb={"15px"} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={'lg'}>
                        <Image src={hotel.mapImgUrl} alt={"지도 이미지"} w={"100%"} h={"100%"} />


                    </Box>
                </>
            )}
        </Box>
    );
}
