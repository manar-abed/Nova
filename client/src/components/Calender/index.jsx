import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  DatePicker, Button, Form, message, Calendar, Badge,
} from 'antd';
import './style.css';

const { Item } = Form;

const CalenderTab = () => {
  const [dateTime, setDateTime] = useState('');
  const [availableDates, setAvailableDates] = useState([]);

  const onOk = (value) => {
    setDateTime(value.format('YYYY-MM-DD HH'));
  };
  const postDate = async () => {
    const date = dateTime.split(' ')[0].toString();
    const time = Number(dateTime.split(' ')[1]);
    try {
      axios.post('/api/interviewer/schedule', {
        date,
        time,
      });
      message.success('date added successfully to your schedule');
    } catch ({ response: { data: { message: msg } } }) {
      message.error({ msg });
    }
  };
  const disabledDates = availableDates.length ? availableDates.map(({ date }) => date.split('T')[0]) : [];
  const disabledDate = (current) => disabledDates.find((date) => date === moment(current).format('YYYY-MM-DD'));
  // const dayArr = disabledDates.map((date) => parseInt(date.split('-')[2], 10));

  const dateFormat = (date) => (date.length === 1 ? `0${date}` : date);

  const getListData = (val) => {
    const listData = [];
    const availableDate = availableDates.map((item) => item.date.split('T')[0]);
    availableDate.map((date) => {
      if (date === `${val.year()}-${dateFormat(`${val.month() + 1}`)}-${dateFormat(`${val.date()}`)}`) {
        const availableTime = availableDates.filter((item) => item.date.split('T')[0] === date).map((item) => item.time);
        availableTime.forEach((h) => h.forEach((hour) => listData.push({ type: 'success', content: `${hour}:00` })));
      }
      return listData;
    });
    return listData;
  };

  const dateCellRender = (val) => {
    const listData = getListData(val);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAvailableDate = async () => {
      try {
        const { data: { data } } = await axios.get('/api/interview/available', {
          cancelToken: source.token,
        });
        setAvailableDates(data);
      } catch ({ response: { data: { message: msg } } }) {
        message.error(msg);
      }
    };
    getAvailableDate();

    return () => {
      source.cancel();
    };
  }, [dateTime]);

  const disabledDay = (current) => current && current < moment().endOf('day');
  return (
    <div className="calender-tab">
      <div className="timePicker">
        <Form layout="vertical" autoComplete="off" className="datepickerForm">
          <Item name="name" label="Select your available time" type="url">
            <DatePicker
              value={dateTime}
              format="YYYY-MM-DD HH"
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              disabledDate={disabledDay}
              onOk={onOk}
            />
          </Item>
          <div className="btn-save-holder">
            <Button type="primary" htmlType="submit" onClick={postDate}>
              Save
            </Button>
          </div>
        </Form>
      </div>
      <div className="dateTimeCalender-holder">
        <h3 className="dates-sec">Your Available Dates</h3>
        <div className="calenders-holder">
          <Calendar
            disabledDate={disabledDate}
            dateCellRender={dateCellRender}
          />
        </div>
      </div>
    </div>
  );
};

export default CalenderTab;
