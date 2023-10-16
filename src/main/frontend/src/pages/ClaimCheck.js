import React from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function ClaimCheck() {
  return (
    <Container className="mt-4 Container">
      <h3 className="mt-4">접수된 클레임 확인하기</h3>
      <br />
      <br />
      <Col className="Col">
        <Link to="/check/confirmcustomer">
          <Button variant="primary" className="square-btn">
            고객사 확인하기
          </Button>
        </Link>
        <Link to="/check/confirmcarrier">
          <Button variant="secondary" className="square-btn">
            운송사 확인하기
          </Button>
        </Link>
      </Col>
    </Container>
  );
}

export default ClaimCheck;
