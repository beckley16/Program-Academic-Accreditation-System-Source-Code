import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { USERS_LIST_URL } from "../../utils/globalConfig";
import { IAuthUser } from "../../types/auth.type";
import LatestUsersSection from "../../components/dashboard/page-access/users-management/LatestUsersSection";
import UserChartSection from "../../components/dashboard/page-access/users-management/UserChartSection";
import UserCountSection from "../../components/dashboard/page-access/users-management/UserCountSection";
import UsersTableSection from "../../components/dashboard/page-access/users-management/UsersTableSection";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";

const UserManagementPage = () => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      const { data } = response;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please contact admin");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-2x1 font-bold">User Management</h1>
      <UserCountSection usersList={users} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4">
        <UserChartSection usersList={users} />
        <LatestUsersSection usersList={users} />
      </div>
      <UsersTableSection usersList={users} />
    </div>
  );
};

export default UserManagementPage;
