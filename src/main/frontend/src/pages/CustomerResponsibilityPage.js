import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Alert,
  Button,
} from "react-bootstrap";

function CustomerResponsibilityPage() {
  const { id } = useParams();

  // 백엔드에서 해당 ID를 사용하여 claim 상세 정보를 가져올 수 있습니다.

  // State
  const [transportCompany, setTransportCompany] = useState("");
  const [driver, setDriver] = useState("");
  const [penalty, setPenalty] = useState(0);
  const [faultDescription, setFaultDescription] = useState("");
  const [compensationAmount, setCompensationAmount] = useState("");
  const [penaltyDescription, setPenaltyDescription] = useState(""); // 패널티 설명
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const isFormComplete =
    transportCompany &&
    driver &&
    penaltyDescription &&
    faultDescription &&
    compensationAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 백엔드와 연동하여 데이터 저장

    // "저장되었습니다." 메시지 표시
    setShowMessage(true);
    alert("3초 후 홈페이지로 이동합니다.");

    // 3초 후 홈페이지로 리다이렉트
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <>
      <Container className="mt-5 ">
        <Row className="justify-content-center mt-4">
          <Col lg={8}>
            <Card>
              <Card.Header as="h4" className="text-center">
                고객사 Responsibility for Claim ID: {id}
              </Card.Header>
              <Card.Body>
                {showMessage && (
                  <Alert variant="success">저장되었습니다.</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="transportCompanySelect">
                    <Form.Label>고객사 선택</Form.Label>
                    <Form.Control
                      as="select"
                      value={transportCompany}
                      onChange={(e) => setTransportCompany(e.target.value)}
                    >
                      <option value="">-- 선택 --</option>
                      <option value="transportCompany1">A 고객사</option>
                      <option value="transportCompany2">B 고객사</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="driverSelect">
                    <Form.Label>담당자 선택</Form.Label>
                    <Form.Control
                      as="select"
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                    >
                      <option value="">-- 선택 --</option>
                      <option value="driver1">담당자 1</option>
                      <option value="driver2">담당자 2</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="penaltyDescription">
                    <Form.Label>패널티 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={penaltyDescription}
                      onChange={(e) => setPenaltyDescription(e.target.value)}
                      placeholder="패널티 내용을 입력하세요."
                    />
                  </Form.Group>

                  <Form.Group controlId="faultDescription">
                    <Form.Label>귀책 내용</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={faultDescription}
                      onChange={(e) => setFaultDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="compensationAmount">
                    <Form.Label>배상 금액</Form.Label>
                    <Form.Control
                      type="number"
                      value={compensationAmount}
                      onChange={(e) => setCompensationAmount(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    type="submit"
                    block
                    disabled={!isFormComplete}
                  >
                    저장하기
                  </Button>
                  <span className="ml-3">현재 패널티: {penalty}</span>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CustomerResponsibilityPage;
