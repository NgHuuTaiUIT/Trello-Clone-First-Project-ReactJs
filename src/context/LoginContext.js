/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookies";
export const LoginContext = createContext();

function LoginProvider(props) {
  const [isLogin, setLogin] = useState(false);
  const isHaveToken = Cookies.getItem("login_check");
  useEffect(() => {
    console.log(isHaveToken)
    if (isHaveToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [isHaveToken]);
  return (
    <LoginContext.Provider value={{ isLogin, setLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
