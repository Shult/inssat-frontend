import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

import "./Calendar.css"

import {deleteCalendar, selectCalendar} from "./Calendar.slice";
import {useAppDispatch, useAppSelector} from "../../_store/hook";
import {useState} from "react";
import {EMPTY_URL} from "./Calendar.const";

const Calendar = () => {
    const calendar = useAppSelector(selectCalendar);
    const dispatch = useAppDispatch();
    const [remoteURL, setURL] = useState("");
    const currentURL = String(remoteURL) || EMPTY_URL

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

                slotMinTime = {'07:00'}
                slotMaxTime = {'21:00'}

                weekends = {false}
                allDaySlot = {false}

                height={'100%'}
                locale={"fr"}
            />
            <div>
                <input
                    aria-label="Set remote URL"
                    value={currentURL}
                    onChange={(e) => setURL(e.target.value)}
                />
                <button className={"buttonError"} onClick={() => dispatch(deleteCalendar())} >
                    Supprimer calendrier
                </button>
            </div>
        </div>
    )
}

export default Calendar
