import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import API from "../API";

const Home = () => {
  const [memeShow, setmemeShow] = useState(false);
  const [showButton, setshowButton] = useState(false);
  const handleMemeClose = () => setmemeShow(false);
  const handlememeShow = () => setmemeShow(true);

  return (
    <>
      <Container fluid>
        <Row className="mt-5">
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="./images/1.jpg"
                onClick={handlememeShow}
                className="memeImage"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Button variant="primary" className="mr-2">
                  Copy
                </Button>
                <Button variant="danger">Delete</Button>
 
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="./images/2.jpg"
                onClick={handlememeShow}
                className="memeImage"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>

                <Button variant="primary" className="mr-2">
                  Copy
                </Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="./images/3.jpg"
                onClick={handlememeShow}
                className="memeImage"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>

                <Button variant="primary" className="mr-2">
                  Copy
                </Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="./images/4.jpg"
                onClick={handlememeShow}
                className="memeImage"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>

                <Button variant="primary" className="mr-2">
                  Copy
                </Button>
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          show={memeShow}
          onHide={handleMemeClose}
          className="memeModal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Title>
              Card Title
              <span class="material-icons-outlined">account_circle</span>
            </Card.Title>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="./images/4.jpg"
                className="memeModal_image"
              />
              <p className="memeModal_firstText">FIRST TITLE</p>
              <p className="memeModal_secondText">Second TITLE</p>
              <p className="memeModal_thirdText">Third TITLE</p>
              {/* <Card.Body>
                
            
                
              </Card.Body> */}
            </Card>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
