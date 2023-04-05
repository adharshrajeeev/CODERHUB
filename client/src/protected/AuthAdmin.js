import { Navigate } from "react-router-dom";


export default function AuthorizeAdmin({children}){
    const adminToken=localStorage.getItem('adminToken');

    if(!adminToken) return <Navigate to={'/admin/'}/>

    return children;
}