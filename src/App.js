import React,{useState, useEffect} from "react";
import {Container} from '@material-ui/core';
import useStyles from './Styles'
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

export const App = () =>{
    
    // const [user, setuser] = useState(JSON.parse(localStorage.getItem("profile")))
    // const userRes = useSelector(state => state.auth.authData)
    // useEffect(() => {

    //     setuser(JSON.parse(localStorage.getItem("profile")))
     
    // }, [userRes])

    const user = JSON.parse(localStorage.getItem("profile"))
    
    
    return(
        <>
        <BrowserRouter>
        <Container maxWidth="xl">
            <Navbar/>
                <Routes>
                    <Route  path="/" exact element={<Navigate to="/posts"/> }/>
                    <Route  path="/posts" exact element={<Home/>}/>
                    <Route  path="/posts/search" exact element={<Home/>}/>
                    <Route  path="/posts/:id" exact element={<PostDetails/>}/>
                    <Route  path="/auth" exact element={!user ? <Auth />: <Navigate to="/posts"/> }/>
                </Routes>
        </Container>
        </BrowserRouter>
        {/* <h1>App Comp</h1> */}
        </>
    )
}

