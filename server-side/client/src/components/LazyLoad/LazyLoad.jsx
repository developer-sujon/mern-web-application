import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingImg from "../../Assets/img/laoding.svg";
import { LoadingContext } from "../../context/LoadingContext";

export const LazyLoad = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <Container
      className={
        isLoading
          ? `text-center full-screen-loader`
          : `text-center full-screen-loader d-none`
      }
    >
      <Row>
        <Col>
          <img src={LoadingImg} alt="Loading" />
        </Col>
      </Row>
    </Container>
  );
};

export default LazyLoad;
