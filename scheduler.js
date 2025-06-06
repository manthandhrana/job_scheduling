const cron = require('node-cron');
const fs = require('fs');

let jobs = [];

function loadJobs() {
  if (fs.existsSync('jobStorage.json')) {
    const rawData = fs.readFileSync('jobStorage.json');
    jobs = JSON.parse(rawData);

    // Schedule jobs (without task reference)
    jobs.forEach((job) => {
      scheduleJob(job);
    });
  }
}

function saveJobs() {
  // Don't include 'task' when saving to JSON
  const jobsToSave = jobs.map(({ name, type, cronTime }) => ({ name, type, cronTime }));
  fs.writeFileSync('jobStorage.json', JSON.stringify(jobsToSave, null, 2));
}

function scheduleJob(job) {
  const task = cron.schedule(job.cronTime, () => {
    const output = `[${new Date().toLocaleString()}] Hello World (Job: ${job.name})\n`;
    fs.appendFileSync('output.log', output);
    console.log(output.trim());
  });

  // Add task only in memory, not for saving
  job.task = task;
}

function addJob(job) {
  scheduleJob(job);
  jobs.push(job);
  saveJobs();
}

module.exports = {
  loadJobs,
  addJob,
};
