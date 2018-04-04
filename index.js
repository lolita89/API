const express = require('express')
const app = express()

var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
var House = sequelize.define('house', {
 title: Sequelize.STRING,
 description: Sequelize.TEXT,
 size: Sequelize.INTEGER,
 price: Sequelize.INTEGER
}, {

timestamps: false,
createdAt: false,
updatedAt: false,
deletedAt: false,
tableName: 'houses'
})

app.listen(4001, () => console.log('Express API listening on port 4001'))

app.get('/houses/:id', (request, response) => {
  const houseId = request.params.id
  House.findById(houseId).then(house => {
    response.send(house)
  })
})

app.get('/houses', (request, response) => {
  House.findAll().then(houses => {
    response.send({ houses })
  })
})
