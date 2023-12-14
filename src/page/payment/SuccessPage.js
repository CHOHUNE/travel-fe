import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Button, Text, Center, Icon, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
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
    const secretKey = apiSecretKey;

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
    <Box w="80%" ml="10%" textAlign={"center"}>
      <Center h="100vh" bg="gray.100">
        <VStack spacing={4} bg="white" p={10} rounded="lg" boxShadow="md">
          <Icon as={CheckCircleIcon} w={16} h={16} color="blue" />
          <Text fontSize="lg" fontWeight="bold">
            결제 완료되었습니다.
          </Text>
          <Text fontSize="md">
            진행 중인 결제창에서 {"[결제완료]"} 버튼을 눌러 결제창을 닫아주세요.
          </Text>
          <Button colorScheme="gray" w="full">
            확인
          </Button>
        </VStack>
      </Center>

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
    </Box>
  );
}
