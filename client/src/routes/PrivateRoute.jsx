import { AuthContext } from "../providers/AuthProviders";
import Loader from "../components/shared/Loader";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
