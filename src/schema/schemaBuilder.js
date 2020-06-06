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
            ${await data(type.typeData).reduce((a, b) => a + '\n' + b)}
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

function data(typeData) {
    return typeData.map(e => {
        return `${e.fieldName}: ${e.dataType}${(e.required? "!" : "")}`
    })
}

async function buildQueries() {

    const buildReturn = (returns) => (returns.type == "array") ? `[${returns.typeName}]` : returns.typeName
    const buildParams = (params) => params.map(param => `${param.fieldName}: ${param.dataType}${param.required ? "!" : ""}`)

    let arrayQueries = []

    await queries.map(async query => {
        const q = `${query.queryName}${(query.queryParams) ? '(' + await buildParams(query.queryParams) + ')' : ''}: ${await buildReturn(query.return)}`
        arrayQueries.push(q);
    })

    return (arrayQueries)
}

buildSchema().then(y => console.log(y)).catch(e => console.error(e))