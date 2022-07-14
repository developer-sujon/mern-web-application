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
import { isEmpty } from "../Helper/Validation/Validation";
import Swal from "sweetalert2";
import {
  errorMessage,
  successMessage,
} from "../Helper/ToastMessage/ToastMessage";

const AddServiceModal = ({
  showAddModal,
  handleAddModalClose,
  addServiceHandler,
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
        <h2>Service Add</h2>
        <Form onSubmit={addServiceHandler}>
          <Form.Group className="mb-3" controlId="serviceName">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Service Name"
              onChange={(e) => setField("serviceName", e.target.value)}
              isInvalid={!!errors.serviceName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceDescription">
            <Form.Label>Service Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Service Description"
              onChange={(e) => setField("serviceDescription", e.target.value)}
              isInvalid={!!errors.serviceDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceThumbnail">
            <Form.Label>Service Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Service Thumbnail"
              onChange={(e) => setField("serviceThumbnail", e.target.value)}
              isInvalid={!!errors.serviceThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceCover">
            <Form.Label>Service Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Service Cover"
              onChange={(e) => setField("serviceCover", e.target.value)}
              isInvalid={!!errors.serviceCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceCover}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Service
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

const UpdateServiceModal = ({
  showEditModal,
  handleEditModalClose,
  updateServiceHandler,
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
        <Form onSubmit={updateServiceHandler}>
          <Form.Group className="mb-3" controlId="serviceName">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Service Name"
              onChange={(e) => setField("serviceName", e.target.value)}
              isInvalid={!!errors.serviceName}
              value={form.serviceName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceDescription">
            <Form.Label>Service Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Service Description"
              onChange={(e) => setField("serviceDescription", e.target.value)}
              isInvalid={!!errors.serviceDescription}
              value={form.serviceDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceThumbnail">
            <Form.Label>Service Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Service Thumbnail"
              onChange={(e) => setField("serviceThumbnail", e.target.value)}
              isInvalid={!!errors.serviceThumbnail}
              value={form.serviceThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="serviceCover">
            <Form.Label>Service Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Service Cover"
              onChange={(e) => setField("serviceCover", e.target.value)}
              isInvalid={!!errors.serviceCover}
              value={form.serviceCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.serviceCover}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Service
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

function ServicePage() {
  const [Service, setService] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editServiceId, seteditServiceId] = useState();
  const handleEditModalClose = () => setShowEditModal(false);

  const [form, setForm] = useState({
    serviceName: "",
    serviceDescription: "",
    serviceThumbnail: "",
    serviceCover: "",
  });

  const [errors, setErrors] = useState({});

  const fetchAllService = () => {
    RestClient.GetRequest(AppUrl.SelectAllService)
      .then((response) => {
        if (response.status === 200) {
          setService(response.data.data);
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
    fetchAllService();
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
    const { serviceName, serviceDescription, serviceThumbnail, serviceCover } =
      form;
    const newErrors = {};

    if (isEmpty(serviceName)) {
      newErrors.serviceName = "Service Name   cannot be blank!";
    }
    if (isEmpty(serviceDescription)) {
      newErrors.serviceDescription = "Service Description  cannot be blank!";
    }
    if (isEmpty(serviceThumbnail)) {
      newErrors.serviceThumbnail = "Service Thumbnail  cannot be blank!";
    }
    if (isEmpty(serviceCover)) {
      newErrors.serviceCover = "Service Cover  cannot be blank!";
    }

    return newErrors;
  };

  const addServiceHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PostRequest(AppUrl.SelectAllService, form)
        .then((data) => {
          if (data.status === 201) {
            successMessage("Service Create Successfull");
            fetchAllService();
            setShowAddModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Service Not Create Successfull");
          setShowAddModal(false);
        });
    }
  };
  const editServiceHandler = (id) => {
    seteditServiceId(id);
    setShowEditModal(true);
    setIsloading(true);

    RestClient.GetRequest(AppUrl.SelectAllService + "/" + id)
      .then((data) => {
        if (data.status === 200) {
          setForm({
            ...form,
            serviceName: data.data["data"][0].serviceName,
            serviceDescription: data.data["data"][0].serviceDescription,
            serviceThumbnail: data.data["data"][0].serviceThumbnail,
            serviceCover: data.data["data"][0].serviceCover,
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const updateServiceHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PatchRequest(
        AppUrl.SelectAllService + "/" + editServiceId,
        form,
      )
        .then((data) => {
          if (data.status === 200) {
            successMessage("Service Update Successfull");
            fetchAllService();
            setShowEditModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Service Not Update Successfull");
          setShowEditModal(false);
        });
    }
  };

  const deleteServiceHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.SelectAllService + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire(
                "Deleted!",
                "Your Service has been deleted.",
                "success",
              );
              fetchAllService();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Service has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Deleted Fail!",
              "Your Service has not deleted.",
              "error",
            );
          });
      }
    });
  };

  //TODO
  const deleteMultipleServiceHandler = (rows, isSelect, index) => {};

  const actionFormatter = (cellContent, row) => {
    return (
      <>
        <Button
          variant="warning"
          className="me-2"
          onClick={editServiceHandler.bind(this, row._id)}
        >
          <AiFillEdit />
        </Button>

        <Button
          variant="danger"
          className="me-2"
          onClick={deleteServiceHandler.bind(this, row._id)}
        >
          <AiFillDelete />
        </Button>
      </>
    );
  };

  const imageFormatter = (cellContent, row) => {
    return (
      <img
        src={row.serviceThumbnail}
        alt={row.serviceName}
        style={{ maxWidth: "80px" }}
      />
    );
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: deleteMultipleServiceHandler,
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
      text: "Service ID",
      sort: true,
    },
    {
      dataField: "serviceName",
      text: "Service Name",
      sort: true,
    },
    {
      dataField: "serviceDescription",
      text: "Service Description",
      sort: true,
    },
    {
      dataField: "serviceThumbnail",
      text: "Service Thumbnail",
      formatter: imageFormatter,
    },
    {
      dataField: "serviceCover",
      text: "Service Cover",
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
      <MasterLayout title="Service">
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
      <MasterLayout title="Service">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (Service.length <= 0) {
    return (
      <MasterLayout title="Service">
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
      <MasterLayout title="Service">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <Button onClick={handleAddModalShow}>Add Service</Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={Service}
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
      <AddServiceModal
        handleAddModalClose={handleAddModalClose}
        showAddModal={showAddModal}
        addServiceHandler={addServiceHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
      <UpdateServiceModal
        handleEditModalClose={handleEditModalClose}
        showEditModal={showEditModal}
        updateServiceHandler={updateServiceHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
    </>
  );
}

export default ServicePage;
