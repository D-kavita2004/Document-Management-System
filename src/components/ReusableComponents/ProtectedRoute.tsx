import { Navigate, Outlet } from "react-router-dom";
 
const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("loggedIn")
   return isAuthenticated=="true" ? <Outlet/> : <Navigate to = "/Login"/>
 }
export default ProtectedRoute;