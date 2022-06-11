//external imports
import React, { Component } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";

const VideoModal = ({ show, onHide }) => {
  return (
    <Modal centered show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <Player
          autoPlay
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        >
          <BigPlayButton position="center" />
        </Player>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  modalOpen = () => {
    this.setState({ showModal: true });
  };
  modalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <Container className="text-center">
          <Row>
            <Col lg={12} md={12} sm={12} className="videoCard">
              <p className="videoTitle">How I Do</p>
              <p className="videoDes">
                First i analysis the requirement of project. According to the
                requirement i make a proper technical analysis, then i build a
                software architecture. According to the planning i start coding.
                Testing is also going on with coding. Final testing take place
                after finishing coding part. After successful implementation i
                provide 6 month free bug fixing service for corresponding
                project.
              </p>
              <p>
                <FaPlayCircle className="playBtn" onClick={this.modalOpen} />
              </p>
            </Col>
          </Row>
        </Container>
        <VideoModal show={this.state.showModal} onHide={this.modalClose} />
      </>
    );
  }
}

export default Video;
