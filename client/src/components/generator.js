import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col, Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./generator.css";
import API from "../API";
import Meme from "../entities/Meme";
import { useLocation } from "react-router";

const MemeGenerate = (props) => {
  const location = useLocation();
  const [memeId, setMemeId] = useState(location.meme ? location.meme.id : "");
  const [title, setTitle] = useState(location.meme ? location.meme.title : "");
  const [imgId, setImgId] = useState(location.meme ? location.meme.imgId : 1);
  const [text1, setText1] = useState(location.meme ? location.meme.text1 : "");
  const [text2, setText2] = useState(location.meme ? location.meme.text2 : "");
  const [text3, setText3] = useState(location.meme ? location.meme.text3 : "");
  const [error, setError] = useState(false);
  const [position1x, setPosition1x] = useState(
    location.meme ? location.meme.position1x : 50
  );
  const [position1y, setPosition1y] = useState(
    location.meme ? location.meme.position1y : 115
  );
  const [position2x, setPosition2x] = useState(
    location.meme ? location.meme.position2x : 235
  );
  const [position2y, setPosition2y] = useState(
    location.meme ? location.meme.position2y : 50
  );
  const [position3x, setPosition3x] = useState(
    location.meme ? location.meme.position3x : 0
  );
  const [position3y, setPosition3y] = useState(
    location.meme ? location.meme.position3y : 0
  );
  const [numTxt, setnumTxt] = useState(
    location.meme ? location.meme.numTxt : 2
  );
  const [font, setFont] = useState(
    location.meme ? location.meme.txtFont : "font-1"
  );
  const [color, setColor] = useState(
    location.meme ? location.meme.txtColor : "color-1"
  );
  const [privacy, setPrivacy] = useState(
    location.meme ? location.meme.privacy : "public"
  );
  const [inserted, setInserted] = useState(false);

  const submitMeme = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
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
          setInserted(true);
          setTitle("");
          setText1("");
          setText2("");
          setText3("");
          setFont("font-1");
          setColor("color-1");
          setImgId(1);
        })
        .catch((errorObj) => {});
    }
  };
 
  useEffect(() => {}, [
    position1x,
    position1y,
    position2x,
    position2y,
    position3x,
    position3y,
    numTxt,
  ]);

  const handleChange = (index) => {
    setImgId(index);
    var pos1x = 0;
    var pos2x = 0;
    var pos3x = 0;
    var pos1y = 0;
    var pos2y = 0;
    var pos3y = 0;
    var nTxt = 0;
    props.imgRule.forEach(function (meme) {
      if (meme.imgId.toString() === index.toString()) {
        pos1x = meme.position1x;
        pos2x = meme.position2x;
        pos3x = meme.position3x;
        pos1y = meme.position1y;
        pos2y = meme.position2y;
        pos3y = meme.position3y;
        nTxt = meme.numTxt;
      }
    });
    setPosition1x(pos1x);
    setPosition2x(pos2x);
    setPosition3x(pos3x);
    setPosition1y(pos1y);
    setPosition2y(pos2y);
    setPosition3y(pos3y);
    setnumTxt(nTxt);
  };
  const visibility = privacy;
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
              {inserted ? (
                <Alert key="form-error" variant="success">
                  the new meme has been created!
                </Alert>
              ) : (
                ""
              )}
              {error ? (
                <Alert key="form-error" variant="danger">
                  At least one of the meme texts should be filled!
                </Alert>
              ) : (
                ""
              )}
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
                    className={error ? "border-danger" : ""}
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
                        className={error ? "border-danger" : ""}
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
                        className={error ? "border-danger" : ""}
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
              {props.username.id === memeId || visibility === "public" ? (
                <>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="public"
                        name="group1"
                        type={type}
                        checked={privacy === "public" ? "checked" : ""}
                        //  checked="checked"
                        value="public"
                        onChange={(ev) => setPrivacy(ev.target.value)}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="protected"
                        name="group1"
                        type={type}
                        checked={privacy === "protected" ? "checked" : ""}
                        value="protected"
                        onChange={(ev) => setPrivacy(ev.target.value)}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))}{" "}
                </>
              ) : (
                ""
              )}
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
                    style={{
                      top: position1x + "px",
                      left: position1y + "px",
                    }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text1}
                  </p>
                ) : (
                  ""
                )}
                {numTxt > 1 ? (
                  <p
                    style={{
                      top: position2x + "px",
                      left: position2y + "px",
                    }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text2}
                  </p>
                ) : (
                  ""
                )}
                {numTxt > 2 ? (
                  <p
                    style={{
                      top: position3x + "px",
                      left: position3y + "px",
                    }}
                    className={`textpos ${font} ${color}`}
                  >
                    {text3}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                {memeId === "" ? (
                  <select
                    name="bgImage"
                    id="bg_image"
                    selected={imgId}
                    onChange={(ev) => handleChange(ev.target.value)}
                  >
                    <optgroup label="Choose one">
                      {props.imgRule.map((x, index) => {
                        return (
                          <option value={x.imgId}>{imgName[index]} meme</option>
                        );
                      })}
                    </optgroup>
                  </select>
                ) : (
                  ""
                )}
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
