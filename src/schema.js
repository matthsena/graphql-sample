const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const Companhias = require('./orm/Companhias')

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
            companhias: {
                type: new GraphQLList(CompType),
                resolve() {
                    return Companhias.findAll()
                }
            },
            companhia: {
                type: CompType,
                args: {
                    id: {
                        type:  new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(parentValue, args) {
                    return Companhias.find(args.id)
                }
            }
        }
    })
})