import { login } from "actions/authApi";
import { LoginContext } from "context/LoginContext";
import { useContext, useRef } from "react";
import Cookies from "js-cookies";

/* eslint-disable react/react-in-jsx-scope */
const LoginPage = () => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const { setLogin } = useContext(LoginContext);

  const loginHandle = () => {
    const data = {
      loginName: loginRef.current.value,
      password: passwordRef.current.value
    };

    const res = login(data);
    res.then(res => {
      if (res.data.result === "ok") {
        Cookies.setItem("login_check", res.data.data.token, {
          expires: 7,
          path: "/"
        });
        setLogin(true);
      }
    });
  };
  return (
    <div>
      <h2>Login</h2>
      <input ref={loginRef} type={"email"}></input>
      <input ref={passwordRef} type={"password"}></input>
      <button onClick={loginHandle}>Login</button>
    </div>
  );
};

export default LoginPage;
