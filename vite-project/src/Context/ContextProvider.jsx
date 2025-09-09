import React from 'react'
import { createContext ,useState,useContext,useEffect} from 'react'
import { toast } from "react-toastify";
const authContext=createContext()
function ContextProvider({children}) {
    const [user,setUser]=useState(null);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
         const currentTime = Math.floor(Date.now() / 1000); // seconds
        if (payload.exp && payload.exp < currentTime) {
          // Token expired
          console.log("Token expired");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({ name: payload.name , id: payload.id });
        
        }
       
      } catch (err) {
        console.log("Invalid token");
        localStorage.removeItem("token");
      }
    }

  }, []);
    const login=(user)=>{
        setUser(user)
    }

    const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    toast.info("👋 You have successfully logged out.");
  };

  return (
    <authContext.Provider value={{user,login,logout}}>
        {children}
    </authContext.Provider>
  )
}
export const useAuth =()=>useContext(authContext);
export default ContextProvider
