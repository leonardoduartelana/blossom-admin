import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import RsCustomer from "../../api/data/RsCustomer";
import useViewModel from "./viewmodels/CustomersViewModel";
import {useEffect} from "react";

// ----------------------------------------------------------------------

export default function UserTableRow({
                                         customer,
                                         handleClick,
                                     }) {

    const {customerBalance, getCustomerBalance, customerLatestTransaction, getCustomerLatestTransaction} = useViewModel()

    useEffect(() => {
        if(!customerBalance) {
            getCustomerBalance(customer.id)
        }
    }, [customerBalance])

    useEffect(() => {
        if(!customerLatestTransaction) {
            getCustomerLatestTransaction(customer.id)
        }
    }, [customerLatestTransaction])

    return (
        <TableRow hover tabIndex={-1} role="checkbox" onClick={() => {
            handleClick()
        }}>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {`${customer.firstName} ${customer.lastName}`}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle1" noWrap>
                        {customerBalance?.balance}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" color={customerLatestTransaction?.sign === 'dr' ? 'red' : 'green'} noWrap>
                        {
                            !customerLatestTransaction ? null : customerLatestTransaction?.sign === 'dr' ? `-${customerLatestTransaction?.amount}` : `+${customerLatestTransaction?.amount}`
                        }
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="caption" noWrap>
                        {
                            !customerLatestTransaction ? null : customerLatestTransaction?.title
                        }
                    </Typography>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

UserTableRow.propTypes = {
    customer: PropTypes.objectOf(RsCustomer),
    handleClick: PropTypes.func,
};
