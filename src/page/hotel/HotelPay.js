import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Select,
    Button,
    Center,
    Image,
    Divider,
} from '@chakra-ui/react';

export function HotelPay() {
    const [guests, setGuests] = useState();

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();
    const [mainImg, setMainImg] = useState();
    const [rating, setRating] = useState();
    const [numberOfBed, setNumberOfBed] = useState();
    const [review, setReview] = useState();
    const [roomType, setRoomType] = useState();
    const [subImg1, setSubImg1] = useState();
    const [subImg2, setSubImg2] = useState();
    const [numberOfBedRooms, setNumberOfBedRooms] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const [paymentMethod, setPaymentMethod] = useState();

    const handleGuestsChange = (event) => {
        setGuests(event.target.value);
    };

    const handleReserveClick = () => {
        // 예약 로직 추가
        alert(`예약이 완료되었습니다!`);
    };

    return (
        <Center>
            <Box
                my={'50px'}
                borderRadius="lg"
                borderWidth="1px"
                p={6}
                maxW="3xl"
                w="full"
                fontSize="lg"
            >
                <Heading mb={4}>호텔 예약 및 결제</Heading>
                <Text>
                    저렴한 요금! 검색 날짜의 요금은 지난 3개월의 평균 1박 요금보다 ₩45,884 저렴합니다.
                </Text>

                <Divider my={4} />

                <Box>
                    <Heading mt={2} mb={4} fontSize="2xl">
                        숙소 정보
                    </Heading>
                    <Heading size="lg" mb={2}>
                        {name}
                    </Heading>
                    <Text>{location}</Text>
                    <Text>{description}</Text>
                    <Image src={mainImg} alt="Main" />
                    <Divider my={4} />

                    <Box mt={4}>
                        <Text>Rating: {rating}</Text>
                        <Text>Number of Beds: {numberOfBed}</Text>
                        <Text>Review: {review}</Text>
                        <Text>Room Type: {roomType}</Text>
                    </Box>

                    <Image src={subImg1} alt="Sub 1" my={4} />
                    <Image src={subImg2} alt="Sub 2" my={4} />

                    <Box mt={4}>
                        <Text>Number of Bedrooms: {numberOfBedRooms}</Text>
                        <Text>Total Price: {totalPrice}</Text>
                    </Box>
                </Box>

                <Divider my={4} />

                <Box mt={4}>
                    <Heading mb={2} fontSize="2xl">
                        예약 정보
                    </Heading>
                    <Text>날짜: 2024년 1월 4일 ~ 9일</Text>

                    <Box mt={2}>
                        <Text>게스트</Text>
                        <Select value={guests} onChange={handleGuestsChange} mt={2}>
                            <option value={1}>게스트 1명</option>
                            {/* 추가적인 옵션을 필요에 따라 추가하세요. */}
                        </Select>
                    </Box>

                    <Divider my={4} />

                    <Heading mt={4} mb={2} fontSize="2xl">
                        결제 방식 선택하기
                    </Heading>
                    <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        mt={2}
                    >
                        <option value="creditCard">신용카드</option>
                        <option value="bankTransfer">계좌이체</option>
                        <option value="paypal">PayPal</option>
                    </Select>

                    <Divider my={4} />

                    <Heading mt={4} mb={2} fontSize="2xl">
                        결제 일정
                    </Heading>
                    <Text>전액 결제: ₩970,448을 결제하세요.</Text>
                    <Text>
                        안내: 결제가 완료되면 예약이 확정됩니다. 환불 규정을 확인하세요.
                    </Text>
                    <Button colorScheme="teal" mt={4} onClick={handleReserveClick}>
                        결제하기
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}
