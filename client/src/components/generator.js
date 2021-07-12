import React, { useState } from "react";
import { Image, Container, Row, Col, Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./generator.css";
import API from "../API";
import Meme from "../entities/Meme";
import { useLocation } from "react-router";

const MemeGenerate = (props) => {
  const location = useLocation();
  const [title, setTitle] = useState(location.meme ? location.meme.title : "");
  //const [currentUser, setCurrentUser] = useState(location.meme ? location.meme.userId : '');
  const [imgId, setImgId] = useState(location.meme ? location.meme.imgId : 1);
  const [text1, setText1] = useState(location.meme ? location.meme.text1 : "");
  const [text2, setText2] = useState(location.meme ? location.meme.text2 : "");
  const [text3, setText3] = useState(location.meme ? location.meme.text3 : "");
  const [error,setError]=useState(false);
  const [position1, setPosition1] = useState(
    location.meme ? location.meme.position1 : "50,10"
  );
  const [position2, setPosition2] = useState(
    location.meme ? location.meme.position2 : "50,100"
  );
  const [position3, setPosition3] = useState(
    location.meme ? location.meme.position3 : ""
  );
  const [numTxt, setnumTxt] = useState(
    location.meme ? location.meme.numTxt : 3
  );
  const [font, setFont] = useState(
    location.meme ? location.meme.txtFont : "font-1"
  );
  const [color, setColor] = useState(
    location.meme ? location.meme.txtColor : "color-1"
  );
  const [privacy, setPrivacy] = useState(
    location.meme ? location.meme.privacy : false
  );
  const [inserted, setInserted] = useState(false);
  const [formErrors, setFormErrors] = useState([text1, text2, text3]);

  const handleErrors = (err) => {
    if (err.errors) console.log(err.errors[0].msg);
    //setMessage({msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger'});
    else console.log(err.error);
    //setMessage({msg: err.error, type: 'danger'});
  };

  const submitMeme = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let meme = new Meme(
        null,
        imgId,
        color,
        title,
        text1,
        text2,
        text3,
        privacy,
        props.username.id,
        font
      );

      if (meme.text1 === "" && meme.text2 === "" && meme.text3 === "") {
        setError(true);
      } else {
        setError(false);
      }

      API.createMeme(JSON.stringify(meme))
        .then((data) => {
          setInserted(false);
          setTitle("");
          setText1("");
          setText2("");
          setText3("");
          setFont("font-1");
          setColor("color-1");
          setImgId(1);
        })
        .catch((errorObj) => {
          console.log(errorObj);
        });
    }
  };
  let pos1 ="";
  const handleChange = (index) => {

    setImgId(index.target.value);
    pos1 = props.imgRule[index.target.value -1].Position1;
    let pos2 = props.imgRule[index.target.value -1].position2;
    let pos3 = props.imgRule[index.target.value -1].position3;
    let num = props.imgRule[index.target.value -1].numTxt;

    setPosition1(pos1);
    setPosition2(pos2);
    setPosition3(pos3);
    setnumTxt(num);
    console.log(props.imgRule[index.target.value -1].position1);
    console.log(position1);
    // props.imgRule.forEach(function (meme) {
    //   pos1 = [];
    //   pos2 = [];
    //   pos3 = [];
    //   num = [];
    //   if (meme.imgId.toString() === index.target.value.toString()) {
    //     pos1.push(meme.position1);
    //     pos2.push(meme.position2);
    //     pos3.push(meme.position3);
    //     num.push(meme.numTxt);
    //   }
    // });

    // setPosition1(pos1);
    // setPosition1(pos2);
    // setPosition1(pos3);
    // setnumTxt(num);
    console.log(
      "posotion1: " +
        position1 +
        " position2: " +
        position2 +
        "   posotion3:  " +
        position3 +
        "   number of text: " +
        numTxt
    );
  };

  const imgName = ["First", "Second", "Third", "Fourth"];
  return (
    <>
      <Container>
        <Form
          method="POST"
          id="frmCreateMeme"
          onSubmit={(event) => submitMeme(event)}
        >
          <Row className="mt-5">
            <Col>
          {error ? <Alert key="form-error" variant="danger">At least one of the meme texts should be filled!</Alert>:""}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Title
                </Form.Label>

                <Form.Control
                  type="text"
                  onChange={(ev) => setTitle(ev.target.value)}
                  required
                  value={title}
                />

                <br />
                <>
                  <Form.Label column sm="2">
                    Text1
                  </Form.Label>

                  <Form.Control
                    type="text"
                    onChange={(ev) => setText1(ev.target.value)}
                    value={text1}
                    className= {error ? "border-danger": ""}
                  />
                  {numTxt > 1 ? (
                    <>
                      <br />
                      <Form.Label column sm="2">
                        Text2
                      </Form.Label>

                      <Form.Control
                        type="text"
                        onChange={(ev) => setText2(ev.target.value)}
                        value={text2}
                        className= {error ? "border-danger": ""}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {numTxt > 2 ? (
                    <>
                      <br />
                      <Form.Label column sm="2">
                        Text3
                      </Form.Label>

                      <Form.Control
                        type="text"
                        onChange={(ev) => setText3(ev.target.value)}
                        value={text3}
                        className= {error ? "border-danger": ""}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              </Form.Group>
              <div>
                <select
                  name="opFont"
                  id="op_font"
                  selected={font}
                  onChange={(ev) => setFont(ev.target.value)}
                >
                  {/* <option>Choose one </option> */}
                  <optgroup label="Choose font">
                    <option value="font-1">font Otomanopee</option>
                    <option value="font-2">font Lobster</option>
                  </optgroup>
                </select>
              </div>
              <hr />

              <div>
                <select
                  name="opColor"
                  id="op_color"
                  selected={color}
                  onChange={(ev) => setColor(ev.target.value)}
                >
                  {/* <option>Choose one </option> */}
                  <optgroup label="Choose color">
                    <option value="color-1">Black</option>
                    <option value="color-2">White</option>
                    <option value="color-3">Blue</option>
                    <option value="color-4">Red</option>
                  </optgroup>
                </select>
              </div>
              <hr />

              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="public"
                    name="group1"
                    type={type}
                    // checked={privacy === false ? 'checked' : ''}
                    checked="checked"
                    value="false"
                    onChange={(ev) => setPrivacy(ev.target.value)}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="protected"
                    name="group1"
                    type={type}
                    value="true"
                    onChange={(ev) => setPrivacy(ev.target.value)}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Col>
            <Col>
              <div className="p-div">
                <Image
                  src={`./images/${imgId}.jpg`} //"./images/${}.jpg"
                  className="memeImageGenerator"
                  thumbnail
                />
                {numTxt > 0 ? (
                  <p
                    // style={{
                    //   top: pos1.split(",")[0] + "px",
                    //   left: pos1.split(",")[1] + "px",
                    // }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text1}
                  </p>
                ) : (
                  ""
                )}
                {numTxt > 1 ? (
                  <p
                    // style={{
                    //   top: pos2.split(",")[0] + "px",
                    //   left: pos2.split(",")[1] + "px",
                    // }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text2}
                  </p>
                ) : (
                  ""
                )}
                {numTxt > 2 ? (
                  <p
                    // style={{
                    //   top: pos3.split(",")[0] + "px",
                    //   left: pos3.split(",")[1] + "px",
                    // }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text3}
                  </p>
                ) : (
                  ""
                )}

                {/* <lable
                  style={{
                    top: pos1.split(",")[0] + "px",
                    left: pos1.split(",")[1] + "px",
                  }}
                  className={`textpos ${font} ${color}`}
                >
                  {text1}
                </lable>
                <lable
                  // style={{
                  //   top: pos2.split(",")[0] + "px",
                  //   left: pos2.split(",")[1] + "px",
                  // }}
                  className={`textpos ${font} ${color}`}
                >
                  {text2}
                </lable>
                <lable
                  // style={{
                  //   top: pos3.split(",")[0] + "px",
                  //   left: pos3.split(",")[1] + "px",
                  // }}
                  className={`textpos ${font} ${color}`}
                > 
                  {text3}
                </lable> */}
              </div>
              <div>
                <select
                  name="bgImage"
                  id="bg_image"
                  selected={imgId}
                  onChange={handleChange}
                >
                  {/* <option>Choose one </option> */}
                  <optgroup label="Choose one">
                    {props.imgRule.map((x,index) => {
                      return (
                        <option value={x.imgId}>
                          {imgName[index]} meme
                        </option>
                      );
                    })}
                  </optgroup>
                </select>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button variant="primary" size="lg" active type="submit">
                Submit meme
              </Button>
            </Col>
          </Row>
          <br />
          <br />
        </Form>
      </Container>
    </>
  );
};

export default MemeGenerate;
