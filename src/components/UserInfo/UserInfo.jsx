import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import UserContext from '../../user-context';

const styles = theme => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        width: '100%',
        height: '100%',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    }
});

const STEP_DESCRIPTIONS = {
    1: 'please input your values',
    2: 'check your values',
    3: 'wait for the calculation to complete',
    4: 'this is the result of calculation',
};

const UserInfo = ({ email, step, classes }) => {
    const { signOut } = useContext(UserContext);

    const handleEmail = () => email
        .replace(/^\w/, value => value.toUpperCase())
        .replace(/\u0040\w+/, value => value.substring(0, 2).padEnd(value.length, '*'));

    return (
        <section className={classes.container}>
            <div>
                <Typography variant="subtitle1">Hello, {handleEmail()}</Typography>
                <Typography>{STEP_DESCRIPTIONS[step]}</Typography>
            </div>
            <Button
                size="small"
                color="primary"
                onClick={signOut}
            >
                SignOut
            </Button>
        </section>
    );
};

UserInfo.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
};

export default withStyles(styles)(UserInfo);