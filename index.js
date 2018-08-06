const { GraphQLServer } = require('graphql-yoga')

async function main() {

  const loggingMiddleware = async (resolve, root, args, context, info) => {
    console.log(`Input arguments:  ${JSON.stringify(args)}`)
    const result = await resolve(root, args, context, info)
    console.log(`Input arguments:  ${JSON.stringify(result)}`)
    return result
  }

  const typeDefs = `
  type Query {
    hello(name: String): String
  }
`
  const resolvers = {
    Query: {
      hello: (parent, { name }, context) => `Hello ${name ? name : 'world'}!`,
    },
  }

  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    middlewares: [loggingMiddleware],
    documentMiddleware: [],
    
  })
  server.start(() => console.log('Server is running on http://localhost:4000'))

}

main()