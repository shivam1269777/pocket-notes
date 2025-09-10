import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import {Routes,Route } from 'react-router-dom';
import Spinner from "./components/Spinner"; 
import { lazy, Suspense } from "react";

const Home = lazy(() => import('./pages/Home.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));


function App() {
  
  return (<>
    <Suspense fallback={<Spinner/>}>
  <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
     </Suspense>
<ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnHover 
      />
    
    </>
    
  )
}
export default App
