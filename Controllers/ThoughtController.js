const Thought = require('../Models/Thought')
const User = require('../Models/User')

module.exports = class ThoughtController{
    static async showThoughts(req, res){
        res.render('thoughts/home')
    }

    static async dashboard(req, res){
        res.render('thoughts/dashboard')
    }
}