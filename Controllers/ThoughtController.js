const Thought = require('../Models/Thought')
const User = require('../Models/User')
const { Op } = require('sequelize')
module.exports = class ThoughtController {
    static async showThoughts(req, res) {

        let search = ''

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = "ASC"
        }else{
            order = "DESC"
        }

        if(req.query.search){
            search = req.query.search
        }


            const thoughtData = await Thought.findAll({
                include: User,
                where: {
                    title: {[Op.like]: `%${search}%`},
                },
                order:[['createdAt', order]]
            })

        const thoughts = thoughtData.map((result) => result.get({ plain: true }))

        let thoughtsQty = thoughts.length

        if(thoughtsQty === 0){
            thoughtsQty = false
        }
        res.render('thoughts/home', { thoughts, search, thoughtsQty })
        console.log(thoughts)
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

        if (thoughts.length === 0) {
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

    static async updateThought(req, res) {
        const id = req.params.id
        const thought = await Thought.findOne({ raw: true, where: { id: id } })
        res.render('thoughts/edit', { thought })
        console.log(thought)
    }
    static async updateThoughtSave(req, res) {
        const { id, title } = req.body
        const thought = {
            title
        }

        try {
            await Thought.update(thought, { where: { id: id } })

            req.flash('message', 'Pensamento atualizando com sucesso!!!')

            req.session.save(() => {
                res.redirect('/thoughts/dashboard')
            })
        } catch (error) {
            console.log("🚀 ~ file: ThoughtController.js ~ line 95 ~ ThoughtController ~ updateThoughtSave ~ error", error)
        }
    }
}