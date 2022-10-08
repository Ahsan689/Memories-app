import React, {useEffect, useState} from "react";
import {Container, Typography, AppBar, Grow, Grid} from '@material-ui/core';
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './Styles'

import {useDispatch} from 'react-redux';
import { getPosts } from "./actions/post";

import memories from './images/memoriesNew.png';
export const App = () =>{
    const classes = useStyles();

    const [currentId, setcurrentId] = useState(null)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return(
        <>
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>

            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container  justify="space-between" alignItems="stretch" spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Posts setcurrentId={setcurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setcurrentId={setcurrentId}/>
                        </Grid>

                    </Grid>
                </Container>
            </Grow>
        </Container>
        {/* <h1>App Comp</h1> */}
        </>
    )
}

