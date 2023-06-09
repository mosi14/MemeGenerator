import { Navbar, Container, Nav } from "react-bootstrap";
import { MylogInButton, MylogOutButton } from "./logIn";

const Navak = (props) => {
  if (props.isLoggedIn) {
    return (
      // user is log in into system
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <h5 className="text-light">welcome {props.username.name}</h5>
          <Nav className="me-auto">
            {props.username.name === "creator"? <Nav.Link href="/generator">Create Meme</Nav.Link>:""}
           
            <MylogOutButton logOut={props.logOut} />
            {/* <Nav.Link logOut={props.logOut} >Logout</Nav.Link> */}
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
          <MylogInButton isLoggedIn={props.isLoggedIn} />
          {/*   <Nav.Link href="/login">Login</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    );
  }
};

export default Navak;
