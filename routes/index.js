const laboratoriesRoutes = require('./laboratories')
const materialsRoutes = require('./materials')
const loansRoutes = require('./loans')
const authRoutes = require('./authentication')

module.exports = {
    auth: authRoutes,
    laboratories: laboratoriesRoutes,
    materials: materialsRoutes,
    loans: loansRoutes
}
