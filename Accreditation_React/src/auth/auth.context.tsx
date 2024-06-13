import {
  ReactNode,
  createContext,
  useReducer, //
  useCallback, //only render the comp if you include this
  useEffect, //render everytime you press
} from "react";

import {
  IAuthContext,
  IAuthContextAction,
  IAuthContextActionTypes,
  IAuthContextState,
  ILoginResponseDto,
} from "../types/auth.type";

import { getSession, setSession } from "./auths.utils";

import axiosInstance from "../utils/axiosInstance";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
} from "../utils/globalConfig";

//reducer function for userReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
  if (action.type === IAuthContextActionTypes.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  if (action.type === IAuthContextActionTypes.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAuthLoading: false,
      user: action.payload,
    };
  }
  return state;
};

//initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

//create context and export it
export const AuthContext = createContext<IAuthContext | null>(null);

//interface for context props
interface IProps {
  children: ReactNode;
}

//create a component for managing auth all functionialities and export it
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  //initialize method
  const initialAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      if (token) {
        const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
          token,
        });
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userInfo,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });
    }
  }, []);

  //start of app, call initializeAuthcontext to sure abt authentication status
  useEffect(() => {
    console.log("AuthContext Initialization start");
    initialAuthContext()
      .then(() => console.log("InitializeAuth context was successful"))
      .catch((error) => console.log(error));
  }, []);

  //register method
  const register = useCallback(
    async (
      userName: string,
      email: string,
      password: string,
      position: string,
      faculty: string
    ) => {
      const response = await axiosInstance.post(REGISTER_URL, {
        userName,
        email,
        password,
        position,
        faculty,
      });
      console.log("Register result:", response);
      toast.success("Register successful. Please login");
      navigate(PATH_AFTER_REGISTER);
    },
    []
  );

  //login method
  const login = useCallback(async (userName: string, password: string) => {
    const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success("Login succesfully");
    //in response, receive jwt token and user data
    const { newToken, userInfo } = response.data;
    setSession(newToken);
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userInfo,
    });
    navigate(PATH_AFTER_LOGIN);
  }, []);

  //logout method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, []);

  //create object for values for context provider
  const valuesObject = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
