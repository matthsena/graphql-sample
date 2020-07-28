interface IResolvers {
    /**
     * Declare all roles of the resolver
     */
    helloWorld(): string
}

const resolvers: IResolvers = {
  /**
   * Develop your functions here
   */
  helloWorld: (): string => 'Hello World!',
};

export default resolvers;
