import React, { useState } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import { Col, Container, Row } from "react-bootstrap";

import Loading from "../components/Loading/Loading";
import WentWrong from "../components/WentWrong/WentWrong";
import NotFound from "../components/NotFound/NotFound";
import { useEffect } from "react";

const DashboardPage = () => {
  const [dashboardSummary, setDashboardSummary] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {}, []);

  if (isloading) {
    return (
      <MasterLayout title="Chart">
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
      <MasterLayout title="Chart">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (dashboardSummary.length <= 0) {
    return (
      <MasterLayout title="Chart">
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
      <MasterLayout title="Chart">
        <Container fluid={true} className="content-body">
          <Row>
            {["new", "canceled", "pending", "complate"].map((item, index) => (
              <div
                className="col-12 col-lg-3 col-sm-6 col-md-3  p-2"
                key={index}
              >
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="animated fadeInUp">Total {item}</h5>
                    <h6 className="text-secondary animated fadeInUp">0</h6>
                  </div>
                </div>
              </div>
            ))}
          </Row>
        </Container>
      </MasterLayout>
    </>
  );
};
export default DashboardPage;
