import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import YogaVideo from '../../assets/yoga.mp4';
import TaiChiVideo from '../../assets/tai_chi.mp4';
import StretchingVideo from '../../assets/stretching.mp4';
import DancingVideo from '../../assets/dancing.mp4';
import ProjectCard from "./ProjectCards";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";
import Footer from "../Footer";

function Projects() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            Try some of our <strong className="purple"> Presets </strong>
          </h1>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
                title="Yoga"
                description="Get flexible and zen with yoga—it's all about stretching, deep breathing, and finding your chill for a healthy body and mind."
                video= {YogaVideo}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOTtKr1QiIWs7JpNhAm7qkUeF47ddjsv8pw&usqp=CAU"}
                title="Tai Chi"
                description="Move gracefully with Tai Chi! Slow, flowing motions and relaxed breathing bring balance, flexibility, and a laid-back vibe to your exercise routine."
                video= {TaiChiVideo}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                title="Stretching"
                description="Loosen up and feel good! Stretching is all about making your muscles happy, boosting flexibility, and getting ready to tackle anything that comes your way."
                video= {StretchingVideo}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://www.shutterstock.com/image-photo/full-length-excited-funny-young-260nw-1967652817.jpg"}
                title="Dancing"
                description="Let loose and have fun! Dancing is the ultimate body groove—shake it to the beat, get your heart pumping, and enjoy the awesome feeling of moving your body."
                video= {DancingVideo}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
                title="Preset 5 "
                description="Relax and explore your body."
                video={YogaVideo}
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={"https://as1.ftcdn.net/v2/jpg/05/11/84/12/1000_F_511841276_7MyhimdVvJUi5sftZiCRtaIUMG2siF6t.jpg"}
                title="Preset 6"
                description="Relax and explore your body."
                video={YogaVideo}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}

export default Projects;
