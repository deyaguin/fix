import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { emailValidator } from '../../utils';
import UserContext from '../../user-context';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    form: {
        flexGrow: 1,
        padding: theme.spacing.unit * 4,
        display: 'grid',
        gridTemplateRows: '1fr 1fr 50px',
        gridRowGap: `${theme.spacing.unit * 4}px`,
        maxWidth: 300,
    },
    textInput: {
        minHeight: 72,
    }
});

const SignIn = ({ classes }) => {
    const { signIn } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submit = async () => {
        if (password === '') await setPasswordError('Password is required.');
        if (email === '') {
            await setEmailError('Email is required');
        }

        if (!emailValidator(email) && email !== '') await setEmailError('Incorrect email');

        if (email && password && emailValidator(email) && !passwordError) {
            signIn({ email, password });
        } else {
            signIn(null);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (email !== '' && emailValidator(e.target.value)) setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    return (
        <section className={classes.container}>
            <Paper className={classes.form}>
                <TextField
                    className={classes.textInput}
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    error={Boolean(emailError)}
                    helperText={emailError}
                />
                <TextField
                    className={classes.textInput}
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                />
                <Button
                    color="primary"
                    variant="contained"
                    onClick={submit}
                >
                    Войти
                </Button>
            </Paper>
        </section>
    );
};

SignIn.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SignIn);