import React, { useState } from 'react';
import './CalendarCustom.css'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import { Card, Form, Button, Modal } from 'react-bootstrap'; // Import React Bootstrap components

import { deleteCalendar, selectCalendar } from './Calendar.slice';
import { useAppDispatch, useAppSelector } from '../../_store/hook';
import { EMPTY_URL } from './Calendar.const';
import frLocale from '@fullcalendar/core/locales/fr'; // Import French locale


const CalendarCustom = ({ calendarType }: { calendarType: string}) => {
  const initialView = calendarType || 'timeGridWeek';

  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();
  const [remoteURL, setURL] = useState('');
  const currentURL = String(remoteURL) || EMPTY_URL;

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
    <Card style={{ padding: '20px', boxShadow: 'var(--box-shadow)', border: 0, marginBottom:'15px' }}>
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
          slotMaxTime="21:00"
          weekends={false}
          allDaySlot={false}
          
          locales={[frLocale]} // Set the French locale
          locale="fr" // Set the locale to French

          eventClick={handleEventClick} // Add the event click handler

        />
        <div>
          <Form.Control
            aria-label="Set remote URL"
            value={currentURL}
            onChange={(e) => setURL(e.target.value)}
          />
          <Button variant="danger" onClick={() => dispatch(deleteCalendar())}>
            Supprimer calendrier
          </Button>
        </div>

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
