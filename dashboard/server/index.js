const app = require('./app')
const service = require('./service')

const port = process.env.DASHBOARD_PORT || 8000
const { name, version } = service.about()

const serviceName = 'LOOPMINTER_DASHBOARD_SERVER'

app.listen(port, () =>
  console.log(`[${serviceName}] ${name} v${version} started on port ${port}`)
)
