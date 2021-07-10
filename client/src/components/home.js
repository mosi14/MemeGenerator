import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import API from "../API";
import Meme from "./meme";

const Home = () => {
 
  const [showButton, setshowButton] = useState(false);

 
  const [memeList, setMemeList] = useState([]);

  useEffect(() => {
    API.getMemes()
      .then((memes) => {
        console.log(memes)
        const memeListing = [...memes]
        setMemeList(memeListing);
        console.log(memeList)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container fluid>
        <Row className="mt-5">
          {memeList.map((meme) => (
            <Meme key={meme.id}  meme={meme}  />
          ))}

          {/* <Col>
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
          </Col> */}
        </Row>


      </Container>
    </>
  );
};

export default Home;
