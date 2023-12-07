import React from "react";
import { Box } from "@chakra-ui/react";
import UserNavBar from "../navbar/UserNavBar";
import { Outlet } from "react-router-dom";

function UserLayOut(props) {
  return (
    <Box>
      <UserNavBar />
      <Outlet />
    </Box>
  );
}

export default UserLayOut;
