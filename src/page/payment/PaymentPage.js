import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const orderId = nanoid();

const apiKey = process.env.REACT_APP_CLIENT_KEY;
export function PaymentPage() {
  const location = useLocation();

  const { id } = useParams();

  // 쿼리 스트링에서 호텔인지 운송 상품인지 결제 타입을 받아오기
  const [params] = useSearchParams();
  const payType = params.get("type");

  useEffect(() => {
    // ------ 클라이언트 키로 객체 초기화 ------

    const clientKey = apiKey;
    const tossPayments = window.TossPayments(clientKey);

    // ------ 결제창 띄우기 ------
    // 결제 타입이 운송상품이면 실행
    if (payType === "trans") {
      // 운송상품 location 값 저장
      const trans = location.state;
      // 운송상품 결제금액
      const amount = trans.amount;
      // 운송상품 요청사항
      const requested = trans.requested;
      // 이용자 휴대폰번호
      const phoneNumber = trans.personNumber;
      // 예약자 이름
      const userName = trans.userName;
      // 이용자 이름
      const realUserName = trans.realUserName;
      // 상품명
      const transTitle = trans.transTitle;
      // 출발일
      const transStartDay = trans.transStartDay;
      // 탑승 인원
      const transPeople = trans.people;

      // 요청 사항이 있다면 저장하자
      if (requested) {
        localStorage.setItem("payRequested", requested);
      }
      localStorage.setItem("userName", userName);
      localStorage.setItem("realUserName", realUserName);
      localStorage.setItem("transTitle", transTitle);
      localStorage.setItem("transStartDay", transStartDay);
      localStorage.setItem("transPeople", transPeople);
      localStorage.setItem("phoneNumber", phoneNumber);

      tossPayments
        .requestPayment("카드", {
          // 결제 정보 파라미터
          // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
          // https://docs.tosspayments.com/reference/js-sdk
          amount: amount, // 결제 금액  (선생님 해주심)
          orderId: orderId, // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
          orderName: transTitle, // 주문명
          customerName: userName, // 구매자 이름

          successUrl:
            "http://localhost:3000/successpage?id=" + id + "&type=trans", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
          failUrl: "http://localhost:3000/fail", // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        })
        // ------결제창을 띄울 수 없는 에러 처리 ------
        // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
        // 결제창에서 발생할 수 있는 에러를 확인하세요.
        // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        });
    }
    // 호텔 상품이면 아래의 코드가 실행
    else {
      // 호텔상품 location 값 저장
      const hotel = location.state;
      // 호텔 id
      const hotelId = hotel.hId;
      // 호텔상품 결제금액
      const amount = hotel.amount;
      // 호텔 상품 체크인 날짜
      const checkinDate = hotel.checkinDate;
      // 호텔 상품 체크 아웃 날짜
      const checkoutDate = hotel.checkoutDate;
      // 호텔 요청 사항
      const plusMessage = hotel.plusMessage;
      // 호텔 룸 타입
      const roomtype = hotel.roomtype;
      // 호텔 성인 인원 수
      const personAdult = hotel.personAdult;
      // 호텔 소인 인원
      const personChild = hotel.personChild;
      // 호텔 예약자 이름
      const userName = hotel.userName;
      // 호텔 이용자 이름
      const guestName = hotel.guestName;
      // 호텔 이용자 핸드폰 번호
      const cellPhoneNumber = hotel.cellPhoneNumber;
      // 호텔 상품 명
      const hotelName = hotel.hotelName;

      // 호텔 요청 사항
      if (plusMessage) {
        localStorage.setItem("plusMessage", plusMessage);
      }
      // 호텔 id
      localStorage.setItem("hotelId", hotelId);
      // 호텔 상품 결제 금액
      localStorage.setItem("amount", amount);
      // 체크인 날짜
      localStorage.setItem("checkinDate", checkinDate);
      // 체크 아웃 날짜
      localStorage.setItem("checkoutDate", checkoutDate);
      // 룸 타입
      localStorage.setItem("roomtype", roomtype);
      // 성인 인원 수
      localStorage.setItem("personAdult", personAdult);
      // 소인 인원 수
      localStorage.setItem("personChild", personChild);
      // 호텔 예약자 이름
      localStorage.setItem("userName", userName);
      // 호텔 이용자 이름
      localStorage.setItem("guestName", guestName);
      // 호텔 이용자 핸드폰 번호
      localStorage.setItem("cellPhoneNumber", cellPhoneNumber);
      // 호텔 상품 명
      localStorage.setItem("hotelName", hotelName);

      tossPayments
        .requestPayment("카드", {
          // 결제 정보 파라미터
          // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
          // https://docs.tosspayments.com/reference/js-sdk
          amount: amount, // 결제 금액  (선생님 해주심)
          orderId: orderId, // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
          orderName: hotelName, // 주문명
          customerName: userName, // 구매자 이름

          successUrl:
            "http://localhost:3000/successpage?id=" + id + "&type=hotel", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
          failUrl: "http://localhost:3000/fail", // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        })
        // ------결제창을 띄울 수 없는 에러 처리 ------
        // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
        // 결제창에서 발생할 수 있는 에러를 확인하세요.
        // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
        .catch(function (error) {
          if (error.code === "USER_CANCEL") {
            // 결제 고객이 결제창을 닫았을 때 에러 처리
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // 유효하지 않은 카드 코드에 대한 에러 처리
          }
        });
    }
  }, []);

  // 승원 수정 부분 그냥 페이지가 심심해서 만들어봄 시작---------------------------
  return (
    <Center>
      <video style={{ height: "500px", zIndex: 2 }} autoPlay loop muted>
        <source
          src={
            "https://study1993garbi.s3.ap-northeast-2.amazonaws.com/travel/trans/video/plan.mp4"
          }
          type="video/mp4"
        />
      </video>
      <Box
        style={{
          position: "absolute",
          marginTop: "80px",
          marginLeft: "30%",
          width: "100%",
          height: "400px",
          zIndex: 3,
          fontFamily: "YEONGJUPunggiGinsengTTF",
          fontSize: "2rem",
          color: "white",
        }}
      ></Box>
    </Center>
  );
  // 승원 수정 부분 그냥 페이지가 심심해서 만들어봄 끝---------------------------
}
