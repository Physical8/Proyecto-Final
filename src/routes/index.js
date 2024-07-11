const express = require('express')
const motosRouter = require('./motogp/motos.router')
const pilotosRouter = require('./motogp/pilotos.router')
const relacionRouter = require('./motogp/motoPiloto.router')
const authRouter = require('./users/auth.router')
const auxiiRouter = require('./motogp/auxi.router')

function routerMotogp(app){
    const router = express.Router()
    app.use('/', router) 
    router.use('/motospanel', motosRouter)
    router.use('/pilotospanel', pilotosRouter)
    router.use('/motoPiloto', relacionRouter)
    router.use('/auth', authRouter)
    router.use('/', auxiiRouter); // Asegúrate de usar auxiiRouter
}

module.exports = routerMotogp
