// ClaimDetailPage
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import "./index.css";

function ClaimDetailPage() {
  const { id } = useParams();
  const [claimData, setClaimData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/voc/DETAIL/${id}`) // 예상 API 경로, 실제 경로에 맞게 수정해주세요
      .then((response) => {
        setClaimData(response.data);
        console.log("연결");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching claim details:", error);
      });
  }, [setClaimData]);

  return (
    <Container className="mt-4 Container ">
      {claimData && (
        <>
          <h2>
            {claimData.managerType === "CUSTOMER" ? "고객사" : "운송사"} 클레임
            상세 정보
          </h2>
          <Card className="mt-4">
            <Card.Header>클레임 ID: {claimData.id}</Card.Header>
            <Card.Body>
              <Card.Text>귀책 당사자: {claimData.driver?.driverType}</Card.Text>
              <Card.Text>귀책 내용: {claimData.vocContent}</Card.Text>
              <Card.Text>
                귀책 확인 여부: {claimData.verificationStatus ? "Y" : "N"}
              </Card.Text>
              <Card.Text>
                패널티 내용: {claimData.penalty?.penaltyContent}
              </Card.Text>
              <Card.Text>
                이의제기 확인 여부:{" "}
                {claimData.objection?.objectionStatus ? "Y" : "N"}
              </Card.Text>
              <Card.Text>
                배상정보: {claimData.compensation?.compensationAmount}
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}
export default ClaimDetailPage;
