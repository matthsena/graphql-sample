const types = require('./types.json')
const queries = require('./queries.json')
// building schema
async function buildSchema() {
    let mySchema = ''
    // build each type
    await types.map(async type => {
        mySchema += `
        type ${type.typeName}
        { 
            ${await data(type.typeData)}
        }\n`
    })
    // build all queries
    await buildQueries().then(resp => {
        mySchema += `
            type Query {
                ${resp.reduce((a,b) => a + '\n' + b)}
            }\n`
    })
    return (mySchema).replace(/  /g, '');
}

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

    return (arrqueries)

}

let x = buildSchema()
x.then(y => {
    console.log(y)

}).catch(e => console.error(e))