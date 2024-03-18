import {useState} from "react";

import _ from "lodash";
import EmployeeService from "../../../domain/EmployeeService";

export default function CalendarViewModel() {

    const [error, setError] = useState(null);
    const [trainers, setTrainers] = useState(null)
    const [classModels, setClassModels] = useState(new Map())
    const [calendars, setCalendars] = useState(new Map())

    function getTrainers() {
        EmployeeService.getTrainers().then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setTrainers(_.sortBy(result.data, "firstName"))
            } else {
                setError(result.error)
            }
        })
    }

    function getCalendars(trainersId) {
        let ids = trainersId

        if(!(trainersId instanceof Array)) {
            ids = []
            ids.push(trainersId)
        }

        ids.forEach((trainerId) => {
            EmployeeService.getEmployeeCalendar(trainerId).then((result) => {
                if(result.isResponseCodeSuccessful()) {
                    setCalendars(addToMap(calendars, trainerId, result.data))
                } else {
                    setError(result.error)
                }
            })
        })
    }

    function getClassModels(trainersId) {
        let ids = trainersId

        if(!(trainersId instanceof Array)) {
            ids = []
            ids.push(trainersId)
        }

        ids.forEach((trainerId) => {
            EmployeeService.getEmployeeClassModels(trainerId).then((result) => {
                if(result.isResponseCodeSuccessful()) {
                    setCalendars(addToMap(calendars, trainerId, result.data))
                } else {
                    setError(result.error)
                }
            })

            EmployeeService.getEmployeeAppointmentModels(trainerId).then((result) => {
                if(result.isResponseCodeSuccessful()) {
                    setCalendars(addToMap(calendars, trainerId, result.data))
                } else {
                    setError(result.error)
                }
            })
        })
    }

    function addToMap(map, key, newItem) {
        map[key] = newItem
        return new Map(map)
    }

    return {
        error, trainers, getTrainers, calendars, getCalendars, classModels, getClassModels
    }
}