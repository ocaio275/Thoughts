const User = require('../Models/User')

const bcrypt = require('bcryptjs')
module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const { email, password } = req.body

        const findUser = await User.findOne({ where: { email: email } })

        if (!findUser) {
            req.flash('message', 'Usuário não encontrado!!!')
            res.render('auth/login')
            return
        }

        const checkPassword = bcrypt.compareSync(password, findUser.password)

        if (!checkPassword) {
            req.flash('message', 'Senha incorreta!')
            res.render('auth/login')
            return
        }

        try {
            req.session.userid = findUser.id

            req.flash('message', 'Autenticação realizada com sucesso!')
            req.session.save(()=>{
                res.redirect('/')
            })
        } catch (error) {
            console.log("🚀 ~ file: AuthController.js ~ line 31 ~ AuthController ~ loginPost ~ error", error)
        }
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        // Password matcg validation

        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente')
            res.render('auth/register')
            return
        }

        //check if user exists

        const checkIfUserExists = await User.findOne({ where: { email: email } })

        if (checkIfUserExists) {
            req.flash('message', 'E-mail já registrado')
            res.render('auth/register')
            return
        }

        // create a password

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            //initialize session

            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso')
            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log("🚀 ~ file: AuthController.js ~ line 48 ~ AuthController ~ registerPost ~ error", error)

        }

    }

    static async logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}