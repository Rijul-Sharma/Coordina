import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/coordina'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err)
  process.exit(1)
})
