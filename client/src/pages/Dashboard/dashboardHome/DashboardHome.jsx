import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { useGetOrdersQuery } from "../../../redux/features/allApis/ordersApi/ordersApi";
import {
  useGetAllUsersQuery,
  useGetUserByUidQuery,
} from "../../../redux/features/allApis/usersApi/UsersApi";
import Loader from "../../../components/shared/Loader";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: users } = useGetAllUsersQuery();
  const { data: orders } = useGetOrdersQuery();
  const { data: singleUser, isLoading } = useGetUserByUidQuery(user?.uid);

  const pendingOrders = orders?.filter((order) => order.status === "pending");
  const completedOrders = orders?.filter(
    (order) => order.status === "completed"
  );
  const myOrders = orders?.filter((order) => order.email === user?.email);
  const myCompletedOrders = myOrders?.filter(
    (order) => order.status === "completed"
  );
  const myPendingOrders = myOrders?.filter(
    (order) => order.status === "pending"
  );

  const DashboardCard = ({ text, number }) => {
    return (
      <div className="border border-l-8 border-l-green-300 hover:border-l-green-600 rounded p-4 hover:bg-white bg-slate-100 transition-all duration-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <p>{text}</p>
        <span className="text-4xl font-bold">{number}</span>
      </div>
    );
  };

  if (loading || isLoading) return <Loader />;

  return (
    <div className="p-4 w-full">
      <h2 className="text-4xl font-bold mb-6">Dashboard Home :-</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {singleUser?.role === "admin" && (
          <>
            <DashboardCard text="Total Users" number={users?.length} />
            <DashboardCard text="Total Orders" number={orders?.length} />
            <DashboardCard
              text="Pending Orders"
              number={pendingOrders?.length}
            />
            <DashboardCard
              text="Delivered Orders"
              number={completedOrders?.length}
            />
          </>
        )}
        {singleUser?.role === "user" && (
          <>
            <DashboardCard text="My Orders" number={myOrders?.length} />
            <DashboardCard
              text="My Completed Orders"
              number={myCompletedOrders?.length}
            />
            <DashboardCard
              text="My Pending Orders"
              number={myPendingOrders?.length}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
