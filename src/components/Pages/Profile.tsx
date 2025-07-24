import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/Constants/userContext';

const Profile = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);

  const BringProfileData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/fetchProfileData",
        { email: user.email },
        { withCredentials: true }
      );
      console.log("Response",res);
      if (res.data.success) {
        setProfileData(res.data.data); // profile data is the first object in the array
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      BringProfileData();
    }
  }, [user]);

  if (!profileData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
      <div className='h-full w-full flex justify-center items-center'>
            <div className="mx-auto dark:bg-white dark:text-black bg-[#3b3636] text-white shadow-md rounded-xl p-6 my-auto max-w-[90%] mt-15">
                  <h2 className="text-2xl font-semibold mb-4 text-center">User Profile</h2>
                  <br></br>
                  <div className="space-y-2">
                  {profileData.firstName && (<div><span className="font-semibold m-1 text-lg">Name :</span> {profileData.firstName} {profileData.lastName}</div>)}
                  {profileData.username && (<div><span className="font-semibold m-1 text-lg">Username :</span> {profileData.username}</div>)}
                  <div><span className="font-semibold m-1 text-lg">Email :</span> {profileData.email}</div>
                  {profileData.phone && (<div><span className="font-semibold m-1 text-lg">Phone :</span> {profileData.phone}</div>)}
                  <div><span className="font-semibold m-1 text-lg">Role :</span> {profileData.role?.roleName}</div>
                  <div><span className="font-semibold m-1 text-lg">User ID :</span> {profileData._id}</div>
            </div>
    </div>

      </div>
  );
};

export default Profile;
