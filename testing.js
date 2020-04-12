data.day = cheerio.html($('#0R1').parent().children().slice(0, 10))
data.time = cheerio.html($('#0R2').parent().children().slice(0, 38))
data.classData = cheerio.html($('#0R14').parent().children().slice(0,38))