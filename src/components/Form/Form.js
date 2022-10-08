import React,{useState, useEffect} from "react";
import { TextField,Button, Typography, Paper } from "@material-ui/core";

import {useDispatch,useSelector} from 'react-redux';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from "../../actions/post";

import useStyles from './Styles'
const Form = ({currentId, setcurrentId}) =>{
    const classes = useStyles();

    const dispatch = useDispatch()
    const post = useSelector((state)=> currentId ? state.posts.find(p => p._id === currentId) : null);

    useEffect(() => {
      
         if(post) setpostData(post)
     
    }, [post])
    
    
    const [postData, setpostData] = useState({
        creator:'',title:'', message:'', tags:'', selectedFile:'',
    })
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData))
        }
        else{
            dispatch(createPost(postData))
        }

        clear()

    }
    const clear =()=> {

        setcurrentId(null)
        setpostData({creator:'',title:'', message:'', tags:'', selectedFile:''})
    }
    return(
        <>
        {/* <h1>Form</h1> */}
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId? `Editing a Memory` :"Creating a Memory" }</Typography>
            <TextField name="creator" variant="outlined" label='Creator' fullWidth
            value={postData.creator}
            onChange={e => setpostData({...postData, creator:e.target.value})}
            />
            <TextField name="creator" variant="outlined" label='Title' fullWidth
            value={postData.title}
            onChange={e => setpostData({...postData, title:e.target.value})}
            />
            <TextField name="creator" variant="outlined" label='Message' fullWidth
            value={postData.message}
            onChange={e => setpostData({...postData, message:e.target.value})}
            />
            <TextField name="creator" variant="outlined" label='Tags' fullWidth
            value={postData.tags}
            onChange={e => setpostData({...postData, tags:e.target.value.split(",")})}
            />
            <div className={classes.fileInput}>
                <FileBase type='file' multiple={false} onDone={({base64})=> setpostData({...postData, selectedFile:base64})}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type="submit">Submit</Button>
            <Button  variant="contained" color="secondary" size="large" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
        </>
    )
}
export default Form;