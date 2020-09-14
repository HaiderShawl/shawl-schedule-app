const cheerio = require('cheerio')
const request = require('request')

const getData = (callback) => {
    console.log("getting data...")
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbgw-2QiguaDpy7rl9AZUQxtPV3T55TDseLAHBQE3z7ef0niqrasuil7Bg0V-KDzvBLCTfb5BnH-7Z/pubhtml/sheet?headers=false&gid=0'
    const data = {}

    request(url, (error, response, body) => {
        const $ = cheerio.load(body)
        data.day = cheerio.html($('#0R1').parent().children().slice(1, 10))
        data.time = cheerio.html($('#0R2').parent().children().slice(1, 51))
        data.RF21A = cheerio.html($('#0R3').parent().children().slice(1, 52))
        data.RF21B = cheerio.html($('#0R4').parent().children().slice(1, 52))
        data.RF22A = cheerio.html($('#0R5').parent().children().slice(1, 52))
        data.RF22B = cheerio.html($('#0R6').parent().children().slice(1, 52))
        data.RF22C = cheerio.html($('#0R7').parent().children().slice(1, 52))
        data.RM22A = cheerio.html($('#0R8').parent().children().slice(1, 52))
        data.RM22B = cheerio.html($('#0R9').parent().children().slice(1, 52))
        data.RD21A = cheerio.html($('#0R10').parent().children().slice(1, 52))
        data.RA21A = cheerio.html($('#0R11').parent().children().slice(1, 52))
        callback({data : data})
    })
}

module.exports = getData