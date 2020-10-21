export type SailServerOptions = {
  path?: string | null,
  graphiql?: boolean | null,
  port?: number | null
}

export type SailMiddleware = () => any;

export type Client = {
  graphql: any,
  manyMiddlewares: any,
  middleware: any,
};
