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
import { isEmpty } from "../helper/Validation/Validation";
import Swal from "sweetalert2";
import {
  errorMessage,
  successMessage,
} from "../helper/ToastMessage/ToastMessage";

const AddTestimonialModal = ({
  showAddModal,
  handleAddModalClose,
  addTestimonialHandler,
  setField,
  errors,
  form,
}) => {
  return (
    <Modal
      show={showAddModal}
      onHide={handleAddModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <h2>Testimonial Add</h2>
        <Form onSubmit={addTestimonialHandler}>
          <Form.Group className="mb-3" controlId="testmonialName">
            <Form.Label>Testimonial Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Testimonial Name"
              onChange={(e) => setField("testmonialName", e.target.value)}
              isInvalid={!!errors.testmonialName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="testmonialDescription">
            <Form.Label>Testimonial Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Testimonial Description"
              onChange={(e) =>
                setField("testmonialDescription", e.target.value)
              }
              isInvalid={!!errors.testmonialDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="testmonialThumbnail">
            <Form.Label>Testimonial Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Testimonial Thumbnail"
              onChange={(e) => setField("testmonialThumbnail", e.target.value)}
              isInvalid={!!errors.testmonialThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Testimonial
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

const UpdateTestimonialModal = ({
  showEditModal,
  handleEditModalClose,
  updateTestimonialHandler,
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
        <Form onSubmit={updateTestimonialHandler}>
          <Form.Group className="mb-3" controlId="testmonialName">
            <Form.Label>Testimonial Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Testimonial Name"
              onChange={(e) => setField("testmonialName", e.target.value)}
              isInvalid={!!errors.testmonialName}
              value={form.testmonialName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="testmonialDescription">
            <Form.Label>Testimonial Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Testimonial Description"
              onChange={(e) =>
                setField("testmonialDescription", e.target.value)
              }
              isInvalid={!!errors.testmonialDescription}
              value={form.testmonialDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="testmonialThumbnail">
            <Form.Label>Testimonial Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Testimonial Thumbnail"
              onChange={(e) => setField("testmonialThumbnail", e.target.value)}
              isInvalid={!!errors.testmonialThumbnail}
              value={form.testmonialThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.testmonialThumbnail}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Testimonial
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

function TestimonialPage() {
  const [testimonial, setTestimonial] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTestimonialId, seteditTestimonialId] = useState();
  const handleEditModalClose = () => setShowEditModal(false);

  const [form, setForm] = useState({
    testmonialName: "",
    testmonialDescription: "",
    testmonialThumbnail: "",
    TestimonialCover: "",
  });

  const [errors, setErrors] = useState({});

  const fetchAllTestimonial = () => {
    RestClient.GetRequest(AppUrl.SelectAllTestmonial)
      .then((result) => {
        if ((result.status = "success")) {
          setTestimonial(result.data);
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
    fetchAllTestimonial();
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
    const { testmonialName, testmonialDescription, testmonialThumbnail } = form;
    const newErrors = {};

    if (isEmpty(testmonialName)) {
      newErrors.testmonialName = "Testimonial Name   cannot be blank!";
    }
    if (isEmpty(testmonialDescription)) {
      newErrors.testmonialDescription =
        "Testimonial Description  cannot be blank!";
    }
    if (isEmpty(testmonialThumbnail)) {
      newErrors.testmonialThumbnail = "Testimonial Thumbnail  cannot be blank!";
    }

    return newErrors;
  };

  const addTestimonialHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PostRequest(AppUrl.SelectAllTestmonial, form)
        .then((data) => {
          if (data.status === "success") {
            successMessage("Testimonial Create Successfull");
            fetchAllTestimonial();
            setShowAddModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Testimonial Not Create Successfull");
          setShowAddModal(false);
        });
    }
  };
  const editTestimonialHandler = (id) => {
    seteditTestimonialId(id);
    setShowEditModal(true);
    setIsloading(true);

    RestClient.GetRequest(AppUrl.SelectAllTestmonial + "/" + id)
      .then((data) => {
        if (data.status === "success") {
          setForm({
            ...form,
            testmonialName: data["data"][0].testmonialName,
            testmonialDescription: data["data"][0].testmonialDescription,
            testmonialThumbnail: data["data"][0].testmonialThumbnail,
            TestimonialCover: data["data"][0].TestimonialCover,
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const updateTestimonialHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PatchRequest(
        AppUrl.SelectAllTestmonial + "/" + editTestimonialId,
        form,
      )
        .then((data) => {
          if (data.status === "success") {
            successMessage("Testimonial Update Successfull");
            fetchAllTestimonial();
            setShowEditModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Testimonial Not Update Successfull");
          setShowEditModal(false);
        });
    }
  };

  const deleteTestimonialHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.SelectAllTestmonial + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire(
                "Deleted!",
                "Your Testimonial has been deleted.",
                "success",
              );
              fetchAllTestimonial();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Testimonial has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Deleted Fail!",
              "Your Testimonial has not deleted.",
              "error",
            );
          });
      }
    });
  };

  //TODO
  const deleteMultipleTestimonialHandler = (rows, isSelect, index) => {};

  const actionFormatter = (cellContent, row) => {
    return (
      <>
        <Button
          variant="warning"
          className="me-2"
          onClick={editTestimonialHandler.bind(this, row._id)}
        >
          <AiFillEdit />
        </Button>

        <Button
          variant="danger"
          className="me-2"
          onClick={deleteTestimonialHandler.bind(this, row._id)}
        >
          <AiFillDelete />
        </Button>
      </>
    );
  };

  const imageFormatter = (cellContent, row) => {
    return (
      <img
        src={row.testmonialThumbnail}
        alt={row.testmonialName}
        style={{ maxWidth: "80px" }}
      />
    );
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: deleteMultipleTestimonialHandler,
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
      text: "Testimonial ID",
      sort: true,
    },
    {
      dataField: "testmonialName",
      text: "Testimonial Name",
      sort: true,
    },
    {
      dataField: "testmonialDescription",
      text: "Testimonial Description",
      sort: true,
    },
    {
      dataField: "testmonialThumbnail",
      text: "Testimonial Thumbnail",
      formatter: imageFormatter,
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
      <MasterLayout title="Testimonial">
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
      <MasterLayout title="Testimonial">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (testimonial.length <= 0) {
    return (
      <MasterLayout title="Testimonial">
        <Container fluid={true} className="content-body" title="Testimonial">
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
      <MasterLayout title="Testimonial">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <Button onClick={handleAddModalShow}>Add Testimonial</Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={testimonial}
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
      <AddTestimonialModal
        handleAddModalClose={handleAddModalClose}
        showAddModal={showAddModal}
        addTestimonialHandler={addTestimonialHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
      <UpdateTestimonialModal
        handleEditModalClose={handleEditModalClose}
        showEditModal={showEditModal}
        updateTestimonialHandler={updateTestimonialHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
    </>
  );
}

export default TestimonialPage;
