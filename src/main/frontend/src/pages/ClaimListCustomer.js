import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { Container, Button, Col } from "react-bootstrap";

function ClaimListCustomer() {
  const navigate = useNavigate();

  // 임시 데이터를 claims 상태에 추가
  const [claims, setClaims] = useState([
    {
      id: 1,
      orderNumber: "1234",
      claimType: "Damage",
      description: "Broken item",
      claimAmount: "100",
      responsibleParty: "Customer",
    },
    // 추가적으로 다른 데이터도 넣을 수 있습니다.
  ]);

  const handleClaimClick = () => {
    navigate(
      `/claims/claimlistcustomer/customerresponsibilitypage/${claims[0].id}`
    );
  };

  const handleRowClick = (claimId) => {
    navigate(`/claims/claimdetail/${claimId}`);
  };

  return (
    <Container className="mt-4 Container">
      {/* ... 폼 부분 생략 ... */}
      <h3 className="mt-4">접수된 고객사 클레임 목록</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Claim Type</th>
            <th>Description</th>
            <th>Claim Amount</th>
            <th>Responsible Party</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr
              key={claim.id}
              onClick={() => handleRowClick(claim.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{claim.orderNumber}</td>
              <td>{claim.claimType}</td>
              <td>{claim.description}</td>
              <td>{claim.claimAmount}</td>
              <td>{claim.responsibleParty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Button onClick={handleClaimClick}>클레임 접수하기</Button>
    </Container>
  );
}

export default ClaimListCustomer;
