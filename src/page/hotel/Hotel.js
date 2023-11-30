import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Text,
    Image,
    Input,
    Divider,
    Flex,
    Heading,
    Stack,
    useToast,
    Select,
    PopoverTrigger,
    Popover,
    PopoverCloseButton,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody, Portal, IconButton,
} from '@chakra-ui/react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {AddIcon, MinusIcon} from "@chakra-ui/icons";

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
    const increaseCount = () => {
        setCount((prevCount) => prevCount + 1)
    }
    const decreaseCount = () => {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1)
        }
    }

    // 객실, 인원, 체크인, 체크아웃 팝오버 컴포넌트
    const CustomPopover = ({ buttonText, headerText, children }) => {
        return (
            <Popover>
                <PopoverTrigger>
                    <Button colorScheme="blue" mx={'10px'} >{buttonText}</Button>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>{headerText}</PopoverHeader>
                        <PopoverCloseButton />
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
                display={'flex'}
                gap={'20px'}
            >

                {/* 체크인 버튼 */}
                <Box lineHeight={'80px'}>

                <CustomPopover buttonText="체크인" headerText="체크인 날짜와 시간을 선택하세요">
                    <Input placeholder="Select Date and Time" size="md" type="date" />
                </CustomPopover>

                {/* 체크아웃 버튼 */}
                <CustomPopover buttonText="체크아웃" headerText="체크아웃 날짜와 시간을 선택하세요">
                    <Input placeholder="Select Date and Time" size="md" type="date" />
                </CustomPopover>

                {/* 인원 버튼 */}
                <CustomPopover buttonText="인원" headerText="인원을 선택하세요">
                    <IconButton
                        variant={'ghost'}
                        colorScheme={'black'}
                        aria-label={'Done'}
                        fontSize={'20px'}
                        isRound={true}
                        icon={<AddIcon />}
                        onClick={increaseCount}
                    />
                    {count}
                    <IconButton
                        variant={'ghost'}
                        colorScheme={'black'}
                        aria-label={'Done'}
                        fontSize={'20px'}
                        isRound={true}
                        icon={<MinusIcon />}
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
                </Box>
            </Box>


            {/* 호텔 정보 렌더링 */}
            <Flex justifyContent={'center'} gap={'100px'} mx={"150px"} flexWrap="wrap">
                {hotel.map((hotel) => (
                    <Card key={hotel.id} maxW="sm"> {/* 추가된 mb 속성으로 카드 간격 조절 */}
                        <CardBody>
                            <Image
                                src={hotel.image}
                                alt={hotel.name}
                                borderRadius="lg"
                            />
                            <Stack mt="6" spacing="3">
                                <Heading size="md">{hotel.name}</Heading>
                                <Text>{hotel.description}</Text>
                                <Text color="blue.600" fontSize="2xl">
                                    ₩{hotel.totalPrice} / 1박
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider/>
                        <CardFooter>
                            <ButtonGroup spacing="2">
                                <Button
                                    variant="solid"
                                    colorScheme="red"
                                    onClick={() => navigate("/hotel/reserv/" + hotel.hid)}
                                >
                                    예약하기
                                </Button>
                                <Button variant="solid" colorScheme="blue">
                                    장바구니
                                </Button>
                            </ButtonGroup>
                        </CardFooter>

                    </Card>
                ))}
            </Flex>
        </Box>
    );
}
