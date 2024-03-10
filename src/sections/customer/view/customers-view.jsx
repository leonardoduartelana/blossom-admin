import {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';

// ----------------------------------------------------------------------

import {logout} from "../../login/Firebase";
import {useRouter} from "../../../routes/hooks";
import useViewModel from "../viewmodels/CustomersViewModel"

export default function CustomersPage() {
    const router = useRouter();

    const {error, customers, searchCustomers, getAll} = useViewModel()

    useEffect(() => {
        console.log(`Error: ${JSON.stringify(error)}`)
        if (error !== null && error.code === 401) {
            // Back to login
            logout()
            router.push("/")
        }
    }, [error])

    const [searchName, setSearchName] = useState('');

    const handleFilterByName = (event) => {
        setSearchName(event.target.value);
    };

    const handleClick = (customer) => {
        router.push(`/customer-profile?customerId=${customer.id}`)
    }

    useEffect(() => {
        if (searchName.length > 2) {
            searchCustomers(searchName)
        }

        if(searchName.length === 0 || !searchName) {
            getAll()
        }
    }, [searchName])

    useEffect(() => {
        console.log(`customers -> ${JSON.stringify(customers)}`)
    }, [customers])

    const notFound = !customers.length && !!searchName;

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Customers</Typography>
            </Stack>

            <Card>
                <UserTableToolbar
                    filterName={searchName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{overflow: 'unset'}}>
                        <Table sx={{minWidth: 800}}>
                            <UserTableHead
                                headLabel={[
                                    {id: 'name', label: 'Name'},
                                    {id: 'balance', label: 'Balance'},
                                    {id: 'last_transaction_amount', label: 'Recent Change'},
                                    {id: 'last_transaction_title', label: 'Recent Change'}
                                ]}
                            />
                            <TableBody>
                                {
                                    customers
                                        .map((row) => (
                                            <UserTableRow
                                                key={row.id+row.balance}
                                                customer={row}
                                                handleClick={() => handleClick(row)}
                                            />
                                        ))}

                                {notFound && <TableNoData query={searchName}/>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </Card>
        </Container>
    );
}
