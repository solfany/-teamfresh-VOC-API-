import React, { useState } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import "./index.css";
import axios from "axios";

function ObjectionComponent({ onConfirm, vocId, driverType }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const objectionData = {
      vocId: vocId,
      objectionContent: reason,
      managerCode: driverType, // 기사 이름 추가
    };

    axios
      .post("/api/voc/objection", objectionData)
      .then((response) => {
        if (response.status === 200) {
          onConfirm(reason, driverType);
          setReason("");
          setMessage({
            type: "success",
            content: "이의제기가 성공적으로 전송되었습니다.",
          });
        } else {
          setMessage({
            type: "danger",
            content: "이의제기 전송에 실패했습니다. 다시 시도해 주세요.",
          });
        }
      })
      .catch((error) => {
        console.error("Error sending objection:", error);
        setMessage({
          type: "danger",
          content: "이의제기 전송 중 오류가 발생했습니다. 다시 시도해 주세요.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container className="mt-4 ">
        <h3>이의제기 사유 입력</h3>
        {message && (
          <Alert
            variant={message.type}
            onClose={() => setMessage(null)}
            dismissible
          >
            {message.content}
          </Alert>
        )}
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
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "제출"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ObjectionComponent;
