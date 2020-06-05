const types = require('./types.json')
const queries = require('./queries.json')

async function data(typeData) {
    let datas = []

    typeData.map(e => {
        datas.push(`${e.fieldName}: ${e.dataType}${(e.required? "!" : "")}\n`)
    })
    const reducer = (a, b) => a + b;

    return datas.reduce(reducer)
}

async function buildParams(params) {
    let str = "("
    params.map((param, index) => {
        if (index + 1 >= params.length) {
            str += `${param.fieldName}: ${param.dataType}${param.required ? "!" : ""})`
        } else {
            str += `${param.fieldName}: ${param.dataType}${param.required ? "!" : ""},`
        }
    })

    return str
}

async function buildReturn(returns) {
    let str = ''
    if (returns.type == "array") {
        str = `[${returns.typeName}]`
    } else if (returns.type == "normal") {
        str = returns.typeName
    }
    return str
}

async function buildQueries() {
    let arrqueries = []

    await queries.map(async query => {
        const q = `${query.queryName}${(query.queryParams) ? await buildParams(query.queryParams) : ''}: ${await buildReturn(query.return)}`
        arrqueries.push(q);
    })

    process.nextTick(() => {
        const reducer = (a, b) => a + '\n' + b;
        let x = arrqueries.reduce(reducer)

        console.log(x)
    })


}

async function buildTypes() {
    try {
        let str = "";

        await types.map(async type => {
            str += `\ntype ${type.typeName} {\n${await data(type.typeData)}}\n`
        })
        console.log(str)

    } catch (error) {
        console.error(error)
    }
}
buildTypes();
buildQueries()

module.exports = {
    buildType() {
        return new Promise(async (resolve, reject) => {
            try {
                let str = "";

                await types.map(async type => {
                    str += `\ntype ${type.typeName} {\n${await data(type.typeData)}}\n`
                })
                resolve(str)

            } catch (error) {
                reject(error)
            }
        })
    }
}