import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Typography, AppBar, Toolbar, Avatar, Button} from '@material-ui/core'

import useStyles from './Styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate , useLocation} from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function TemporaryDrawer({onLogout, user}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {user?.data ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.data?.name} src={user?.picture}>{user?.data?.name.charAt(0)}</Avatar>
                        <Typography  className={classes.userName} variant="h6" > {user?.data?.name}</Typography>
                        
                        {/* <Button className={classes.logout} variant='contained' color="secondary" onClick={()=>onLogout()}>Logout</Button> */}
                    </div>
                ) : null}
        </List>
        <Divider />
        <List>
            <ListItem button >
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText onClick={()=>onLogout() } >Logout </ListItemText>
            </ListItem>

        </List>
    
      </div>
    );
  
    return (
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button className={classes.TemporaryDrawer} onClick={toggleDrawer(anchor, true)}>{<MenuIcon/>}</Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }


const Navbar = () => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname);
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))

    console.log(user,"userrrr");

    const onLogout = () =>{
        dispatch({type:'LOGOUT' })

        navigate('/')
        setuser(null)

    }

    useEffect(() => {

        setuser(JSON.parse(localStorage.getItem('profile')))
      
    }, [location])
    

  return (
    <div>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="memories" height="40"/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40"/>
                {user?.data ? 
                <TemporaryDrawer  onLogout={onLogout} user={user}/> :
                <Button size='small' className={classes.signIn} component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                }

            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.data ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.data.name} src={user.picture}>{user.data.name.charAt(0)}</Avatar>
                        <Typography  className={classes.userName} variant="h6" > {user.data.name}</Typography>
                        <Button className={classes.logout} variant='contained' color="secondary" onClick={()=>onLogout()}>Logout</Button>
                    </div>
                ) : user?.sub ?  (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.name} src={user.picture}>{user?.name.charAt(0)}</Avatar>
                        <Typography  className={classes.userName} variant="h6" > {user?.name}</Typography>
                        <Button className={classes.logout} variant='contained' color="secondary" onClick={()=>onLogout()}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                    
                )
                }
            </Toolbar>

            </AppBar>
    </div>
  )
}

export default Navbar