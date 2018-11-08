import React, { useState } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import AdditionOperation from './pages/AdditionOperation';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { ROUTES } from './constants';
import UserContext from './user-context';

const App = () => {
    const initialCredentials = JSON.parse(localStorage.getItem('credentials')) || null;

    const handleSignIn = (credentials) => {
        localStorage.setItem('credentials', JSON.stringify(credentials));
        setCredentials(credentials);
    };

    const [credentials, setCredentials] = useState(initialCredentials);

    const isAuthorized = Boolean(credentials);
    const isSignInPage = document.location.pathname === ROUTES.SIGN_IN;
    const isAdditionOperationPage = document.location.pathname === ROUTES.ADDITION_OPERATION;
    const isHomePage = document.location.pathname === ROUTES.HOME;

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ credentials, setCredentials: handleSignIn }}>
                {
                    isAuthorized && !isAdditionOperationPage && <Redirect to={ROUTES.ADDITION_OPERATION} />
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
                    <Route
                        exact
                        path={ROUTES.ADDITION_OPERATION}
                        component={AdditionOperation}
                    />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default App;