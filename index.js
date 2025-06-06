const express = require('express');
const bodyParser = require('body-parser');
const { loadJobs, addJob } = require('./scheduler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const app = express();


app.use(bodyParser.json());
app.use(express.json());

loadJobs();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
res.status(200).send("Welcome to job scheduling site")
})
app.post('/schedule', (req, res) => {
  const { name, type, minute, hour, day } = req.body;

  let cronTime = '';

  if (type === 'hourly') {
    cronTime = `${minute} * * * *`;
  } else if (type === 'daily') {
    cronTime = `${minute} ${hour} * * *`;
  } else if (type === 'weekly') {
    cronTime = `${minute} ${hour} * * ${day}`;
  } else {
    return res.status(400).send({ error: 'Invalid schedule type' });
  }

  const job = {
    name,
    type,
    cronTime,
  };

  addJob(job);
  res.send({ message: 'Job scheduled', cronTime });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Scheduler running on http://localhost:${PORT}`));
