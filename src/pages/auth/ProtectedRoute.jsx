import { useContext } from "react";
import { Navigate } from "react-router";
import { AppContext } from "../../components/contexts/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useContext(AppContext);

  if (isCheckingAuth) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
