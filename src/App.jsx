import React, { useState } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    withRouter,
} from 'react-router-dom';

import AdditionOperation from './pages/AdditionOperation';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { ROUTES } from './constants';
import UserContext from './user-context';

const App = withRouter(({ location }) => {
    const { pathname } = location;
    const initialCredentials = JSON.parse(localStorage.getItem('credentials')) || null;

    const handleSignIn = (credentials) => {
        localStorage.setItem('credentials', JSON.stringify(credentials));
        setCredentials(credentials);
    };

    const handleSignOut = () => {
        localStorage.removeItem('credentials');
        setCredentials(null);
    };

    const [credentials, setCredentials] = useState(initialCredentials);

    const isAuthorized = Boolean(credentials);
    const isSignInPage = pathname === ROUTES.SIGN_IN;
    const isAdditionOperationPage = pathname === ROUTES.ADDITION_OPERATION;
    const isHomePage = pathname === ROUTES.HOME;

    return (
        <UserContext.Provider value={{ credentials, signIn: handleSignIn, signOut: handleSignOut }}>
            {
                isAuthorized && !isAdditionOperationPage && <Redirect exact to={ROUTES.ADDITION_OPERATION} />
            }
            {
                !isSignInPage && !isAuthorized && !isHomePage && <Redirect exact to={ROUTES.HOME} />
            }
            <Switch>
                <Route
                    exact
                    path={ROUTES.HOME}
                    component={Home}
                />
                <Route
                    exact
                    path={ROUTES.SIGN_IN}
                    component={SignIn}
                />
                {
                   isAuthorized && (
                       <Route
                           exact
                           path={ROUTES.ADDITION_OPERATION}
                           component={AdditionOperation}
                       />
                   )
                }
            </Switch>
        </UserContext.Provider>
    );
});

export default () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);