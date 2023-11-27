import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/HomeLayout";
import { HomeBody } from "./component/HomeBody";
import { TransPort } from "./page/transport/TransPort";
import { Hotel } from "./page/hotel/Hotel";
import { Board } from "./page/board/Board";
import { MemberLogin } from "./page/user/MemberLogin";
import { MemberSignup } from "./page/user/MemberSignup";
import { UserEdit } from "./page/user/UserEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<HomeBody />} />
      <Route path="transport" element={<TransPort />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="board" element={<Board />} />
      <Route path="signup" element={<MemberSignup />} />
      <Route path="login" element={<MemberLogin />} />
      <Route path="userEdit" element={<UserEdit />} />
    </Route>,
  ),
);


function App() {
  return <RouterProvider router={routes} />;
}

export default App;
