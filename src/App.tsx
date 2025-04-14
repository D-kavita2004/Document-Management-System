import './App.css';
import { Layout } from './components/Elements/Layout';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Dashboard from './components/Elements/Pages/Dashboard';
import MyDocuments from './components/Elements/Pages/MyDocuments';
import UploadDocuments from './components/Elements/Pages/UploadDocuments';
import SearchDocuments from './components/Elements/Pages/SearchDocuments';

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Dashboard/>}></Route>
                    <Route path='/My_Documents' element={<MyDocuments/>}></Route>
                    <Route path='/Upload_Documents' element={<UploadDocuments/>}></Route>
                    <Route path='/Search_Documents' element={<SearchDocuments/>}></Route>
                </Route>
            </Routes>
      </BrowserRouter>
    </> 
  )
}

export default App
