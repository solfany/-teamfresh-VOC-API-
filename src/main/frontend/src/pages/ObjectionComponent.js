// ObjectionComponent.js

import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "./index.css";

function ObjectionComponent({ onConfirm }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(reason);
  };

  return (
    <>
      <Container className="mt-4 ">
        <h3>이의제기 사유 입력</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="objectionReason">
            <Form.Label>사유</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            제출
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ObjectionComponent;
