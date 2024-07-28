import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-2">
        <Sidebar />
        <div className="lg:w-4/5 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
