const express = require('express');
const Event = require('../models/event');

// Add Event
const addEvent =  async (req, res) => {
  const { title, description, date, time } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};

const getEventByDate = async (req, res) => {
    const { date } = req.body;
  
    try {
      const events = await Event.find({
        date: new Date(date),
      });
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch events', error });
    }
  };

  const reminder = async (req, res) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
  
    const tomorrow = new Date();
    const startOfTomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
    startOfTomorrow.setHours(0, 0, 0, 0);
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));
  
    try {
      const todayEvents = await Event.find({
        date: {
          $gte: startOfToday,
          $lte: endOfToday,
        },
      });
  
      const tomorrowEvents = await Event.find({
        date: {
          $gte: startOfTomorrow,
          $lte: endOfTomorrow,
        },
      });
  
      res.status(200).json({
        today_events: todayEvents,
        tomorrow_events: tomorrowEvents,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reminders", error });
    }
  };

module.exports = {
    addEvent,
    getEventByDate,
    reminder
}
