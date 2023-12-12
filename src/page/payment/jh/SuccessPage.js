import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // @docs https://docs.tosspayments.com/reference/using-api/api-keys
    const secretKey = "test_sk_DnyRpQWGrNqvxLgKXO17VKwv1M9E";

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      const response = await fetch(
        "https://api.tosspayments.com/v1/payments/confirm",
        {
          method: "POST",
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      const json = await response.json();

      if (!response.ok) {
        // TODO: 구매 실패 비즈니스 로직 구현
        console.log(json);
        navigate(`/fail?code=${json.code}&message=${json.message}`);
        return;
      }

      // TODO: 구매 완료 비즈니스 로직 구현
      console.log(json);
    }
    confirm();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2 style={{ padding: "20px 0px 10px 0px" }}>
          <img
            width="35px"
            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
          />
          결제 성공
        </h2>
        <p>{`paymentKey = ${searchParams.get("paymentKey")}`}</p>
        <p>{`orderId = ${searchParams.get("orderId")}`}</p>
        <p>{`amount = ${Number(
          searchParams.get("amount"),
        ).toLocaleString()}원`}</p>
        <div className="result wrapper">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button
              className="button"
              style={{ marginTop: "30px", marginRight: "10px" }}
            >
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button"
              style={{
                marginTop: "30px",
                backgroundColor: "#e8f3ff",
                color: "#1b64da",
              }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
//
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// export function SuccessPage() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//
//   // URL 파라미터에서 값 추출
//   const paymentKey = searchParams.get("paymentKey");
//   const orderId = searchParams.get("orderId");
//   const amount = searchParams.get("amount");
//
//   useEffect(() => {
//     console.log("Payment Key:", paymentKey);
//     console.log("Order ID:", orderId);
//     console.log("Amount:", amount);
//     // 여기서 다른 작업을 수행할 수 있습니다.
//   }, [paymentKey, orderId, amount]);
//   return (
//     <div>
//       <h1>결제 성공</h1>
//       <div>{`주문 아이디: ${orderId}`}</div>
//       <div>{`결제 금액: ${amount}원`}</div>
//       <div>{`Payment Key: ${paymentKey}`}</div>
//     </div>
//   );
// }

//
// import React, { useEffect } from "react";
// import axios from "axios";
//
// export function SuccessPage() {
//   useEffect(() => {
//     // 시크릿 키를 Base64로 인코딩
//     const secretKey = "test_sk_DnyRpQWGrNqvxLgKXO17VKwv1M9E:";
//     const base64EncodedSecret = btoa(secretKey + ":");
//
//     // API 요청 설정
//     const apiEndpoint = "https://api.tosspayments.com/v1/payments/confirm";
//     const paymentKey = "your_actual_payment_key"; // 여기에 실제 결제 키를 넣으세요
//     const requestData = {
//       paymentKey: paymentKey,
//       amount: 100,
//       orderId: "KW6EvVGSDyEJ0AWY0m94w",
//     };
//
//     const requestOptions = {
//       method: "POST",
//       url: apiEndpoint,
//       headers: {
//         Authorization: `Basic ${base64EncodedSecret}`,
//         "Content-Type": "application/json",
//       },
//       data: requestData,
//     };
//
//     // Axios를 사용하여 API 호출
//     axios(requestOptions)
//       .then((response) => {
//         console.log("Response:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []); // useEffect가 컴포넌트가 마운트될 때만 실행되도록 빈 의존성 배열 전달
//
//   return (
//     // 리액트 컴포넌트의 JSX를 반환할 수 있음
//     <div>
//       {/* 내용을 추가하거나 필요한 경우 다른 컴포넌트를 포함시킬 수 있음 */}
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";
//
// export function SuccessPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//
//   useEffect(() => {
//     const requestData = {
//       orderId: searchParams.get("orderId"),
//       amount: searchParams.get("amount"),
//       paymentKey: searchParams.get("paymentKey"),
//     };
//
//     // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
//     // @docs https://docs.tosspayments.com/reference/using-api/api-keys
//     const secretKey = "test_sk_DnyRpQWGrNqvxLgKXO17VKwv1M9E";
//
//     // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
//     // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
//     // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
//     const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;
//
//     async function confirm() {
//       const response = await fetch(
//         "https://api.tosspayments.com/v1/payments/confirm",
//         {
//           method: "POST",
//           headers: {
//             Authorization: encryptedSecretKey,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestData),
//         },
//       );
//
//       const json = await response.json();
//
//       if (!response.ok) {
//         // TODO: 구매 실패 비즈니스 로직 구현
//         console.log(json);
//         navigate(`/fail?code=${json.code}&message=${json.message}`);
//         return;
//       }
//
//       // TODO: 구매 완료 비즈니스 로직 구현
//       console.log(json);
//     }
//     confirm();
//   }, []);
//
//   return (
//     <div className="result wrapper">
//       <div className="box_section">
//         <h2 style={{ padding: "20px 0px 10px 0px" }}>
//           <img
//             width="35px"
//             src="https://static.toss.im/3d-emojis/u1F389_apng.png"
//           />
//           결제 성공
//         </h2>
//         <p>{`paymentKey = ${searchParams.get("paymentKey")}`}</p>
//         <p>{`orderId = ${searchParams.get("orderId")}`}</p>
//         <p>{`amount = ${Number(
//           searchParams.get("amount"),
//         ).toLocaleString()}원`}</p>
//         <div className="result wrapper">
//           <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
//             <button
//               className="button"
//               style={{ marginTop: "30px", marginRight: "10px" }}
//             >
//               연동 문서
//             </button>
//           </Link>
//           <Link to="https://discord.gg/A4fRFXQhRu">
//             <button
//               className="button"
//               style={{
//                 marginTop: "30px",
//                 backgroundColor: "#e8f3ff",
//                 color: "#1b64da",
//               }}
//             >
//               실시간 문의
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
