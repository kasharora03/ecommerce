import React from "react";
import { Navigate, Outlet} from "react-router-dom";
const PrivateComponent = () =>{
    const auth = localStorage.getItem('user')
    // cant goto other nav till loged in
    return auth? <Outlet/>:<Navigate to='/signup'/>
}
export default PrivateComponent;