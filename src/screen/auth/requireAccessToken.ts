import { useNavigate } from "react-router-dom";
import { useAuthenticationUserLine, useAuthenticationUserWebsite } from "../../tools/tools";
import { useEffect, useState } from "react";

export const RequireAuthLine = ({ children }) => {
    const { authenticationUser } = useAuthenticationUserLine();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuthentication = async () => {
        const isAuthenticated : any = await authenticationUser();
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          navigate('/line/login');
        }
      };
      checkAuthentication();
    }, [authenticationUser, navigate]);  
    return isAuthenticated ? children : null;
  };

export const RequireAuthWebsite = ({children}) =>{
    const { authenticationUser } = useAuthenticationUserWebsite();
    useEffect(() =>{
        authenticationUser();
    }, [])
    return children;
}