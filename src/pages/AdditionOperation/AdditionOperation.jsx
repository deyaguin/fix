import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import UserContext from '../../user-context';
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
        maxWidth: 450,
        minHeight: 300,
        width: '100%',
        padding: theme.spacing.unit * 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    }
});

const AdditionOperation = ({ classes }) => {
    const [step, setStep] = useState(1);

    const { credentials: { email } } = useContext(UserContext);

    return (
        <section className={classes.container}>
            <Paper className={classes.block}>
                <UserInfo email={email} step={step} />
                <Operation setParentStep={setStep} />
            </Paper>
        </section>
    );
};

AdditionOperation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AdditionOperation);