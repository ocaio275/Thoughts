const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
try {
    sequelize.authenticate()
    console.log('Conectado ao BD')
} catch (error) {
    console.log("🚀 ~ file: conn.js ~ line 10 ~ error", error)

}

module.exports = sequelize