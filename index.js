import { ApolloServer, gql } from "apollo-server";

const persons = [
  {
    name: "Iván",
    phone: "12548972",
    street: "Calle",
    city: "Oviedo",
    id: 1,
  },
  {
    name: "Valery",
    phone: "985956",
    street: "Avenida",
    city: "Oviedo",
    id: 2,
  },
];

const typeDefs = gql`
  type Address {
    city: String!
    street: String!
  }

  type Person {
    address: Address
    id: ID!
    name: String!
    phone: String
    street: String!
  }

  type Query {
    allPersons: [Person]!
    findPerson(name: String!): Person
    personCount: Int!
  }
`;

const resolvers = {
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Query: {
    allPersons: () => persons,
    findPerson: (_, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name) || null;
    },
    personCount: () => persons.length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
