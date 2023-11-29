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
import { UserLogin } from "./page/member/UserLogin";
import { UserSignup } from "./page/member/UserSignup";
import { UserEdit } from "./page/member/UserEdit";
import { TransPortList } from "./page/transport/TransPortList";
import { TransPortWrite } from "./page/transport/TransPortWrite";
import { BoardList } from "./page/board/BoardList";
import { BoardWrite } from "./page/board/BoardWrite";
import { BoardView } from "./page/board/BoardView";
import { BoardEdit } from "./page/board/BoardEdit";
import { Reserv } from "./page/hotel/Reserv";
import { TransPortView } from "./page/transport/TransPortView";
import { TransPortEdit } from "./page/transport/TransPortEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<HomeBody />} />
      <Route path="transport" element={<TransPort />} />
      <Route path="transport/:id" element={<TransPortView />} />
      <Route path="transport/list" element={<TransPortList />} />
      <Route path="transport/write" element={<TransPortWrite />} />
      <Route path="transport/edit/:id" element={<TransPortEdit />} />
      <Route path="hotel" element={<Hotel />} />
      <Route path="boardlist" element={<BoardList />} />
      <Route path="boardwrite" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="signup" element={<UserSignup />} />
      <Route path="userEdit" element={<UserEdit />} />
      <Route path="hotel/reserv" element={<Reserv />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
