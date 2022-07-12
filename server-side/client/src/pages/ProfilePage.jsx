import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

//Internal Lib Import
import MasterLayout from "../components/MasterLayout/MasterLayout";
import AppUrl from "../Services/AppUrl";
import RestClient from "../Services/RestClient";

import Loading from "../components/Loading/Loading";
import WentWrong from "../components/WentWrong/WentWrong";
import NotFound from "../components/NotFound/NotFound";

function ProfilePage() {
  const [profile, setProfile] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProfile = () => {
    RestClient.GetRequest(AppUrl.SelectProfile)
      .then((response) => {
        if (response.status === 200) {
          setProfile(response.data.data);
          setIsloading(false);
          setIsError(false);
        }
      })
      .catch((err) => {
        setIsloading(false);
        setIsError(true);
      });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (isloading) {
    return (
      <MasterLayout title="Profile">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <Loading />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (isError) {
    return (
      <MasterLayout title="Profile">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (profile.length <= 0) {
    return (
      <MasterLayout title="Profile">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <NotFound />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  }

  return (
    <>
      <MasterLayout title="Profile">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Name: {profile[0].name} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    User Name : {profile[0].userName}
                  </Card.Subtitle>
                  <Card.Link href="#">{profile[0].phone}</Card.Link>
                  <Card.Link href="#">{profile[0].email}</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    </>
  );
}

export default ProfilePage;
