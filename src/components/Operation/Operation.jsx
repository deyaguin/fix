import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Progress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grow from '@material-ui/core/Grow';

import { STEPS_TITLES, SORT_MODES } from '../../constants';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
      alignSelf: 'center',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    button: {
        minWidth: 100,
        '&:first-child': {
            marginRight: theme.spacing.unit * 2,
        }
    },
    addButton: {
      maxWidth: 100,
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        margin: `${theme.spacing.unit * 2}px 0`,
    },
    field: {
    },
    table: {
      margin: `${theme.spacing.unit * 2}px 0`,
    },
    verticalBlock: {
        display: 'flex',
        flexDirection: 'column',
        padding: `${theme.spacing.unit * 2}px 0`,
    },
    loading: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    greenRow: {
        backgroundColor: 'green',
    },
});

const initialFieldsState = { 1: 0, 2: 0 };

const Operation = ({ classes, setParentStep }) => {
    const [step, setChildStep] = useState(1);
    const [fields, setFields] = useState(initialFieldsState);
    const [searchedValue, setSearchedValue] = useState('');
    const [sortMode, setSortMode] = useState(SORT_MODES.ASC);
    const [calculating, setCalculating] = useState(false);

    const setStep = (step) => {
      setChildStep(step);
      setParentStep(step);
    };

    const fieldValueInvalid = Object.keys(fields).filter(key => fields[key] === '').length > 0;

    const isFirst = step === 1;
    const isSecond = step === 2;
    const isThird = step === 3;
    const isFourth = step === 4;

    const ascSort = (a, b) => {
        const value = fields[a] - fields[b];

        if (value < 0) return -1;

        if (value > 0) return 1;

        return 0;
    };

    const descSort = (a, b) => {
        const value = fields[a] - fields[b];

        if (value > 0) return -1;

        if (value < 0) return 1;

        return 0;
    };

    const sortFunctions = {
        asc: ascSort,
        desc: descSort,
    };

    const calculateResult = () => Object.keys(fields).reduce((acc, key) => acc + Number(fields[key]), 0);

    const filterFunction = key => {
        const value = fields[key];

        return String(value).startsWith(searchedValue);
    };

    const setField = () => {
      setFields({ ...fields, [Object.keys(fields).length + 1]: 0 });
    };

    const handleFieldValueChange = key => (e) => {
        const temp = { ...fields };
        temp[key] = e.target.value;
        setFields(temp);
    };

    const handleNext = async () => {
        await setStep(step + 1);

        if (isSecond) {
            setCalculating(true);
            setTimeout(() => {
                setCalculating(false);
                setStep(4);
            }, 5000);
        }
    };

    const handlePrev = () => {
        if (isFourth) {
            setStep(1);
        } else {
            setStep(step - 1);
        }
        setFields(initialFieldsState);
    };

    const handleSearchFieldChange = e => setSearchedValue(e.target.value);

    const title = (
      <Typography
          className={classes.title}
          variant="subtitle1"
      >
          {STEPS_TITLES[step]}
      </Typography>
    );

    const renderSortingButton = () => {
        if (sortMode === SORT_MODES.ASC) {
            return (
                <IconButton onClick={() => setSortMode('desc')}>
                    <ArrowUpwardIcon />
                </IconButton>
            )
        }

        return (
            <IconButton onClick={() => setSortMode('asc')}>
                <ArrowDownwardIcon />
            </IconButton>
        )
    };

    const table = (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Values
                        {renderSortingButton()}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Object.keys(fields)
                        .filter(filterFunction)
                        .sort(sortFunctions[sortMode])
                        .map(key => {
                            const value = fields[key];

                            return (
                                <TableRow
                                    className={classNames({
                                        [classes.greenRow]: isFourth && value > 10,
                                    })}
                                    key={key}
                                >
                                    <TableCell>
                                        {value}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                }
                {isFourth && (
                    <TableRow>
                        <TableCell>
                            {calculateResult()}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

    const actions = (
        <div className={classes.actions}>
            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disabled={isFirst || calculating}
                size="small"
                onClick={handlePrev}
            >
                {
                    isFourth ? 'Return to data entry' : 'Prev'
                }
            </Button>
            {
                !isFourth && (
                    <Button
                        disabled={calculating || fieldValueInvalid}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                )
            }
        </div>
    );

    const firstStep = isFirst && (
        <Grow in={isFirst}>
            <section className={classes.fields}>
                <Button
                    className={classes.addButton}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={setField}
                >
                    Add
                </Button>
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
            </section>
        </Grow>
    );

    const secondStep = isSecond && (
        <Grow in={isSecond}>
            <section className={classes.verticalBlock}>
                <TextField
                    label="Search"
                    className={classes.field}
                    value={searchedValue}
                    onChange={handleSearchFieldChange}
                />
                {table}
            </section>
        </Grow>
    );

    const thirdStep = isThird && (
        <Grow in={isThird}>
            <section className={classes.loading}>
                <Progress />
                <Typography variant="subtitle1">
                    Calculating...
                </Typography>
            </section>
        </Grow>
    );

    const fourthStep = isFourth && (
        <Grow in={isFourth}>
            <section className={classes.verticalBlock}>
                {table}
            </section>
        </Grow>
    );

    return (
        <section className={classes.container}>
            {title}
            {firstStep}
            {secondStep}
            {thirdStep}
            {fourthStep}
            {actions}
        </section>
    );
};

Operation.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    setParentStep: PropTypes.func.isRequired,
};

export default withStyles(styles)(Operation);