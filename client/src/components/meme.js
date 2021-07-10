import { Col, Button, Card, Modal } from "react-bootstrap";
import React, { useState } from "react";
const Meme = (props) => {
  const [memeShow, setmemeShow] = useState(false);
  const handleMemeClose = () => setmemeShow(false);
  const handlememeShow = () => setmemeShow(true);
  return (
    <>
    <Col md={3}>
            <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`./images/${props.meme.imgId}.jpg`} 
         // onClick={handlememeShow}
          className="memeImage"
        />
        <Card.Body>
          <Card.Title>{props.meme.title}</Card.Title>
          <Button variant="primary" className="mr-2" >
            Copy
          </Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </Col>
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
    </>
  );
};

export default Meme;
