import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UploadFiles from "./pages/UploadFiles";
import UploadURLPage from "./pages/UploadURLPage";
import TrackPage from "./pages/TrackPage";
import PricingPage from "./pages/PricingPage";
import GenerateKeysPage from "./pages/GenerateKeysPage";
import { useAuthStore } from "./store/userStore";
import { useEffect } from "react";
import { axiosInstance } from "./config/axios";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import MyPlans from "./pages/MyPlans";

const App = () => {
  const { user } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={!user ? <LoginPage /> : <DashboardLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/api-keys" element={<GenerateKeysPage />} />
          <Route path="/dashboard/upload-file" element={<UploadFiles />} />
          <Route path="/dashboard/upload-link" element={<UploadURLPage />} />
          {/* <Route path="/dashboard/track-history" element={<TrackPage />} /> */}
          <Route path="/dashboard/pricing" element={<PricingPage />} />
          <Route path={`/dashboard/plans`} element={<MyPlans />} />
          <Route path={`/dashboard/:id`} element={<PaymentPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
