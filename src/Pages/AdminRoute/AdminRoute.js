import { Box } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, admin } = firebase;
    if (!admin) {
        return (
            <Box sx={{ transform: 'translateY(50vh)' }}>
                You're not allowed to access this route
            </Box>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                ((user?.email || user?.displayName) && admin) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/dashboard',
                            state: { from: location }
                        }}
                    >

                    </Redirect>
            }
        >

        </Route>
    );
};

export default AdminRoute;