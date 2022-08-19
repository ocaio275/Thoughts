const ThoughtsRoutes = require('express').Router()

// --- Controller ---//
const ThoughtController = require('../Controllers/ThoughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

ThoughtsRoutes.get('/add', checkAuth, ThoughtController.createThought)
ThoughtsRoutes.get('/dashboard', checkAuth, ThoughtController.dashboard)
ThoughtsRoutes.get('/', ThoughtController.showThoughts)

module.exports = ThoughtsRoutes