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
      console.log("Login response:", response.status, response.data);
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          dispatch(setUser(response.data));
          try {
            await SecureStore.setItemAsync("user", JSON.stringify(response.data));
          } catch (storeError) {
            console.log("Error saving to SecureStore:", storeError);
            // Don't fail login if SecureStore fails, user is still logged in
          }
          // No alert on successful login - user will be redirected automatically
        } else {
          console.log("Warning: Login succeeded but no user data received");
        }
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      console.log("Login error:", error);
      console.log("Error response:", error.response);
      let message = "Login failed. Please try again.";
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          message = "User not found. Please check your email or register first.";
        } else if (error.response.status === 401) {
          message = "Invalid email or password. Please try again.";
        } else if (error.response.data) {
          // Handle both string and object responses
          message = typeof error.response.data === 'string' 
            ? error.response.data 
            : error.response.data.message || JSON.stringify(error.response.data);
        }
      } else if (error.request) {
        // Request was made but no response received
        message = "Network error. Please check your connection and try again.";
      } else {
        // Something else happened
        message = error.message || "An unexpected error occurred. Please try again.";
      }
      alert(message);
      throw error; // Re-throw to prevent navigation
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
      console.log("Registration response:", response.status, response.data);
      // Check if response is successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          dispatch(setUser(response.data));
          try {
            await SecureStore.setItemAsync("user", JSON.stringify(response.data));
          } catch (storeError) {
            console.log("Error saving to SecureStore:", storeError);
            // Don't fail registration if SecureStore fails, user is still registered
          }
          alert("Registration successful! Welcome to SMS.");
        } else {
          console.log("Warning: Registration succeeded but no user data received");
          alert("Registration successful! Welcome to SMS.");
        }
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      console.log("Registration error:", error);
      console.log("Error response:", error.response);
      let message = "Registration failed. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        const errorStatus = error.response.status;
        
        if (errorStatus === 409) {
          // Handle duplicate resource
          const errorMessage = typeof errorData === 'string' ? errorData : String(errorData || '');
          if (errorMessage.includes("Email") || errorMessage.includes("email")) {
            message = "This email is already registered. Please use a different email or login instead.";
          } else if (errorMessage.includes("Mobile") || errorMessage.includes("mobile")) {
            message = "This mobile number is already registered. Please use a different mobile number.";
          } else {
            message = errorMessage || "This information is already registered. Please check your details.";
          }
        } else if (errorStatus === 400) {
          // Handle bad request
          message = typeof errorData === 'string' 
            ? errorData 
            : "Invalid information provided. Please check all fields and try again.";
        } else {
          // Other error statuses
          message = typeof errorData === 'string' 
            ? errorData 
            : errorData?.message || `Server error (${errorStatus}). Please try again.`;
        }
      } else if (error.request) {
        // Request was made but no response received
        message = "Network error. Please check your connection and try again.";
      } else {
        // Something else happened
        message = error.message || "An unexpected error occurred. Please try again.";
      }
      
      alert(message);
      throw error; // Re-throw to prevent navigation
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
      alert("You must be logged in to update your profile.");
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
      alert("Profile updated successfully!");
    } catch (error: any) {
      let message = "Failed to update profile. Please try again.";
      if (error.response?.status === 409) {
        if (error.response?.data?.includes("Email")) {
          message = "This email is already in use. Please choose a different email.";
        } else if (error.response?.data?.includes("Mobile")) {
          message = "This mobile number is already in use. Please choose a different mobile number.";
        } else {
          message = error.response.data || "This information is already in use. Please check your details.";
        }
      } else if (error.response?.status === 400) {
        message = error.response.data || "Invalid information provided. Please check all fields and try again.";
      } else if (error.response?.status === 404) {
        message = "User not found. Please log in again.";
      } else if (error.response?.data) {
        message = error.response.data;
      }
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
