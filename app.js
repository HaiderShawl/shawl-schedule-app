const fs = require('fs')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const updateApp = require('./updateData')


const viewsPath = path.join(__dirname, '/templates')
const publicPath = path.join(__dirname, '/public')

const app = express()
const port = process.env.PORT || 3000

//setting handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))

updateApp()

app.get('', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    fs.readFile('data/data.json', (err, d) => {
        const data = JSON.parse(d)
        const className = req.body.class
        res.render('index', {
            day: data.day,
            time: data.time,
            classData: data[className]
        })
    })
})

app.listen(port, () => {
    console.log('The server is running on port ' + port)
})