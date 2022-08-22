const ThoughtsRoutes = require('express').Router()

// --- Controller ---//
const ThoughtController = require('../Controllers/ThoughtController')

//helpers
const checkAuth = require('../helpers/auth').checkAuth

ThoughtsRoutes.get('/add', checkAuth, ThoughtController.createThought)
ThoughtsRoutes.post('/add', checkAuth, ThoughtController.createThoughtSave)
ThoughtsRoutes.get('/edit/:id', checkAuth, ThoughtController.updateThought)
ThoughtsRoutes.post('/edit', checkAuth, ThoughtController.updateThoughtSave)
ThoughtsRoutes.get('/dashboard', checkAuth, ThoughtController.dashboard)
ThoughtsRoutes.post('/remove', checkAuth, ThoughtController.removeThought)
ThoughtsRoutes.get('/', ThoughtController.showThoughts)

module.exports = ThoughtsRoutes