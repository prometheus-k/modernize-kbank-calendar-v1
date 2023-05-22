import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Typography,
} from '@mui/material';
import { Calendar, momentLocalizer,Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ko from 'date-fns/locale/ko';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import "moment/locale/ko";
import Events from '../../../src/EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import PageContainer from '../../../src/components/container/PageContainer';
import Breadcrumb from '../../../src/layouts/full/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '../../../src/components/shared/BlankCard';

const DnDCalendar = withDragAndDrop(Calendar);
moment.locale('ko-KR');
const localizer = momentLocalizer(moment);

type EvType = {
  id: Number;
  title: string;  
  participant: string;  
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

const BigCalendar = () => {
  const [calevents, setCalEvents] = React.useState<any>();
  //const [calevents, setCalEvents] = useState<any>();
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/events');
        const newEvents = response.data.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setCalEvents(newEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [participant, setParticipant] = React.useState<string>('');
  const [allDay, setAllDay] = React.useState<boolean>(false);
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>('default');
  const [update, setUpdate] = React.useState<EvType | undefined | any>();  

  const ColorVariation = [
    {
      id: 1,
      eColor: '#1a97f5',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#39b69a',
      value: 'green',
    },
    {
      id: 3,
      eColor: '#fc4b6c',
      value: 'red',
    },
    {
      id: 4,
      eColor: '#615dff',
      value: 'azure',
    },
    {
      id: 5,
      eColor: '#fdd43f',
      value: 'warning',
    },
  ];

  //최초 등록을 위한 팝업
  const addNewEventAlert = (slotInfo: EvType) => {
    console.log("addNewEventAlert");
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  
  //등록후 변경을 위한 팝업
  const editEvent = async (event: any) => {
    console.log("editEvent");
    try {
      const response = await axios.get(`http://localhost:8080/events/${event.id}`);
      const newEditEvent = response.data;
      //const newEditEvent = calevents.find((elem: EvType) => elem.title === event.title);    
      setColor(event.color);
      setTitle(newEditEvent.title);
      setParticipant(newEditEvent.participant);      
      setColor(newEditEvent.color);
      setStart(newEditEvent.start);
      setEnd(newEditEvent.end);
      setUpdate(event);
    } catch (error) {
      console.error('Failed to fetch the event:', error);
    }
    setOpen(true);
  };
  
  //업데이트 및 삭제는 추가 업데이트 재호출
  const updateEvent = async (e: any) => {    
    console.log("updateEvent");
    e.preventDefault();

    try {
      const updatedEvent = {
        title,
        participant,
        start: new Date(start), // convert to Date object
        end: new Date(end), // convert to Date object
        color,
      };
  
      await axios.put(`http://localhost:8080/events/${update.id}`, updatedEvent);
  
      setCalEvents(
        calevents.map((elem: EvType) => {
          if (elem.title === update.title) {
            return { ...elem, title, participant, start, end, color };
          }
          return elem;
        }),
      );
    } catch (error) {
      console.error('Failed to update the event:', error);
    }
    

    setOpen(false);
    setTitle('');
    setParticipant('');
    setAllDay(false);
    setColor('');
    setStart('');
    setEnd('');
    setUpdate(null);
  };
  
  const onEventDrop = async ({ event, start, end, allDay }: any) => {
    console.log(start, end);
      try {
        const updatedEvent = {
          ...event,
          start,
          end,
          allDay
        };

        await axios.put(`http://localhost:8080/events/${updatedEvent.id}`, updatedEvent);

      setCalEvents(
        calevents.map((elem: EvType) => {
          if (elem.title === update.title) {
            return { ...elem, title, participant, start, end, color };
          }
          return elem;
        }),
      );
    } catch (error) {
      console.error('이벤트 업데이트에 실패했습니다:', error);
    }
  };

  const onEventResize = async ({ event, start, end, allDay }: any) => {
    console.log(start, end);
    try {
      const updatedEvent = {
        ...event,
        start,
        end,
        allDay
      };

      await axios.put(`http://localhost:8080/events/${update.id}`, updatedEvent);

      setCalEvents(
        calevents.map((elem: EvType) => {
          if (elem.title === update.title) {
            return { ...elem, title, participant, start, end, color };
          }
          return elem;
        }),
      );
    } catch (error) {
      console.error('이벤트 업데이트에 실패했습니다:', error);
    }
  };

  const inputChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const inputChangeParticipantHandler = (e: React.ChangeEvent<HTMLInputElement>) => setParticipant(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);
  
  //이벤트 등록
  const submitHandler = async (e: React.ChangeEvent<any>) => {        
    console.log("addNew");
    e.preventDefault();
    try {
      const newEvent = {
        title,
        participant,
        start: new Date(start), // convert to Date object
        end: new Date(end), // convert to Date object
        color,
      };
  
      const response = await axios.post('http://localhost:8080/events', newEvent);
      const createdEvent = response.data;
      console.info(createdEvent);
      setCalEvents([...calevents, createdEvent]);
    } catch (error) {
      console.error('Failed to create the event:', error);
    }
    setOpen(false);
    e.target.reset();
    setTitle('');
    setParticipant('');
    setAllDay(false);
    setStart(new Date());
    setEnd(new Date());

    // const newEvents = calevents;
    // newEvents.push({
    //   title,
    //   start,
    //   end,
    //   color,
    // });
    // setOpen(false);
    // e.target.reset();
    // setCalEvents(newEvents);
    // setTitle('');
    // setStart(new Date());
    // setEnd(new Date());
  };

  const deleteHandler = async (event: EvType) => {
       console.log("deleteHandler");
    try {
      // Remove the event from the local state if the server deletion was successful
      const updatedCalEvents = calevents.filter((ind: EvType) => ind.id !== event.id);
      setCalEvents(updatedCalEvents);
      // Send a DELETE request to the server
      await axios.delete(`http://localhost:8080/events/${event.id}`);

    } catch (error) {
      console.error('Failed to delete the event:', error);
    }
  };

  const handleClose = () => {
    // eslint-disable-line newline-before-return
    setOpen(false);
    setTitle('');
    setParticipant('');
    setAllDay(false);
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    console.log("eventPropGetter");
    console.log(event);
    if (event.color) {
      return { className: `event-${event.color}` };
    }

    return { className: `event-default` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };


  return (
    <PageContainer>
      <Breadcrumb title="예약관리" subtitle="학습신청" />
      <BlankCard>
        {/* ------------------------------------------- */}
        {/* Calendar */}
        {/* ------------------------------------------- */}
        <CardContent>     
          <DnDCalendar
            selectable={true}
            events={calevents}
            defaultView={Views.MONTH}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            localizer={localizer}
            style={{ height: 'calc(100vh - 350px' }}
            resizable
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}            
            onSelectEvent={(event) => editEvent(event)}
            onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
            eventPropGetter={(event: any) => eventColors(event)}            
          />          
        </CardContent>
      </BlankCard>
      {/* ------------------------------------------- */}
      {/* Add Calendar Event Dialog */}
      {/* ------------------------------------------- */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <form onSubmit={update ? updateEvent : submitHandler}>
          <DialogContent>
            {/* ------------------------------------------- */}
            {/* Add Edit title */}
            {/* ------------------------------------------- */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              {update ? 'Update Event' : 'Add Event'}
            </Typography>
            <Typography mb={3} variant="subtitle2">
              {!update
                ? 'To add Event kindly fillup the title and choose the event color and press the add button'
                : 'To Edit/Update Event kindly change the title and choose the event color and press the update button'}
              {slot?.title}
            </Typography>

            <TextField
              id="Event Title"
              placeholder="Enter Event Team"
              variant="outlined"
              fullWidth
              label="Event Team"
              value={title}
              sx={{ mb: 3 }}
              onChange={inputChangeTitleHandler}
            />
            <TextField
              id="Event Participant"
              placeholder="Enter Event Participant"
              variant="outlined"
              fullWidth
              label="Event Participant"
              value={participant}
              sx={{ mb: 3 }}
              onChange={inputChangeParticipantHandler}
            />
            {/* ------------------------------------------- */}
            {/* Selection of Start and end date */}
            {/* ------------------------------------------- */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
              <DateTimePicker
                label="Start Date"
                inputFormat={"yyyy/MM/dd:hh:mm:ss a"}
                value={start}
                onChange={handleStartChange}
                renderInput={(params: any) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
              />
              <DateTimePicker
                label="End Date"                
                inputFormat={"yyyy/MM/dd:hh:mm:ss a"}
                value={end}
                onChange={handleEndChange}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mb: 3 }}
                    error={start > end}
                    helperText={start > end ? 'End date must be later than start date' : ''}
                  />
                )}
              />
            </LocalizationProvider>

            {/* ------------------------------------------- */}
            {/* Calendar Event Color*/}
            {/* ------------------------------------------- */}
            <Typography variant="h6" fontWeight={600} my={2}>
              Select Event Color
            </Typography>
            {/* ------------------------------------------- */}
            {/* colors for event */}
            {/* ------------------------------------------- */}
            {ColorVariation.map((mcolor) => {
              return (
                <Fab
                  color="primary"
                  style={{ backgroundColor: mcolor.eColor }}
                  sx={{
                    marginRight: '3px',
                    transition: '0.1s ease-in',
                    scale: mcolor.value === color ? '0.9' : '0.7',
                  }}
                  size="small"
                  key={mcolor.id}
                  onClick={() => selectinputChangeHandler(mcolor.value)}
                >
                  {mcolor.value === color ? <IconCheck width={16} /> : ''}
                </Fab>
              );
            })}
          </DialogContent>
          {/* ------------------------------------------- */}
          {/* Action for dialog */}
          {/* ------------------------------------------- */}
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>Cancel</Button>

            {update ? (
              <Button
                type="submit"
                color="error"
                variant="contained"
                onClick={() => deleteHandler(update)}
              >
                Delete
              </Button>
            ) : (
              ''
            )}
            <Button type="submit" disabled={!title} variant="contained">
              {update ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogActions>
          {/* ------------------------------------------- */}
          {/* End Calendar */}
          {/* ------------------------------------------- */}
        </form>
      </Dialog>
    </PageContainer>
  );
};

export default BigCalendar;
