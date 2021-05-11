module.exports = {
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
  slack: {
    webhookURL: process.env.SLACK_URL,
  },
  routes: {
    admin: {
      openAPIOptions: {
        info: {
          description: 'Documentation for Systemic example API',
          title: 'Systemic KS API',
          version: '1.0.0',
          contact: {
            name: 'GuideSmiths',
            email: 'hello@guidesmiths.com',
          },
        },
        servers: [],
        security: {
          JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
          },
        },
        baseDir: process.cwd(),
        swaggerUIPath: '/docs/api',
        filesPattern: [
          './components/routes/**-routes.js',
        ],
      },
    },
  },
  logger: {
    transport: 'console',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'service',
    ],
    exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
  },
};
