import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

//URLS
export const HOST_API_KEY = "https://localhost:7023/api/";
export const REGISTER_URL = "/Auth/register";
export const LOGIN_URL = "/Auth/login";
export const ME_URL = "Auth/me";
export const USERS_LIST_URL = "/Auth/users";
export const UPDATE_ROLE_URL = "/Auth/update-role";
export const USERNAMES_LIST_URL = "/Auth/usernames";
export const LOGS_URL = "/Logs";
export const MY_LOGS_URL = "/Logs/mine";
export const PROGRAMME_LIST_URL = "/Programme";
export const CREATE_PROGRAMME_URL = "/Programme/create";
export const UPDATE_PROGRAMME_URL = "/Programme/update-programme";
export const FACULTYUSER_UPDATE_PROGRAMME_URL =
  "/Programme/facultyuser-update-programme";
export const PROGRAMME_URL_DOWNLOAD = "/Programme/download";

//AUTH ROUTE
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.programmeManagement;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
