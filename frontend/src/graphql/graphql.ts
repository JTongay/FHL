/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddTeamToSeasonInput = {
  captainId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type ApiError = {
  __typename?: 'ApiError';
  code: Scalars['Int']['output'];
  stacktrace?: Maybe<Scalars['String']['output']>;
};

export type Award = {
  __typename?: 'Award';
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  presenters: Array<User>;
  season: Season;
  updatedAt: Scalars['Date']['output'];
  winners: Array<User>;
};

export type AwardResponse = ApiError | Award;

export type AwardsList = PaginatedResponse & {
  __typename?: 'AwardsList';
  data: Array<Award>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AwardsResponse = ApiError | AwardsList;

export enum Console {
  Pc = 'PC',
  Ps4 = 'PS4',
  Ps5 = 'PS5',
  Switch = 'SWITCH',
  Xbox = 'XBOX'
}

export type CreateAwardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  presentingUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  seasonId: Scalars['ID']['input'];
  winningUserIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateEventInput = {
  isActive: Scalars['Boolean']['input'];
  leagueId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Input type to create a season for a given league with the teams and team captains */
export type CreateFullSeasonInput = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  leagueId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
  teams: Array<CreateSeasonTeamInput>;
};

export type CreateLeagueInput = {
  name: Scalars['String']['input'];
};

export type CreateSeasonTeamInput = {
  captain: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type CreateStorylineInput = {
  description: Scalars['String']['input'];
  seasonId: Scalars['ID']['input'];
  users: Array<Scalars['ID']['input']>;
};

export type CreateTeamInput = {
  leagueId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CreateTeamResponse = ApiError | Team;

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gamertag: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type DeleteSeasonInput = {
  id: Scalars['ID']['input'];
};

export type DeleteStorylineInput = {
  id: Scalars['ID']['input'];
};

/** Input type that can add or remove a player from a team during a season */
export type DraftPlayerInput = {
  playerId: Scalars['ID']['input'];
  seasonId: Scalars['ID']['input'];
  teamId: Scalars['ID']['input'];
};

export type Event = {
  __typename?: 'Event';
  games: Array<Game>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};


export type EventGamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type EventResponse = ApiError | Event;

export type EventsList = PaginatedResponse & {
  __typename?: 'EventsList';
  data: Array<Event>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EventsResponse = ApiError | EventsList;

export type Fhl = {
  __typename?: 'FHL';
  activeSeason?: Maybe<Season>;
  bottomFiveRecords?: Maybe<Array<User>>;
  currentChampion?: Maybe<User>;
  league: League;
  topFiveRecords: Array<User>;
  upcomingSeason?: Maybe<Season>;
};

export type Game = {
  __typename?: 'Game';
  availableOn: Array<Platform>;
  id: Scalars['ID']['output'];
  trailer: Scalars['String']['output'];
};

export type GameResponse = ApiError | Game;

export type GamesList = PaginatedResponse & {
  __typename?: 'GamesList';
  data: Array<Game>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type GamesResponse = ApiError | GamesList;

export type League = {
  __typename?: 'League';
  createdAt: Scalars['Date']['output'];
  currentChampion?: Maybe<User>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  seasons: Array<Season>;
  team?: Maybe<Team>;
  teams: Array<Team>;
  titleLineage: Array<TitleChange>;
  updatedAt: Scalars['Date']['output'];
};


export type LeagueTeamArgs = {
  id: Scalars['ID']['input'];
};


export type LeagueTitleLineageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Order>;
};

export type LeagueResponse = ApiError | League;

export type Mutation = {
  __typename?: 'Mutation';
  addTeamToSeason: Scalars['ID']['output'];
  createAward: AwardResponse;
  createEvent: EventResponse;
  /** Creates a season with the selected teams along with the selected captains */
  createFullSeason: Scalars['ID']['output'];
  createLeague: LeagueResponse;
  createStoryline: StorylineResponse;
  createTeam: CreateTeamResponse;
  /** @deprecated No longer supported */
  createTest: Scalars['String']['output'];
  createUser: UserResponse;
  deleteSeason: Scalars['Boolean']['output'];
  deleteStoryline: Scalars['Boolean']['output'];
  /** Drafts a player to a team. Typically occurs before the Season starts */
  draftPlayerToTeam: Scalars['ID']['output'];
  /** Removes a player from a team during a season */
  removePlayerFromTeam: Scalars['Boolean']['output'];
  updateEvent: EventResponse;
  updateSeason: SeasonResponse;
  /** Updates the storyline */
  updateStoryline: StorylineResponse;
  updateTeam: UpdateTeamResponse;
  updateUser: UserResponse;
};


export type MutationAddTeamToSeasonArgs = {
  input: AddTeamToSeasonInput;
};


export type MutationCreateAwardArgs = {
  input: CreateAwardInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateFullSeasonArgs = {
  input: CreateFullSeasonInput;
};


export type MutationCreateLeagueArgs = {
  input: CreateLeagueInput;
};


export type MutationCreateStorylineArgs = {
  input: CreateStorylineInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateTestArgs = {
  testInput: TestInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteSeasonArgs = {
  input: DeleteSeasonInput;
};


export type MutationDeleteStorylineArgs = {
  input: DeleteStorylineInput;
};


export type MutationDraftPlayerToTeamArgs = {
  input: DraftPlayerInput;
};


export type MutationRemovePlayerFromTeamArgs = {
  input: DraftPlayerInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateSeasonArgs = {
  input: UpdateSeasonInput;
};


export type MutationUpdateStorylineArgs = {
  input: UpdateStorylineInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PaginatedResponse = {
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Platform = {
  __typename?: 'Platform';
  console: Console;
  id: Scalars['ID']['output'];
  storeLink: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** @deprecated No longer supported */
  booyah: Scalars['String']['output'];
  event: Event;
  events: Array<Event>;
  /** Entrypoint for the FHL specific dashboard */
  fhl: Fhl;
  game: GameResponse;
  games: GamesResponse;
  /** @deprecated No longer supported */
  howdy: Scalars['ID']['output'];
  league: LeagueResponse;
  leagues: Array<League>;
  season: SeasonResponse;
  seasons: SeasonsResponse;
  user: UserResponse;
  users: UsersResponse;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGamesArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryHowdyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLeagueArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeasonArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeasonsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Season = {
  __typename?: 'Season';
  award: AwardResponse;
  awards: AwardsResponse;
  createdAt: Scalars['Date']['output'];
  endDate: Scalars['Date']['output'];
  games: Array<Game>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  startDate: Scalars['Date']['output'];
  storyline: StorylineResponse;
  storylines: StorylinesResponse;
  /** Gets specific team data for the season */
  team: TeamResponse;
  /** Gets a list of teams that played during the seasonn */
  teams: Array<Team>;
  updatedAt: Scalars['Date']['output'];
  year: Scalars['Int']['output'];
};


export type SeasonAwardArgs = {
  id: Scalars['ID']['input'];
};


export type SeasonAwardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonGamesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonStorylineArgs = {
  id: Scalars['ID']['input'];
};


export type SeasonStorylinesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonTeamArgs = {
  id: Scalars['ID']['input'];
};

export type SeasonResponse = ApiError | Season;

export type SeasonsList = PaginatedResponse & {
  __typename?: 'SeasonsList';
  data: Array<Season>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeasonsResponse = ApiError | SeasonsList;

export type Storyline = {
  __typename?: 'Storyline';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
  users: UsersResponse;
};

export type StorylineResponse = ApiError | Storyline;

export type StorylinesList = PaginatedResponse & {
  __typename?: 'StorylinesList';
  data: Array<Storyline>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type StorylinesResponse = ApiError | StorylinesList;

export type Team = {
  __typename?: 'Team';
  captain: User;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  losses: Scalars['Int']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  wins: Scalars['Int']['output'];
};

export type TeamResponse = ApiError | Team;

export type TestInput = {
  age: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Title = {
  __typename?: 'Title';
  createdAt: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type TitleChange = {
  __typename?: 'TitleChange';
  event: Event;
  id: Scalars['ID']['output'];
  loser: UserResponse;
  title: Title;
  winner: UserResponse;
};

export type UpdateEventInput = {
  id: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
  leagueId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSeasonInput = {
  endDate: Scalars['Date']['input'];
  id: Scalars['ID']['input'];
  setActive: Scalars['Boolean']['input'];
  startDate: Scalars['Date']['input'];
  year: Scalars['Int']['input'];
};

export type UpdateStorylineInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  users: Array<Scalars['ID']['input']>;
};

export type UpdateTeamInput = {
  name: Scalars['String']['input'];
  teamId: Scalars['ID']['input'];
};

export type UpdateTeamResponse = ApiError | Team;

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gamertag: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  awards: AwardsResponse;
  consolesOwned: Array<Console>;
  createdAt: Scalars['Date']['output'];
  currentTeam?: Maybe<Team>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gamertag: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  losses: Scalars['Int']['output'];
  teamHistory: Array<Team>;
  titleHistory: Array<TitleChange>;
  updatedAt: Scalars['Date']['output'];
  wins: Scalars['Int']['output'];
};


export type UserAwardsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type UserResponse = ApiError | User;

export type UsersList = PaginatedResponse & {
  __typename?: 'UsersList';
  data: Array<User>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UsersResponse = ApiError | UsersList;

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', booyah: string };

export type DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardQuery = { __typename?: 'Query', fhl: { __typename: 'FHL', league: { __typename?: 'League', id: string, name: string, createdAt: any, updatedAt: any }, activeSeason?: { __typename?: 'Season', id: string, isActive: boolean, year: number } | null, currentChampion?: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, gamertag: string, wins: number, losses: number } | null, topFiveRecords: Array<{ __typename?: 'User', id: string, gamertag: string, wins: number, losses: number }>, bottomFiveRecords?: Array<{ __typename?: 'User', id: string, gamertag: string, wins: number, losses: number }> | null } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const TestQueryDocument = new TypedDocumentString(`
    query TestQuery {
  booyah
}
    `) as unknown as TypedDocumentString<TestQueryQuery, TestQueryQueryVariables>;
export const DashboardDocument = new TypedDocumentString(`
    query Dashboard {
  fhl {
    __typename
    league {
      id
      name
      createdAt
      updatedAt
    }
    activeSeason {
      id
      isActive
      year
    }
    currentChampion {
      id
      firstName
      lastName
      fullName
      gamertag
      wins
      losses
    }
    topFiveRecords {
      id
      gamertag
      wins
      losses
    }
    bottomFiveRecords {
      id
      gamertag
      wins
      losses
    }
  }
}
    `) as unknown as TypedDocumentString<DashboardQuery, DashboardQueryVariables>;