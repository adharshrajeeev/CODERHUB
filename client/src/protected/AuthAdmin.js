import { Navigate } from "react-router-dom";


export  function AuthorizeAdmin({children}){
    const adminToken=localStorage.getItem('adminToken');

    if(!adminToken) return <Navigate to={'/admin/'}/>

    return children;
}


export  function ProtectAdmin({children}){
    const adminToken=localStorage.getItem('adminToken');

    if(adminToken) return <Navigate to={'/admin/dashboard'}/>

    return children;

}