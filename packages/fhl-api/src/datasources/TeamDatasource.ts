import {
  CreateTeamParams,
  CreateTeamResponse,
  SeasonTeam,
  SeasonTeamResponse,
  UpdateTeamParams,
  UpdateTeamResponse,
} from "@/domain/Team";
import {ApiError} from "@/domain/errors/FHLApiError";
import {TeamRepository} from "@/repositories/Team.repository";
import {fhlDb} from "@fhl/core/src/db";
import {Teams} from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import {Selectable} from "kysely";

export class TeamDatasource {
  private repo: TeamRepository;

  constructor() {
    this.repo = new TeamRepository();
  }

  private batchTeams = new DataLoader(async (ids: number[]) => {
    const teamsList = await fhlDb.selectFrom("teams").where("id", "in", ids).selectAll().execute();
    // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // Since the database might return the results in a different order the following code sorts the results accordingly
    const teamIdsToUserMap = teamsList.reduce((mapping, team) => {
      mapping[team.id] = team;
      return mapping;
    }, {} as { [key: string]: Selectable<Teams> });
    return ids.map((id) => teamIdsToUserMap[id]);
  });


  public async getTeamsForSeason(id: string): Promise<SeasonTeam[]> {
    return await this.repo.getTeamsForSeason(id);
  }

  public async getTeamForSeason({teamId, seasonId}: { teamId: string, seasonId: string }): Promise<SeasonTeamResponse> {
    try {
      return await this.repo.getTeamForSeason({teamId, seasonId});
    } catch (e) {
      return new ApiError(69, e.toString());
    }
  }

  public async createTeam(params: CreateTeamParams): Promise<CreateTeamResponse> {
    try {
      return await this.repo.createTeam(params);
    } catch (e) {
      return new ApiError(60, e.toString());
    }
  }

  public async updateTeam(params: UpdateTeamParams): Promise<UpdateTeamResponse> {
    try {
      return await this.repo.updateTeam(params);
    } catch (e) {
      return new ApiError(61, e.toString());
    }
  }
}
