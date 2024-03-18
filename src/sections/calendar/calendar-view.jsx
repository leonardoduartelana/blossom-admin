import {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
import useViewModel from "./viewmodels/CalendarViewModel"
import Grid from "@mui/material/Unstable_Grid2";
import {logout} from "../login/Firebase";
import {useRouter} from "../../routes/hooks";
import TrainerCalendarView from "./trainer-calendar-view";
import {Select, InputLabel, FormControl} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function CalendarView() {
    const router = useRouter();

    const {error, trainers, getTrainers, calendars, getCalendars, classModels, getClassModels} = useViewModel()

    const [selectedTrainers, setSelectedTrainers] = useState([])
    const [selectedClassModel, setSelectedClassModel] = useState(null)

    useEffect(() => {
        console.log(`Error: ${JSON.stringify(error)}`)
        if (error !== null && error.code === 401) {
            // Back to login
            logout()
            router.push("/")
        }
    }, [error])

    useEffect(() => {
        if (!trainers) {
            getTrainers()
        }
    }, [trainers])

    useEffect(() => {
        getCalendars(selectedTrainers)
        getClassModels(selectedTrainers)
    }, [selectedTrainers])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTrainers(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const findEmployeeName = (employeeId) => trainers[employeeId].firstName

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Calendar</Typography>
            </Stack>
            <Stack>
                <FormControl fullWidth>
                    <InputLabel>Trainer</InputLabel>
                    <Select
                        multiple
                        value={selectedTrainers}
                        onChange={handleChange}
                        input={<OutlinedInput label="Trainer" />}
                    >
                        {trainers?.map((trainer) => (
                            <MenuItem
                                key={trainer.id}
                                value={trainer.id}>
                                {trainer.firstName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Class Template</InputLabel>
                    <Select
                        value={selectedClassModel}
                        onChange={(event) => {
                            setSelectedClassModel(event.target.value)
                        }}
                        input={<OutlinedInput label="Class Template" />}
                    >
                        {
                            classModels ?
                                [...classModels].map((classModel) => (
                                    <MenuItem
                                        key={classModel.id}
                                        value={classModel.id}>
                                        {`${findEmployeeName(classModel.employeeId)} - ${classModel.name}`}
                                    </MenuItem>
                                )) : null
                        }
                    </Select>
                </FormControl>
            </Stack>
            <Grid container spacing={3} mt={3}>

                <TrainerCalendarView calendars={calendars}/>
            </Grid>
        </Container>
    );
}
