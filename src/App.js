import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { FindId } from "./page/member/FindId";
import { FindPw } from "./page/member/FindPw";
import { FindPwChange } from "./page/member/FindPwChange";
import React from "react";
import { NaverLogin } from "./page/member/NaverLogin";
import { Bucket } from "./page/member/MyPage/Bucket";
import UserLayOut from "./page/member/layout/UserLayOut";
import { ReservationList } from "./page/member/MyPage/ReservationList";
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
import { HotelView } from "./page/hotel/HotelView";
import { AuthPage } from "./page/member/AuthPage";
import { TransPortView } from "./page/transport/TransPortView";
import { TransPortEdit } from "./page/transport/TransPortEdit";
import { HotelWrite } from "./page/hotel/HotelWrite";
import { UserList } from "./page/member/UserList";
import { HotelEdit } from "./page/hotel/HotelEdit";
import { HotelPay } from "./page/hotel/HotelPay";
import LoginProvider from "./component/LoginProvider";
import { Notice } from "./page/board/Notice";
import { UserView } from "./page/member/MyPage/UserView";
import { Payment } from "./Payment";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<HomeBody />} />
      {/* 운송관련 */}
      <Route path="transport" element={<TransPort />} />
      <Route path="transport/:id" element={<TransPortView />} />
      <Route path="transport/list" element={<TransPortList />} />
      <Route path="transport/write" element={<TransPortWrite />} />
      <Route path="transport/edit/:id" element={<TransPortEdit />} />

      {/* 게시판관련 */}
      <Route path="boardlist" element={<BoardList />} />
      <Route path="boardwrite" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />} />
      <Route path="notice" element={<Notice />} />

      {/* 회원관련 */}
      <Route path="login" element={<UserLogin />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="signup" element={<UserSignup />} />
      <Route path="user/edit" element={<UserEdit />} />
      <Route path="user/list" element={<UserList />} />
      <Route path="user" element={<UserLayOut />}>
        <Route index element={<UserView />} />
        <Route path="/user/bucket" element={<Bucket />} />
        <Route path="/user/reservationList" element={<ReservationList />} />
      </Route>
      <Route path="user/bucket" element={<Bucket />} />
      <Route path="findId" element={<FindId />} />
      <Route path="findPw" element={<FindPw />} />
      <Route path="findPwChange" element={<FindPwChange />} />
      <Route path="NaverLogin" element={<NaverLogin />} />

      {/* 호텔관련 */}
      <Route path="hotel" element={<Hotel />} />
      <Route path="hotel/reserv/:id" element={<HotelView />} />
      <Route path="hotel/write" element={<HotelWrite />} />
      <Route path="hotel/edit/:id" element={<HotelEdit />} />
      <Route path="hotel/pay/:id" element={<HotelPay />} />

      {/* 결제관련 */}
      <Route path="/payment" element={<Payment />} />
    </Route>,
  ),
);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={routes} />
    </LoginProvider>
  );
}

export default App;
