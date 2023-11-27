import {Box, Button, ButtonGroup, Text} from "@chakra-ui/react";
import React from "react";

export function Reserv() {
    return (
        <Box>
            <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
                <Box border={"2px solid black"} h={"420px"} w={"100%"} my={"10px"}>
                    이미지1
                </Box>

                <Box w={"100%"} display={"flex"} flexDirection={"column"} gap={"10px"}>
                    <Box border={"2px solid black"} my={"10px"} h={"195px"} w={"100%"}>
                        이미지2
                    </Box>
                    <Box border={"2px solid black"} my={"10px"} h={"195px"} w={"100%"}>
                        이미지3
                    </Box>
                </Box>
            </Box>
            <Box w={"80%"} ml={"10%"} display={"flex"} gap={"10px"}>
                <Box border={"2px solid black"} h={"200px"} w={"60%"} my={"10px"}>
                    숙소 정보
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
                        <Text fontSize={"2xl"}> ₩ totalPrice</Text>
                    </Box>
                    <Box >
                        <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"}
                                     justifyContent={"center"} >
                            <Button>체크인</Button>
                            <Button>체크아웃</Button>
                        </ButtonGroup>
                        <Button variant={"outline"}>인원</Button>
                        <ButtonGroup variant={"outline"} colorScheme={"blue"} display={"flex"}
                                     justifyContent={"center"}>
                            <Button variant={'solid'} colorScheme={'red'}>예약</Button>
                            <Button variant={'solid'} colorScheme={'blue'}>장바구니</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </Box>
            <Box
                w={"80%"}
                ml={"10%"}
                border={"2px solid black"}
                h={"400px"}
                mb={"15px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                지도 이미지
            </Box>
        </Box>
    );
}
