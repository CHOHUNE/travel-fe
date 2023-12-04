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
import { HotelView } from "./page/hotel/HotelView";
import { AuthPage } from "./page/member/AuthPage";
import { TransPortView } from "./page/transport/TransPortView";
import { TransPortEdit } from "./page/transport/TransPortEdit";
import { HotelWrite } from "./page/hotel/HotelWrite";
import { UserList } from "./page/member/UserList";
import { HotelEdit } from "./page/hotel/HotelEdit";
import { UserView } from "./page/member/UserView";
import { HotelPay } from "./page/hotel/HotelPay";
import LoginProvider from "./component/LoginProvider";

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

      {/* 회원관련 */}
      <Route path="login" element={<UserLogin />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="signup" element={<UserSignup />} />
      <Route path="user/edit" element={<UserEdit />} />
      <Route path="user/list" element={<UserList />} />
      <Route path="user" element={<UserView />} />

      {/* 호텔관련 */}
      <Route path="hotel" element={<Hotel />} />
      <Route path="hotel/reserv/:id" element={<HotelView />} />
      <Route path="hotel/write" element={<HotelWrite />} />
      <Route path="hotel/edit/:id" element={<HotelEdit />} />
      <Route path="hotel/pay/:id" element={<HotelPay />} />
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
