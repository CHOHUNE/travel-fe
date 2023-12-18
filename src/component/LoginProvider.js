import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);

function LoginProvider({ children }) {
  const [login, setLogin] = useState("");
  // const code = new URL(window.location.href).searchParams.get("code");
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    fetchLogin();
  }, []);

  // 카카오 로그인 세션저장용 -동작안됨-
  // function fetchLogin() {
  //   if (code) {
  //     axios
  //       .post("/api/member/kakaoLogin", null, {
  //         params: {
  //           code: code,
  //         },
  //       })
  //       .then((response) => setLogin(response.data));
  //   }
  // }

  // 일반로그인 세션저장용
  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  // 로그인상태
  function isAuthenticated() {
    return login !== ""; // 빈 스트링이 아니면 로그인상태
  }

  // 관리자 권한
  function isAdmin() {
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin");
    }
  }

  function hasAccess(userId) {
    return login.userId == userId;
  }

  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, isAdmin, hasAccess }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
