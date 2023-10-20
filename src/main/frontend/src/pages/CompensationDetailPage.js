import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Container } from "react-bootstrap";

function CompensationDetailPage() {
  const { id } = useParams();

  // 임시 데이터
  const [claimData, setClaimData] = useState(null);

  useEffect(() => {
    // 여기에서 API 통신을 통해 상세 정보를 가져오거나 임시 데이터를 사용할 수 있습니다.
    // 예를 들어, 다음과 같은 임시 데이터를 설정하였습니다:
    setClaimData({
      id: id,
      description: "Broken item during transit",
      responsibleParty: "Carrier", // "Carrier" 또는 "Customer"
    });
  }, [id]);

  return (
    <>
      <Container className="mt-4 Container">
        <h2>배상 상세 정보 - {id}</h2>
        {claimData && (
          <>
            <p>
              <strong>Description:</strong> {claimData.description}
            </p>
            <p>
              <strong>Responsible Party:</strong>{" "}
              {claimData.responsibleParty === "Carrier" ? "운송사" : "고객사"}
            </p>
          </>
        )}
      </Container>
    </>
  );
}

export default CompensationDetailPage;
