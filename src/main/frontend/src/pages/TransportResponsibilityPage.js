import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import "./index.css";

function TransportResponsibilityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carrier, setCarrier] = useState(null); // VOC와 연결된 운송사 정보
  const [driver, setDriver] = useState(null); // VOC와 연결된 기사 정보
  // 1. 택배사와 기사 목록을 객체로 생성
  const carrierAndDrivers = {
    CJ대한통운: ["이준호", "김태영", "박지성", "조민석", "최영진"],
    로젠택배: ["송기범", "정현우", "김진수", "박성민", "이재훈"],
    한진택배: ["김유진", "조한석", "윤대림", "백승환", "임태희"],
    우체국택배: ["최원석", "유지호", "김연경", "박나미", "김슬기"],
  };

  // 운전자 목록을 관리하는 상태
  const [driversList, setDriversList] = useState([]);
  const handleCarrierChange = (e) => {
    const selectedCarrier = e.target.value;
    handleChange(e);
    setCarrier(selectedCarrier); // Set the carrier state when a carrier is selected

    // 예제: 운송사에 따른 운전자 목록 (실제로는 API 요청을 통해 데이터를 가져와야 할 수도 있습니다.)
    // 2. 선택된 택배사에 따라 해당 기사 목록을 설정
    setDriversList(carrierAndDrivers[selectedCarrier] || []);
  };

  // 운송사 선택이 변경될 때마다 호출되는 이벤트 핸들러

  const [formData, setFormData] = useState({
    carrierType: "",
    driverType: "",
    vocContent: "",
    penaltyContent: "", // 추가
    compensationAmount: "",
  });

  const [showMessage, setShowMessage] = useState(false);

  const isFormComplete =
    formData.carrierType && //운송사
    formData.driverType && //기사
    formData.penaltyContent && //패널티
    formData.vocContent && //클레이미내용
    formData.compensationAmount; //배상

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      carrierType: formData.carrierType,
      verificationStatus: false,
      managerType: "DRIVER",
      vocContent: formData.vocContent,
      createDate: new Date(),
      penaltyContent: formData.penaltyContent,

      penalty: {
        penaltyContent: formData.penaltyContent,
      },
      compensation: {
        compensationAmount: formData.compensationAmount,
      },
      carrier: {
        carrierType: carrier, // Add the selected carrier to the payload
      },
      driver: {
        // 추가된 부분: driver 정보를 payload에 추가
        driverType: formData.driverType,
      },
    };

    axios
      .post("/api/voc/submit-claim", payload)
      .then((response) => {
        console.log("Data saved:", response.data);
        setShowMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("Request payload:", payload);
        console.error("Error saving data:", error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server response data:", error.response.data);
          console.error("Server response status:", error.response.status);
          console.error("Server response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Axios config error:", error.message);
        }

        alert("데이터 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-4">
        <Col lg={8}>
          <Card>
            <Card.Header as="h4" className="text-center">
              운송사 클레임 접수하기
            </Card.Header>
            <Card.Body>
              {showMessage && <Alert variant="success">저장되었습니다.</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="carrierTypeSelect">
                  <Form.Label>운송사 선택</Form.Label>
                  <Form.Control
                    as="select"
                    name="carrierType"
                    value={formData.carrierType}
                    onChange={handleCarrierChange}
                  >
                    <option value="">-- 선택 --</option>
                    {Object.keys(carrierAndDrivers).map((carrier) => (
                      <option key={carrier} value={carrier}>
                        {carrier}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="driverTypeSelect">
                  <Form.Label>기사 선택</Form.Label>
                  <Form.Control
                    as="select"
                    name="driverType"
                    value={formData.driverType}
                    onChange={handleChange}
                  >
                    <option value="">-- 선택 --</option>
                    {driversList.map((driver) => (
                      <option key={driver} value={driver}>
                        {driver}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="vocContent">
                  <Form.Label>귀책 내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="vocContent"
                    value={formData.vocContent}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="compensationAmount">
                  <Form.Label>배상 금액</Form.Label>
                  <Form.Control
                    type="number"
                    name="compensationAmount"
                    value={formData.compensationAmount}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="penaltyContent">
                  <Form.Label>패널티 내용</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="penaltyContent"
                    value={formData.penaltyContent}
                    onChange={handleChange}
                    placeholder="패널티 내용을 입력하세요."
                  />
                </Form.Group>
                <br />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormComplete}
                >
                  저장하기
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TransportResponsibilityPage;
