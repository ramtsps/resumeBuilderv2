import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from "react-icons/md";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ImCheckmark, ImCross } from "react-icons/im";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index";
import { PiCertificateFill } from "react-icons/pi";
import { FaLink } from "react-icons/fa";
function Certificate() {
  const certificateList = useSelector((state) => state.certificateList);
  const dispatch = useDispatch();
  const { addCertificate, editCertificate, removeCertificate } =
    bindActionCreators(actionCreators, dispatch);

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id: "",
      course: "",
      company: "",
      link: "",
      isEdit: false,
    });
  };
  const handleShow = () => setShow(true);
  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id);
    setAlert(true);
  };

  // const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id: "",
    course: "",
    company: "",
    link: "",
    isEdit: false,
  });
  const handleForm = (e) => {
    setForm((old) => {
      return {
        ...old,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const x = event.currentTarget;
    if (!x.checkValidity()) {
      setValidated(true);
    } else {
      if (form.isEdit) {
        editCertificate(form);
        // list[form.id] = form;
        // setList(list);
      } else {
        addCertificate(form);
        // const newList = list.concat({ ...form });
        // setList(newList);
      }
      setShow(false);
      setForm({
        id: "",
        course: "",
        company: "",
        link: "",
        isEdit: false,
      });
    }
  };

  const handleEdit = (id) => {
    const form = certificateList[id];
    form.isEdit = true;
    form.id = id;
    setForm(form);
    setShow(true);
  };

  const handleDelete = (id) => {
    removeCertificate(id);
    // list.splice(id, 1);
    // setList(list);
    setAlert(false);
  };

  return (
    <Row className="justify-content-center mt-2">
      <Col
        md={8}
        sm={12}
        className="d-flex justify-content-between align-items-center bg-light rounded"
      >
        <h5 className="m-0">Certificate</h5>
        <MdAddCircleOutline
          size={30}
          className="rounded edit"
          onClick={handleShow}
        />
      </Col>
      <Col md={8} sm={12}>
        {certificateList.map((item, id) => {
          return (
            <Row className="border-bottom pt-3" key={id}>
              <Col md={10} className="d-flex justify-content-start">
                <PiCertificateFill
                  size={50}
                  className="rounded color-blue bg-grey p-1 shadow-sm"
                />
                <div className="px-3">
                  <h5 className="m-0">{item.course}</h5>
                  <p className="text-muted m-0">{item.company}</p>
                  <p className="text-muted">
                    <FaLink
                      style={{ color: "00B3FF", paddingRight: "5px" }}
                      size={15}
                    />
                    {item.link}
                  </p>
                </div>
              </Col>
              <Col md={2}>
                <div className="d-flex flex-wrap justify-content-end">
                  <MdEdit
                    size={30}
                    className="rounded edit"
                    onClick={() => {
                      handleEdit(id);
                    }}
                  />
                  <MdDelete
                    size={30}
                    className="rounded edit"
                    onClick={() => {
                      handleAlert(id);
                    }}
                  />
                </div>
              </Col>
            </Row>
          );
        })}
      </Col>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable={true}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Certificate</Modal.Title>
          <MdClose size={30} className="rounded edit" onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                required
                type="text"
                name="course"
                size="sm"
                placeholder="Ex: Web Developer"
                value={form.course}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Certificate Provider Company</Form.Label>
              <Form.Control
                required
                type="text"
                name="company"
                size="sm"
                placeholder="Ex: ABC Company"
                value={form.company}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Certificate link</Form.Label>
              <Form.Control
                required
                type="text"
                name="link"
                size="sm"
                placeholder="Certificate link"
                value={form.link}
                onChange={handleForm}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Row>
                    <Form.Label>Start - Year</Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <select
                        title={form.startYear}
                        name="startYear"
                        value={form.startYear}
                        onChange={handleForm}
                        className="form-select"
                      >
                        <Years />
                      </select>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Row>
                        <Form.Label>End - Year</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <select
                            title={form.endYear}
                            name="endYear"
                            value={form.endYear}
                            onChange={handleForm}
                            disabled={form.isWorking}
                            className="form-select"
                          >
                            <Years />
                          </select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group> */}
            {/* <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                required
                type="text"
                name="grade"
                size="sm"
                placeholder="Ex: 8.5/10 CGPA"
                value={form.grade}
                onChange={handleForm}
              />
            </Form.Group> */}
            <button type="submit" className="rounded edit px-2">
              Save Changes
            </button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={Alert}
        onHide={handleAlertClose}
        className="text-center"
        size="sm"
        centered
      >
        <Modal.Body>
          <h4>Are you sure ?</h4>
          <ImCheckmark
            size={30}
            className="rounded edit"
            onClick={() => {
              handleDelete(deleteId);
            }}
          />
          <ImCross
            size={25}
            className="rounded edit"
            onClick={handleAlertClose}
          />
        </Modal.Body>
      </Modal>
    </Row>
  );
}

export default Certificate;
