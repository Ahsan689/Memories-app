import { FETCH_ALL,FETCH_BY_SEARCH, FETCH_POST,START_LOADING,END_LOADING, CREATE, UPDATE, DELETE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: []}, action) => {
    switch( action.type){

        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false };
        case FETCH_ALL:
            return{
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberofPages: action.payload.numberofPages
            } 
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }
        case FETCH_POST:
            return { ...state, post: action.payload }
        case COMMENT:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) }
        case CREATE:
            return {...state, posts: [...state, action.payload]};
        case UPDATE:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case DELETE:
            return {...state, posts: state.posts.filter(p => p._id !== action.payload)}
        default:
            return state;
    }
}