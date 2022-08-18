const ThoughtsRoutes = require('express').Router()

// --- Controller ---//
const ThoughtController = require('../Controllers/ThoughtController')

ThoughtsRoutes.get('/', ThoughtController.showThoughts)

module.exports = ThoughtsRoutes