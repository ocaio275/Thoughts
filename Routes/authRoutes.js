const AuthRoutes = require('express').Router()

const AuthController = require('../Controllers/AuthController')

AuthRoutes.get('/login', AuthController.login)
AuthRoutes.get('/register', AuthController.register)

module.exports = AuthRoutes