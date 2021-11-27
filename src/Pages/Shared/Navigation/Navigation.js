import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// drawer
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// dropdown
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
    const { firebase } = useAuth();
    const { user, logOut } = firebase;

    /* drawer */
    const [state, setState] = React.useState({
        left: false,
    });
    const toggleDrawer = (anchor, open) => () => {
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="bg-green text-white drawer-custom"
        >
            <List>
                <ListItem button className="px-5 py-3">
                    <Link to="/"><i className="fas fa-home me-2"></i>Home</Link>
                </ListItem>
                <Divider />
                <ListItem button className="px-5 py-3">
                    <Link to="/appointment"><i className="far fa-calendar-check me-2"></i>Appointment</Link>
                </ListItem>
                <Divider />
                <ListItem button className="px-5 py-3">
                    <Link to="/dashboard"><i className="fas fa-clipboard-list me-2"></i>Dashboard</Link>
                </ListItem>
            </List>
        </Box>
    );
    // 
    /* dropdown */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //

    return (
        <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 5 }}>
            <AppBar position="static" className="bg-green text-white border-3 border-bottom shadow-lg">
                <Toolbar>
                    <div>
                        {[''].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <IconButton
                                    onClick={toggleDrawer(anchor, true)}
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    {anchor}
                                    <MenuIcon />
                                </IconButton>
                                <Drawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                >
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </div>
                    <img src="./doctors-portal.png" width="25" className="img-fluid me-2" alt="" />
                    <Typography variant="h6" component="div" sx={{ fontSize: '14px', fontWeight: 'bold', flexGrow: 1, textAlign: 'justify' }}>
                        <a href="/">Doctors Portal</a>
                    </Typography>
                    <Button color="inherit">

                        <div>
                            {
                                (user?.email || user?.displayName) ?
                                    <div>
                                        {
                                            (user?.photoURL) ?
                                                <img onClick={handleClick} src={user?.photoURL} width="35px" className="border border-white border-3 rounded-pill" alt="" />
                                                :
                                                <AccountCircleIcon
                                                    id="basic-button"
                                                    aria-controls="basic-menu"
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                >
                                                    Dashboard
                                                </AccountCircleIcon>
                                        }
                                    </div>
                                    :
                                    <AccountCircleIcon
                                        id="basic-button"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        Dashboard
                                    </AccountCircleIcon>
                            }
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                {
                                    (user?.email || user?.displayName) ?
                                        <div>
                                            <MenuItem onClick={handleClose}>{user.displayName}</MenuItem>
                                            <Link to='/' onClick={handleClose}><MenuItem onClick={logOut}>Logout</MenuItem></Link>
                                        </div>
                                        :
                                        <div>
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <Link to='/login'><MenuItem onClick={handleClose}>Login</MenuItem></Link>
                                            <Link to='/register'><MenuItem onClick={handleClose}>Register</MenuItem></Link>
                                        </div>
                                }
                            </Menu>
                        </div>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;