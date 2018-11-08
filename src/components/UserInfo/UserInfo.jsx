import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      width: '100%',
      height: '100%',
  },
});

const UserInfo = ({ email, classes }) => (
    <section className={classes.container}>
        Hello, {email}
    </section>
);

UserInfo.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    email: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserInfo);