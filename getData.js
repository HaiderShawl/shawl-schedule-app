const cheerio = require('cheerio')
const request = require('request')

const getData = (callback) => {
    console.log("Getting data...")
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbgw-2QiguaDpy7rl9AZUQxtPV3T55TDseLAHBQE3z7ef0niqrasuil7Bg0V-KDzvBLCTfb5BnH-7Z/pubhtml/sheet?headers=false&gid=0'
    const data = {}
    const numClasses = 23
    const classID = []

    request(url, (error, response, body) => {
        const $ = cheerio.load(body)
        data.day = cheerio.html($('#0R1').parent().children().slice(1, 10))
        data.time = cheerio.html($('#0R2').parent().children().slice(1, 51))

        for (let i = 0; i < numClasses; i++) {
            classID[i] = cheerio.text($('#0R' + (i + 3).toString()).next())
            eval("data." + classID[i] + " = cheerio.html($('#0R" + (i+3) + "').parent().children().slice(1, 52))") 
        }
        callback({data : data, classID : classID})
    })

    console.log("Data collected")
}


module.exports = getData