import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import { fetchICal} from "./CalendarSlice"
import './Calendar.css'
import {useDispatch} from "react-redux";

const Calendar = () => {

    const dispatch = useDispatch()
    console.log(dispatch(fetchICal()))

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
                <FullCalendar
                    plugins = {[ timeGridPlugin, iCalendarPlugin ]}
                    initialView = 'timeGridWeek'
                    events = {
                        {
                            // url: 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/NYa47j3l.shu',
                            url: 'http://localhost:3000/_helpers/test.ics',
                            // url: ,
                            format: 'ics'
                        }
                    }

                    themeSystem={'default'}
                    eventBackgroundColor = {'var(--grey)'}
                    eventBorderColor = {'var(--gold)'}

                    slotMinTime = {'07:00'}
                    slotMaxTime = {'20:00'}

                    weekends = {false}
                    allDaySlot = {false}
                />
            </div>
        </>


    )
}
export default Calendar
