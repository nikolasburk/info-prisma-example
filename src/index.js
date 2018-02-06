const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    async feed(parent, { authorId }, ctx, info) {
      console.log(`Query.feed - info:`, JSON.stringify(info))

      // build filter
      const authorFilter = authorId ? { author: { id: authorId } } : {}

      // retrieve (potentially filtered) posts
      const posts = await ctx.db.query.posts({ where: authorFilter }, `{ id }`) // second argument can also be omitted, then all scalar fields of `Post` would be retrieved

      // retrieve (potentially filtered) element count
      const postsConnection = await ctx.db.query.postsConnection(
        { where: authorFilter },
        `{ aggregate { count } }`,
      )
      return {
        count: postsConnection.aggregate.count,
        postIds: posts.map(post => post.id),
      }
    },
  },
  Feed: {
    posts({ postIds }, args, ctx, info) {
      const postIdsFilter = { id_in: postIds }
      return ctx.db.query.posts({ where: postIdsFilter }, info)
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',  // the Prisma database schema
      endpoint: '__PRISMA_ENPDOINT__',           // the endpoint of the Prisma DB service
      secret: 'mysecret123',                     // specified in database/prisma.yml
      debug: true,                               // log all GraphQL queryies & mutations
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
