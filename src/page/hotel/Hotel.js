import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box, Button, ButtonGroup, Image, Input, Flex,
    useToast,
    Select,
    PopoverTrigger, Popover, PopoverCloseButton, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody,
    Portal, IconButton, Container, SimpleGrid, Badge, Center,
} from '@chakra-ui/react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {AddIcon, MinusIcon, StarIcon} from "@chakra-ui/icons";
import App from "./App";

export function Hotel() {

    const toast = useToast();
    const navigate = useNavigate();
    const {id} = useParams();


    // 호텔
    const [hotel, setHotel] = useState([]);

    // 체크인,체크아웃 데이트 피커
    // const [checkInDate, setCheckInDate] = useState(null)
    // const [checkOutDate, setCheckOutDate] = useState(null)
    // const [showDatePicker, setShowDatePicker] = useState(false)

    const [selectedRoom, setSelectedRoom] = useState("")

    // 인원 카운트
    const [count, setCount] = useState(1)

    // 페이지네이션
    const [currentPage, setCurrentPage] = useState(1)
    const [hotelPerPage] = useState(9)  // 한 페이지에 보일 호텔 수

    // 현재 페이지의 호텔 목록 계산
    const indexOfLastHotel = currentPage * hotelPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelPerPage;
    const currentHotels = hotel.slice(indexOfFirstHotel, indexOfLastHotel);

    // 페이지 번호 클릭 시
    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지네이션 UI 렌더링
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(hotel.length / hotelPerPage); i++) {
        pageNumbers.push(i);
    }


    const increaseCount = () => {
        setCount((prevCount) => prevCount + 1)
    }
    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1)
        }
    }


    // 객실, 인원, 체크인, 체크아웃 팝오버 컴포넌트
    const CustomPopover = ({buttonText, headerText, children}) => {
        return (
            <Popover>
                <PopoverTrigger>
                    <Button colorScheme="blue" mx={'10px'}>{buttonText}</Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow/>
                        <PopoverHeader>{headerText}</PopoverHeader>
                        <PopoverCloseButton/>
                        <PopoverBody>{children}</PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        );
    };

    // 체크인,체크아웃 핸들러
    // const handleDateChange = (date, type) => {
    //     if (type === 'checkin') {
    //         setCheckInDate(date)
    //     } else if (type === 'checkout') {
    //         setCheckOutDate(date);
    //     }
    //     setShowDatePicker(false)
    // }


    useEffect(() => {
        axios
            .get('/api/hotel')
            .then((response) => {
                setHotel(response.data);
            })
            .catch((error) => {
                console.error('호텔 정보 불러오는 중 에러 발생', error);
                toast({
                    description: '호텔 정보를 불러오는 중 에러 발생',
                    title: '에러',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, []);

    return (
        <Box>
            <Box border={'1px solid black'} borderRadius={'10px'} w={'80%'} h={'500px'}
                 ml={'10%'} mt={'20px'}>
                <App/>
            </Box>
            <Box
                w={'80%'}
                h={'100px'}
                lineHeight={'100px'}
                justifyItems={'center'}
                justifyContent={'center'}
                borderRadius={'10px'}
                border={'1px solid black'}
                ml={'10%'}
                mt={'10px'}
                mb={'20px'}
                display={'flex'}
                gap={'20px'}
            >


                {/* 체크인 버튼 */}
                <Box lineHeight={'80px'}>

                    <CustomPopover buttonText="체크인" headerText="체크인 날짜와 시간을 선택하세요">
                        <Input placeholder="Select Date and Time" size="md" type="date"/>
                    </CustomPopover>

                    {/* 체크아웃 버튼 */}
                    <CustomPopover buttonText="체크아웃" headerText="체크아웃 날짜와 시간을 선택하세요">
                        <Input placeholder="Select Date and Time" size="md" type="date"/>
                    </CustomPopover>

                    {/* 인원 버튼 */}
                    <CustomPopover buttonText="인원" headerText="인원을 선택하세요">
                        <IconButton
                            variant={'ghost'}
                            colorScheme={'black'}
                            aria-label={'Done'}
                            fontSize={'20px'}
                            isRound={true}
                            icon={<AddIcon/>}
                            onClick={increaseCount}
                        />
                        {count}
                        <IconButton
                            variant={'ghost'}
                            colorScheme={'black'}
                            aria-label={'Done'}
                            fontSize={'20px'}
                            isRound={true}
                            icon={<MinusIcon/>}
                            onClick={decreaseCount}
                        />
                    </CustomPopover>

                    {/* 객실 옵션 */}
                    <CustomPopover buttonText="객실" headerText="객실 타입을 선택하세요">
                        <Select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            placeholder={'객실 선택'}
                        >
                            <option value="single">싱글룸</option>
                            <option value="double">더블룸</option>
                            <option value="suite">스위트룸</option>
                        </Select>
                    </CustomPopover>

                    {/* 검색 버튼 */}
                    <Input ml={'100px'} w={'200px'} backgroundColor={"ivory"}></Input>

                    <Button variant={'solid'} color={'green'} onClick={() => navigate('/reserv/' + id)}>
                        검색하기
                    </Button>

                    <Button ml={'300px'} variant={'solid'} color={'green'} onClick={() => navigate('/hotel/write/')}>
                        호텔 추가
                    </Button>

                    <Button ml={'20px'} variant={'solid'} color={'green'} onClick={() => navigate('/reserv/' + id)}>
                        호텔 삭제
                    </Button>


                </Box>
            </Box>


            {/* 호텔 정보 렌더링 */}
            <Flex justifyContent={'center'} flexWrap="wrap">

                <SimpleGrid columns={3} spacing={10} my={'20px'}>
                    {currentHotels.map((hotel) => (

                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                            <Image src={'https://bit.ly/2Z4KKcF'} alt={hotel.name}/>

                            <Box p='6'>
                                <Box display='flㅈex' alignItems='baseline'>
                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                        New
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {hotel.numberOfBed} beds &bull;
                                    </Box>
                                </Box>

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={1}
                                >
                                    {hotel.description}
                                </Box>

                                <Box>
                                    {hotel.totalPrice}
                                    <Box as='span' color='gray.600' fontSize='sm'>
                                        원 / 1박
                                    </Box>
                                </Box>


                                <Box display='flex' mt='2' alignItems='center'>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={i < hotel.rating ? 'teal.500' : 'gray.300'}
                                            />
                                        ))}
                                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                        {/*{hotel.reviewCount}*/}
                                        34 reviews
                                    </Box>

                                    <ButtonGroup spacing="2" size={'sm'} variant={'outline'} ml={'30px'}>
                                        <Button
                                            colorScheme="red"
                                            onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                                        >
                                            예약하기
                                        </Button>
                                        <Button colorScheme="blue">
                                            장바구니
                                        </Button>
                                    </ButtonGroup>

                                </Box>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>

            </Flex>

            {/* 페이지네이션 UI */}
            <Center>
                <Box my={5}>
                    {pageNumbers.map((number) => (
                        <Button
                            key={number}
                            colorScheme={number === currentPage ? 'green' : 'gray'}
                            onClick={() => handleClick(number)}
                            mx={1}
                        >
                            {number}
                        </Button>
                    ))}
                </Box>
            </Center>

        </Box>
    );
}
