import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/Constants/userContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  //For Authentication purpose
  const { user, loading } = useUser();
  console.log(user);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
