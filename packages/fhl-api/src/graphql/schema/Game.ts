import gql from "graphql-tag";

export const Game = gql`
    type Game {
        id: ID!
        availableOn: [Platform!]!
        trailer: String!
        # createdAt: Date!
        # updatedAt: Date!
    }

    type GamesList implements PaginatedResponse {
        data: [Game!]!
        total: Int!
        limit: Int!
        offset: Int!
    }

    type Platform {
        id: ID!
        storeLink: String!
        console: Console!
    }

    union GamesResponse = GamesList | ApiError

    union GameResponse = Game | ApiError

`