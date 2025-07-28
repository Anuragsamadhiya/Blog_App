import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import {Route,Routes} from "react-router-dom"
import Header from './Components/Header'
import Addblog from './pages/Addblog'
import Addcategory from './pages/Addcategory'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/register' element={<Register/>}> </Route>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/addblog' element={<Addblog/>}> </Route>
        <Route path='/addcategory' element={<Addcategory/>}> </Route>


 </Routes>
 </>
  );
};

export default App
