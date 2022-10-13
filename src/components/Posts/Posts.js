import React from "react";
import Post from "./Post/Post";

import { Grid, CircularProgress } from "@material-ui/core";
import {useSelector} from 'react-redux';

import useStyles from './Styles'

const Posts = ({setcurrentId}) =>{
    const classes = useStyles()
    const { posts , isLoading } = useSelector((state)=> state.posts);     // { posts: [] } this is why destructure posts. 

    // console.log(posts,"postsss");
    // console.log(posts,"likess");

    if(!posts.length && !isLoading) return "No posts found"
    
    return(
        <>
        {isLoading ?  <CircularProgress className={classes.circularProgress}/> : (
            
             <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
                        <Post post={post} setcurrentId={setcurrentId}/>

                    </Grid>
                ))}

             </Grid>
        )}
        </>
        
    )
}
export default Posts;