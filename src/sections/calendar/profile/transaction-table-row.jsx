import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import RsTransaction from "../../../api/data/RsTransaction";
import {convertBackendDateToFormat} from "../../../utils/DateUtils";

// ----------------------------------------------------------------------

export default function TransactionTableRow({
                                         transaction,
                                         handleClick,
                                     }) {

    return (
        <TableRow hover tabIndex={-1} role="checkbox">
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="caption">
                        {convertBackendDateToFormat(transaction.created, "DD/MM/yyyy HH:mm:ss")}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="" noWrap>
                        {transaction.title}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Typography variant="subtitle1" color={transaction.sign === 'dr' ? 'red' : 'green'} noWrap>
                        {
                            transaction.sign === 'dr' ? `-${transaction.amount}` : `+${transaction.amount}`
                        }
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {
                            transaction.balance
                        }
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {
                            transaction.adminNote
                        }
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="caption" noWrap>
                        {
                            transaction.employeeName ? transaction.employeeName : "System"
                        }
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

TransactionTableRow.propTypes = {
    transaction: PropTypes.objectOf(RsTransaction),
    handleClick: PropTypes.func,
};
