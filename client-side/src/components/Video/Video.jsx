//external imports
import React, { Component } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import AppUrl from "../../restApi/AppUrl";
import RestClient from "../../restApi/RestClient";
import Loading from "../Loading/Loading";
import WentWrong from "../WentWrong/WentWrong";

const VideoModal = ({ show, onHide, homeVedioUrl }) => {
  return (
    <Modal centered show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <Player autoPlay src={homeVedioUrl}>
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
      homeVedioTitle: "",
      homeVedioDesctiption: "",
      homeVedioUrl: "",
      isLoading: true,
      isEorror: false,
    };
  }

  modalOpen = () => {
    this.setState({ showModal: true });
  };
  modalClose = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    RestClient.GetRequest(AppUrl.HomeEtc)
      .then((data) => {
        this.setState({
          homeVedioTitle: data["data"][0].homeVedioTitle,
          homeVedioDesctiption: data["data"][0].homeVedioDesctiption,
          homeVedioUrl: data["data"][0].homeVedioUrl,
          isLoading: false,
          isEorror: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
          isEorror: true,
        });
      });
  }

  render() {
    if (this.state.isLoading === true) {
      return <Loading />;
    } else if (this.state.isEorror === true) {
      return <WentWrong />;
    }

    return (
      <>
        <Container className="text-center">
          <Row>
            <Col lg={12} md={12} sm={12} className="videoCard">
              <p className="videoTitle">{this.state.homeVedioTitle}</p>
              <p className="videoDes">{this.state.homeVedioDesctiption}</p>
              <p>
                <FaPlayCircle className="playBtn" onClick={this.modalOpen} />
              </p>
            </Col>
          </Row>
        </Container>
        <VideoModal
          show={this.state.showModal}
          onHide={this.modalClose}
          homeVedioUrl={this.state.homeVedioUrl}
        />
      </>
    );
  }
}

export default Video;
