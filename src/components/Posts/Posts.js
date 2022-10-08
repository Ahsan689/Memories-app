import React from "react";
import Post from "./Post/Post";

import { Grid, CircularProgress } from "@material-ui/core";
import {useSelector} from 'react-redux';

import useStyles from './Styles'

const Posts = ({setcurrentId}) =>{
    const classes = useStyles()
    const posts = useSelector((state)=> state.posts);

    console.log(posts,"postsss");
    return(
        <>
        {!posts.length ? <CircularProgress justifyContent="center"/> : (
             <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setcurrentId={setcurrentId}/>

                    </Grid>
                ))}

             </Grid>
        )}
        </>
        
    )
}
export default Posts;