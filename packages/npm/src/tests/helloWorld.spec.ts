import resolvers from '../graphql/resolvers/rootResolver';

test('Testing Hello World :)', () => {
    expect(resolvers.helloWorld()).toEqual('Hello World!');
})