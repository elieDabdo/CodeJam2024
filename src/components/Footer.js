import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>

          <h3>Designed and Developed by Elie Abdo, Antoine Dangeard and Anthony Tan, Copyright © {year}</h3>

      </Row>
    </Container>
  );
}

export default Footer;
