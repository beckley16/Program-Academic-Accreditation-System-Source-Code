import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { AiOutlineHome } from "react-icons/ai";
import { FiLock, FiUnlock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";

const Header = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const userRolesLabelCreator = () => {
    if (user) {
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ",";
        }
      });
      return result;
    }
    return "--";
  };
  return (
    <div className="flex justify-between items-center bg-[#f0ecf7] h-12 px-4 ">
      <div className="flex items-center gap-4">
        <AiOutlineHome
          className="w-8 h-8 text-blue-200 hover:text-blue-400 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-1">
          
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Button
              label="Dashboard"
              onclick={() => navigate(PATH_DASHBOARD.programmeManagement)}
              type="button"
              variant="light"
            />
            <Button
              label="Logout"
              onclick={logout}
              type="button"
              variant="light"
            />
          </div>
        ) : (
          //if is not authenticated
          <div className="flex items-center gap-2">
            <Button
              label="Register"
              onclick={() => navigate(PATH_PUBLIC.register)}
              type="button"
              variant="light"
            />
            <Button
              label="Login"
              onclick={() => navigate(PATH_PUBLIC.login)}
              type="button"
              variant="light"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
