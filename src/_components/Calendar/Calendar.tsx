import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import { fetchICal} from "./CalendarSlice"
import './Calendar.css'
import {useDispatch} from "react-redux";

const Calendar = () => {

    let url = ""
    fetch('https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/NYa47j3l.shu')
        .then(response => response.blob())
        .then(blob =>
            url = URL.createObjectURL(blob)
        )

    const  style = {
        width: '66%',

        padding: '1rem',
        margin: '1rem',

        borderRadius: '1rem',
        boxShadow: '0 0 5px var(--grey)',
    }

    return(
        <>
            <div style={style}>


            </div>
        </>


    )
}
export default Calendar
