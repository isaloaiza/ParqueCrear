import React, { useRef, useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import emailjs from '@emailjs/browser';
// import '../routes/contac.css'
import { Col, Row, Alert } from "react-bootstrap";


const ContactUs = () => {
  const refForm = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(refForm.current);

    const serviceId = "service_gqus8q5";
    const templateId = "template_omhxrhn";
    const apiKey = "iZMvQhyKKBv8VUH6F";
    emailjs
      .sendForm(serviceId, templateId, refForm.current, apiKey)
      .then(result => console.log(result.text))
      .catch(error => console.log(error));
  };



  return (
    <div>
      <DefaultLayout>
        <Col lg={12}>
          <div className="newsletter-bx wow slideInUp">
            <Row>
              <Col lg={12} md={6} xl={5}>
                <h3>Subscribe to our Newsletter<br></br> & Never miss latest updates</h3>
                {status === 'sending' && <Alert>Sending...</Alert>}
              </Col>
              <Col md={6} xl={7}>
                <form ref={refForm} action="" onSubmit={handleSubmit}>
                  <div className="header-contact">
                    <p>Please fill from </p>
                    <fieldset className="field-name">
                      <label className="symbol-required name" htmlFor="">name</label>
                      < input type="text" placeholder="Ej: Luisa"></input>
                    </fieldset>
                  </div>
                  <button className="btn-send">Enviar</button>
                </form>
              </Col>
            </Row>
          </div>
        </Col>
      </DefaultLayout>
    </div>
  );
};

export default ContactUs;
