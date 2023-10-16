import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
function ClaimList() {
  return (
    <Container className="mt-4  Container">
      <h3 className="mt-4">클레임 접수하기</h3>
      <br />
      <br />
      <Col className="Col">
        <Link to="/claims/claimlistcustomer">
          <Button variant="primary" className="square-btn">
            고객사 접수하기
          </Button>
        </Link>
        <Link to="/claims/claimlisttransport">
          <Button variant="secondary" className="square-btn">
            운송사 접수하기
          </Button>
        </Link>
      </Col>
    </Container>
  );
}

export default ClaimList;
