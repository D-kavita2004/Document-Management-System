import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [breadcrumb, setBreadcrumb] = useState({
    name: "",
    path: "/Settings",
  });
  return (
    <div className="w-full h-full p-6 overflow-y-auto">

      <div className="flex items-center justify-center gap-2 mb-6">
        <p
          className="text-2xl font-bold text-center cursor-pointer"
          onClick={() => {
            navigate("/Settings");
            setBreadcrumb((prev) => ({
              ...prev,
              name: "",
            }));
          }}
        >
          Settings
        </p>
          {
              breadcrumb.name && (
                <>
                  <ChevronRight className="w-6 h-6 text-gray-500" />
                  <p
                    className="text-2xl font-bold text-center cursor-pointer"
                    onClick={() => navigate(breadcrumb.path)}
                  >
                    {breadcrumb.name}
                  </p>
                </>
              )
          }
      </div>
      <Outlet context={{ setBreadcrumb }} />
    </div>
  );
};

export default SettingsPage;
