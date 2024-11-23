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

function Home() {
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    console.log("Selected file:", file);
    const vidURL = URL.createObjectURL(file);
    navigate("/game", { state: { video: vidURL } });
  };

  const handleCapture = (croppedFace) => {
    console.log("Cropped face image:", croppedFace); // Logs the cropped PNG data URL
    navigate("/game", { state: { croppedFace } }); // Pass to the /game route
  };

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <section>
        <Container fluid className="home-section" id="home">
          <Particle />
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                {/* <h1 style={{ paddingBottom: 15 }} className="heading">
                     Hello there!{" "}
                     <span className="wave" role="img" aria-labelledby="wave">
                       👋🏻
                     </span>
                   </h1> */}
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
      </section>
      <div
        style={{ padding: "20px", marginBottom: "100px", textAlign: "center" }}
      >
        <p style={{ color: "white" }}>Snap a photo to join the battle!</p>
        <CapturePhoto />
      </div>
      <Footer />
    </>
  );
}

export default Home;
