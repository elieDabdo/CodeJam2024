import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import ScrollToTop from "../ScrollToTop";
import Navbar from "../Navbar";
import Footer from "../Footer";
import FileUpload from "../FileUpload"
import yoga from "../../assets/yogagirlie.gif"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  const handleFileChange = (file) => {
    console.log('Selected file:', file);
    const vidURL = URL.createObjectURL(file);
    navigate('/game', {state: {video: vidURL}});
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

                <h1 className="heading-name">
                  Welcome to 
                  <strong className="main-name"> MyTrainer </strong>
                </h1>

                <div style={{ padding: 50, textAlign: "left" }}>
                  <Type />
                </div>
              </Col>

              <Col md={5} style={{ paddingBottom: 20 }}>
                <img
                  src={yoga}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Col>
            </Row>
            <Row>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
              <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Upload your MP4 video here to start training</h1>
              <FileUpload onFileChange={handleFileChange} />
            </div>
            </Row>
        </Container>
      </Container>
      </section>
      <Footer />
    </>
  );
}

export default Home;
