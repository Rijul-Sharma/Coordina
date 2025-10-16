
import express from 'express';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import managerRoutes from './routes/managerRoutes.js';
const app = express();
const port = 3000;

app.use(express.json());


const uri = "mongodb://localhost:27017/coordina"; // Replace with your MongoDB connection string

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use('/api/projects', projectRoutes);

app.use('/api/employees', employeeRoutes);

app.use('/api/managers', managerRoutes); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/not-found', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
