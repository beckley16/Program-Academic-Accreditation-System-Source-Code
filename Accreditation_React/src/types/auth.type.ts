export interface IRegisterDto {
  userName: string;
  email: string;
  password: string;
  position: string;
  faculty: string;
}

export interface ILoginDto {
  userName: string;
  password: string;
}

export interface IUpdateRoleDto {
  userName: string;
  newRole: string;
}

export interface IAuthUser {
  id: string;
  userName: string;
  email: string;
  createdDt: string;
  roles: string[];
  faculty: string;
}

export interface ILoginResponseDto {
  newToken: string;
  userInfo: IAuthUser;
}

export interface IAuthContextState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
}

export enum IAuthContextActionTypes {
  INITIAL = "INITIAL",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface IAuthContextAction {
  type: IAuthContextActionTypes;
  payload?: IAuthUser;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user?: IAuthUser;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export enum RolesEnum {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  FACULTYUSER = "FACULTYUSER",
}

export enum PositionEnum {
  UM_STAFF = "UM STAFF",
  UM_FACULTYSTAFF = "UM FACULTY STAFF",
}

export enum FacultYEnum {
  NONE = "none",
  FSKTM = "Faculty of Computer Science",
  SCIENCE = "Faculty of Science",
  FBL = "Faculty of Languages and Linguistics",
  PHARMACY = "Faculty of Pharmacy",
  ENGINE = "Faculty of Engineering",
}
