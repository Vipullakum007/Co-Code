import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState(localStorage.getItem("token"));
   const [user, setUser] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const socket = localStorage.getItem("socket");
   const authorizationToken = token ? `Bearer ${token}` : null;

   // Store token in local storage
   const storeTokenInLS = (serverToken) => {
      setToken(serverToken);
      localStorage.setItem("token", serverToken);
   };

   // Logout functionality
   const LogoutUser = () => {
      if (!socket) {
         console.error('Socket is not available.');
         return;
      }

      const roomId = localStorage.getItem('roomId');
      const username = localStorage.getItem('username');

      if (socket && roomId && username) {
         socket.emit('leaveRoom', { username, roomId });
      }

      // Clear token and user
      setToken("");
      setUser("");
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
   };

   // JWT AUTHENTICATION - to get currently logged in user
   const userAuthentication = async () => {
      try {
         setIsLoading(true);
         const response = await fetch("http://localhost:5000/api/auth/user", {
            method: "GET",
            headers: {
               Authorization: authorizationToken,
            },
         });

         if (response.ok) {
            const data = await response.json();
            setUser(data.userData);
         } else {
            console.log("Error fetching user data");
         }
      } catch (error) {
         console.error("Error in fetching user data", error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         userAuthentication();
      } else {
         setIsLoading(false);
      }
   }, [token]);

   return (
      <AuthContext.Provider
         value={{ isLoggedIn: !!token, storeTokenInLS, LogoutUser, user, authorizationToken, isLoading }}
      >
         {children}
      </AuthContext.Provider>
   );
};

// Custom React hook to access AuthContext
export const useAuth = () => {
   const AuthContextValue = useContext(AuthContext);
   if (!AuthContextValue) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return AuthContextValue;
};
