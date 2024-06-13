import { Routes, Route, Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";
import AuthGuard from "../auth/AuthGuard";
import {
  allAccessRoles,
  facultyUserAccessRoles,
  adminAccessRoles,
  superAdminAccessRoles,
} from "../auth/auths.utils";
import Layout from "../components/layout";
import AdminPage from "../pages/dashboard/AdminPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import FacultyUserPage from "../pages/dashboard/FacultyUserPage";
import MyLogPage from "../pages/dashboard/MyLogPage";
import SuperAdminPage from "../pages/dashboard/SuperAdminPage";
import SystemLogsPage from "../pages/dashboard/SystemLogsPage";
import UpdateRolePage from "../pages/dashboard/UpdateRolePage";
import UserPage from "../pages/dashboard/UserPage";
import PorgrammePage from "../pages/dashboard/Programme";
import ProgrammeManagementPage from "../pages/dashboard/ProgrammeManagement";
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import RegisterPage from "../pages/public/RegisterPage";
import UnauthorizedPage from "../pages/public/UnauthorizedPage";
import UserManagementPage from "../pages/dashboard/UserManagementPage";
import AddProgrammePage from "../pages/dashboard/AddProgrammePage";
import UpdateProgrammePage from "../pages/dashboard/UpdateProgrammePage";
import FacultyUserUpdateProgrammePage from "../pages/dashboard/FacultyUserUpdateProgrammePage";
import FacultyUserProgrammePage from "../pages/dashboard/FacultyUserProgrammePage";
import ProgrammeDetailPage from "../pages/dashboard/ProgrammePageDetail";

const GlobalRouter = () => {
  return (
    <Routes>
      {/*<Route path='' element/>*/}
      <Route element={<Layout />}>
        {/*Public routes*/}
        <Route index element={<HomePage />} />
        <Route path={PATH_PUBLIC.register} element={<RegisterPage />} />
        <Route path={PATH_PUBLIC.login} element={<LoginPage />} />
        <Route path={PATH_PUBLIC.unauthorized} element={<UnauthorizedPage />} />

        {/*Protected routes*/}
        <Route element={<AuthGuard roles={allAccessRoles} />}>
          <Route path={PATH_DASHBOARD.dashboard} element={<DashboardPage />} />
          <Route
            path={PATH_DASHBOARD.programmeManagement}
            element={<ProgrammeManagementPage />}
          />
          <Route
            path={PATH_DASHBOARD.viewProgrammeDetail}
            element={<ProgrammeDetailPage />}
          />
          <Route path={PATH_DASHBOARD.mylogs} element={<MyLogPage />} />
          <Route path={PATH_DASHBOARD.user} element={<UserPage />} />
          <Route path={PATH_DASHBOARD.programme} element={<PorgrammePage />} />
        </Route>
        <Route element={<AuthGuard roles={facultyUserAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.facultyUser}
            element={<FacultyUserPage />}
          />
          <Route
            path={PATH_DASHBOARD.facultyUserUpdateProgramme}
            element={<FacultyUserUpdateProgrammePage />}
          />
          <Route
            path={PATH_DASHBOARD.facultyUserProgramme}
            element={<FacultyUserProgrammePage />}
          />
        </Route>
        <Route element={<AuthGuard roles={adminAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.usersManagement}
            element={<UserManagementPage />}
          />
          <Route path={PATH_DASHBOARD.admin} element={<AdminPage />} />
          
          <Route
            path={PATH_DASHBOARD.updateProgramme}
            element={<UpdateProgrammePage />}
          />
          <Route
            path={PATH_DASHBOARD.addProgramme}
            element={<AddProgrammePage />}
          />
          <Route
            path={PATH_DASHBOARD.systemLogs}
            element={<SystemLogsPage />}
          />
          <Route
            path={PATH_DASHBOARD.updateRole}
            element={<UpdateRolePage />}
          />
        </Route>
        <Route element={<AuthGuard roles={superAdminAccessRoles} />}>
          <Route
            path={PATH_DASHBOARD.superadmin}
            element={<SuperAdminPage />}
          />
          <Route
            path={PATH_DASHBOARD.programmeManagement}
            element={<ProgrammeManagementPage />}
          />
          <Route
            path={PATH_DASHBOARD.addProgramme}
            element={<AddProgrammePage />}
          />
          <Route
            path={PATH_DASHBOARD.systemLogs}
            element={<SystemLogsPage />}
          />
          <Route
            path={PATH_DASHBOARD.updateRole}
            element={<UpdateRolePage />}
          />
        </Route>

        {/*Catch all {404*/}
        <Route path={PATH_PUBLIC.notFound} element={<NotFoundPage />} />
        <Route
          path="*"
          element={<Navigate to={PATH_PUBLIC.notFound} replace />}
        />
      </Route>
    </Routes>
  );
};

export default GlobalRouter;
