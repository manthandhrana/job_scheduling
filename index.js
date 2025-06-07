const express = require('express');
const { loadJobs, addJob, runScheduler } = require('./scheduler');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const path = require('path');
const fs = require('fs');
const swaggerDocument = require('./swagger'); // If you have a swagger.js or YAML loader
const app = express();

app.use(bodyParser.json());
app.use(express.json());

loadJobs();
runScheduler();
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui-dist')));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCssUrl: '/swagger-ui/swagger-ui.css',
  customJs: '/swagger-ui/swagger-ui-bundle.js'
}));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to job scheduling site");
});


app.post('/schedule', (req, res) => {
  const { name, type, minute, hour, day } = req.body;

  if (!name || !type) {
    return res.status(400).send({ error: 'Missing required job name or type' });
  }

  let cronTime = '';
  let schedule = {};

  if (type === 'hourly') {
    if (minute === undefined) return res.status(400).send({ error: 'Minute required for hourly job' });

    cronTime = `${minute} * * * *`;
    schedule = { minute };
  } else if (type === 'daily') {
    if (minute === undefined || hour === undefined) {
      return res.status(400).send({ error: 'Hour and minute required for daily job' });
    }

    cronTime = `${minute} ${hour} * * *`;
    schedule = { minute, hour };
  } else if (type === 'weekly') {
    if (minute === undefined || hour === undefined || day === undefined) {
      return res.status(400).send({ error: 'Day, hour and minute required for weekly job' });
    }

    cronTime = `${minute} ${hour} * * ${day}`;
    schedule = { minute, hour, day };
  } else {
    return res.status(400).send({ error: 'Invalid schedule type' });
  }

  const job = {
    name,
    type,
    schedule,
    cronTime, // store for display/debug purpose
  };

  addJob(job);
  res.send({ message: 'Job scheduled successfully', cronTime, schedule });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Scheduler running at http://localhost:${PORT}`));
