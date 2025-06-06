// swagger.js
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Job Scheduling API',
    version: '1.0.0',
    description: 'API for scheduling jobs',
  },
  paths: {
    '/schedule': {
      post: {
        summary: 'Schedule a new job',
        description: 'Schedule a job to run at a specific time (hourly, daily, or weekly).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/JobRequest' },
              examples: {
                hourly: {
                  summary: 'Hourly Job',
                  value: {
                    name: 'hourlyJob',
                    type: 'hourly',
                    minute: '15',
                  },
                },
                daily: {
                  summary: 'Daily Job',
                  value: {
                    name: 'dailyJob',
                    type: 'daily',
                    hour: '10',
                    minute: '30',
                  },
                },
                weekly: {
                  summary: 'Weekly Job',
                  value: {
                    name: 'weeklyJob',
                    type: 'weekly',
                    day: '0',
                    hour: '8',
                    minute: '0',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Job successfully scheduled',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    cronTime: { type: 'string' },
                  },
                },
                example: {
                  message: 'Job scheduled',
                  cronTime: '0 8 * * 0',
                },
              },
            },
          },
          '400': {
            description: 'Invalid schedule type',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
                example: {
                  error: 'Invalid schedule type',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      JobRequest: {
        type: 'object',
        required: ['name', 'type'],
        properties: {
          name: {
            type: 'string',
            description: 'Name of the job',
            example: 'myJob',
          },
          type: {
            type: 'string',
            enum: ['hourly', 'daily', 'weekly'],
            description: 'Schedule type (hourly, daily, weekly)',
          },
          minute: {
            type: 'string',
            description: 'Minute at which to run the job (0-59)',
          },
          hour: {
            type: 'string',
            description: 'Hour of day (0-23), required for daily and weekly',
          },
          day: {
            type: 'string',
            description: 'Day of week (0=Sunday, ..., 6=Saturday), required for weekly',
          },
        },
      },
    },
  },
};
