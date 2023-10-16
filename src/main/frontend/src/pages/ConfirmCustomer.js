import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignatureComponent from "./SignatureComponent"; // 경로는 실제 파일 위치에 맞게 조정해주세요.
import ObjectionComponent from "./ObjectionComponent"; // 여기도 경로 확인 필요합니다.
import "./index.css";

function ConfirmCustomer() {
  const [companyType, setCompanyType] = useState("");
  const [managerCode, setManagerCode] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [claimAction, setClaimAction] = useState(""); // 이의제기 또는 귀책 인정 상태
  const [showSignature, setShowSignature] = useState(false);
  const [objectionReason, setObjectionReason] = useState("");
  const [claimProcess, setClaimProcess] = useState("init"); // 처리 프로세스 상태 (init, evaluating, resolved)
  const [signatureData, setSignatureData] = useState(null); // 추가된 상태
  const [compensationAmount, setCompensationAmount] = useState("");
  const [atFaultParty, setAtFaultParty] = useState("");
  const [faultDetails, setFaultDetails] = useState("");
  const [penaltyDetails, setPenaltyDetails] = useState("");
  const [driverConfirmed, setDriverConfirmed] = useState(false);
  const navigate = useNavigate();
  const claimData = {
    orderNumber: "12345",
    description: "손상된 상품",
    amount: "50",
  };
  // 예제로 1234를 매니저 코드로 가정했습니다. 실제 로직에 따라 수정해주세요.

  const handleSubmit = (e) => {
    e.preventDefault();

    // 사용자 인증 흉내
    if (managerCode === "1234") {
      setIsAuthenticated(true);
      setShowDetails(true);
      setError(""); // 오류 메시지 초기화
    } else {
      setError("인증 실패. 담당자 코드를 확인하세요.");
      setShowDetails(false); // 인증에 실패했으므로 상세 정보는 표시하지 않습니다.
    }
  };

  const handleClaimAction = (action) => {
    if (action === "귀책인정") {
      // 귀책 인정 정보 입력 폼을 보여줍니다.
      setClaimAction("귀책인정");
    } else if (action === "이의제기") {
      setClaimAction(action);
      // 서버에 이의제기 액션을 보내는 로직 추가
    }
  };

  const handleObjectionConfirm = (reason) => {
    setObjectionReason(reason);
    setClaimAction("이의제기");
  };

  const handleProcessAction = (action) => {
    if (action === "startEvaluation") {
      setClaimProcess("evaluating");
      // 서버로 평가 시작 알림을 보내는 로직 추가 가능
    } else if (action === "resolve") {
      setClaimProcess("resolved");
      // 서버에 해결 액션을 보내는 로직 추가
    }
  };
  const handleCompensationSubmit = (e) => {
    e.preventDefault();
    // 실제 시스템에 배상금액을 추가하는 로직은 서버와의 통신을 필요로 합니다. 여기서는 간략하게 표시만 합니다.
    alert(`배상금액 ${compensationAmount}가 시스템에 추가되었습니다.`);
    setClaimAction("귀책 인정"); // 상태를 "귀책 인정"으로 변경합니다.
    alert("3초 후 홈페이지로 이동됩니다.");
    setTimeout(() => {
      navigate("/"); // 3초 후 HomePage로 이동
    }, 3000);
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          {!isAuthenticated ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="companyType">
                <Form.Label>고객사 선택</Form.Label>
                <Form.Control
                  as="select"
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="A 고객사">A 고객사</option>
                  <option value="B 고객사">B 고객사</option>
                  <option value="C 고객사">C 고객사</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="managerCode">
                <Form.Label>담당자 코드</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="담당자 코드 입력"
                  value={managerCode}
                  onChange={(e) => setManagerCode(e.target.value)}
                />
              </Form.Group>
              <br />
              {companyType && managerCode ? (
                <Button variant="primary" type="submit">
                  클레임 조회
                </Button>
              ) : null}
            </Form>
          ) : (
            <>
              <h2>클레임 상세 정보</h2>
              <p>주문 번호: {claimData.orderNumber}</p>
              <p>설명: {claimData.description}</p>
              <p>금액: {claimData.amount}</p>
              {claimAction ? (
                <Alert
                  variant={claimAction === "이의제기" ? "danger" : "success"}
                >
                  {claimAction === "이의제기"
                    ? "이의제기를 선택하셨습니다."
                    : "귀책을 인정하셨습니다."}
                </Alert>
              ) : (
                <>
                  <Button
                    variant="danger"
                    onClick={() => handleClaimAction("이의제기")}
                  >
                    이의제기
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleClaimAction("귀책인정")}
                  >
                    귀책인정
                  </Button>
                </>
              )}
            </>
          )}

          {showSignature && (
            <SignatureComponent
              onConfirm={(signatureData) => {
                console.log(signatureData);
                setShowSignature(false);
                setClaimAction("귀책인정"); // 서명 후 귀책 인정 상태로 변경
              }}
            />
          )}

          {claimAction === "귀책인정" && (
            <div>
              <h3>귀책 인정 정보 입력</h3>
              <Form onSubmit={handleCompensationSubmit}>
                <Form.Group>
                  <Form.Label>귀책 당사자</Form.Label>
                  <Form.Control
                    value={atFaultParty}
                    onChange={(e) => setAtFaultParty(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>귀책 내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={faultDetails}
                    onChange={(e) => setFaultDetails(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>패널티 내용</Form.Label>
                  <Form.Control
                    value={penaltyDetails}
                    onChange={(e) => setPenaltyDetails(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>배상 금액</Form.Label>
                  <Form.Control
                    type="number"
                    value={compensationAmount}
                    onChange={(e) => setCompensationAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="담당자 확인 여부"
                  checked={driverConfirmed}
                  onChange={(e) => setDriverConfirmed(e.target.checked)}
                />
                {signatureData ? (
                  <p>사인이 등록되었습니다.</p>
                ) : (
                  <SignatureComponent
                    onConfirm={(data) => {
                      setSignatureData(data);
                    }}
                  />
                )}
                <br />
                <Button type="submit">정보 제출</Button>
              </Form>
            </div>
          )}

          {compensationAmount && (
            <Alert variant="warning">
              배상 금액 {compensationAmount}가 기사님의 월급에서 차감됩니다.
            </Alert>
          )}
          {claimAction === "이의제기" &&
            (!objectionReason ? (
              <ObjectionComponent onConfirm={handleObjectionConfirm} />
            ) : (
              <div>
                <h3>이의제기 처리 프로세스</h3>
                <Alert variant="info">이의제기 사유: {objectionReason}</Alert>

                {claimProcess === "init" && (
                  <Button
                    variant="primary"
                    onClick={() => handleProcessAction("startEvaluation")}
                  >
                    평가 시작
                  </Button>
                )}

                {claimProcess === "evaluating" && (
                  <Alert variant="warning">평가 중입니다.</Alert>
                )}

                {claimProcess === "resolved" && (
                  <Alert variant="success">처리 완료되었습니다.</Alert>
                )}

                {/* {claimProcess === "evaluating" && (
                  <Button
                    variant="success"
                    onClick={() => handleProcessAction("resolve")}
                  >
                    처리 완료
                  </Button>
                )} */}
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
}
export default ConfirmCustomer;
