import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "../data";
import * as utilities from "./utils/functions";

const app = express();
const { PORT = 8080 } = process.env;

app.use(bodyParser.json()).use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

//DOCTORS 

app.get("/api/v1/doctors", (req, res) => res.json(data.doctors));

app.get("/api/v1/doctors/:id", (req, res) => {
  if (utilities.isInvalidId(req.params.id)) {
    return res.status(400).json({ error: "Invalid id." });
  }

  const id = parseInt(req.params.id);
  const doctor = data.doctors.find((doc) => doc.id === id);

  if (!doctor) {
    return res.status(404).json({ error: "Doctor not found." });
  }

  return res.json(doctor);
});

app.post("/api/v1/doctors", (req, res) => {
  if (!req.body.name || !req.body.specialty) {
    return res.status(400).json({ error: "Doctor needs a name and a specialty parameter." });
  }

  const nextId = data.doctors.length + 1;
  const doctor = { id: nextId, name: req.body.name, specialty: req.body.specialty };

  data.doctors.push(doctor);

  res.status(201).json(doctor);
});

//PATIENTS
app.get("/api/v1/patients/:identifier", (req, res) => {
  const identifier = req.params.identifier;

  // Check if identifier is a valid ID
  if (!isNaN(identifier)) {
    const id = parseInt(identifier);
    const patient = data.patients.find((pat) => pat.id === id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    return res.json(patient);
  }

  // If identifier is not a number, assume it's a name
  const patient = data.patients.find((pat) => pat.name.toLowerCase() === identifier.toLowerCase());

  if (!patient) {
    return res.status(404).json({ error: "Patient not found." });
  }

  return res.json(patient);
});

app.get("/api/v1/patients", (req,res) => res.json (data.patients));

//VISITS
app.get("/api/v1/visits", (req, res) => {
  const { doctorid, patientid, doctorname, patientname } = req.query;

  let visits = data.visits;

  // Filter by doctor ID if provided
  if (doctorid) {
    visits = visits.filter((visit) => visit.doctorid === parseInt(doctorid));
  }

  // Filter by patient ID if provided
  if (patientid) {
    visits = visits.filter((visit) => visit.patientid === parseInt(patientid));
  }

  // Filter by doctor name if provided
  if (doctorname) {
    visits = visits.filter((visit) => {
      const doctor = data.doctors.find((doc) => doc.id === visit.doctorid);
      return doctor.name.toLowerCase().includes(doctorname.toLowerCase());
    });
  }

    // Filter by patient name if provided
    if (patientname) {
      visits = visits.filter((visit) => {
        const patient = data.patients.find((pat) => pat.id === visit.patientid);
        return patient.name.toLowerCase().includes(patientname.toLowerCase());
      });
    }

  const result = visits.map((visit) => {
    const doctor = data.doctors.find((doc) => doc.id === visit.doctorid);
    const patient = data.patients.find((pat) => pat.id === visit.patientid);
    return {
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      visitDate: visit.date,
      patientName: patient.name,
    };
  });

  return res.json(result);
});




app.post("/api/v1/patients", (req, res) => {
  const nextId = data.patients.length + 1;
  const patient = { id: nextId, name: req.body.name };

  data.patients.push(patient);

  res.status(201).json(patient);
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
