# Demystifying the `info` object in GraphQL resolvers

## Usage

```sh
git clone git@github.com:nikolasburk/info-prisma-example.git
cd info-prisma-example
prisma deploy
```

After you deployed the Prisma service, you need to replace the `__PRISMA_ENDPOINT__` placeholder in [`src/index.js`](./src/index.js#L41) with the endpoint that was printed in the output of the `prisma deploy` command.

Note that `prisma deploy` also executes the mutation defined in `database/seed.graphql` so your service will be seeded with initial data.

You can then run the following commands to start the server and open a Playground:

```sh
yarn install
yarn dev
```

## More info

For more information about this example, read the accompanying [blog post](https://blog.graph.cool/graphql-server-basics-demystifying-the-info-object-in-graphql-resolvers-21e1657f09d4).