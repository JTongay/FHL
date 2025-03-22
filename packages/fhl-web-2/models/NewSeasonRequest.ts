import {
  CreateFullSeasonInput,
  CreateSeasonTeamInput,
} from "@/generated/gql/graphql";

export type TeamFormValue = {
  id: string;
  captain: {
    id: string;
  };
};

export interface NewSeasonFormValues {
  startAt?: Date;
  endAt?: Date;
  teams: TeamFormValue[];
}

export class NewSeasonRequest implements CreateFullSeasonInput {
  leagueId: string;
  teams: CreateSeasonTeamInput[];
  startDate?: Date;
  endDate?: Date;

  constructor(values: NewSeasonFormValues, leagueId: string) {
    this.leagueId = leagueId;
    this.teams = values.teams.map((val) => ({
      id: val.id,
      captain: val.captain.id,
    }));
    this.startDate = values.startAt;
    this.endDate = values.endAt;
  }
}
