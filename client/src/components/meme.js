import { Col, Button, Card, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";


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
            onClick={handlememeShow}
            className="memeImage"
          />
          <Card.Body>
            <Card.Title>{props.meme.title}</Card.Title>
            {props.isLoggedIn ? (
              <>
               <Link to={
                 {
                  pathname:"/generator",
                  meme: {
                    id: props.meme.id,
                    title: props.meme.title,
                    text1: props.meme.text1,
                    text2: props.meme.text2,
                    text3: props.meme.text3,
                    privacy: props.meme.privacy,
                    txtColor: props.meme.txtColor,
                    imgId: props.meme.imgId,
                    userId: props.meme.userId,
                    txtFont: props.meme.txtFont,
                    position1: props.meme.position1,
                    position2: props.meme.position2,
                    position3: props.meme.position3,
                    numTxt: props.meme.numTxt
                  }
                 }
                }>
                <Button variant="primary" className="mr-2">
                  Copy
                </Button>
                </Link>
                {props.meme.userId === props.username.id ? (
                  <Button variant="danger" onClick={() => { props.deleteMeme(props.meme.id) }}>Delete</Button>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
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
          <Modal.Title>{props.meme.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Title>
          
            <span class="material-icons-outlined">Create by: {props.username.name}</span>
          </Card.Title>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`./images/${props.meme.imgId}.jpg`}
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
