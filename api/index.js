const app = require('./app')
const service = require('./service')

const port = 8001
const { name, version } = service.about()

const serviceName = 'LOOPMINTER_API'

app.listen(port, () =>
  console.log(`[${serviceName}] ${name} v${version} started on port ${port}`)
)
