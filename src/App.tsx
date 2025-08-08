import { Layout } from './components/ReusableComponents/Layout';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard';
import MyDocuments from './components/Pages/MyDocuments';
import UploadDocuments from './components/Pages/UploadDocuments';
import SearchDocuments from './components/Pages/SearchDocuments';
import Login from './components/Pages/Login';
import ProfilePermissions from './components/Pages/ProfilePermissions';
import ProfileSettings from './components/Pages/ProfileSettings';
import SignUp from './components/Pages/SignUp';
import ProtectedRoute from "./components/ReusableComponents/ProtectedRoute";
import RoleAssignment from './components/Pages/RoleAssignment';
import { Toaster } from 'sonner';
import ErrorPage from './components/Pages/ErrorPage';
import OAuthCallback from './components/Pages/OauthCallback';
import { useUser } from './Constants/userContext';
import { useEffect, useState } from 'react';
import Profile from './components/Pages/Profile';
import ForgetPassword from './components/Pages/ForgetPassword';
import ResetPassword from './components/Pages/ResetPassword';
import SettingsPage from './components/Pages/SettingsPage';
import SettingOptions from './components/ReusableComponents/SettingOptions';
import RoleCreation from './components/ReusableComponents/RoleCreation';
import RolePermission from './components/ReusableComponents/RolePermission';

function App() {
  const { user } = useUser();
  const [userRole,setUserRole] = useState("user");

  useEffect(()=>{
    if(user){
      setUserRole(user.role);
    }
  })

  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/SignUp' element={<SignUp/>}></Route>
                <Route path="/oauth-callback" element={<OAuthCallback/>}></Route>
                <Route path='/forget-password' element={<ForgetPassword/>}></Route>
                <Route path='/reset-password/:token' element={<ResetPassword/>}></Route>
                <Route element={<ProtectedRoute/>}>
                  <Route path='/' element={<Layout/>}>
                      <Route index element={<Dashboard/>}></Route>
                      <Route path='/profile' element={<Profile/>}></Route>
                      <Route path='/My_Documents' element={<MyDocuments/>}></Route>
                      {(userRole==="admin" || userRole==="editor") && <Route path='/Upload_Documents' element={<UploadDocuments/>}></Route>}
                      <Route path='/Search_Documents' element={<SearchDocuments/>}></Route>
                      {userRole==="admin" && <Route path='/Profile_Permissions' element={<ProfilePermissions/>}></Route>}
                      {userRole==="admin" && <Route path='/Profile_Settings' element={<ProfileSettings/>}></Route>}
                      {userRole==="admin" && <Route path='/Role-Assignment' element={<RoleAssignment/>}></Route>}
                      {userRole==="admin" && 
                        <Route path='/Settings' element={<SettingsPage/>}>
                          <Route path='' element={<SettingOptions/>}></Route>
                          <Route path='Roles' element={<RoleCreation/>}></Route>
                          <Route path='Role-Permissions' element={<RolePermission/>}></Route>
                          <Route path='Assign-Role' element={<RoleAssignment/>}></Route>
                        </Route>
                      }                      
                  </Route>
                </Route>
                <Route path='*' element={<ErrorPage/>}></Route>

            </Routes>
            <Toaster position="top-right" richColors duration={3000}/>
        </BrowserRouter>
    </> 
  )
}

export default App
