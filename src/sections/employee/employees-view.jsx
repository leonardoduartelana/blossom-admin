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

import useViewModel from "./viewmodels/EmployeesViewModel"
import {posts} from "../../_mock/blog";
import PostCard from "../blog/post-card";
import Grid from "@mui/material/Unstable_Grid2";
import {logout} from "../login/Firebase";
import {useRouter} from "../../routes/hooks";
import EmployeeCard from "./employee-card";

export default function EmployeesView() {
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
        if(!employees) {
            getAll()
        }
    }, [employees])

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Employees</Typography>
            </Stack>

            <Grid container spacing={3}>
                {employees?.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                ))}
            </Grid>
        </Container>
    );
}
