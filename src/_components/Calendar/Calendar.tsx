import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import "./Calendar.css"

const Calendar = () => {

    return (
        <div>
            <FullCalendar
                plugins = {[ timeGridPlugin, iCalendarPlugin ]}
                initialView = 'timeGridWeek'
                events = {
                    {
                        url: data,
                        format: 'ics'
                    }
                }

                slotMinTime = {'07:00'}
                slotMaxTime = {'20:00'}

                weekends = {false}
                allDaySlot = {false}
            />
        </div>
    )
}


const url = "https://cors-anywhere.herokuapp.com/" +
    "https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/NYa47j3l.shu"

async function getContent (remoteURL: string) {
    const response = await fetch(remoteURL, {headers: {"X-Requested-With": "XMLHttpRequest"}})
    const blob = await response.blob()
    return blob
}

function fromBlobToString (blob: Blob) {
    return URL.createObjectURL(blob)
}

const data = fromBlobToString(await getContent(url))


export default Calendar
