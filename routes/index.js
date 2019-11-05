const laboratoriesRoutes = require('./laboratories')
const materialsRoutes = require('./materials')
const loansRoutes = require('./loans')

module.exports = {
    laboratories: laboratoriesRoutes,
    materials: materialsRoutes,
    loans: loansRoutes
}
