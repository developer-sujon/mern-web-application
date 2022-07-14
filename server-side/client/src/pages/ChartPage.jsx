import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

//Internal Lib Import
import MasterLayout from "../components/MasterLayout/MasterLayout";
import AppUrl from "../Services/AppUrl";
import RestClient from "../Services/RestClient";

import Loading from "../components/Loading/Loading";
import WentWrong from "../components/WentWrong/WentWrong";
import NotFound from "../components/NotFound/NotFound";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { isEmpty } from "../Helper/Validation/Validation";
import {
  errorMessage,
  successMessage,
} from "../Helper/ToastMessage/ToastMessage";

const AddChartModal = ({
  showAddModal,
  handleAddModalClose,
  addChartHandler,
  setField,
  errors,
}) => {
  return (
    <Modal
      show={showAddModal}
      onHide={handleAddModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h2>Login Page</h2>
        <Form onSubmit={addChartHandler}>
          <Form.Group className="mb-3" controlId="chartXData">
            <Form.Label>Chart X Data</Form.Label>
            <Form.Control
              type="number"
              placeholder="Chart X Data"
              onChange={(e) => setField("chartXData", e.target.value)}
              isInvalid={!!errors.chartXData}
            />
            <Form.Control.Feedback type="invalid">
              {errors.chartXData}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="chartYData">
            <Form.Label>Chart Y Data</Form.Label>
            <Form.Control
              type="text"
              placeholder="Chart Y Data"
              onChange={(e) => setField("chartYData", e.target.value)}
              isInvalid={!!errors.chartYData}
            />
            <Form.Control.Feedback type="invalid">
              {errors.chartYData}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Chart
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const UpdateChartModal = ({
  showEditModal,
  handleEditModalClose,
  updateChartHandler,
  setField,
  errors,
  form,
}) => {
  return (
    <Modal
      show={showEditModal}
      onHide={handleEditModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h2>Update Page</h2>
        <Form onSubmit={updateChartHandler}>
          <Form.Group className="mb-3" controlId="chartXData">
            <Form.Label>Chart X Data</Form.Label>
            <Form.Control
              type="number"
              placeholder="Chart X Data"
              onChange={(e) => setField("chartXData", e.target.value)}
              isInvalid={!!errors.chartXData}
              value={form.chartXData}
            />
            <Form.Control.Feedback type="invalid">
              {errors.chartXData}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="chartYData">
            <Form.Label>Chart Y Data</Form.Label>
            <Form.Control
              type="text"
              placeholder="Chart Y Data"
              onChange={(e) => setField("chartYData", e.target.value)}
              isInvalid={!!errors.chartYData}
              value={form.chartYData}
            />
            <Form.Control.Feedback type="invalid">
              {errors.chartYData}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Chart
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function ChartPage() {
  const [chart, setChart] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editChartId, seteditChartId] = useState();
  const handleEditModalClose = () => setShowEditModal(false);

  const [form, setForm] = useState({
    chartXData: "",
    chartYData: "",
  });

  const [errors, setErrors] = useState({});

  const fetchAllChart = () => {
    RestClient.GetRequest(AppUrl.SelectAllChart)
      .then((response) => {
        if (response.status === 200) {
          setChart(response.data.data);
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
    fetchAllChart();
  }, []);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { chartXData, chartYData } = form;
    const newErrors = {};

    if (isEmpty(chartXData)) {
      newErrors.chartXData = "Chart X Data  cannot be blank!";
    }
    if (isEmpty(chartYData)) {
      newErrors.chartYData = "Chart Y Data cannot be blank!";
    }

    return newErrors;
  };

  const addChartHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PostRequest(AppUrl.SelectAllChart, form)
        .then((data) => {
          if (data.status === 201) {
            successMessage("Chart Create Successfull");
            fetchAllChart();
            setShowAddModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Chart Not Create Successfull");
          setShowAddModal(false);
        });
    }
  };
  const editChartHandler = (id) => {
    seteditChartId(id);
    setShowEditModal(true);
    setIsloading(true);

    RestClient.GetRequest(AppUrl.SelectAllChart + "/" + id)
      .then((data) => {
        if (data.status === 200) {
          setForm({
            ...form,
            chartXData: data.data["data"][0].chartXData,
            chartYData: data.data["data"][0].chartYData,
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const updateChartHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PatchRequest(AppUrl.SelectAllChart + "/" + editChartId, form)
        .then((data) => {
          successMessage("Chart Update Successfull");
          fetchAllChart();
          setShowEditModal(false);
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Chart Not Update Successfull");
        });
    }
  };

  const deleteChartHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.DeleteChart + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire("Deleted!", "Your Chart has been deleted.", "success");
              fetchAllChart();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Chart has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Deleted Fail!", "Your Chart has not deleted.", "error");
          });
      }
    });
  };

  //TODO
  const deleteMultipleChartHandler = (rows, isSelect, index) => {};

  const actionFormatter = (cellContent, row) => {
    return (
      <>
        <Button
          variant="warning"
          className="me-2"
          onClick={editChartHandler.bind(this, row._id)}
        >
          <AiFillEdit />
        </Button>

        <Button
          variant="danger"
          className="me-2"
          onClick={deleteChartHandler.bind(this, row._id)}
        >
          <AiFillDelete />
        </Button>
      </>
    );
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: deleteMultipleChartHandler,
  };

  const options = {
    sizePerPage: 10,
    hideSizePerPage: true,
  };

  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ];

  const columns = [
    {
      dataField: "_id",
      text: "Chart ID",
      sort: true,
    },
    {
      dataField: "chartXData",
      text: "Chart X Data",
      sort: true,
    },
    {
      dataField: "chartYData",
      text: "Chart Y Data",
      sort: true,
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Action",
      formatter: actionFormatter,
    },
  ];

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
  } else if (chart.length <= 0) {
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
            <Col>
              <Button onClick={handleAddModalShow}>Add Chart</Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={chart}
                columns={columns}
                defaultSorted={defaultSorted}
                striped
                hover
                selectRow={selectRow}
                pagination={paginationFactory(options)}
              />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
      <AddChartModal
        handleAddModalClose={handleAddModalClose}
        showAddModal={showAddModal}
        addChartHandler={addChartHandler}
        setField={setField}
        errors={errors}
      />
      <UpdateChartModal
        handleEditModalClose={handleEditModalClose}
        showEditModal={showEditModal}
        updateChartHandler={updateChartHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
    </>
  );
}

export default ChartPage;
