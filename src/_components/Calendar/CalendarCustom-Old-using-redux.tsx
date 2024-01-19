import React, { useState } from 'react';
import './CalendarCustom.css'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import { Card, Modal } from 'react-bootstrap'; // Import React Bootstrap components

import {loadCalendar, selectCalendar} from './Calendar.slice';
import { useAppDispatch, useAppSelector } from '../../_store/hook';
import frLocale from '@fullcalendar/core/locales/fr';


const CalendarCustom = ({ calendarType = 'timeGridWeek', Height = "100vh"}) => {
  const initialView = calendarType;

  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();
  dispatch(loadCalendar())

  const currentDate = new Date(); // Get the current date

  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    console.log(clickInfo.event)
    setShowEventDetails(true);
  };
  const handleClose = () => setShowEventDetails(false);


  return (
      <Card style={{ padding: '20px', boxShadow: 'var(--box-shadow)', border: 0 }}>
        <Card.Body>
          <FullCalendar
              plugins={[timeGridPlugin, iCalendarPlugin]}
              initialView={initialView}
              initialDate={currentDate.toISOString().split('T')[0]}
              events={{
                url: calendar,
                format: 'ics',
              }}
              themeSystem="default"
              eventBorderColor="var(--gold)"
              slotMinTime="08:00"
              slotMaxTime="20:00"
              weekends={false}
              allDaySlot={false}

              locales={[frLocale]} // Set the French locale
              locale="fr" // Set the locale to French

              eventClick={handleEventClick} // Add the event click handler
              
          />

          <Modal show={showEventDetails} onClick={handleClose} onHide={handleClose}>
            <Modal.Header closeButton  >
              <Modal.Title>Détails</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEvent && (
                  <div>
                    <p><strong>Titre</strong> : {selectedEvent.title}</p>
                    <p><strong>Description</strong> : {selectedEvent.extendedProps.description}</p>
                    <p><strong>Salle.s</strong> : {selectedEvent.extendedProps.location}</p>
                    {/* Add other event details you want to display */}
                  </div>
              )}
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
  );
};

export default CalendarCustom;
