const { DataTypes } = require('sequelize')
const db = require('../DB/conn')

const User = require('./User')

const Thought = db.define('Thought',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})

Thought.belongsTo(User)
User.hasMany(Thought)



module.exports = Thought