import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRoutes = ({ children, ...rest}) => {
    let {user} = useContext(UserContext);
    return (
        user ? <Outlet/> : <Navigate to="/"/>
    )

}

export default PrivateRoutes