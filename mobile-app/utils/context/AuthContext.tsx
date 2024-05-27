import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../@types/User";
import { handleLogin, handleSignUp } from "../../api/serives/user";
interface AuthProps {
  user?: User;
  isLoading?: boolean;
  onRegister?: (
    email: string,
    username: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  signOut?: () => Promise<any>;
}
const TOKEN_KEY = "mobile-app-user";
const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await handleLogin(email, password);
      console.log(userCredential);
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(userCredential));
      setUser(userCredential);
      return true;
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email address");
          break;
        case "auth/user-disabled":
          alert("user is disabled");
          break;
        case "auth/user-not-found":
          alert("user not found");
          break;
        case "auth/wrong-password":
          alert("wrong password");
          break;
        default:
          break;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      await handleSignUp(email, username, password);
      return true;
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email is already in use.");
          break;
        case "auth/invalid-email":
          alert("Email address is not valid.");
          break;
        case "auth/weak-password":
          alert("Password is too weak.");
          break;
        default:
          alert("Something went wrong. Please try again later.");
          break;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await SecureStore.setItemAsync(TOKEN_KEY, null);
    setUser(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await SecureStore.getItemAsync(TOKEN_KEY);
        if (userData) {
          console.log(JSON.parse(userData));
          setUser(JSON.parse(userData));
        }
        setIsLoading(false); // Move setIsLoading here to run after fetching data
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setIsLoading(false); // Ensure setIsLoading is called even on error
      }
    };

    const fetchDataWithDelay = () => {
      setIsLoading(true);
      setTimeout(() => {
        fetchData();
        setIsLoading(false);
      }, 1500); // Delay fetching data for 1500 milliseconds
    };
    // fetchData();
    fetchDataWithDelay(); // Start fetching data with a delay
  }, []); // Empty dependency array to run only once on mount

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        onLogin,
        onRegister,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
export default AuthContext;
