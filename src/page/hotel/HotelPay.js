
import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Button,
    Text,
    Image,
    Divider,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    useToast,
    Center,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function HotelPay() {
    const [hotel, setHotel] = useState({});
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [checkinDate, setCheckinDate] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [guestName, setGuestName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const { id } = useParams();
    const toast = useToast();

    useEffect(() => {
        axios
            .get(`/api/hotel/pay/${id}`)
            .then((response) => {
                setHotel(response.data);
            })
            .catch(() => {
                toast({
                    description: '해당 호텔 정보 불러오기 실패',
                    status: 'error',
                });
            });
    }, []);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
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
                <Box>
                    <Heading mt={2} mb={4} fontSize="2xl">
                        숙소 정보
                    </Heading>
                    <Heading size="lg" mb={2}>
                        {hotel.name}
                    </Heading>
                    <Text>{hotel.location}</Text>
                    <Text>{hotel.description}</Text>
                    <Image src={hotel.mainImg} alt="Main" />
                    <Divider my={4} />

                    <Box mt={4}>
                        <Text>Rating: {hotel.rating}</Text>
                        <Text>Number of Beds: {hotel.numberOfBed}</Text>
                        <Text>Review: {hotel.review}</Text>
                        <Text>Room Type: {hotel.roomType}</Text>
                    </Box>

                    <Image src={hotel.subImg1} alt="Sub 1" my={4} />
                    <Image src={hotel.subImg2} alt="Sub 2" my={4} />

                    <Box mt={4}>
                        <Text>Number of Bedrooms: {hotel.numberOfBedRooms}</Text>
                        <Text>Total Price: {hotel.totalPrice}</Text>
                    </Box>
                </Box>

                <Divider my={4} />

                <Box mt={4}>
                    <Heading mb={2} fontSize="2xl">
                        예약 정보
                    </Heading>
                    <Text>
                        날짜: 체크인
                        <Input
                            type="date"
                            value={checkinDate}
                            onChange={(e) => setCheckinDate(e.target.value)}
                            mt={2}
                        />
                        체크아웃
                        <Input
                            type="date"
                            value={checkoutDate}
                            onChange={(e) => setCheckoutDate(e.target.value)}
                            mt={2}
                        />
                    </Text>
                    <Text>이름</Text>
                    <Input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        mt={2}
                    />
                    <Text>인원수</Text>
                    <NumberInput
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e)}
                        min={1}
                        max={6}
                        mt={2}
                        placeholder={'인원수를 입력 하세요'}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <Divider my={4} />

                    <Heading mt={4} mb={2} fontSize="2xl">
                        결제 방식 선택하기
                    </Heading>
                    <Select
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        mt={2}
                    >
                        <option value="creditCard">신용카드</option>
                        <option value="bankTransfer">계좌이체</option>
                        {/* 추가적인 결제 방식 옵션을 필요에 따라 추가하세요. */}
                    </Select>

                    {paymentMethod === 'bankTransfer' && (
                        <Input
                            type="text"
                            placeholder="가상 계좌 번호 입력"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            mt={2}
                        />
                    )}

                    {paymentMethod === 'creditCard' && (
                        <Input
                            type="text"
                            placeholder="신용카드 번호 입력"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            mt={2}
                        />
                    )}
                </Box>

                <Divider my={4} />

                <Heading mt={4} mb={2} fontSize="2xl">
                    결제 일정
                </Heading>
                <Text>전액 결제: {hotel.totalPrice}을 결제하세요.</Text>
                <Text>
                    안내: 결제가 완료되면 예약이 확정됩니다. 환불 규정을 확인하세요.
                </Text>
                <Button colorScheme="teal" mt={4} onClick={handleReserveClick}>
                    결제하기
                </Button>
            </Box>
        </Center>
    );
}
