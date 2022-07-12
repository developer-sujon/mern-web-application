import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

//Internal Lib Import
import MasterLayout from "../components/MasterLayout/MasterLayout";
import AppUrl from "../Services/AppUrl";
import RestClient from "../Services/RestClient";

import Loading from "../components/Loading/Loading";
import WentWrong from "../components/WentWrong/WentWrong";
import NotFound from "../components/NotFound/NotFound";
import Swal from "sweetalert2";

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const fetchAllContact = () => {
    RestClient.GetRequest(AppUrl.SelectAllContact)
      .then((response) => {
        if (response.status === 200) {
          setContacts(response.data.data);
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
    fetchAllContact();
  }, []);

  const deleteContactHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CB0C9F",
      cancelButtonColor: "#344767",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestClient.DeleteRequest(AppUrl.DeleteContact + "/" + id)
          .then((data) => {
            if (data.status === "success") {
              Swal.fire(
                "Deleted!",
                "Your Contact has been deleted.",
                "success",
              );
              fetchAllContact();
            } else {
              Swal.fire(
                "Deleted Fail!",
                "Your Contact has not deleted.",
                "error",
              );
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Deleted Fail!",
              "Your Contact has not deleted.",
              "error",
            );
          });
      }
    });
  };

  const onSelectHandler = (rows) => {
    console.log(rows);

    setSelectedId(rows._id);
  };

  //TODO
  const deleteMultipleContactHandler = (rows, isSelect, index) => {};

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
      text: "Contact ID",
    },
    {
      dataField: "contactName",
      text: "Contact Name",
      sort: true,
    },
    {
      dataField: "contactEmail",
      text: "Contact Email",
      sort: true,
    },
    {
      dataField: "contactMessage",
      text: "Contact Message",
      sort: true,
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: onSelectHandler,
  };

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
  } else if (contacts.length <= 0) {
    return (
      <MasterLayout title="Course">
        <Container fluid={true} className="content-body" title="Contact">
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
        <Container fluid={true} className="content-body text-center">
          <Row>
            <Col>
              <Button
                variant="danger"
                onClick={deleteContactHandler.bind(this, selectedId)}
              >
                Deleted
              </Button>
              <BootstrapTable
                bootstrap4
                keyField="_id"
                data={contacts}
                columns={columns}
                defaultSorted={defaultSorted}
                striped
                hover
                pagination={paginationFactory(options)}
                selectRow={selectRow}
              />
            </Col>
          </Row>
        </Container>
      </MasterLayout>
    </>
  );
}

export default ContactPage;
