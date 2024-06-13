import axiosInstance from "../utils/axiosInstance";
import {
  FacultYEnum,
  IAuthUser,
  PositionEnum,
  RolesEnum,
} from "../types/auth.type";
import { FaCloudUploadAlt } from "react-icons/fa";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization =
      "Bearer ${accessToken}";
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem("accessToken");
};

//Manage Roles access for log module
export const allAccessRoles = [
  RolesEnum.SUPERADMIN,
  RolesEnum.ADMIN,
  RolesEnum.FACULTYUSER,
];
export const facultyUserAccessRoles = [RolesEnum.FACULTYUSER];
export const adminAccessRoles = [RolesEnum.SUPERADMIN, RolesEnum.ADMIN];
export const superAdminAccessRoles = [RolesEnum.SUPERADMIN];

//Specify which roles can be uodated by logged in user
export const allowedRolesforUpdateArray = (
  loggedInUser?: IAuthUser
): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.SUPERADMIN)
    ? //if is superadmin: can change admin, facultyuser, user role
      [RolesEnum.ADMIN, RolesEnum.FACULTYUSER]
    : //else can change only faculty user, user
      [RolesEnum.FACULTYUSER];
};

//position available
export const positionArray = (): string[] => {
  return [PositionEnum.UM_STAFF, PositionEnum.UM_FACULTYSTAFF];
};

//faculty available
export const facultyArray = (): string[] => {
  return [FacultYEnum.NONE, FacultYEnum.FSKTM];
};

//control superadmin cannot change superadmin role
//admin cannot change superadmin and admin role
export const isAuthorizedForupdaterole = (
  loggedInUserRole: string,
  selectedUserRole: string
) => {
  let result = true;
  if (
    loggedInUserRole === RolesEnum.SUPERADMIN &&
    selectedUserRole == RolesEnum.SUPERADMIN
  ) {
    result = false;
  } else if (
    loggedInUserRole === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.SUPERADMIN ||
      selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  } else result = true;
  return result;
};

//authorization for creating programme
export const isAuthorizedForCreateProgram = (loggedInUserRole: string) => {
  let result = true;
  if (loggedInUserRole === RolesEnum.FACULTYUSER) {
    result = false;
  } else result = true;
  return result;
};
