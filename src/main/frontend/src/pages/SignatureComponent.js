import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button, Container, Col } from "react-bootstrap";
import "./index.css";
function SignatureComponent({ onConfirm }) {
  const sigCanvas = useRef({});

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {
    if (onConfirm) {
      onConfirm(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    }
  };

  return (
    <>
      <Container className="mt-5 ">
        <SignatureCanvas
          ref={sigCanvas}
          canvasProps={{
            width: 500,
            height: 200,
            className: "signatureCanvas",
          }}
        />
        <Col className="Col">
          <Button onClick={clearSignature}>서명 지우기</Button>
          <Button onClick={saveSignature}>확인</Button>
        </Col>
      </Container>
    </>
  );
}

export default SignatureComponent;
