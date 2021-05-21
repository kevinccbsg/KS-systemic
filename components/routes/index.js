const System = require('systemic');
const adminRoutes = require('./admin-routes');
const initRoutes = require('./api-routes');

module.exports = new System({ name: 'routes' })
  .add('routes.admin', adminRoutes())
  .dependsOn('config', 'logger', 'app', 'middleware.prepper', 'manifest')
  .add('routes.api', initRoutes())
  .dependsOn('logger', 'app')
  .add('routes')
  .dependsOn('routes.admin', 'routes.api');
