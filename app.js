const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')


const getData = require('./getData')

const viewsPath = path.join(__dirname, '/templates')
const publicPath = path.join(__dirname, '/public')

const app = express()
const port = process.env.PORT || 3000

//setting handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)


app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('', (req, res) => {
    getData((d) => {
        const classID = d.classID

        res.render('index', {
            classID: classID,
        })
    })
})



app.post('/', (req, res) => {
    getData((d) => {
        const data = d.data
        const classID = d.classID
        const className = req.body.class
        
        res.render('index', {
            day: data.day,
            time: data.time,
            classData: data[className],
            classID: classID,
        })
    }) 
})

app.get('/:className', async (req, res) => {
    await getData((d) => {
        const data = d.data
        const classID = d.classID
        const className = req.params.className

        res.render('index', {
            day: data.day,
            time: data.time,
            classData: data[className],
            classID: classID
        })
    }) 
})




app.listen(port, () => {
    console.log('The server is running on port ' + port)
})