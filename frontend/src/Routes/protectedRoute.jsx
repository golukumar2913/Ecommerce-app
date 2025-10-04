import { Navigate } from "react-router-dom";
import { getUserFromToken, isLoggedIn } from "../Authenticate";

const ProtectedRoute = ({ children, role }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const user = getUserFromToken();

  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
