import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export default function StudentGradeForm({ student, subject, classroom, show, setAddGradeShow }) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    dateTs: new Date().toISOString().substring(0, 10),
    grade: null,
    weight: 1,
  });

  const handleClose = () => setAddGradeShow(false);

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
      studentId: student.id,
      subjectId: subject.id,
    };

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    console.log(payload);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Přidat známku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Žák: {student.firstname + " " + student.surname}</div>
            <div>Předmět: {subject.name}</div>
            <div>Třída: {classroom.name}</div>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Popis</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
                maxLength={20}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zadejte popis s maximální délkou 20 znaků
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Známka</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1-5"
                  value={formData.grade}
                  onChange={(e) => setField("grade", parseInt(e.target.value))}
                  min={1}
                  max={5}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Zadejte známku 1-5
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>Váha</Form.Label>
                <Form.Select
                  value={formData.weight}
                  onChange={(e) => setField("weight", Number(e.target.value))}
                  required
                >
                  <option value="" disabled>
                    Váha známky
                  </option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Datum</Form.Label>
              <Form.Control
                type="date"
                value={formData.dateTs}
                onChange={(e) => setField("dateTs", e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vyberte platný datum
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Zavřít
              </Button>
              <Button variant="primary" type="submit">
                Vytvořit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
