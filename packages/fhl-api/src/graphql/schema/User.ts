import gql from "graphql-tag"

export const User = gql`
    type User {
        id: ID!
        gamertag: String!
        firstName: String!
        lastName: String!
        fullName: String!
        email: String! # TODO create an email scalar here
        avatar: String!
        awards(limit: Int, offset: Int): [Award!]!
        currentTeam: Team
        wins: Int!
        losses: Int!
        consolesOwned: [Console!]!
        # createdAt: Date!
        # updatedAt: Date!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String!
        gamertag: String!
        email: String!
    }

    input UpdateUserInput {
        userId: ID!
        firstName: String!
        lastName: String!
        gamertag: String!
        email: String!
    }

    type UsersList implements PaginatedResponse {
        offset: Int!
        limit: Int!
        total: Int!
        data: [User!]!
    }

    union UsersResponse = UsersList | ApiError
    union UserResponse = User | ApiError
`