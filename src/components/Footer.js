import React from "react";
import { Container, Row } from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <h3>
          Designed and Developed by Elie Abdo, Rudi Kischer and Danielle
          Wahrhaftig. Copyright © {year}
        </h3>
      </Row>
    </Container>
  );
}

export default Footer;
