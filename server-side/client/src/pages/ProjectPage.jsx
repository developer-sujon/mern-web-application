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

const AddProjectModal = ({
  showAddModal,
  handleAddModalClose,
  addProjectHandler,
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
        <h2>Project Add</h2>
        <Form onSubmit={addProjectHandler}>
          <Form.Group className="mb-3" controlId="portfolioName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Project Name"
              onChange={(e) => setField("portfolioName", e.target.value)}
              isInvalid={!!errors.portfolioName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioDescription">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Project Description"
              onChange={(e) => setField("portfolioDescription", e.target.value)}
              isInvalid={!!errors.portfolioDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioThumbnail">
            <Form.Label>Project Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Thumbnail"
              onChange={(e) => setField("portfolioThumbnail", e.target.value)}
              isInvalid={!!errors.portfolioThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioCover">
            <Form.Label>Project Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Cover"
              onChange={(e) => setField("portfolioCover", e.target.value)}
              isInvalid={!!errors.portfolioCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioCover}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioUrl">
            <Form.Label>Project Url</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Url"
              onChange={(e) => setField("portfolioUrl", e.target.value)}
              isInvalid={!!errors.portfolioUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioUrl}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Project
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

const UpdateProjectModal = ({
  showEditModal,
  handleEditModalClose,
  updateProjectHandler,
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
        <Form onSubmit={updateProjectHandler}>
          <Form.Group className="mb-3" controlId="portfolioName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Project Name"
              onChange={(e) => setField("portfolioName", e.target.value)}
              isInvalid={!!errors.portfolioName}
              value={form.portfolioName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioDescription">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Project Description"
              onChange={(e) => setField("portfolioDescription", e.target.value)}
              isInvalid={!!errors.portfolioDescription}
              value={form.portfolioDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioThumbnail">
            <Form.Label>Project Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Thumbnail"
              onChange={(e) => setField("portfolioThumbnail", e.target.value)}
              isInvalid={!!errors.portfolioThumbnail}
              value={form.portfolioThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioCover">
            <Form.Label>Project Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Cover"
              onChange={(e) => setField("portfolioCover", e.target.value)}
              isInvalid={!!errors.portfolioCover}
              value={form.portfolioCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioCover}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="portfolioUrl">
            <Form.Label>Project Url</Form.Label>
            <Form.Control
              type="url"
              placeholder="Project Url"
              onChange={(e) => setField("portfolioUrl", e.target.value)}
              isInvalid={!!errors.portfolioUrl}
              value={form.portfolioUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portfolioUrl}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Project
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

function ProjectPage() {
  const [Project, setProject] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editProjectId, seteditProjectId] = useState();
  const handleEditModalClose = () => setShowEditModal(false);

  const [form, setForm] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioThumbnail: "",
    portfolioCover: "",
    portfolioUrl: "",
  });

  const [errors, setErrors] = useState({});

  const fetchAllProject = () => {
    RestClient.GetRequest(AppUrl.SelectAllPortfolio)
      .then((response) => {
        if (response.status === 200) {
          setProject(response.data.data);
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
    fetchAllProject();
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
    const {
      portfolioName,
      portfolioDescription,
      portfolioThumbnail,
      portfolioCover,
      portfolioUrl,
    } = form;
    const newErrors = {};

    if (isEmpty(portfolioName)) {
      newErrors.portfolioName = "Project Name   cannot be blank!";
    }
    if (isEmpty(portfolioDescription)) {
      newErrors.portfolioDescription = "Project Description  cannot be blank!";
    }
    if (isEmpty(portfolioThumbnail)) {
      newErrors.portfolioThumbnail = "Project Thumbnail  cannot be blank!";
    }
    if (isEmpty(portfolioCover)) {
      newErrors.portfolioCover = "Project Cover  cannot be blank!";
    }
    if (isEmpty(portfolioUrl)) {
      newErrors.portfolioUrl = "Project Url  cannot be blank!";
    }

    return newErrors;
  };

  const addProjectHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PostRequest(AppUrl.SelectAllPortfolio, form)
        .then((data) => {
          successMessage("Project Create Successfull");
          fetchAllProject();
          setShowAddModal(false);
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Project Not Create Successfull");
        });
    }
  };
  const editProjectHandler = (id) => {
    seteditProjectId(id);
    setShowEditModal(true);
    setIsloading(true);

    RestClient.GetRequest(AppUrl.SelectAllPortfolio + "/" + id)
      .then((data) => {
        if (data.status === 200) {
          setForm({
            ...form,
            portfolioName: data.data["data"][0].portfolioName,
            portfolioDescription: data.data["data"][0].portfolioDescription,
            portfolioThumbnail: data.data["data"][0].portfolioThumbnail,
            portfolioCover: data.data["data"][0].portfolioCover,
            portfolioUrl: data.data["data"][0].portfolioUrl,
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const updateProjectHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PatchRequest(
        AppUrl.SelectAllPortfolio + "/" + editProjectId,
        form,
      )
        .then((data) => {
          if (data.status === 200) {
            successMessage("Project Update Successfull");
            fetchAllProject();
            setShowEditModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Project Not Update Successfull");
        });
    }
  };

  const deleteProjectHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.SelectAllPortfolio + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire(
                "Deleted!",
                "Your Project has been deleted.",
                "success",
              );
              fetchAllProject();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Project has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Deleted Fail!",
              "Your Project has not deleted.",
              "error",
            );
          });
      }
    });
  };

  //TODO
  const deleteMultipleProjectHandler = (rows, isSelect, index) => {};

  const actionFormatter = (cellContent, row) => {
    return (
      <>
        <Button
          variant="warning"
          className="me-2"
          onClick={editProjectHandler.bind(this, row._id)}
        >
          <AiFillEdit />
        </Button>

        <Button
          variant="danger"
          className="me-2"
          onClick={deleteProjectHandler.bind(this, row._id)}
        >
          <AiFillDelete />
        </Button>
      </>
    );
  };

  const imageFormatter = (cellContent, row) => {
    return (
      <img
        src={row.portfolioThumbnail}
        alt={row.portfolioName}
        style={{ maxWidth: "80px" }}
      />
    );
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: deleteMultipleProjectHandler,
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
      text: "Project ID",
      sort: true,
    },
    {
      dataField: "portfolioName",
      text: "Project Name",
      sort: true,
    },
    {
      dataField: "portfolioDescription",
      text: "Project Description",
      sort: true,
    },
    {
      dataField: "portfolioThumbnail",
      text: "Project Thumbnail",
      formatter: imageFormatter,
    },
    {
      dataField: "portfolioCover",
      text: "Project Cover",
      formatter: imageFormatter,
    },
    {
      dataField: "portfolioUrl",
      text: "Project Url",
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
      <MasterLayout title="Project">
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
      <MasterLayout title="Project">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (Project.length <= 0) {
    return (
      <MasterLayout title="Project">
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
      <MasterLayout title="Project">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <Button onClick={handleAddModalShow}>Add Project</Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={Project}
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
      <AddProjectModal
        handleAddModalClose={handleAddModalClose}
        showAddModal={showAddModal}
        addProjectHandler={addProjectHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
      <UpdateProjectModal
        handleEditModalClose={handleEditModalClose}
        showEditModal={showEditModal}
        updateProjectHandler={updateProjectHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
    </>
  );
}

export default ProjectPage;
