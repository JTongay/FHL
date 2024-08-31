import { graphql } from "../../generated/gql";

export const GET_SEASONS = graphql(/* GraphQL */ `
  query GetSeasons {
    seasons(limit: 10, offset: 1) {
      __typename
      ... on SeasonsList {
        total
        limit
        offset
        data {
          __typename
          id
          year
          isActive
          startDate
          endDate
          teams {
            id
            name
            wins
            losses
          }
        }
      }

      ... on ApiError {
        stacktrace
        code
      }
    }
  }
`);
