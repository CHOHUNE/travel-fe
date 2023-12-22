import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const orderId = nanoid();

const apiKey = process.env.REACT_APP_CLIENT_KEY;
export function PaymentPageH() {
  // 선생님 도움
  const location = useLocation();
  console.log(location.state);
  //   여까지
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // ------ 클라이언트 키로 객체 초기화 ------

    const clientKey = apiKey;
    const tossPayments = window.TossPayments(clientKey);

    // ------ 결제창 띄우기 ------
    tossPayments
      .requestPayment("카드", {
        // 결제 정보 파라미터
        // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
        // https://docs.tosspayments.com/reference/js-sdk
        amount: 3000000, // 결제 금액  (선생님 해주심)
        // mId: id,
        orderId: orderId, // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
        orderName: "테스트 결제", // 주문명
        customerName: "김토스", // 구매자 이름

        successUrl: window.location.origin + "/successpageHotel?id=" + id, // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        failUrl: window.location.origin + "/failHotle", // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
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
