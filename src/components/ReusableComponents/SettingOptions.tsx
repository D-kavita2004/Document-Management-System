import { useOutletContext } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, KeyRound, UserPlus } from "lucide-react";

const SettingOptions = () => {
      const {setBreadcrumb} = useOutletContext();
      const navigate = useNavigate();
      const settingsOptions = [
            {
            title: "Role Creation",
            description: "Define custom roles to organize user access.",
            icon: <Shield className="w-6 h-6 text-blue-500" />,
            path: "/Settings/Roles",
            },
            {
            title: "Permission Management",
            description: "Define what each role can access or perform.",
            icon: <KeyRound className="w-6 h-6 text-green-500" />,
            path: "/Settings/Role-Permissions",
            },
            {
            title: "Role Assignment",
            description: "Assign roles to users to control their access.",
            icon: <UserPlus className="w-6 h-6 text-purple-500" />,
            path: "/Settings/Assign-Role",
            },
      ];
  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10">
      {settingsOptions.map((item, index) => (
      <Card
            key={index}
            onClick={
                  () => {
                        navigate(item.path);
                        setBreadcrumb({
                              name:item.title,
                              path:item.path
                        })
                  }}
            className="cursor-pointer hover:shadow-lg transition-shadow w-full max-w-sm dark:bg-white dark:text-black"
      >
            <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
            {item.icon}
            <CardTitle>{item.title}</CardTitle>
            </div>
            <CardDescription>{item.description}</CardDescription>
            </CardHeader>
      </Card>
      ))}
      </div>
  )
}

export default SettingOptions;
