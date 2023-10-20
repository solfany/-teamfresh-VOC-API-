import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Header from "./components/Common/Header";
import HomePage from "./pages/HomePage";
import CustomerResponsibilityPage from "./pages/CustomerResponsibilityPage";
import TransportResponsibilityPage from "./pages/TransportResponsibilityPage";
import ClaimList from "./pages/ClaimList"; // 확장자를 .js로 설정했으니, 불러올 때 생략 가능
import ClaimCheck from "./pages/ClaimCheck"; // 확장자를 .js로 설정했으니, 불러올 때 생략 가능
import ClaimListCustomer from "./pages/ClaimListCustomer";
import ClaimListTransport from "./pages/ClaimListTransport";
// ----클레임 접수 하기----
import ConfirmCustomer from "./pages/ConfirmCustomer";
import ConfirmCarrier from "./pages/ConfirmCarrier";
// ----클레임 목록 확인하기----
import ClaimDetailPage from "./pages/ClaimDetailPage";
// import ConfirmCarrier from "./pages/ConfirmCarrier";
// ----클레임 진행 상황----
import ClaimSituation from "./pages/ClaimSituation";
import Compensation from "./pages/Compensation";
import Objection from "./pages/Objection";
import CompensationDetailPage from "./pages/CompensationDetailPage";
import ObjectionDetailPage from "./pages/ObjectionDetailPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          {/* 로그인 */}
          <Route path="/login" element={<LoginForm />} />

          {/* 홈페이징 */}
          <Route path="/" element={<HomePage />} />

          {/* 클레임 접수 서비스 */}
          <Route path="/claims" element={<ClaimList />} />

          {/* 고객사 클레임 접수*/}
          <Route
            path="/claims/claimlistcustomer"
            element={<ClaimListCustomer />}
          />
          {/* 고객사 클레임 목록 */}
          <Route path="/claims/claimdetail/:id" element={<ClaimDetailPage />} />

          {/* 배송사 클레임 */}
          <Route
            path="/claims/claimlisttransport"
            element={<ClaimListTransport />}
          />
          {/* 조회 상세페이지 */}
          <Route
            path="/claims/claimlistcustomer/customerresponsibilitypage/:id"
            element={<CustomerResponsibilityPage />}
          />
          <Route
            path="/claims/claimlisttransport/transportresponsibilitypage/:id"
            element={<TransportResponsibilityPage />}
          />

          {/* ===================클레임 조회=========================== */}
          {/* 클레임 조회 서비스 */}
          <Route path="/check" element={<ClaimCheck />} />

          <Route path="/check/confirmcustomer" element={<ConfirmCustomer />} />
          <Route path="/check/confirmcarrier" element={<ConfirmCarrier />} />

          {/* ================클레임 진행 상황==================== */}
          <Route path="/situation" element={<ClaimSituation />} />
          {/* 배상 */}
          <Route path="/situation/compensation" element={<Compensation />} />
          {/* 배상 접수 상세페이지 */}
          <Route
            path="/situation/compensation/:id"
            element={<CompensationDetailPage />}
          />

          {/* 이의 */}
          <Route path="/situation/objection" element={<Objection />} />
          {/* 이의 접수 상세페이지 */}
          <Route
            path="/situation/objection/:id"
            element={<ObjectionDetailPage />}
          />

          {/* 기타 경로 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
