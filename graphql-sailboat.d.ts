export type SailServerOptions = {
  path: string | null,
  graphiql: boolean | null,
  port: number | null
}

export type SailMiddleware = () => never;
