/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query TestQuery {\n    booyah\n  }\n": typeof types.TestQueryDocument,
    "\n  query Dashboard {\n  fhl {\n    __typename\n    league {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n    activeSeason {\n      id\n      isActive\n      year\n    }\n    currentChampion {\n      id\n      firstName\n      lastName\n      fullName\n      gamertag\n      wins\n      losses\n    }\n    # upcomingSeason {\n\n    # }\n    topFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n    bottomFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n  }\n}\n": typeof types.DashboardDocument,
};
const documents: Documents = {
    "\n  query TestQuery {\n    booyah\n  }\n": types.TestQueryDocument,
    "\n  query Dashboard {\n  fhl {\n    __typename\n    league {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n    activeSeason {\n      id\n      isActive\n      year\n    }\n    currentChampion {\n      id\n      firstName\n      lastName\n      fullName\n      gamertag\n      wins\n      losses\n    }\n    # upcomingSeason {\n\n    # }\n    topFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n    bottomFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n  }\n}\n": types.DashboardDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TestQuery {\n    booyah\n  }\n"): typeof import('./graphql').TestQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Dashboard {\n  fhl {\n    __typename\n    league {\n      id\n      name\n      createdAt\n      updatedAt\n    }\n    activeSeason {\n      id\n      isActive\n      year\n    }\n    currentChampion {\n      id\n      firstName\n      lastName\n      fullName\n      gamertag\n      wins\n      losses\n    }\n    # upcomingSeason {\n\n    # }\n    topFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n    bottomFiveRecords {\n      id\n      gamertag\n      wins\n      losses\n    }\n  }\n}\n"): typeof import('./graphql').DashboardDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
