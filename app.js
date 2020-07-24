const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const request = require('request')
const cheerio = require('cheerio')
const cookieParser = require('cookie-parser')

const updateApp = require('./updateData')


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
    res.render('index')
})

app.post('/', (req, res) => {
    console.log("getting data...")
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbgw-2QiguaDpy7rl9AZUQxtPV3T55TDseLAHBQE3z7ef0niqrasuil7Bg0V-KDzvBLCTfb5BnH-7Z/pubhtml/sheet?headers=false&gid=0'
    const data = {}

    request(url, (error, response, body) => {
        const $ = cheerio.load(body)
    
        data.day = cheerio.html($('#0R1').parent().children().slice(1, 10))
        data.time = cheerio.html($('#0R2').parent().children().slice(1, 51))
    
        data.RR20 = cheerio.html($('#0R3').parent().children().slice(1,52)) 
        data.RB20 = cheerio.html($('#0R4').parent().children().slice(1,52)) 
        data.RF20CD = cheerio.html($('#0R5').parent().children().slice(1,52)) 
        data.RD20A = cheerio.html($('#0R6').parent().children().slice(1,52)) 
        data.RJ20A = cheerio.html($('#0R7').parent().children().slice(1,52)) 
        data.RJ20B = cheerio.html($('#0R8').parent().children().slice(1,52)) 
        data.RN20A = cheerio.html($('#0R9').parent().children().slice(1,52)) 
        data.RF21A = cheerio.html($('#0R10').parent().children().slice(1,52)) 
        data.RF21B = cheerio.html($('#0R11').parent().children().slice(1,52)) 
        data.RF22A = cheerio.html($('#0R12').parent().children().slice(1,52)) 
        data.RF22B = cheerio.html($('#0R13').parent().children().slice(1,52)) 
        data.RF22C = cheerio.html($('#0R14').parent().children().slice(1,52)) 
        data.RM22A = cheerio.html($('#0R15').parent().children().slice(1,52)) 
        data.RM22B = cheerio.html($('#0R16').parent().children().slice(1,52)) 
        data.RD21A = cheerio.html($('#0R17').parent().children().slice(1,52)) 
        data.RA21A = cheerio.html($('#0R18').parent().children().slice(1,52)) 
        data.RE00A = cheerio.html($('#0R19').parent().children().slice(1,52))
        console.log(data)
        
        let className = ""
        if (req.cookie) {
            className = req.cookie.className
        } else {
            className = req.body.class
        }

        res.cookie('className', className)

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