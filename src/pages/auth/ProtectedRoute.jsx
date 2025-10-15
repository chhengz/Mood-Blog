import { useContext } from "react";
import { Navigate } from "react-router";
import { AppContext } from "../../components/contexts/AppContext";
import Loading from "../../components/ui/loading/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useContext(AppContext);

  if (isCheckingAuth) {
    return <Loading fullScreen spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
