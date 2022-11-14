import React, { useContext } from "react";
import "./AppBar.scss";
import { Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import Cookies from "js-cookies";
import { LoginContext } from "context/LoginContext";
function AppBar() {
  const { setLogin } = useContext(LoginContext);

  const logoutHandle = () => {
    Cookies.removeItem("login_check");
    setLogin(false);
  };
  
  return (
    <nav className="navbar-app">
      <Container className="trello-container">
        <Row>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="app-actions">
              <div className="item all">
                <i className="fa fa-th" />
              </div>
              <div className="item home">
                <i className="fa fa-home" />
              </div>
              <div className="item boards">
                <i className="fa fa-columns" />
                &nbsp;&nbsp;<strong>Boards</strong>
              </div>
              <div className="item search">
                <InputGroup className="group-search">
                  <Form.Control
                    className="input-search"
                    placeholder="Jump to ..."
                  />
                  <InputGroup.Text className="input-icon-search">
                    <i className="fa fa-search"></i>
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={12} className="col-no-padding">
            <div className="app-branding text-center">
              <a className=""></a>
            </div>
          </Col>
          <Col sm={5} xs={12} className="col-no-padding">
            <div className="user-actions">
              <div className="item logout">
                <button onClick={logoutHandle}>Logout</button>
              </div>
              <div className="item quick">
                <i className="fa fa-plus-square" />
              </div>
              <div className="item news">
                <i className="fa fa-info-circle" />
              </div>
              <div className="item notification">
                <i className="fa fa-bell" />
              </div>
              <div className="item user-avatar">
                <img
                  src="https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-1/cp0/p80x80/34386210_2078971525704781_1278090406529073152_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=7206a8&_nc_ohc=S-KbmP4UISEAX_pws1c&_nc_ht=scontent.fsgn8-2.fna&oh=f4fee28cb5763f142296f77b605e5548&oe=61AC94F8"
                  alt="avatar"
                  title="mangekyo"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}
export default AppBar;
