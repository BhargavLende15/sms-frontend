import axios from "axios";
import { createContext, ReactNode, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { resetUser, setAuthChecked, setLoading, setUser } from "../store/userSlice";

export interface UserContextType {
  user: any | null;
  authChecked: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";
  const DEFAULT_USER_TYPE = "student";
  const dispatch = useDispatch();
  const { user, authChecked } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const response: any = await axios.post(`${API_BASE_URL}/users/sign-in`, {
        email: email,
        password: password,
      });
      alert("User signed in:" + response.data.email);
      dispatch(setUser(response.data));
      await SecureStore.setItemAsync("user", JSON.stringify(response.data));
    } catch (error) {
      alert("Error occured at sign in");
    } finally {
      dispatch(setLoading(false));
    }
  };
  const register = async (email: string, password: string) => {
    dispatch(setLoading(true));

    try {
      const response: any = await axios.post(`${API_BASE_URL}/users`, {
        email: email,
        password: password,
        type: DEFAULT_USER_TYPE,
      });
      dispatch(setUser(response.data));
      await SecureStore.setItemAsync("user", JSON.stringify(response.data));
    } catch (error) {
      alert("Error occured at register" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const checkLogin = async () => {
    try {
      let result = await SecureStore.getItemAsync("user");
      console.log("Stored user:", result);
      if (result) {
        dispatch(setUser(JSON.parse(result)));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log("Error during app laod:", error);
    } finally {
      dispatch(setAuthChecked(true));
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("user");
      dispatch(resetUser());
    } catch (error) {
      console.log("Error during logout:", error);
    } finally {
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
