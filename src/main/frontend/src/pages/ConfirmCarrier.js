import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import SignatureComponent from "./SignatureComponent"; // 경로는 실제 파일 위치에 맞게 조정해주세요.
import ObjectionComponent from "./ObjectionComponent"; // 여기도 경로 확인 필요합니다.
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

function ConfirmCarrier() {
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태
  const [error, setError] = useState(""); // 에러 메시지
  const [claimAction, setClaimAction] = useState(""); // 이의제기 또는 귀책 인정 상태
  const [showSignature, setShowSignature] = useState(false);
  const [objectionReason, setObjectionReason] = useState("");
  const [claimProcess, setClaimProcess] = useState("init"); // 처리 프로세스 상태 (init, evaluating, resolved)
  const [signatureData, setSignatureData] = useState(null); // 추가된 상태
  const [compensationAmount, setCompensationAmount] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const [driversList, setDriversList] = useState([]);
  const [claims, setClaims] = useState([]);

  // voc_id 상태 선언
  const [vocId, setVocId] = useState("");
  // 택배사와 기사 목록 객체
  const carrierAndDrivers = {
    CJ대한통운: ["이준호", "김태영", "박지성", "조민석", "최영진"],
    로젠택배: ["송기범", "정현우", "김진수", "박성민", "이재훈"],
    한진택배: ["김유진", "조한석", "윤대림", "백승환", "임태희"],
    우체국택배: ["최원석", "유지호", "김연경", "박나미", "김슬기"],
  };
  const handleCarrierChange = (e) => {
    const selected = e.target.value;
    setSelectedCarrier(selected);

    // 선택된 운송사에 따라 driversList를 업데이트
    const relevantDrivers = carrierAndDrivers[selected] || [];
    setDriversList(relevantDrivers);
  };
  const [claimData, setClaimData] = useState(null);
  // 택배사와 voc_id 상태 선언

  useEffect(() => {
    axios
      .get("/api/voc/DRIVER")
      .then((response) => {
        setClaims(response.data);
        console.log("연결되었습니다.");
        console.log("responseresponseresponse.");
        console.log(response);
        console.log("Loaded Claims:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching VOCs:", error);
      });
  }, []);

  const handleSubmitVerification = () => {
    if (vocId && signatureData && typeof verificationStatus !== "undefined") {
      axios
        .put(`/api/voc/verification/${vocId}`, {
          signatureData,
          verificationStatus,
        })
        .then((response) => {
          console.log("Signature saved successfully.");

          // 배상금액 알림 표시 로직 추가
          alert(
            `배상금액 시스템에 추가되었습니다. 3초 후 홈페이지로 이동됩니다.`
          );
          setTimeout(() => {
            setVerificationStatus(true); // verification 값을 true로 업데이트
            navigate("/"); // 3초 후 HomePage로 이동
          }, 3000);
        })
        .catch((error) => {
          console.error("Error saving signature:", error);
          console.error("vocId", vocId);
        });
    } else {
      console.warn("Missing data for submitting verification.");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 먼저 vocId를 기반으로 일치하는 클레임을 찾습니다.
    const matchedClaim = claims.find((claim) => claim.id?.toString() === vocId);

    // 클레임이 찾아지면 그 내부의 운송사와 기사 이름을 검증합니다.
    if (
      matchedClaim &&
      matchedClaim.carrier?.carrierType === selectedCarrier &&
      matchedClaim.driver?.driverType === selectedDriver
    ) {
      setClaimData(matchedClaim); // 일치하는 클레임 정보를 저장합니다.
      setIsAuthenticated(true); // 인증 상태를 'true'로 설정합니다.
      setShowDetails(true); // 클레임 상세 정보를 보여줍니다.
      setError(""); // 에러 메시지를 초기화합니다.
    } else {
      setIsAuthenticated(false); // 인증 상태를 'false'로 설정합니다.
      setError("일치하는 정보가 없습니다. 선택한 정보를 다시 확인하세요."); // 에러 메시지를 설정합니다.
    }

    console.log("Selected Carrier:", selectedCarrier);
    console.log("Selected Driver:", selectedDriver);
    console.log("Voc ID:", vocId);
    console.log("Matched Claim:", matchedClaim); // 디버깅용
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
  // const handleCompensationSubmit = (e) => {
  //   e.preventDefault();
  //   // 알림 표시
  //   alert(`배상금액 ${compensationAmount}가 시스템에 추가되었습니다.`);
  //   alert("3초 후 홈페이지로 이동됩니다.");
  //   setTimeout(() => {
  //     // 버튼을 눌렀을 때 verification 값을 true로 업데이트
  //     setVerificationStatus(true);
  //     navigate("/"); // 3초 후 HomePage로 이동
  //   }, 3000);
  // };

  return (
    <Container className="mt-5 ">
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}

          {!isAuthenticated ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="carrierSelection">
                <Form.Label>운송사 선택</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCarrier}
                  onChange={handleCarrierChange}
                >
                  <option value="">선택하세요</option>
                  {Object.keys(carrierAndDrivers).map((carrier) => (
                    <option key={carrier} value={carrier}>
                      {carrier}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="driverSelection">
                <Form.Label>기사님 선택</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {driversList.map((driver) => (
                    <option key={driver} value={driver}>
                      {driver}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="managerCode">
                <Form.Label>클레임 ID 입력</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="클레임 ID 입력"
                  value={vocId}
                  onChange={(e) => setVocId(e.target.value)}
                />
              </Form.Group>
              <br />
              {selectedCarrier && selectedDriver && vocId ? (
                <Button variant="primary" type="submit">
                  클레임 조회
                </Button>
              ) : null}
            </Form>
          ) : (
            <>
              <Alert variant="success">클레임 정보가 인증되었습니다!</Alert>
              <Card className="claim-details">
                <h2>클레임 상세 정보</h2>

                {/* 클레임 ID */}
                <div>
                  <strong>클레임 ID:</strong> {claimData.id}
                </div>

                {/* 운송사 정보 */}
                <div>
                  <strong>운송사:</strong> {claimData.carrier?.carrierType}
                </div>

                {/* 기사 정보 */}
                <div>
                  <strong>기사:</strong> {claimData.driver?.driverType}
                </div>

                {/* VOC 내용 */}
                <div>
                  <strong>VOC 내용:</strong> {claimData.vocContent}
                </div>

                {/* 보상 정보 */}
                {claimData.compensation && (
                  <div>
                    <strong>보상 금액:</strong>{" "}
                    {claimData.compensation.compensationAmount} 원
                  </div>
                )}

                {/* 패널티 내용 */}
                {claimData.penalty && (
                  <div>
                    <strong>패널티 내용:</strong>{" "}
                    {claimData.penalty.penaltyContent}
                  </div>
                )}

                {/* 생성 및 업데이트 날짜 */}
                <div>
                  <strong>작성일: </strong> {claimData.creationDate}
                </div>
              </Card>
              <br />
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
              setVerificationStatus={setVerificationStatus}
            />
          )}

          {claimAction === "귀책인정" && (
            <div>
              <h3>귀책 인정 정보 입력</h3>
              <Form>
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

                <Button onClick={handleSubmitVerification}>정보 제출</Button>
              </Form>
            </div>
          )}

          {claimAction === "이의제기" &&
            (!objectionReason ? (
              <ObjectionComponent
                onConfirm={handleObjectionConfirm}
                vocId={claimData.id}
                driverType={claimData.driver?.driverType}
              />
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
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default ConfirmCarrier;
