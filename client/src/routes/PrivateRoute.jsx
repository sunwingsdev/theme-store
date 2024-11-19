import { AuthContext } from "../providers/AuthProviders";
import Loader from "../components/shared/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
