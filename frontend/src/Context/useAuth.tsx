import { UserProfile } from "../Models/User";
import React, {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginAPI, registerAPI } from "../Services/AuthService";


type UserContextType = {
    user : UserProfile | null ;
    token : string | null ;
    registerUser : (email : string, username : string, password : string) => void;
    loginUser : (username : string, password : string) => void;
    logout : () => void;
    isLoggedIn : () => boolean;
}

type Props = {children : React.ReactNode};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider  = ({children} : Props) => {

    const navigate = useNavigate();
    const [token , setToken] = useState<string | null>(null);
    const [user , setUser] = useState<UserProfile | null>(null); 
    const [isReady , setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if(user && token){
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer" +token;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (
        email: string,
        username: string,
        password: string
      ) => {
        await registerAPI(email, username, password)
          .then((res) => {
            if (res) {
              localStorage.setItem("token", res?.data.token);
              const userObj = {
                username: res?.data.userName,
                email: res?.data.email,
              };
              localStorage.setItem("user", JSON.stringify(userObj));
              setToken(res?.data.token!);
              setUser(userObj!);
              toast.success("Login Success!");
              navigate("/search");
            }
          })
          .catch((e) => toast.warning("Server error occured"));
      };


    const loginUser = async ( username : string, password : string) => {
        await loginAPI( username, password).then((res) => {
            if(res){
                localStorage.setItem("token", res?.data?.token);
                const userObj = {
                    username: res?.data.userName,
                    email: res?.data.email,
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(res?.data.token!);
                setUser(userObj!);
                toast.success("Login successfully!!");
                navigate("/search");
            }
        }).catch((e) => toast.warning("Server error occured"));
    };

    const isLoggedUser = () => {
        return !!user ;
    }

    const logout = () => {  
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/");
    }

    const isLoggedIn = () => {
        return !!user;
      };

    return(
        <UserContext.Provider value={{loginUser , user , token ,logout , isLoggedIn , registerUser}}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    )
    
}


export const useAuth = () => React.useContext(UserContext);