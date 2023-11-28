import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Text,
    Image,
    Divider, Flex,
    Heading,
    Stack, useToast
} from "@chakra-ui/react";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function Hotel() {

    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation()


    return (
        <Box>

            <Box w={"80%"} h={"100px"} justifyItems={'center'} justifyContent={'center'} borderRadius={'10px'} border={'1px solid black'} ml={'10%'} mt={'10px'} display={'flex'} gap={'20px'} >
                <ButtonGroup variant={'outline'} spacing='6' alignItems={'center'}>
                    <Button colorScheme={'grey'}>체크인</Button>
                    <Button colorScheme={'grey'}>체크아웃</Button>
                    <Button colorScheme={'blue'}>인원</Button>
                    <Button colorScheme={'blue'}>객실</Button>
                    <Button variant={'solid'} color={'green'}> 검색하기 </Button>
                </ButtonGroup>
            </Box>

            <Box>
                <Box textAlign={'center'} w={"100%"} >
                    <Text fontSize={'3xl'} mt={"20px"}>MD추천 숙소</Text>

                </Box>
                <Flex justifyContent={"center"} gap={'50px'} my={'50px'}>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='숙소이미지'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red' onClick={ ()=> navigate('reserv')}>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex>
                <Flex justifyContent={"center"} gap={'50px'} my={'50px'}>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex>
            </Box>

            <Box>
                <Box textAlign={"center"}>
                    <Text fontSize={'3xl'}>관련 숙소</Text>

                </Box>
                <Flex justifyContent={"center"} gap={'50px'} my={'50px'}>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex>

                <Flex justifyContent={"center"} gap={'50px'} my={'50px'}>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src=''
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>숙소명 </Heading>
                                <Text>
                                    숙소설명
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    ₩22,0000원 / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red'>
                                    예약하기
                                </Button>
                                <Button variant='solid' colorScheme='blue'>
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </Flex>
            </Box>
        </Box>
    );
}