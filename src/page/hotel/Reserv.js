import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Text, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function Reserv() {
    const { hId } = useParams();
    const [hotel, setHotel] = useState([]);

    // 호텔 ID를 사용하여 호텔 데이터를 가져오는 함수

    useEffect(() => {
        axios
            .get('/api/hotel/reserv/'+hId)
            .then((response)=> {
                setHotel(response.data);
            })
        }, []);

    return (
        <Box>
            {hotel && (
                <>
                    <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
                        <Box border={"2px solid black"} h={"420px"} w={"100%"} my={"10px"}>
                            {/* 호텔 이미지1 */}
                            <Image src={hotel.mainImg} alt={"숙소 이미지1"} w={"100%"} h={"100%"} />
                        </Box>

                        <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"10px"}>
                            <Box border={"2px solid black"} my={"10px"} h={"195px"} w={"100%"}>
                                {/* 호텔 이미지2 */}
                                <Image src={hotel.subImg1} alt={"숙소 이미지2"} w={"100"} h={"100%"} />
                            </Box>
                            <Box border={"2px solid black"} my={"10px"} h={"195px"} w={"100%"}>
                                {/* 호텔 이미지3 */}
                                <Image src={hotel.subImg2} alt={"숙소 이미지3"} w={"100"} h={"100%"} />
                            </Box>
                        </Box>
                    </Box>
                    <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
                        <Box border={"2px solid black"} h={"200px"} w={"60%"} my={"10px"}>
                            {/* 숙소 정보 */}
                            <Text fontSize={"2xl"}>{hotel.name}</Text>
                            <Text>{hotel.description}</Text>
                            <Text>{hotel.totalPrice}</Text>

                        </Box>
                        <Box
                            border={"2px solid black"}
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
                                <Text fontSize={"2xl"}> ₩{hotel.price} 원 / 1박</Text>
                            </Box>
                            <Box>
                                {/* 버튼 그룹 */}
                                <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"} justifyContent={"center"}>
                                    <Button>체크인</Button>
                                    <Button>체크아웃</Button>
                                </ButtonGroup>
                                <Button variant={"outline"}>인원</Button>
                                <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"} justifyContent={"center"}>
                                    <Button variant={'solid'} colorScheme={'red'}>예약</Button>
                                    <Button variant={'solid'} colorScheme={'blue'}>장바구니</Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box w={"80%"} ml={"10%"} border={"2px solid black"} h={"400px"} mb={"15px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {/* 지도 이미지 */}
                        <Image src={hotel.mapImg} alt={"지도 이미지"} w={"100%"} h={"100%"} />
                    </Box>
                </>
            )}
        </Box>
    );
}
