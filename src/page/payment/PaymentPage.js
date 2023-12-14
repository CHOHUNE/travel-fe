import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const orderId = nanoid();

const apiKey = process.env.REACT_APP_CLIENT_KEY;
export function PaymentPage() {
  // 선생님 도움
  const location = useLocation();

  console.log(location.state);
  const trans = location.state;
  //   여까지
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
        amount: trans.amount, // 결제 금액  (선생님 해주심)
        orderId: orderId, // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
        orderName: "테스트 결제", // 주문명
        customerName: "김토스", // 구매자 이름
        successUrl: "http://localhost:3000/successpage", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
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
  }, []);

  return null;
}
