const fs = require('fs')

const transpiler = fileName => {
    try {

        return fs.readFileSync(`${__dirname}/${fileName}.gqx`, 'utf-8')
        
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports.transpiler = transpiler;