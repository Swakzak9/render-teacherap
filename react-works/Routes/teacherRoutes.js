import express from 'express';
import { Router } from "express";
import Teacher from '../Models/teacherModels.js';

const route = Router();



route.get('/api/v1/teacher', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});


route.post('/api/v1/teacher', async (req, res) => {
  const { name, subject, email } = req.body;

  if (!name || !subject || !email) {
    return res.status(400).json({ err: "All fields are required." });
  }

  try {
    const newTeacher = new Teacher({ name, subject, email });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});



export default route;
