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
import ProtectedRoute from "./components/ReusableComponents/ProtectedRoute"
import { Toaster } from 'sonner';
function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/SignUp' element={<SignUp/>}></Route>

                <Route element={<ProtectedRoute/>}>
                  <Route path='/' element={<Layout/>}>
                      <Route index element={<Dashboard/>}></Route>
                      <Route path='/My_Documents' element={<MyDocuments/>}></Route>
                      <Route path='/Upload_Documents' element={<UploadDocuments/>}></Route>
                      <Route path='/Search_Documents' element={<SearchDocuments/>}></Route>
                      <Route path='/Profile_Permissions' element={<ProfilePermissions/>}></Route>
                      <Route path='/Profile_Settings' element={<ProfileSettings/>}></Route>
                  </Route>
                </Route>
            </Routes>
            <Toaster position="bottom-right" richColors duration={3000}/>
      </BrowserRouter>
    </> 
  )
}

export default App
