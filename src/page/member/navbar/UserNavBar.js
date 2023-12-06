import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Card, Center, Flex, Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider";

export function UserNavBar(props) {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const location = useLocation();
  const urlParams = new URLSearchParams();

  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("userId", login.userId);
  }
  console.log(urlParams);

  if (user === null) {
    return <Spinner />;
  }

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "reservationList":
        navigate("/user/reservationList");
        break;
      case "userInfo":
        navigate("/user?" + urlParams.toString());
        break;
      case "bucket":
        navigate("/user/bucket");
        break;
      default:
        break;
    }
  };

  return (
    <Center>
      <Flex mt={10} alignItems={"center"}>
        <Button
          variant="ghost"
          borderRadius="0"
          onClick={() => handleButtonClick("reservationList")}
          background={activeButton === "reservationList" ? "#EDF2F7" : ""}
        >
          예약내역
        </Button>
        <Button
          variant="ghost"
          borderRadius="0"
          onClick={() => handleButtonClick("userInfo")}
          background={activeButton === "userInfo" ? "#EDF2F7" : ""}
        >
          회원정보수정
        </Button>
        <Button
          variant="ghost"
          borderRadius="0"
          onClick={() => handleButtonClick("bucket")}
          background={activeButton === "bucket" ? "#EDF2F7" : ""}
        >
          장바구니
        </Button>
      </Flex>
    </Center>
  );
}

export default UserNavBar;
