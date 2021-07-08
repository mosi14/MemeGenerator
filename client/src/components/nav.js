import { Navbar, Container, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MylogInButton, MylogOutButton } from "./logIn";

const Navak = (props) => {
  const [showGenerator, setShowGenerator] = useState(true);
  const [ShowLogin, setShowLogin] = useState(false);

  if (props.isLoggedIn) {
    return (
      // <Container fluid className="mx-0 px-0">
      //      <Navbar bg="dark" variant="dark" className="justify-content-between align-items-center">
      //     <Link to={'/Administrator'}>
      //         <Navbar.Brand id="brand">
      //             {/* <RiSurveyFill id="logo" className="align-top" />{' '} */}
      //             <span>Survey</span>
      //         </Navbar.Brand>
      //     </Link>
      //     <span id="wellcome">Wellcome admin {props.username}</span>
      //     <MylogOutButton logOut={props.logOut} />
      // </Navbar>
      // </Container>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {showGenerator === true ? (
              <Nav.Link href="/generator">Create Meme</Nav.Link>
            ) : (
              ""
            )}
            {ShowLogin === false ? (
              <Nav.Link href="/login">LogOut</Nav.Link>
            ) : (
              <Nav.Link>Logout</Nav.Link>
            )}

            {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            {showGenerator === true ? (
              <Nav.Link href="/generator">Create Meme</Nav.Link>
            ) : (
              ""
            )}
            {ShowLogin === false ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <Nav.Link>Logout</Nav.Link>
            )}

            {/* <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      // <Container fluid className="mx-0 px-0">
      //   <Navbar bg="dark" variant="dark" className="justify-content-between">
      //     <Link to={"/"}>
      //       <Navbar.Brand>
      //         {/* <RiSurveyFill id="logo" className="align-top" />{' '} */}
      //         <span>Survey</span>
      //       </Navbar.Brand>
      //     </Link>
      //     <MylogInButton isLoggedIn={props.isLoggedIn} />
      //   </Navbar>
      // </Container>
    );
  }
};

export default Navak;
