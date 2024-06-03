import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// export const client = new ApolloClient({
//   ssrMode: typeof window === 'undefined',
//   uri: "http://localhost:3000/api/graphql",
//   cache: new InMemoryCache(),
// });
export const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/properties",
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});
