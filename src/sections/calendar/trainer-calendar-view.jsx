import {useRouter} from "../../routes/hooks";
import {useEffect} from "react";
import {logout} from "../login/Firebase";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {CalendarRoot} from "@fullcalendar/core/internal";
import interactionPlugin from "@fullcalendar/interaction"
import {FormControl, Select} from "@mui/base";
import {InputLabel} from "@mui/material";

export default function TrainerCalendarView() {
    const router = useRouter();

    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    // useEffect(() => {
    //     console.log(`Error: ${JSON.stringify(error)}`)
    //     if (error !== null && error.code === 401) {
    //         // Back to login
    //         logout()
    //         router.push("/")
    //     }
    // }, [error])


    return (
        <Container>
            <FullCalendar
                plugins={[ dayGridPlugin,timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={[
                    { title: '1:1 Jialu <> Jerry', date: '2024-03-18 10:00:00', color:'purple'},
                    { title: '1:1 Tina <> Ada', date: '2024-03-18 10:00:00', color:'green' }
                ]}
            />
        </Container>
    );
}
