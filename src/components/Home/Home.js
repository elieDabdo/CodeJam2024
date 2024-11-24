import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import ScrollToTop from "../ScrollToTop";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Button from "react-bootstrap/Button";
import gameControl from "../../assets/game-control.gif";
import CapturePhoto from "./CapturePhoto";
import { useNavigate } from "react-router-dom";

import "./home.scss";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <ScrollToTop />
        <section>
          <Container fluid className="home-section" id="home">
            <Particle />
            <Container className="home-content">
              <Row>
                <Col md={7} className="home-header">
                  <h1 className="heading-name">Welcome to</h1>
                  <h1>
                    <strong className="main-name"> Cambat</strong>
                  </h1>

                  <div style={{ padding: 50, textAlign: "left" }}>
                    <Type />
                  </div>
                </Col>

                <Col md={5} style={{ paddingBottom: 20 }}>
                  <img
                    src={gameControl}
                    alt="home pic"
                    className="img-fluid"
                    style={{ maxHeight: "450px" }}
                  />
                </Col>
              </Row>
            </Container>
          </Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "4rem",
            }}
          >
            <Button className="glitch-button" onClick={() => navigate("/game")}>
              Play Game
            </Button>
          </div>
        </section>
        <div
          style={{
            padding: "20px",
            marginBottom: "100px",
            textAlign: "center",
          }}
        >
          <p style={{ color: "white" }}>Or snap a photo to join the battle!</p>
          <CapturePhoto />
        </div>
      </div>
      <div className="bottom-footer">
        <p>
          Designed and Developed by Elie Abdo, Rudi Kischer and Danielle
          Wahrhaftig, and Ben Hepditch. Copyright © 2024
        </p>
      </div>
    </div>
  );
}

export default Home;
