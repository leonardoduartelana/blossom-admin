import {Helmet} from 'react-helmet-async';
import {CalendarView} from "../sections/calendar";

// ----------------------------------------------------------------------

export default function CalendarPage() {
    return (
        <>
            <Helmet>
                <title> Calendar </title>
            </Helmet>

            <CalendarView/>
        </>
    );
}
