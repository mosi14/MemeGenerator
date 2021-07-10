import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./generator.css";
import API from '../API'

const MemeGenerate = () => {
  const [imgShow, setImgShow] = useState(1);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [font, setFont] = useState("font-1");
  const [color, setColor] = useState("color-1");

  const handleErrors = (err) => {
    if(err.errors)
      console.log(err.errors[0].msg)
      //setMessage({msg: err.errors[0].msg + ': ' + err.errors[0].param, type: 'danger'});
    else
    console.log(err.error)
      //setMessage({msg: err.error, type: 'danger'});
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   // console.log(this.state.authUser.name);
  //   if (!form.checkValidity()) {
  //     form.reportValidity();
  //   } else {
  //     let rent = Object.assign({}, this.state);

  //     let formErrors = { ...this.state.formErrors };
  //     if (!(rent.startDate && rent.endDate &&
  //       rent.startDate < rent.endDate && rent.startDate >= new Date().toISOString().slice(0, 10))) {
  //       formErrors.startDate = "Invalid Start Date!";
  //       formErrors.endDate = "Invalid End Date!";
  //     } else {
  //       formErrors.startDate = "";
  //       formErrors.endDate = "";
  //     }
  //     if (rent.extraDrivers < 0) {
  //       formErrors.extraDriver = "The number of drivers cannot be negative!";
  //     } else {
  //       formErrors.extraDriver = "";
  //     }
  //     await this.setState({ formErrors }, () => console.log(this.state.formErrors));
  //     if (this.state.formErrors.startDate === "" &&
  //       this.state.formErrors.endDate === "" &&
  //       this.state.formErrors.extraDriver === "") {
  //       await this.setState({ isValid: true });
  //     } else {
  //       await this.setState({ isValid: false });
  //       form.reportValidity();
  //       return;
  //     }
  // }

  const createMeme = (meme) => {
    API.createMeme(meme)
      .then(() => {
      }).catch(err => handleErrors(err) );
  }

  return (
    <>
      <Container>
        <Form method="POST" id="frmReserve" >
          <Row className="mt-5">
            <Col>
              <Form.Group  
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Title
                </Form.Label>

                <Form.Control type="text" />

                <br />
                     <>
                     <Form.Label column sm="2">
                     Text1
                   </Form.Label>

                   <Form.Control
                     type="text"
                     onChange={(ev) => setText1(ev.target.value)}
                   />

                   <br />
                   <Form.Label column sm="2">
                     Text2
                   </Form.Label>

                   <Form.Control
                     type="text"
                     onChange={(ev) => setText2(ev.target.value)}
                   />

                   <br />
                   <Form.Label column sm="2">
                     Text3
                   </Form.Label>

                   <Form.Control
                     type="text"
                     onChange={(ev) => setText3(ev.target.value)}
                   /></>
               
              </Form.Group>
              <div>
                <select
                  name="opFont"
                  id="op_font"
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
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="protected"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Col>
            <Col>
              <div className="p-div">
                <Image
                  src={`./images/${imgShow}.jpg`} //"./images/${}.jpg"
                  className="memeImageGenerator"
                  thumbnail
                />
                <lable className={`p-txt1 ${font} ${color}`}>{text1}</lable>
                <lable className={`p-txt2 ${font} ${color}`}>{text2}</lable>
                <lable className={`p-txt3 ${font} ${color}`}>{text3}</lable>
              </div>
              <div>
                <select
                  name="bgImage"
                  id="bg_image"
                  onChange={(ev) => setImgShow(ev.target.value)}
                >
                  {/* <option>Choose one </option> */}
                  <optgroup label="Choose one">
                    <option value="1">First meme</option>
                    <option value="2">Second meme</option>
                    <option value="3">Third meme</option>
                    <option value="4">Fourth meme</option>
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
              </Button>{" "}
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
