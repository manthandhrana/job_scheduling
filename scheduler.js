const fs = require('fs');

let jobs = [];

/* Load jobs from the file */
function loadJobs() {
  if (fs.existsSync('jobStorage.json')) {
    const rawData = fs.readFileSync('jobStorage.json');
    jobs = JSON.parse(rawData);
  }
}

/* Save jobs to jobStorage.json */
function saveJobs() {
  const jobsToSave = jobs.map(({ name, type, schedule }) => ({ name, type, schedule }));
  fs.writeFileSync('jobStorage.json', JSON.stringify(jobsToSave, null, 2));
}

/* Add a new job and save it */
function addJob(job) {
  jobs.push(job);
  saveJobs();
}


function runScheduler() {
  setInterval(() => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    jobs.forEach((job) => {
      const { type, schedule } = job;
      let shouldRun = false;

      if (type === 'hourly') {
        shouldRun = Number(schedule.minute) === currentMinute;
      } else if (type === 'daily') {
        shouldRun = Number(schedule.minute) === currentMinute && Number(schedule.hour) === currentHour;
      } else if (type === 'weekly') {
        shouldRun =
          Number(schedule.minute) === currentMinute &&
          Number(schedule.hour) === currentHour &&
          Number(schedule.day) === currentDay;
      }

      if (shouldRun) {
        const output = `[${now.toLocaleString()}] Hello World (Job: ${job.name})\n`;
        fs.appendFileSync('output.log', output);
        console.log(output.trim());
      }
    });
  }, 60 * 1000); // Run every 60 seconds
}

module.exports = {
  loadJobs,
  addJob,
  runScheduler,
};
