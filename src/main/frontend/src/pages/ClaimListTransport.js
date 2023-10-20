import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function ClaimListTransport() {
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios
      .get("/api/voc/DRIVER")
      .then((response) => {
        setClaims(response.data);
        console.log("연결되었습니다.");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching VOCs:", error);
      });
  }, []);

  const handleClaimClick = () => {
    navigate(
      `/claims/claimlisttransport/transportresponsibilitypage/${claims[0]?.id}`
    );
  };

  const handleRowClick = (claimId) => {
    navigate(`/claims/claimdetail/${claimId}`);
  };

  return (
    <Container className="mt-4 Container">
      <h3 className="mt-4">접수 된 운송사 클레임 목록</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>귀책 운송사</th>
            <th>귀책 담당자</th>
            <th>귀책 내용</th>
            <th>패널티 내용</th>
            <th>배상정보</th>
            <th>귀책 담당자 확인 여부</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr
              key={claim.id}
              onClick={() => handleRowClick(claim.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{claim.carrier?.carrierType}</td>
              <td>{claim.driver?.driverType}</td>
              <td>{claim.vocContent}</td>
              <td>{claim.penalty?.penaltyContent ?? "N/A"}</td>
              <td>{claim.compensation?.compensationAmount ?? "N/A"}</td>
              <td>{claim.verificationStatus ? "확인됨" : "미확인"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Button onClick={handleClaimClick}>클레임 접수하기</Button>
    </Container>
  );
}

export default ClaimListTransport;
