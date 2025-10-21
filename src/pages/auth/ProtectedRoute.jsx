import { useContext } from "react";
import { Navigate } from "react-router";
import { AppContext } from "../../components/contexts/AppContext";
import Loading from "../../components/ui/loading/Loading";
import { LoadingScreen } from "../../components/ui/loading/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useContext(AppContext);

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
