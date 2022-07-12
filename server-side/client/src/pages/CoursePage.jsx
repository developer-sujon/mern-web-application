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

const AddCourseModal = ({
  showAddModal,
  handleAddModalClose,
  addCourseHandler,
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
        <h2>Course Add</h2>
        <Form onSubmit={addCourseHandler}>
          <Form.Group className="mb-3" controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Name"
              onChange={(e) => setField("courseName", e.target.value)}
              isInvalid={!!errors.courseName}
              value={form.courseName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Description"
              onChange={(e) => setField("courseDescription", e.target.value)}
              isInvalid={!!errors.courseDescription}
              value={form.courseDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseThumbnail">
            <Form.Label>Course Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Course Thumbnail"
              onChange={(e) => setField("courseThumbnail", e.target.value)}
              isInvalid={!!errors.courseThumbnail}
              value={form.courseThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseCover">
            <Form.Label>Course Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Course Cover"
              onChange={(e) => setField("courseCover", e.target.value)}
              isInvalid={!!errors.courseCover}
              value={form.courseCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseCover}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Course
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

const UpdateCourseModal = ({
  showEditModal,
  handleEditModalClose,
  updateCourseHandler,
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
        <Form onSubmit={updateCourseHandler}>
          <Form.Group className="mb-3" controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Name"
              onChange={(e) => setField("courseName", e.target.value)}
              isInvalid={!!errors.courseName}
              value={form.courseName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Course Description"
              onChange={(e) => setField("courseDescription", e.target.value)}
              isInvalid={!!errors.courseDescription}
              value={form.courseDescription}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseDescription}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseThumbnail">
            <Form.Label>Course Thumbnail</Form.Label>
            <Form.Control
              type="url"
              placeholder="Course Thumbnail"
              onChange={(e) => setField("courseThumbnail", e.target.value)}
              isInvalid={!!errors.courseThumbnail}
              value={form.courseThumbnail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseThumbnail}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="courseCover">
            <Form.Label>Course Cover</Form.Label>
            <Form.Control
              type="url"
              placeholder="Course Cover"
              onChange={(e) => setField("courseCover", e.target.value)}
              isInvalid={!!errors.courseCover}
              value={form.courseCover}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseCover}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Course
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

function CoursePage() {
  const [course, setCourse] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourseId, seteditCourseId] = useState();
  const handleEditModalClose = () => setShowEditModal(false);

  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    courseThumbnail: "",
    courseCover: "",
  });

  const [errors, setErrors] = useState({});

  const fetchAllCourse = () => {
    RestClient.GetRequest(AppUrl.SelectAllCourse)
      .then((response) => {
        if (response.status === 200) {
          setCourse(response.data.data);
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
    fetchAllCourse();
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
    const { courseName, courseDescription, courseThumbnail, courseCover } =
      form;
    const newErrors = {};

    if (isEmpty(courseName)) {
      newErrors.courseName = "Course Name   cannot be blank!";
    }
    if (isEmpty(courseDescription)) {
      newErrors.courseDescription = "Course Description  cannot be blank!";
    }
    if (isEmpty(courseThumbnail)) {
      newErrors.courseThumbnail = "Course Thumbnail  cannot be blank!";
    }
    if (isEmpty(courseCover)) {
      newErrors.courseCover = "Course Cover  cannot be blank!";
    }

    return newErrors;
  };

  const addCourseHandler = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PostRequest(AppUrl.SelectAllCourse, form)
        .then((data) => {
          if (data.status === "success") {
            successMessage("Course Create Successfull");
            fetchAllCourse();
            setShowAddModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Course Not Create Successfull");
          setShowAddModal(false);
        });
    }
  };
  const editCourseHandler = (id) => {
    seteditCourseId(id);
    setShowEditModal(true);
    setIsloading(true);

    RestClient.GetRequest(AppUrl.SelectAllCourse + "/" + id)
      .then((data) => {
        if (data.status === "success") {
          setForm({
            ...form,
            courseName: data["data"][0].courseName,
            courseDescription: data["data"][0].courseDescription,
            courseThumbnail: data["data"][0].courseThumbnail,
            courseCover: data["data"][0].courseCover,
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  };
  const updateCourseHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      RestClient.PatchRequest(AppUrl.SelectAllCourse + "/" + editCourseId, form)
        .then((data) => {
          if (data.status === "success") {
            successMessage("Course Update Successfull");
            fetchAllCourse();
            setShowEditModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          errorMessage("Course Not Update Successfull");
        });
    }
  };

  const deleteCourseHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.SelectAllCourse + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire("Deleted!", "Your Course has been deleted.", "success");
              fetchAllCourse();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Course has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Deleted Fail!", "Your Course has not deleted.", "error");
          });
      }
    });
  };

  //TODO
  const deleteMultipleContactHandler = (rows, isSelect, index) => {};

  const actionFormatter = (cellContent, row) => {
    return (
      <>
        <Button
          variant="warning"
          className="me-2"
          onClick={editCourseHandler.bind(this, row._id)}
        >
          <AiFillEdit />
        </Button>

        <Button
          variant="danger"
          className="me-2"
          onClick={deleteCourseHandler.bind(this, row._id)}
        >
          <AiFillDelete />
        </Button>
      </>
    );
  };

  const imageFormatter = (cellContent, row) => {
    return (
      <img
        src={row.courseThumbnail}
        alt={row.courseName}
        style={{ maxWidth: "80px" }}
      />
    );
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: deleteMultipleContactHandler,
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
      text: "Course ID",
      sort: true,
    },
    {
      dataField: "courseName",
      text: "Course Name",
      sort: true,
    },
    {
      dataField: "courseDescription",
      text: "Course Description",
      sort: true,
    },
    {
      dataField: "courseThumbnail",
      text: "Contact Thumbnail",
      formatter: imageFormatter,
    },
    {
      dataField: "courseCover",
      text: "Contact Cover",
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
      <MasterLayout title="Course">
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
      <MasterLayout title="Course">
        <Container fluid={true} className="content-body">
          <Row>
            <Col>
              <WentWrong />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    );
  } else if (course.length <= 0) {
    return (
      <MasterLayout title="Course">
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
      <MasterLayout>
        <Container fluid={true} className="content-body" title="Course">
          <Row>
            <Col>
              <Button onClick={handleAddModalShow}>Add Course</Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={course}
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
      <AddCourseModal
        handleAddModalClose={handleAddModalClose}
        showAddModal={showAddModal}
        addCourseHandler={addCourseHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
      <UpdateCourseModal
        handleEditModalClose={handleEditModalClose}
        showEditModal={showEditModal}
        updateCourseHandler={updateCourseHandler}
        setField={setField}
        errors={errors}
        form={form}
      />
    </>
  );
}

export default CoursePage;
