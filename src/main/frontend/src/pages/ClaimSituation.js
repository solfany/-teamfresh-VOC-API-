import React from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function ClaimSituation() {
  return (
    <Container className="mt-4 Container">
      <h3 className="mt-4">클레임 처리 상황 확인하기</h3>
      <br />
      <br />
      <Col className="Col">
        <Link to="/situation/compensation">
          <Button variant="primary" className="square-btn">
            배상 리스트 확인
          </Button>
        </Link>
        <Link to="/situation/objection">
          <Button variant="secondary" className="square-btn">
            이의제기 처리 확인
          </Button>
        </Link>
      </Col>
    </Container>
  );
}

export default ClaimSituation;
