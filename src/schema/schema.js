const {
    buildSchema
} = require('graphql')

const schemaTemplate = require('./template.json')
const schema = buildSchema(schemaTemplate.data)

exports.schema = schema;