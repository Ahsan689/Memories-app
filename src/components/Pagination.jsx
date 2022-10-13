import React,{useEffect} from "react";
import {Pagination, PaginationItem} from '@material-ui/lab';
import {Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post";
import useStyles from './Styles';

const Paginate = ({ page }) => {
  
  const dispatch = useDispatch();
    const classes = useStyles()
    const {numberofPages} = useSelector(state => state.posts)

    // console.log(numberofPages,"numberofPages");

    useEffect(() => {
     
      if(page) dispatch(getPosts(page));

    }, [page])
    

  return (
    <Pagination 
        classes={{ul: classes.ul}}
        count={numberofPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={item => (
            <PaginationItem {...item} component={Link}  to={`/posts?page=${item.page}`}/>
        )}
    />
  )
}

export default Paginate