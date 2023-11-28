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
import { UserLogin } from "./page/member/UserLogin";
import { UserSignup } from "./page/member/UserSignup";
import { UserEdit } from "./page/member/UserEdit";
import { TransPortList } from "./page/transport/TransPortList";
import { TransPortWrite } from "./page/transport/TransPortWrite";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<HomeBody />} />
      <Route path="transport" element={<TransPort />} />
      <Route path="transport/list" element={<TransPortList />} />
      <Route path="transport/write" element={<TransPortWrite />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="board" element={<Board />} />
      <Route path="signup" element={<UserSignup />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="userEdit" element={<UserEdit />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
