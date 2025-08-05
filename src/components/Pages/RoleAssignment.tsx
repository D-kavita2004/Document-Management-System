import axios from 'axios';
import { useEffect,useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';
import { toast } from 'sonner';

const RoleAssignment = () => {
      const BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const [allUsers,setAllUsers] = useState([]);
      const [allRoles,setallRoles] = useState([]);
      const [updatedUserData,setUpdatedUserData] = useState([]);

      const getAllTheRoles = async()=>{
            try{
                  const res = await axios.get(`${BASE_URL}/roles/fetchRoles`,{withCredentials:true});
                  setallRoles(res.data.data);
                  console.log(res.data.data);
            }
            catch(error){
                  console.log(error);
            }
      }
      const handleGetAllUsers = async()=>{
            try{
                  const res = await axios.get(`${BASE_URL}/users/AllUsers`,{withCredentials:true});
                  setAllUsers(res?.data?.data);
                  console.log(res?.data?.data);
            }
            catch(error){
                  console.log(error);
            }
      }
      const handleChangeInRole = (newRole,userObj,idx) =>{

            if( newRole === allUsers[idx]?.role?.roleName){
                  return;
            }else{
                  const user = updatedUserData.find((user)=>user?._id === userObj?._id);

                  const newRoleId = allRoles.find((role)=> role.roleName === newRole);
                  const newRoleData = {_id:userObj._id, role:newRoleId,};

                  if(user){ 
                        const newData = updatedUserData.map((user)=>{
                             return (user._id === userObj._id) ? newRoleData : user;
                        })
                        setUpdatedUserData(newData);
                  }else{
                        
                        setUpdatedUserData((item)=>[...item, newRoleData]);
                  }
            }
      }
      const saveRoleChanges = async()=>{
            try{
                  const res = await axios.put(`${BASE_URL}/users/changeRoles`,{data:updatedUserData},{withCredentials:true});
                  console.log(res);
                  toast.success(res?.data?.message);
                  updatedUserData.length = 0;
                  handleGetAllUsers();
            }
            catch(error){
                  console.log(error?.response);
                  toast.error(error.response?.data?.message || "Roles are not assigned");
            }
      }

      useEffect(()=>{
            handleGetAllUsers();
            getAllTheRoles();
      },[])

  return (
      <div className='flex flex-col justify-center mx-aut0'>
            <div className="max-h-[85%] flex justify-evenly overflow-auto md:max-w-[70%] mx-auto max-w-[90%] my-5">
            <table className="border-collapse text-wrap h-full ">
            <thead className="bg-[#1A33A9] dark:bg-white dark:text-black text-white sticky top-0 z-10">
                  <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  </tr>
            </thead>
            <tbody>
                  {
                  allUsers.map((user,index)=>(
                        <tr key={index} className="even:bg-gray-200 dark:bg-[#3b3636]">
                              <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                                    <div className="flex items-center justify-center h-full">
                                   {user.username ? user.username : (user.firstName + " " + user.lastName)}

                                    {/* {user.firstName + " " + user.lastName} */}
                                    </div>
                              </td>
                              <td className="border border-gray-300 px-1 py-1 whitespace-nowrap text-center cursor-pointer">
                                    {user.email}
                              </td>
                              <td className="border border-gray-300 px-2 py-1 min-w-[150px]">
                                    <Select defaultValue={user.role.roleName} onValueChange={(newRole) => handleChangeInRole(newRole, user, index)}>
                                          <SelectTrigger className="w-[180px] cursor-pointer">
                                                <SelectValue placeholder="Your Profile" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                      {
                                                            allRoles.length!=0 && allRoles.map((role)=>(
                                                                 <SelectItem value={role.roleName}>{role.roleName}</SelectItem> 
                                                            ))
                                                      }
                                                </SelectGroup>
                                          </SelectContent>
                                    </Select>
                              </td>
                        </tr>                        
                  ))
                  }

            </tbody>
            </table>
            </div>
            <Button className='w-fit mx-auto' onClick={saveRoleChanges} disabled={updatedUserData.length === 0}>Save Changes</Button>
      </div>
  )
}

export default RoleAssignment;