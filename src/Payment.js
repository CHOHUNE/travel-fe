import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useQuery,
} from "@chakra-ui/react";

const clientKey = //"클라이언트 키 넣어줘야함";
const customerKey = nanoid();
const selector = "#payment-widget";

export function Payment() {
  const paymentWidget = usePaymentWidget(clientKey, customerKey);
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(5000);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      if (paymentWidget === null) {
        return;
      }
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        price,
        { variantKey: "DEFAULT" },
      );
      paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget === null) {
      return;
    }
    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-widget" />
        <div id="agreement" />
        <div style={{ paddingLeft: "24px" }}></div>
        <div className="result wrapper">
          <Button
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;
              try {
                await paymentWidget?.requestPayment({
                  orderId: nanoid(),
                  orderName: "paymntName",
                  customerName: "customerName",
                  customerEmail: "customerEmail",
                  successUrl: `${window.location.origin}/success`,
                  failUrl: `${window.location.origin}/fail`,
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey, customerKey) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      // 결제 위젯 초기화
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}
