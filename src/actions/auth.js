import  {AUTH}  from '../constants/actionTypes';
import * as api from '../api';


export const signin = (formData, navigate, handleClick) =>  async (dispatch) => {
    try{
        const {data} = await api.signIn(formData)

        dispatch({type: AUTH, data});

        navigate("/")
    }catch(error){
        console.log(error.response.data.message);
        if (error.response.data.message == 'User does not exist!') handleClick(error.response.data.message)
        else handleClick(error.response.data.message)
    }
}

export const signup = (formData, navigate, handleClick) =>  async (dispatch) => {
    try{
        const {data} = await api.signUp(formData)

        dispatch({type: AUTH, data});

        navigate("/")

    }catch(error){
        console.log(error.response.data.message);
        if (error.response.data.message == 'User already exist!') handleClick(error.response.data.message)
        else if("Password doesn't match!") handleClick(error.response.data.message)
    }
}

