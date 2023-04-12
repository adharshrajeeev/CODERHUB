import { Navigate } from "react-router-dom";

export  function AuthorizeUser({children}){
    const token=localStorage.getItem('token');

    if(!token) return <Navigate to={'/'}/>

    return children
}

export function ProtectUser({children}){
    const token=localStorage.getItem('token');

    if(token) return <Navigate to={'/home'}/>

    return children;
}