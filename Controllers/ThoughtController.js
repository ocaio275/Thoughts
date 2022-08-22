const Thought = require('../Models/Thought')
const User = require('../Models/User')

module.exports = class ThoughtController {
    static async showThoughts(req, res) {
        res.render('thoughts/home')
    }

    static async dashboard(req, res) {

        const userId = req.session.userid

        const checkUser = await User.findOne({
            where: {
                id: userId
            },
            include: Thought,
            plain: true,
        })

        if (!checkUser) {
            res.redirect('/login')
        }

        const thoughts = checkUser.Thoughts.map((result) => result.dataValues)

        let emptyThoughts = false

        if(thoughts.length === 0){
            emptyThoughts = true
        }

        res.render('thoughts/dashboard', { thoughts, emptyThoughts })
    }

    static async removeThought(req, res) {
        const id = req.body.id
        const UserId = req.session.userid
        try {
            await Thought.destroy({ where: { id: id, UserId: UserId } })
            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        } catch (error) {
            console.log("🚀 ~ file: ThoughtController.js ~ line 36 ~ ThoughtController ~ removeThought ~ error", error)
        }
    }
    static createThought(req, res) {
        res.render('thoughts/create')
    }
    static async createThoughtSave(req, res) {


        const thought = {
            title: req.body.title,
            UserId: req.session.userid
        }
        try {
            await Thought.create(thought)

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        } catch (error) {
            console.log("🚀 ~ file: ThoughtController.js ~ line 32 ~ ThoughtController ~ createThoughtSave ~ error", error)
        }

    }
}