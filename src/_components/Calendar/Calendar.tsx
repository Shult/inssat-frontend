import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

import "./Calendar.css"

import {selectCalendar} from "./Calendar.slice";
import {useAppSelector} from "../../_store/hook";

const Calendar = () => {
    const calendar = useAppSelector(selectCalendar);

    return(
        <div id={"CalendarContainer"}>
            <FullCalendar
                plugins = {[ timeGridPlugin, iCalendarPlugin ]}
                initialView = 'timeGridWeek'
                events = {
                    {
                        url: calendar,
                        format: 'ics'
                    }
                }

                themeSystem = {'default'}
                eventBorderColor = {'var(--gold)'}

                slotMinTime = {'08:00'}
                slotMaxTime = {'20:30'}

                weekends = {false}
                allDaySlot = {false}

                locale={'fr'}
            />
        </div>
    )
}

export default Calendar
