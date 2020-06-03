const types = require('./types.json')

async function data(typeData) {
    let datas = []

    typeData.map(e => {
        datas.push(`${e.fieldName}: ${e.dataType}${(e.required? "!" : "")}\n`)
    })
    const reducer = (a, b) => a + b;

    return datas.reduce(reducer)
}

module.exports = {
    buildType() {
        return new Promise(async (resolve, reject) => {
            try {
                let str = "";

                await types.map(async type => {
                    str += `type ${type.typeName} {\n${await data(type.typeData)}}\n`
                })
                resolve(str)

            } catch (error) {
                reject(error)
            }
        })
    }
}