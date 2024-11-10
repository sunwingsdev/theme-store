import { AuthContext } from "../providers/AuthProviders";
import Loader from "../components/shared/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useGetUserByUidQuery } from "../redux/features/allApis/usersApi/UsersApi";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { data: singleUser, isLoading } = useGetUserByUidQuery(user?.uid);
  const location = useLocation();

  if (loading || isLoading) {
    return <Loader />;
  }

  if (user && singleUser && singleUser?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;
