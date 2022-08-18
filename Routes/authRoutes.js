const AuthRoutes = require('express').Router()

const AuthController = require('../Controllers/AuthController')

AuthRoutes.get('/login', AuthController.login)
AuthRoutes.get('/register', AuthController.register)
AuthRoutes.post('/register', AuthController.registerPost)

module.exports = AuthRoutes