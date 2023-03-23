import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Grid, GridItem } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import { Checkbox } from "@chakra-ui/react";
import { createEventId } from "../event-utils";

function Jadwal() {
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const btnRef = React.useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [seletedInfo, setSelectedInfo] = useState(null);

  const [initialForm, setInitialForm] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
  });

  const [initialFormNewEvent, setInitialFormNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: true,
  });

  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState({
    events: [],
  });
  const [oneDaysCheck, setOneDaysCheck] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    setOpenModal(true);
    setSelectedInfo(selectInfo);
  };

  function handleEventClick(eventClickInfo) {
    setStartDate(eventClickInfo.event.start);
    setEndDate(eventClickInfo.event.end);
    setSelectedEvent(eventClickInfo.event);
    setInitialForm({
      title: eventClickInfo.event.title,
    });
    setOpenDrawer(true);
  }

  const onClose = () => {
    setOpenDrawer(false);
    setSelectedEvent(null);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const deleteEvent = () => {
    selectedEvent.remove();
    const tempArray = JSON.parse(localStorage.getItem("events"));
    const index = tempArray.findIndex((obj) => obj.id === selectedEvent.id);
    tempArray.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(tempArray));
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (localStorage.getItem("events") !== null) {
      const dataEvents = JSON.parse(localStorage.getItem("events"));
      setEvents({ events: dataEvents , eventColor: 'blue'});
    }
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
        }}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        events={events}
      />
      <Drawer
        isOpen={isOpenDrawer}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="top"
      >
        <DrawerOverlay />
        <Formik
          initialValues={initialForm}
          onSubmit={(values) => {
            const tempArray = JSON.parse(localStorage.getItem("events"));
            const index = tempArray.findIndex(
              (obj) => Number(obj.id) === Number(selectedEvent.id)
            );
            if (oneDaysCheck) {
              tempArray[index] = {
                id: Number(selectedEvent.id),
                title: values.title,
                start: startDate,
                end: null,
                allDay: true,
              };
            } else {
              tempArray[index] = {
                id: Number(selectedEvent.id),
                title: values.title,
                start: startDate,
                end: endDate,
                allDay: true,
              };
            }

            localStorage.setItem("events", JSON.stringify(tempArray));
            setEvents({ events: tempArray , eventColor: 'blue'});
            setOpenDrawer(false);
          }}
        >
          {() => (
            <Form>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>
                <DrawerBody>
                  <Field name="title">
                    {({ field }) => <Input {...field} placeholder="title" />}
                  </Field>
                  <Checkbox
                    isChecked={oneDaysCheck}
                    onChange={(e) => setOneDaysCheck(!oneDaysCheck)}
                  >
                    One Day
                  </Checkbox>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <div>
                      Start Day
                      <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={date}
                        onChange={(date) => {
                          const year = date.getFullYear();
                          const month = (date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0");
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const formattedDate = `${year}-${month}-${day}`;
                          setStartDate(formattedDate);
                        }}
                        showTimeSelect={false}
                      />
                    </div>
                    <div>
                    End Day
                    <DatePicker
                      selected={date}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect={false}
                      disabled={oneDaysCheck}
                    />
                    </div>
                  </Grid>
                  <div></div>
                  <div>
                    
                  </div>
                </DrawerBody>

                <DrawerFooter>
                  <Button colorScheme="red" onClick={deleteEvent}>
                    Delete
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                  <Button type="submit" colorScheme="blue">
                    Submit
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Form>
          )}
        </Formik>
      </Drawer>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialFormNewEvent}
            onSubmit={(values) => {
              const calendarApi = seletedInfo.view.calendar;
              let dataEvents = [];
              calendarApi.unselect();
              const id = createEventId();
              if (values.title) {
                  if (localStorage.getItem("events") !== null) {
                    dataEvents = JSON.parse(localStorage.getItem("events"));
                  }
                  dataEvents.push({
                    id: id,
                    title: values.title,
                    start: seletedInfo.startStr,
                    end: seletedInfo.endStr,
                    allDay: seletedInfo.allDay,
                  });
                  localStorage.setItem("events", JSON.stringify(dataEvents));
                  setEvents({ events: dataEvents , eventColor: '#378006'});
                  setOpenModal(false);
                }
            }}
            >
              {() => (
                <Form>
                  <Field name="title">
                    {({ field }) => <Input {...field} placeholder="title"/>}
                  </Field>
                  <Button type="submit" colorScheme="blue">
                    Submit
                  </Button>
                </Form>
              )}

            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
export default Jadwal;
