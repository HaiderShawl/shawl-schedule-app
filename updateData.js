const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')


const updateData = () => {
    console.log("updating function initiated")
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbgw-2QiguaDpy7rl9AZUQxtPV3T55TDseLAHBQE3z7ef0niqrasuil7Bg0V-KDzvBLCTfb5BnH-7Z/pubhtml/sheet?headers=false&gid=0'
    const data = {}

    request(url, (error, response, body) => {
        const $ = cheerio.load(body)
    
        data.day = cheerio.html($('#0R1').parent().children().slice(1, 10))
        data.time = cheerio.html($('#0R2').parent().children().slice(1, 37))
    
        data.RR20 = cheerio.html($('#0R3').parent().children().slice(1,38)) 
        data.RB20 = cheerio.html($('#0R4').parent().children().slice(1,38)) 
        data.RF20CD = cheerio.html($('#0R5').parent().children().slice(1,38)) 
        data.RD20A = cheerio.html($('#0R6').parent().children().slice(1,38)) 
        data.RJ20A = cheerio.html($('#0R7').parent().children().slice(1,38)) 
        data.RJ20B = cheerio.html($('#0R8').parent().children().slice(1,38)) 
        data.RN20A = cheerio.html($('#0R9').parent().children().slice(1,38)) 
        data.RF21A = cheerio.html($('#0R10').parent().children().slice(1,38)) 
        data.RF21B = cheerio.html($('#0R11').parent().children().slice(1,38)) 
        data.RF22A = cheerio.html($('#0R12').parent().children().slice(1,38)) 
        data.RF22B = cheerio.html($('#0R13').parent().children().slice(1,38)) 
        data.RF22C = cheerio.html($('#0R14').parent().children().slice(1,38)) 
        data.RM22A = cheerio.html($('#0R15').parent().children().slice(1,38)) 
        data.RM22B = cheerio.html($('#0R16').parent().children().slice(1,38)) 
        data.RD21A = cheerio.html($('#0R17').parent().children().slice(1,38)) 
        data.RA21A = cheerio.html($('#0R18').parent().children().slice(1,38)) 
        data.RE00A = cheerio.html($('#0R19').parent().children().slice(1,38)) 
    
        const json = JSON.stringify(data)
        if (!error) {
            fs.writeFile('data/data.json', json, (err) => {
                if (err) throw err
                console.log('File has been saved')
            })
        } else {
            console.log(error)
        }
    })
}


module.exports = updateData