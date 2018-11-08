import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import UserInfo from '../../components/UserInfo';
import Operation from '../../components/Operation';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    block: {
        maxWidth: 1000,
        width: '100%',
        padding: theme.spacing.unit * 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    }
});

const AdditionOperation = ({ classes }) => (
    <section className={classes.container}>
        <Paper className={classes.block}>
            <UserInfo email="test" />
            <Operation />
        </Paper>
    </section>
);

AdditionOperation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AdditionOperation);