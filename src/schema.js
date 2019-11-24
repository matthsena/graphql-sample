const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt
} = require('graphql')

const CompType = new GraphQLObjectType({
    name: 'Companhia',
    fields: {
        id:  {
            type: GraphQLInt
        },
        nome: {
            type: GraphQLString
        }
    }
})


module.exports = new GraphQLSchema({

    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            companhia: {
                type: CompType,
                resolve() {
                    return {
                        id: 159, 
                        nome: 'Teste'
                    }
                }
            }
        }
    })
})