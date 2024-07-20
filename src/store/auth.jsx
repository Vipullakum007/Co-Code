import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

   const [token, setToken] = useState(localStorage.getItem("token"));
   const [user, setUser] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const authorizationToken = `Bearer ${token}`;

   const storeTokenInLS = (serverToken) => {
      setToken(serverToken);
      return localStorage.setItem("token", serverToken);
   };

   // lets tack logout functionality
   let isLoggedIn = !!token;
   console.log("isLoggedIn = ", isLoggedIn);

   const LogoutUser = () => {
      setToken("");
      return localStorage.removeItem("token");
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
            console.log("user data : ", data.userData);
            setUser(data.userData);
            setIsLoading(false);
         }
         else {
            console.log("Error fetching user data");
            setIsLoading(false);
         }
      } catch (error) {
         console.error("error in fetching user data");
      }

   };
   useEffect(() => {
      userAuthentication();
   }, []);



   return <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken, isLoading }}>
      {children}
   </AuthContext.Provider>
};

// custome react HOOK

// useAuth function now contains tha value provided by AuthContext.provider higher up in component tree
export const useAuth = () => {
   const AuthContextValue = useContext(AuthContext);
   if (!AuthContextValue) {
      throw new Error("useAuth used outside of the Provider");
   }
   return AuthContextValue;
}