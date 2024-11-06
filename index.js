const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const HospitalRoutes = require("./routes/Hospital");
const ClinicRoutes = require("./routes/Clinic");
const PatientRoutes = require("./routes/Patient");
const DoctorRoutes = require("./routes/Doctor");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin:
      "https://hospital-management-client-main-git-main-kreatboxs-projects.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "true");
  next();
});

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

app.use("/api/hospital", HospitalRoutes);
app.use("/api/clinic", ClinicRoutes);
app.use("/api/patient", PatientRoutes);
app.use("/api/doctor", DoctorRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Hospital Management API. Use the /api/ endpoints to interact."
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
