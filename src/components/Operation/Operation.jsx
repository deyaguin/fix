import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const styles = theme => ({
    container: {

    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        minWidth: 100,
        '&:first-child': {
            marginRight: theme.spacing.unit * 2,
        }
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.spacing.unit * 2}px 0`
    },
    field: {
        maxWidth: 100,
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
    },
});

const Operation = ({ classes }) => {
    const [step, setStep] = useState(1);
    const [fields, setFields] = useState({ 1: 0, 2: 0 });
    const [searchedValue, setSearchedValue] = useState(null);
    const [tableSort, setTableSort] = useState(null);

    const isFirst = step === 1;
    const isSecond = step === 2;
    const isThird = step === 3;
    const isFourth = step === 4;

    const setField = () => {
      setFields({ ...fields, [Object.keys(fields).length + 1]: 0 });
    };

    const handleFieldValueChange = key => (e) => {
        const temp = { ...fields };
        temp[key] = e.target.value;
        setFields(temp);
    };

    const handleNext = () => setStep(step + 1);

    const handlePrev = () => setStep(step - 1);

    const handleSearchFieldChange = e => setSearchedValue(e.target.value);

    const actions = (
        <div className={classes.actions}>
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={isFirst}
                size="small"
                onClick={handlePrev}
            >
                Prev
            </Button>
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleNext}
            >
                Next
            </Button>
        </div>
    );

    const firstStep = isFirst && (
        <div className={classes.fields}>
            {
                Object.keys(fields).map((key) => (
                    <TextField
                        className={classes.field}
                        type="number"
                        key={key}
                        value={fields[key]}
                        onChange={handleFieldValueChange(key)}
                    />
                ))
            }
        </div>
    );

    const secondStep = isSecond && (
        <div className={classes.table}>
            <TextField
                value={searchedValue}
                onChange={handleSearchFieldChange}
            />
            <Table>
                <TableBody>
                </TableBody>
            </Table>
        </div>
    );

    return (
        <section className={classes.container}>
            <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                size="small"
                onClick={setField}
            >
                Add
            </Button>
            {firstStep}
            {actions}
        </section>
    );
};

Operation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Operation);