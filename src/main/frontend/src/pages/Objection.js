import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Table } from "react-bootstrap";
import "./index.css";

function Objection() {
  const [objections, setObjections] = useState([
    {
      id: 1,
      orderNumber: "1234",
      claimType: "Damage",
      description: "Broken item",
      claimAmount: "100",
      responsibleParty: "Customer",
    },
  ]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 가정: API에서 Objection 데이터를 가져옵니다.
  //   fetch("/api/objections")
  //     .then((response) => response.json())
  //     .then((data) => setObjections(data))
  //     .catch((error) => console.error("Error fetching objections:", error));
  // }, []);

  const handleRowClick = (claimId) => {
    navigate(`/situation/objection/${claimId}`);
  };

  return (
    <Container className="mt-5">
      <h3 className="mt-4">이의 제기 목록</h3>
      <table className="table table-striped ">
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
          {objections.map((claim) => (
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
    </Container>
  );
}

export default Objection;
