import "./App.scss";
import MainPage from "pages";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "pages/login";
import { useLocation, useHistory } from "react-router-dom";
import LoginProvider, { LoginContext } from "context/LoginContext";
import Cookies from "js-cookies";

const queryClient = new QueryClient();
const PageConfig = () => {
  const location = useLocation();
  const history = useHistory();

  const { isLogin } = useContext(LoginContext);
  useEffect(() => {
    if (!isLogin && location.pathname !== "/login") {
      history.push("/login");
    } else if (isLogin) {
      history.push("/");
    }
  }, [isLogin]);

  return (
    <div>
      <Switch>
        {!isLogin && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}
        {isLogin && (
          <Route path="/">
            <MainPage />
          </Route>
        )}
      </Switch>
    </div>
  );
};
function App() {
  // const [active, setActive] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <div className="App">
          <Router>
            <PageConfig />
          </Router>
        </div>
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default App;
