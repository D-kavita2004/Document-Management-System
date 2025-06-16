import { Layout } from './components/ReusableComponents/Layout';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard';
import MyDocuments from './components/Pages/MyDocuments';
import UploadDocuments from './components/Pages/UploadDocuments';
import SearchDocuments from './components/Pages/SearchDocuments';
import Login from './components/Pages/Login';
import AdminSettings from './components/Pages/AdminSettings';
import ProfileSettings from './components/Pages/ProfileSettings';

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/Login' element={<Login/>}></Route>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}></Route>
                    <Route path='/My_Documents' element={<MyDocuments/>}></Route>
                    <Route path='/Upload_Documents' element={<UploadDocuments/>}></Route>
                    <Route path='/Search_Documents' element={<SearchDocuments/>}></Route>
                    <Route path='/Admin_Settings' element={<AdminSettings/>}></Route>
                    <Route path='/Profile_Settings' element={<ProfileSettings/>}></Route>
                </Route>
            </Routes>
      </BrowserRouter>
    </> 
  )
}

export default App
