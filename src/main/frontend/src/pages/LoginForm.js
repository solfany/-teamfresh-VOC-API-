import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function LoginForm() {
  const [loginType, setLoginType] = useState("팀프레시 담당자");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 로그인 로직 처리
    console.log(
      `Login type: ${loginType}, Username: ${username}, Password: ${password}`
    );
  };

  return (
    <Container className="mt-4 ">
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginType">
              <Form.Label>로그인 유형</Form.Label>
              <Form.Control
                as="select"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
              >
                <option>팀프레시 담당자</option>
                <option>배송사</option>
                <option>고객사</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>사용자 아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="사용자 아이디 입력"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />

            <Button variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
