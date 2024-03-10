import {useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
import useViewModel from "./viewmodels/EmployeesViewModel"
import Grid from "@mui/material/Unstable_Grid2";
import {logout} from "../login/Firebase";
import {useRouter} from "../../routes/hooks";

export default function CalendarView() {
    const router = useRouter();

    const {error, employees, getAll} = useViewModel()

    useEffect(() => {
        console.log(`Error: ${JSON.stringify(error)}`)
        if (error !== null && error.code === 401) {
            // Back to login
            logout()
            router.push("/")
        }
    }, [error])

    useEffect(() => {
        if (!employees) {
            getAll()
        }
    }, [employees])

    const handleClick = (customer) => {
        router.push(`/customer-profile?customerId=${customer.id}`)
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Calendar</Typography>
            </Stack>

            <Grid container spacing={3}>
                <h1>Hello</h1>
            </Grid>
        </Container>
    );
}
