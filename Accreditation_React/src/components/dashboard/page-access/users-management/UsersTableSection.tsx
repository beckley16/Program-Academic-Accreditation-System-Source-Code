import { useNavigate } from "react-router-dom";
import { IAuthUser, RolesEnum } from "../../../../types/auth.type";
import Button from "../../../general/Button";
import moment from "moment";
import { isAuthorizedForupdaterole } from "../../../../auth/auths.utils";
import useAuth from "../../../../hooks/useAuth.hook";

interface Iprops {
  usersList: IAuthUser[];
}

const UsersTableSection = ({ usersList }: Iprops) => {
  //user is referring to the user from useAuth
  //loggedInUser is the name or instance name given for user of useAuth
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  const RoleClassNameCreator = (Roles: string[]) => {
    let className = "px-3 py-1 text-black rounded-3x1";
    if (Roles.includes(RolesEnum.SUPERADMIN)) {
      className += "bg-[#00000]";
    } else if (Roles.includes(RolesEnum.ADMIN)) {
      className += "bg-[#2834C8]";
    } else if (Roles.includes(RolesEnum.FACULTYUSER)) {
      className += "bg-[#39A5D1]";
    }
    return className;
  };
  return (
    <div className="bg-white p-2 rounded-md">
      <h1 className="text-x1 font-bold">Users Table</h1>
      <div className="grid grid-cols-5 px-2 my-1 text-lg font-semibold border border-gray-300 rounded-md">
        <div>No</div>
        <div>User Name</div>
        <div>Creation Date</div>
        <div className="flex justify-center">Roles</div>
        <div>Operations</div>
      </div>
      {usersList.map((user, index) => (
        <div
          key={index}
          className="grid grid-cols-5 px-2 h-12 my-1 border border-gray-200 hover:bg-gray-200 rounded-md"
        >
          <div className="flex items-center">{index + 1}</div>
          <div className="flex items-center">{user.userName}</div>
          <div className="flex items-center">
            {moment(user.createdDt).format("YYYY-MM-DD")}
          </div>
          <div className="flex justify-center items-center">
            {/*user.roles is the parameter to pass to RoleClassNameCreator*/}
            <span className={RoleClassNameCreator(user.roles)}>
              {user.roles}
            </span>
          </div>
          <div className="flex items-center">
            <Button
              label="Update Role"
              onclick={() =>
                navigate(`/dashboard/update-role/${user.userName}`)
              }
              type="button"
              variant="primary"
              disabled={
                !isAuthorizedForupdaterole(
                  loggedInUser!.roles[0],
                  user.roles[0]
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTableSection;
