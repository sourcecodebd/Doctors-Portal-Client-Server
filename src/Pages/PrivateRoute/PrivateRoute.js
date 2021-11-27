import { CircularProgress, Box } from '@mui/material';
import React from 'react';
import { Route, Redirect } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { firebase } = useAuth();
    const { user, isLoading } = firebase;
    if (isLoading) {
        return (
            <Box sx={{ transform: 'translateY(50vh)' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (user?.email || user?.displayName) ?
                    children
                    :
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    >

                    </Redirect>
            }
        >

        </Route>
    );
};

export default PrivateRoute;