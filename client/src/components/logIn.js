import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
//import "./componentStyle.css";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useState } from "react";

function MyLoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [InvalidCredentialMessage, setInvalidCredentialMessage] = useState("");

  const handleLogIn = (event) => {
    event.preventDefault();
    let valid = true;

    if (username === "" || password === "") valid = false;

    if (valid === false) {
      props.seterrMessage("");
      setInvalidCredentialMessage("Username and/or password are/is empty");
      setPassword("");
    } else {
      const credentials = {
        username: username,
        password: password,
      };
      setInvalidCredentialMessage("");
      props.logIn(credentials);
    }
  };

  return (

    <Container>
      <Row className="mt-5  justify-content-center">
        <Col md={6}>
          <Form id="loginForm">
            <FormGroup controllid="usernameForm">
              <FormLabel className="d-flex">
                <span className="logText">Username</span>
              </FormLabel>
              <FormControl
                type="username"
                placeholder="Enter username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </FormGroup>
            <FormGroup controllid="passwordForm">
              <FormLabel className="d-flex mt-4">
                <span className="logText">Password</span>
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </FormGroup>
             {InvalidCredentialMessage.length===0 ?  '' : <Alert variant="danger" className='mt-3'>{InvalidCredentialMessage}</Alert>}
            {props.errMessage.length===0 ? '' : <Alert variant="danger" className='mt-3'>{props.errMessage}</Alert>}
            <Button
              variant="success"
              id="finalLogInButton"
              onClick={handleLogIn}
             // type="submit"
            >
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

function MylogInButton(props) {
  return (
    <Link to={"/login"}>
      <Button id="loginBotton" variant="outline-success">
        Log as Administrator
      </Button>
    </Link>
  );
}

function MylogOutButton(props) {
  const handleLogOut = (event) => {
    event.preventDefault();
    props.logOut();
  };

  return (
    <Link to={"/"}>
      <Button
        id="logOutBotton"
        variant="outline-danger"
        onClick={(event) => handleLogOut(event)}
      >
        Log Out
      </Button>
    </Link>
  );
}

export { MylogInButton, MylogOutButton, MyLoginForm };
