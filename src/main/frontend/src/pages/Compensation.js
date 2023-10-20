import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container } from "react-bootstrap";
import axios from "axios"; // axios를 import 해줍니다.
import "./index.css";

function Compensation() {
  const [compensations, setCompensations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/voc/Compensation")
      .then((response) => {
        setCompensations(response.data); // setClaims에서 setCompensations로 변경하였습니다.
        console.log("연결되었습니다.");
        console.log(response);
        console.log("Loaded Compensations:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching Compensations:", error);
      });
  }, []);

  const handleRowClick = (compensationId) => {
    navigate(`/situation/compensation/${compensationId}`);
  };

  return (
    <Container className="mt-5">
      <h3 className="mt-4">배상 접수 목록</h3>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>클레임 번호</th>
            <th>담당사</th>
            <th>담당자</th>
            <th>금액</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {compensations.map((compensation) => (
            <tr
              key={compensation.id}
              onClick={() => handleRowClick(compensation.id)}
              style={{ cursor: "pointer" }}
            >
              <td>{compensation.id}</td>
              <td>{compensation.carrierType}</td> {/* 담당사 필드 이름 변경 */}
              <td>{compensation.driverType}</td> {/* 담당자 필드 이름 변경 */}
              <td>{compensation.compensationAmount}</td>
              <td>{compensation.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default Compensation;
