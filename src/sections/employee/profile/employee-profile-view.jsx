import {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------
import {useSearchParams} from "react-router-dom";

import Avatar from "@mui/material/Avatar";
// eslint-disable-next-line import/order
import Grid from "@mui/material/Unstable_Grid2";
import Icon from '@mui/material/Icon';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Backdrop,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, InputLabel
} from "@mui/material";

import {logout} from "../../login/Firebase";
import {useRouter} from "../../../routes/hooks";
import useViewModel from "./viewmodel/EmployeeProfileViewModel"
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import EmployeeAppointmentModelCard from "../employee-appointment-model-card";
import EmployeeNewEventCard from "../employee-new-template-card";
import {posts} from "../../../_mock/blog";
import PostCard from "../../blog/post-card";
import {FormControl, Input, Select} from "@mui/base";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Scrollbar from "../../../components/scrollbar";
import EmployeeClassesModelCard from "../employee-classes-model-card";

export default function EmployeeProfileView() {
    const router = useRouter();

    const [searchParams] = useSearchParams();

    const employeeId = searchParams.get("employeeId")

    const [loading, setLoading] = useState(false)

    const [showCreateModelDialog, setShowCreateModelDialog] = useState({
        show: false,
        isAppointment: false
    })

    const {
        error,
        getEmployee,
        employee,
        getAppointmentModels,
        appointmentModels,
        getClassesModels,
        classesModels,
        createAppointmentModel,
        createClassModel
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
        if (!employee) {
            getEmployee(employeeId)
        }
    }, employee)

    useEffect(() => {
        if (!appointmentModels) {
            getAppointmentModels(employeeId)
        } else {
            setLoading(false)
        }
    }, appointmentModels)

    useEffect(() => {
        if (!classesModels) {
            getClassesModels(employeeId)
        } else {
            setLoading(false)
        }
    }, classesModels)

    const handleBack = () => {
        router.back()
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid>
                    <Icon fontSize="large" onClick={handleBack}>arrow_back</Icon>
                </Grid>
                <Grid>
                    <Typography variant="h4"
                                ml={3}>{employee ? `${employee.firstName} ${employee.lastName}` : 'Employee Profile'}</Typography>
                </Grid>
            </Grid>

            <Grid container xs={12} sm={6} md={12} spacing={1}>
                <Grid>
                    <Card
                        component={Stack}
                        spacing={3}
                        direction="row"
                        sx={{
                            px: 3,
                            py: 5,
                            borderRadius: 2,
                            minHeight: '100%',
                            justify: "flex-end",
                            alignItems: "center"
                        }}

                    >
                        {renderAvatar(employee)}
                        <Stack spacing={0.5}>
                            <Typography variant="caption">First name</Typography>
                            <Typography variant="subtitle1">
                                {employee?.firstName}
                            </Typography>
                            <Typography variant="caption">Last name</Typography>
                            <Typography variant="subtitle1">
                                {employee?.lastName}
                            </Typography>
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography variant="caption">Phone</Typography>
                            <Typography variant="subtitle1">
                                {employee?.phoneNumber ? employee?.phoneNumber : 'None'}
                            </Typography>
                            <Typography variant="caption">Email</Typography>
                            <Typography variant="subtitle1">
                                {employee?.email}
                            </Typography>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>

            <Stack direction="row" alignItems="start" justifyContent="start" ml={1} mb={2} mt={2}>
                <Typography variant="h5">Appointment Templates (1 on 1)</Typography>
            </Stack>

            <Grid container spacing={3}>
                {
                    appointmentModels?.map((model) => (
                        <EmployeeAppointmentModelCard appointmentModel={model} employee={employee}/>
                    ))
                }
                <EmployeeNewEventCard onClick={() => {
                    setShowCreateModelDialog(
                        {
                            show: true,
                            isAppointment: true
                        }
                    )
                }}/>
            </Grid>

            <Stack direction="row" alignItems="start" justifyContent="start" ml={1} mb={2} mt={2}>
                <Typography variant="h5">Classes Templates</Typography>
            </Stack>

            <Grid container spacing={3}>
                {
                    classesModels?.map((model) => (
                        <EmployeeClassesModelCard classModel={model} employee={employee}/>
                    ))
                }
                <EmployeeNewEventCard onClick={() => {
                    setShowCreateModelDialog(
                        {
                            show: true,
                            isAppointment: false
                        }
                    )
                }}/>
            </Grid>
            {
                renderCreateAppointmentModel(showCreateModelDialog,
                    (data) => {
                        setLoading(true)
                        if(showCreateModelDialog.isAppointment) {
                            createAppointmentModel(employeeId, data)
                        } else {
                            createClassModel(employeeId, data)
                        }

                        setShowCreateModelDialog({
                            show: false
                        })
                    },
                    () => {
                        setShowCreateModelDialog({
                            show: false,
                            isAppointment: true
                        })
                    })
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

const renderAvatar = (employee) => (
    employee ?
        <Stack spacing={0.5}>
            {employee?.avatarUrl ?
                <Avatar
                    sx={{width:'10ch', height:'10ch'}}
                    src={employee.avatarUrl}/> : <Avatar
                    {...stringAvatar(`${employee.firstName} ${employee.lastName}`)} />
            }
        </Stack> : null
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

const renderCreateAppointmentModel = (showOptions, handleSave, handleClose) => (
    <Dialog
        open={showOptions.show}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                handleSave(formJson)
            },
        }}
    >
        <DialogTitle>{showOptions.isAppointment ? 'Create Appointment Template' : 'Create Class Template'}</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                    />
                </Grid>
                <Grid container xs={12} spacing={2}>
                    <Grid xs={4}>
                        <TextField
                            label="Preparation"
                            id="preparation"
                            name="preDuration"
                            defaultValue={0}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">min</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            label="Duration"
                            id="duration"
                            required
                            name="duration"
                            defaultValue={0}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">min</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            label="After break"
                            id="postDuration"
                            name="postDuration"
                            defaultValue={0}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">min</InputAdornment>,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={2}>
                    <Grid xs={6}>
                        <TextField
                            required
                            margin="dense"
                            id="creditPrice"
                            name="creditPrice"
                            label="Price in Credits"
                            type="number"
                            fullWidth
                            variant="outlined"
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid xs={6}>
                        <TextField
                            required={!showOptions.isAppointment}
                            disabled={showOptions.isAppointment}
                            margin="dense"
                            id="capacity"
                            name="capacity"
                            fullWidth
                            label="Max Customers"
                            type="number"
                            variant="outlined"
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
        </DialogActions>
    </Dialog>
)