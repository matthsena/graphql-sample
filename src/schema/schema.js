const {
    buildSchema
} = require('graphql')

const {
    transpiler
} = require('./schemaTranspiler')
// const schemaTemplate = require('./template.json')
const schema = buildSchema(transpiler('template'))

exports.schema = schema;