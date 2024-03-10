import {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

import {useSearchParams} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
// eslint-disable-next-line import/order
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Icon from '@mui/material/Icon';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    CircularProgress,
    Backdrop
} from "@mui/material";

import {logout} from "../../login/Firebase";
import {useRouter} from "../../../routes/hooks";
import TransactionTableRow from "./transaction-table-row";
import TransactionTableHead from "./transaction-table-head";
import useViewModel from "./viewmodel/CustomerProfileViewModel"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function CustomerProfileView() {
    const router = useRouter();

    const [searchParams] = useSearchParams();

    const customerId = searchParams.get("customerId")

    const [adminMenuAnchor, setAdminMenuAnchor] = useState(null)
    const [showAdminMenu, setShowAdminMenu] = useState(false)
    const [showTopUpDialog, setShowTopUpDialog] = useState(false)
    const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)

    const [loading, setLoading] = useState(false)

    const {
        error,
        getCustomer,
        customer,
        balance,
        getCustomerBalance,
        transactions,
        getCustomerTransactions,
        executeCustomerTopUp,
        topUpResult,
        executeCustomerWithdraw,
        withdrawResult
    } = useViewModel()

    useEffect(() => {
        console.log(`Error: ${JSON.stringify(error)}`)
        if (error !== null) {
            if (error.code === 401) {
                // Back to login
                logout()
                router.push("/")
            } else {
                setLoading(false)
            }
        }
    }, [error])

    useEffect(() => {
        if (!customer) {
            getCustomer(customerId)
        }
    }, customer)

    useEffect(() => {
        if (!balance) {
            getCustomerBalance(customerId)
        }
    }, balance)

    useEffect(() => {
        if (!transactions) {
            getCustomerTransactions(customerId)
        }
    }, transactions)

    useEffect(() => {
        if (topUpResult) {
            getCustomerBalance(customerId)
            getCustomerTransactions(customerId)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }, topUpResult)

    useEffect(() => {
        if (withdrawResult) {
            getCustomerBalance(customerId)
            getCustomerTransactions(customerId)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }, withdrawResult)

    const handleBack = () => {
        router.back()
    }

    const handleOpenTopUpDialog = () => {
        setShowAdminMenu(false)
        setShowTopUpDialog(true)
    }

    const handleOpenWithdrawDialog = () => {
        setShowAdminMenu(false)
        setShowWithdrawDialog(true)
    }

    const handleAdminOpenPopUp = (target) => {
        setAdminMenuAnchor(target)
        setShowAdminMenu(true)
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid>
                    <Icon fontSize="large" onClick={handleBack}>arrow_back</Icon>
                </Grid>
                <Grid>
                    <Typography variant="h4"
                                ml={3}>{customer ? `${customer.firstName} ${customer.lastName}` : 'Customer Profile'}</Typography>
                </Grid>
                {
                    renderAdminButton(
                        showAdminMenu,
                        setShowAdminMenu,
                        adminMenuAnchor,
                        handleAdminOpenPopUp,
                        handleOpenTopUpDialog,
                        handleOpenWithdrawDialog
                    )
                }
            </Grid>

            <Grid container spacing={3}>
                <Grid xs={8}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                            minHeight: '100%',
                            justify:"flex-end",
                            alignItems:"center"
                        }}

                    >
                        <Stack spacing={0.5}>
                            { customer ?
                                <Avatar
                                    {...stringAvatar(`${customer.firstName} ${customer.lastName}`)} /> : null}
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography variant="caption">First name</Typography>
                            <Typography variant="subtitle1">
                                {customer?.firstName}
                            </Typography>
                            <Typography variant="caption">Last name</Typography>
                            <Typography variant="subtitle1">
                                {customer?.lastName}
                            </Typography>
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="subtitle1">
                                {customer?.phoneNumber ? customer?.phoneNumber : 'None'}
                            </Typography>
                            <Typography variant="caption">Email</Typography>
                            <Typography variant="subtitle1">
                                {customer?.email}
                            </Typography>
                        </Stack>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="COLUMN"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                            minHeight: '100%'
                        }}
                    >
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" align="center" sx={{color: 'text.disabled'}}>
                                CREDITS
                            </Typography>
                            <Typography variant="h1" align="center">{balance?.balance}</Typography>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>

            <Stack direction="row" alignItems="start" justifyContent="start" ml={1} mb={1} mt={1}>
                <Typography variant="h6">Transactions</Typography>
            </Stack>

            <Card>
                <Scrollbar>
                    <TableContainer sx={{overflow: 'unset'}}>
                        <Table sx={{minWidth: 800}}>
                            <TransactionTableHead
                                headLabel={[
                                    {id: 'date', label: 'Date'},
                                    {id: 'title', label: 'Title'},
                                    {id: 'credits', label: 'Credits'},
                                    {id: 'balance', label: 'After Balance'},
                                    {id: 'note', label: 'Note'},
                                    {id: 'executedBy', label: 'Executed By'}
                                ]}
                            />
                            <TableBody>
                                {
                                    transactions ?
                                        transactions
                                            .map((row) => (
                                                <TransactionTableRow
                                                    transaction={row}
                                                    handleClick={(event) => console.log('')}
                                                />
                                            )) : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
            {
                showTopUpDialog ? renderTopUpDialog(
                customer,
                () => {
                    setShowTopUpDialog(false)
                },
                (formData) => {
                    executeCustomerTopUp(customerId, formData.title, formData.amount, formData.note)
                    setShowTopUpDialog(false)
                    setLoading(true)
                }) : null
            }
            {
                showWithdrawDialog ? renderWithdrawDialog(
                    customer,
                    () => {
                        setShowWithdrawDialog(false)
                    },
                    (formData) => {
                        executeCustomerWithdraw(customerId, formData.title, formData.amount, formData.note)
                        setShowWithdrawDialog(false)
                        setLoading(true)
                    }) : null
            }
            {loading ?
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop> : null}
        </Container>
    );
}

const renderAdminButton = (showAdminPopUp, setShowAdminPopUp, adminMenuAnchor, handleOpenMenu, handleOpenTopUp, handleOpenWithdraw) => (
    <Grid>
        <Button
            id="basic-button"
            aria-controls={showAdminPopUp ? 'basic-menu' : undefined}
            aria-haspopup="true"
            variant="outlined" color="error"
            aria-expanded={showAdminPopUp ? 'true' : undefined}
            onClick={(event) => handleOpenMenu(event.currentTarget)}
        >
            MANAGE
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={adminMenuAnchor}
            open={showAdminPopUp}
            onClose={() => {
                setShowAdminPopUp(false)
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleOpenTopUp}>Top Up</MenuItem>
            <MenuItem onClick={handleOpenWithdraw}>Withdraw</MenuItem>
        </Menu>
    </Grid>
)

const renderTopUpDialog = (customer, handleClose, handleTopUp) => (
    <Dialog
        open={true}
        fullWidth={true}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                handleTopUp(formJson)
            },
        }}
    >
        <DialogTitle>Top Up</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Add credits to {customer.firstName} {customer.lastName}
            </DialogContentText>
            <Stack spacing={3} mt={3}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Transaction Title"
                    type="text"
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="amount"
                    name="amount"
                    label="Amount"
                    type="number"
                    variant="standard"
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="note"
                    name="note"
                    label="Employee Note"
                    type="text"
                    variant="standard"
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Proceed</Button>
        </DialogActions>
    </Dialog>
)

const renderWithdrawDialog = (customer, handleClose, handleWithdraw) => (
    <Dialog
        open={true}
        fullWidth={true}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                handleWithdraw(formJson)
            },
        }}
    >
        <DialogTitle>Top Up</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Remove credits from {customer.firstName} {customer.lastName}
            </DialogContentText>
            <Stack spacing={3} mt={3}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Transaction Title"
                    type="text"
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="amount"
                    name="amount"
                    label="Amount"
                    type="number"
                    variant="standard"
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="note"
                    name="note"
                    label="Employee Note"
                    type="text"
                    variant="standard"
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Proceed</Button>
        </DialogActions>
    </Dialog>
)

const stringAvatar = (name) => ({
        sx: {
            width: 128, height: 128,
            fontSize: 56,
            bgcolor: stringToColor(name)
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    })

const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}