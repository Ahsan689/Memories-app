import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

// Get PostDetail by Id
export const getPost = (id) =>  async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchPost(id)
        
        console.log(data,"getPosts");
        dispatch({type: FETCH_POST, payload: data});
        dispatch({ type: END_LOADING });
        
    }catch(error){
        console.log(error.message);
    }
}
export const getPosts = (page) =>  async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchPosts(page)
        console.log(data,"getPosts");
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({ type: END_LOADING });
        
    }catch(error){
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({ type: START_LOADING });
        const {data : {data }} = await api.fetchPostsBySearch(searchQuery)
        // console.log(data,"getPostBySearch");
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({ type: END_LOADING });
    }catch(e){
        console.log(e.message);
    }
}
export const createPost = (post, navigate) =>  async (dispatch) => {
    try{
        const {data} = await api.createPost(post)

        navigate(`/posts/${data._id}`)

        dispatch({type: CREATE, payload: data});

    }catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try{
        const {data} = await api.updatePost(id, post)
        // console.log(data,">>>>");

        dispatch({type: UPDATE, payload: data})

    }catch(error){
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {

    try{
         await api.deletePost(id)
        // console.log(data,">>>>");

        dispatch({type: DELETE, payload: id})

    }catch(error){
        console.log(error.message);
    }
}
export const likePost = (id) => async (dispatch) => {

    try{
        const {data} = await api.likePost(id)
        // console.log(data,">>>>");

        dispatch({type: UPDATE, payload: data})

    }catch(error){
        console.log(error.message);
    }
}