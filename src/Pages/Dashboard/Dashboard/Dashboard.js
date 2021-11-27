import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import DashboardHome from '../DashboardHome/DashboardHome';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AddDoctor from '../AddDoctor/AddDoctor';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../AdminRoute/AdminRoute';
import Payment from '../Payment/Payment';

const drawerWidth = 220;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let { path, url } = useRouteMatch();
    const { firebase } = useAuth();
    const { admin } = firebase;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="bg-green text-white drawer-custom">
            <Toolbar />
            <List>
                <Divider />
                <ListItem button className="px-5 py-3">
                    <Link to="/home"><i className="fas fa-home me-2"></i>Home</Link>
                </ListItem>
                <ListItem button className="px-5 py-3">
                    <Link to="/appointment"><i className="far fa-calendar-check me-2"></i>Appointment</Link>
                </ListItem>
                <Divider />
                <ListItem button className="px-5 py-3">
                    <Link to={`${url}`}><i className="fas fa-clipboard-list me-2"></i>Dashboard</Link>
                </ListItem>
                <Divider />
                {
                    admin &&
                    <Box>
                        <ListItem button className="px-5 py-3">
                            <Link to={`${url}/make-admin`}><i className="fas fa-tools me-2"></i>Make Admin</Link>
                        </ListItem>
                        <Divider />
                        <ListItem button className="px-5 py-3">
                            <Link to={`${url}/add-doctor`}><i className="fas fa-user-plus me-2"></i>Add Doctor</Link>
                        </ListItem>
                    </Box>
                }

            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className="d-lg-flex d-md-flex">
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className="bg-green">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={path}>
                        <DashboardHome />
                    </Route>
                    <Route path={`${path}/payment/:appointmentId`}>
                        <Payment />
                    </Route>
                    <AdminRoute path={`${path}/make-admin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute path={`${path}/add-doctor`}>
                        <AddDoctor />
                    </AdminRoute>
                </Switch>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
