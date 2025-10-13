import express from 'express';
import projectRoutes from './routes/projectRoutes.js';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
