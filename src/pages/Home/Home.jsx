import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { ROUTES } from '../../constants';

const Home = () => (
    <div>
        <Typography variant="subtitle1">
            This is simple test application.
        </Typography>
        <Link to={ROUTES.SIGN_IN}>
            SignIn
        </Link>
    </div>
);

export default Home;