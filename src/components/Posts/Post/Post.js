import React, {useState, useEffect} from "react";

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import useStyles from './Styles'
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import { useNavigate , useLocation} from 'react-router-dom';

import moment from 'moment'
const Post = ({post, setcurrentId}) =>{
    const classes = useStyles()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [likes, setLikes] = useState(post?.likes)
    // console.log(likes,"likesss");

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const userId = user?.data?.sub || user?.data?._id;
    const hasLikedPost = post?.likes.find(like => like === userId)

    

    const handleLike = () => {
        dispatch(likePost(post._id))

        if(hasLikedPost){
            setLikes(post?.likes.filter(like => like !== userId))
        }
        else{
            setLikes([...post?.likes, userId])
            console.log(hasLikedPost,"hgvhh");
        }
    }
   
   

    const Likes = () =>{
        
        if(likes.length > 0){
            return likes.find(like => like === userId)
            ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp; {likes.length > 2 ? `You and${likes.length-1} others`: `${likes.length} ${likes.length === 1 ? 'Like':'Likes'} `}</>
            ):(
                <><ThumbUpAltOutlined  fontSize="small"/>&nbsp; {likes.length } {likes.length === 1 ? 'Like':'Likes'}</>
                )
            }
         return  <><ThumbUpAltOutlined  fontSize="small"/>&nbsp; Like</>
    }

    useEffect(() => {

        setuser(JSON.parse(localStorage.getItem('profile')))
      
    }, [location])

    const openPost = () => navigate(`/posts/${post._id}`)
    
    return(
        <>
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase   className={classes.cardAction} onClick={openPost}>
              <CardMedia className={classes.media}  image={post.selectedFile} width="100" title={post.title}/>
            
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name} </Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow} </Typography>

            </div>
            </ButtonBase>
            <div className={classes.overlay2}>
            {(user?.data?.sub === post?.creator || user?.data?._id === post?.creator )&&(
                
                <Button style={{ color: 'white' }} size="small" onClick={() => {setcurrentId(post._id)}}><MoreHorizIcon  fontSize="medium" /></Button>
            )}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title}  gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography  variant="body2" color="textSecondary" component="p" >{post.message.split(' ').splice(0, 15).join(' ')}...</Typography>
            </CardContent>
            
            
            <CardActions className={classes.cardActions}>
                <Button disabled={!user?.data} size="small" color="primary" onClick={handleLike}>
                    <Likes/>
                 </Button>
            {(user?.data?.sub === post?.creator || user?.data?._id === post?.creator )&& (

                <Button size="small" color="secondary" onClick={() => {dispatch(deletePost(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button>
            ) }
            </CardActions>
        </Card>
        </>
    )
}
export default Post;