import React,{useState} from 'react'
import {Typography, Avatar, Button, Container, Grid, Paper} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch,useSelector} from 'react-redux';
import { signin, signup } from '../../actions/auth';
import {AUTH} from '../../constants/actionTypes';

import { useNavigate } from 'react-router-dom';


import Input from './Input';

const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const state = null;
  
  const [isSignup, setIsSignup] = useState(false);
  const [Form, setForm] = useState(
    { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  )
  
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(Form,"formm");
        
        if (isSignup) {
          dispatch(signup(Form, navigate));
        } else {
          dispatch(signin(Form, navigate));
        }
   };

    const handleChange = (e) => {

      e.preventDefault()
      setForm({...Form, [e.target.name]:e.target.value});
      
    };

    const switchMode = (e) => {
      setIsSignup(!isSignup)
    };

    const googleSuccess = async (res) =>{
      
      const token = res.credential
      const data = jwt_decode(res.credential);
      console.log(data,"resss")

      try{
        dispatch({type: AUTH, data: {data, token}})

        navigate("/")

      }catch(err){
        console.log(err,"errrr");
      }
      
    }
    const googleFailure = () =>{
      console.log("errorr")
    }

  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>
        <GoogleOAuthProvider
          clientId="717995280954-t0cidrdufr2kv7t1fm0so58boabb4i1p.apps.googleusercontent.com"
        >
          <div style={{display:'flex', justifyContent:"center"}}>
            <GoogleLogin 
              onSuccess={googleSuccess} 
              onError={googleFailure}
            />
          </div>
        </GoogleOAuthProvider>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button  onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
}

export default Auth