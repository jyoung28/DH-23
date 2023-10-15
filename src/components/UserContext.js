import React from "react";
import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebaseSetup/firebase';
import { signInWithPopup} from "firebase/auth";


const UserContext = createContext();

export default UserContext;

export const UserProvider = ({children}) => {
    let [user, setUser] = useState("");
    const navigate = useNavigate();

    let loginUser = () => {
        signInWithPopup(auth, provider).then((result) => {
            if (result?.user.email !== null) {
              setUser(result.user.email);
              navigate('/home')
            } else {
              console.error("error with signing in");
            }
          });
    }

    let contextData = {
        user : user,
        loginUser:loginUser,
    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )

}
