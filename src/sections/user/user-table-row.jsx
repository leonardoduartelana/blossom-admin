import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import RsCustomer from "../../api/data/RsCustomer";

// ----------------------------------------------------------------------

export default function UserTableRow({
                                         customer,
                                         handleClick,
                                     }) {

    return (
        <TableRow hover tabIndex={-1} role="checkbox">
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {`${customer.firstName} ${customer.lastName}`}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="subtitle2" noWrap>
                        {customer.email}
                    </Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" padding="normal">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button onClick={() => {
                        handleClick(customer)
                    }}>
                        View
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}

UserTableRow.propTypes = {
    customer: PropTypes.objectOf(RsCustomer),
    handleClick: PropTypes.func,
};
