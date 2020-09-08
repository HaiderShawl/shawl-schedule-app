const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')

const getData = require('./getData')

const viewsPath = path.join(__dirname, '/templates')
const publicPath = path.join(__dirname, '/public')

const app = express()
const port = process.env.PORT || 3000

//setting handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(cookieParser())

app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({ extended: true }))



app.get('', (req, res) => {
    if (req.cookies.className) {
        getData((d) => {
            console.log(d)
            const data = d.data
            let className = req.cookies.className

            res.cookie('className', className, { expire: (1000 * 3600 * 24 * 7) + Date.now() })
            res.render('index', {
                day: data.day,
                time: data.time,
                classData: data[className]
            })
        })
    } else {
        res.render('index')
    }
})



app.post('/', (req, res) => {
    getData((d) => {
        console.log(d)
        const data = d.data
        let className = ""
        if (req.cookie) {
            className = req.cookie.className
        }
        else {
            className = req.body.class
        }
        res.cookie('className', className, { expire: (1000 * 3600 * 24 * 7) + Date.now() })
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