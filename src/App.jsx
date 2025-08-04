import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UploadFiles from "./pages/UploadFiles";
import UploadURLPage from "./pages/UploadURLPage";
import PricingPage from "./pages/PricingPage";
import GenerateKeysPage from "./pages/GenerateKeysPage";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import MyPlans from "./pages/MyPlans";
import ProtectedRoute from "./components/ProtectedRoutes";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="api-keys" element={<GenerateKeysPage />} />
            <Route path="upload-file" element={<UploadFiles />} />
            <Route path="upload-link" element={<UploadURLPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="plans" element={<MyPlans />} />
            <Route path=":id" element={<PaymentPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
