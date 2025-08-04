import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/userStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
