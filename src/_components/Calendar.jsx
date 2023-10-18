import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
const Calendar = () => {
    return(
        <FullCalendar
            plugins={[ dayGridPlugin, iCalendarPlugin ]}
            initialView="dayGridWeek"
            weekends={false}
            events={
                {
                    url: fetch(
                        'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/M3MREkYB.shu',
                        {mode: "no-cors"}
                    ),
                    format: 'ics'
                }
            }
        />
    )
}
export default Calendar
