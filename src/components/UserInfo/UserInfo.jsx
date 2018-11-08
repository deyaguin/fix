import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
  },
});

const STEP_DESCRIPTIONS = {
    1: 'please input your values',
    2: 'check your values',
    3: 'wait for the calculation to complete',
    4: 'this is the result of calculation',
};

const UserInfo = ({ email, step, classes }) => {
    const handleEmail = () => email
        .replace(/^\w/, value => value.toUpperCase())
        .replace(/\u0040\w+/, value => value.substring(0, 2).padEnd(value.length, '*'));

    return (
        <section className={classes.container}>
            <span>Hello, {handleEmail()}</span>
            <span>{STEP_DESCRIPTIONS[step]}</span>
        </section>
    );
}

UserInfo.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
};

export default withStyles(styles)(UserInfo);