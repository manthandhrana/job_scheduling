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
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js'
  ]
}));

app.get('/', (req, res) => {
  res.status(200).send("Welcome to job scheduling site");
});


app.post('/schedule', (req, res) => {
  try {
    const { name, type, minute = 0, hour = 0, day = 0 } = req.body;

    if (!name || !type) {
      return res.status(400).send({ error: 'Missing required fields: name or type' });
    }

    let cronTime = null;

    if (type === 'hourly') {
      cronTime = { minute: parseInt(minute) };
    } else if (type === 'daily') {
      cronTime = { minute: parseInt(minute), hour: parseInt(hour) };
    } else if (type === 'weekly') {
      cronTime = { minute: parseInt(minute), hour: parseInt(hour), day: parseInt(day) };
    } else {
      return res.status(400).send({ error: 'Invalid schedule type' });
    }

    const job = {
      name,
      type,
      cronTime,
    };

    addJob(job); // From your scheduler.js
    res.send({ message: 'Job scheduled successfully!', cronTime });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error while scheduling job' });
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Scheduler running at http://localhost:${PORT}`));
