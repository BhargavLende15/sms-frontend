import axios from "axios";
import { createContext, ReactNode, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  resetUser,
  setAuthChecked,
  setLoading,
  setUser,
} from "../store/userSlice";

export interface UserContextType {
  user: any | null;
  authChecked: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    email: string;
    password: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    type: string;
    mobileNumber: string;
    department: string;
  }) => Promise<void>;
  updateProfile: (payload: {
    name?: string;
    email?: string;
    mobileNumber?: string;
    department?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:9099";
  const DEFAULT_USER_TYPE = "student";
  const dispatch = useDispatch();
  const { user, authChecked, loading } = useSelector(
    (state: RootState) => state.user
  );
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
    } catch (error: any) {
      const message =
        error.response?.data || "Error occurred at sign in. Please try again.";
      alert(message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const register = async ({
    email,
    password,
    name,
    dateOfBirth,
    gender,
    type,
    mobileNumber,
    department,
  }: {
    email: string;
    password: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    type: string;
    mobileNumber: string;
    department: string;
  }) => {
    dispatch(setLoading(true));

    try {
      const response: any = await axios.post(`${API_BASE_URL}/users`, {
        email: email,
        password: password,
        type: type || DEFAULT_USER_TYPE,
        name,
        dateOfBirth,
        gender,
        mobileNumber,
        department,
      });
      dispatch(setUser(response.data));
      await SecureStore.setItemAsync("user", JSON.stringify(response.data));
    } catch (error: any) {
      const message =
        error.response?.data || "Error occurred during registration.";
      alert(message);
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

  const updateProfile = async ({
    name,
    email,
    mobileNumber,
    department,
  }: {
    name?: string;
    email?: string;
    mobileNumber?: string;
    department?: string;
  }) => {
    if (!user) {
      return;
    }
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, {
        name,
        email,
        mobileNumber,
        department,
      });
      dispatch(setUser(response.data));
      await SecureStore.setItemAsync("user", JSON.stringify(response.data));
      alert("Profile updated successfully");
    } catch (error: any) {
      const message =
        error.response?.data || "Failed to update profile. Please try again.";
      alert(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("user");
    } catch (error) {
      console.log("Error deleting from SecureStore:", error);
    }
    // Always clear state and redirect, even if SecureStore deletion fails
    dispatch(resetUser());
    router.replace("/login");
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
        loading,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
