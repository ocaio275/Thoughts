const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./DB/conn')

// ---Models--- //
const Thought = require('./Models/Thought')
const User = require('./Models/User')
// ---FIM--- //

// --- Controller ---/
const ThoughtController = require('./Controllers/ThoughtController')
const AuthController = require('./Controllers/AuthController')
// ---FIM--- //

// --- Importando Routes--- //
const ThoughtsRoutes = require('./Routes/thoughtsRoutes')
const AuthRoutes = require('./Routes/authRoutes')
// ---FIM--- //
// ---Configurando template engine--- //
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
// ---FIM--- //

// ---Recebendo resposta do body--- //
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())
// ---FIM--- //

// ---Session Middleware--- //
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function (){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie:{
            secure: false,
            maxAge: 360000,
            expires:new Date(Date.now + 360000),
            httpOnly: true
        }
    })
)
//---FIM---//

// ---Flash messages--- //
app.use(
    flash()
)
//---FIM---//

// ---Public--- //
app.use(express.static('Public'))
// ---FIM--- //

// ---Set session to res--- //
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.use('/thoughts', ThoughtsRoutes)
app.use('/', AuthRoutes)
app.get('/', ThoughtController.showThoughts)
conn
    .sync()
    .then(() => {
        app.listen(3000)
        console.log('Aplicação rodando em http://localhost:3000')
    })
    .catch(err => console.log(err))