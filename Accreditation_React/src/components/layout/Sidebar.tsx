import { CiUser } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import AuthGuard from "../../auth/AuthGuard";
import {
  adminAccessRoles,
  facultyUserAccessRoles,
} from "../../auth/auths.utils";

const admin_links = [
  { href: PATH_DASHBOARD.programme, label: "Programme" },
  { href: PATH_DASHBOARD.usersManagement, label: "User Management" },
  { href: PATH_DASHBOARD.systemLogs, label: "System Logs" },
];

const facultyuser_links = [
  { href: PATH_DASHBOARD.facultyUserProgramme, label: "Programme" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
  const ToggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const SideBarRender = () => {
    if (user?.roles?.toString() === "ADMIN")
      return (
        <div className="navbar">
          <div className="brand">
            <span>Accreditation System</span>
          </div>

          <div className={menuStyles}>
            <ul>
              {admin_links.map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
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
    else
      return (
        <div className="navbar">
          <div className="brand">
            <span>Accreditation System</span>
          </div>

          <div className={menuStyles}>
            <ul>
              {facultyuser_links.map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
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

  const menuStyles = open ? "menu open" : "menu";

  return <div>{SideBarRender()}</div>;
};

export default Sidebar;
