const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./DB/conn')

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
    if(res.session.userid){
        res.locals.session = req.session
    }
    next()
})
conn
    .sync()
    .then(() => {
        app.listen(3000)
        console.log('Aplicação rodando em http://localhost:3000')
    })
    .catch(err => console.log(err))