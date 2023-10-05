import gql from "graphql-tag";

export const Season = gql`
    type Season {
        id: ID!
        year: Int!
        isActive: Boolean!
        storyline(id: ID!): StorylineResponse!
        storylines(limit: Int, offset: Int): StorylinesResponse!
        awards: [Award!]!
        games(limit: Int, offset: Int): [Game!]!
        createdAt: Date!
        updatedAt: Date!
        ## schedule
    }

    type SeasonsList implements PaginatedResponse {
        data: [Season!]!
        limit: Int!
        offset: Int!
        total: Int!
    }

    type Storyline  {
        id: ID!
        description: String!
        createdAt: Date!
        updatedAt: Date!
        users: UsersResponse!
    }

    type StorylinesList implements PaginatedResponse {
        data: [Storyline!]!
        limit: Int!
        offset: Int!
        total: Int!
    }

    input CreateSeasonInput {
        year: Int!
        setActive: Boolean!
        leagueId: ID!
    }

    input UpdateSeasonInput {
        id: ID!
        year: Int!
        setActive: Boolean!
    }

    input DeleteSeasonInput {
        id: ID!
    }

    input CreateStorylineInput {
        description: String!
        seasonId: ID!
        users: [ID!]!
    }

    input UpdateStorylineInput {
        id: ID!
        description: String!
        users: [ID!]!
    }

    union SeasonResponse = ApiError | Season
    union SeasonsResponse = ApiError | SeasonsList
    union StorylineResponse = ApiError | Storyline
    union StorylinesResponse = ApiError | StorylinesList
`