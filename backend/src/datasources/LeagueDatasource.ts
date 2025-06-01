import { CreateEventInput, Event, UpdateEventInput } from "@/domain/Event";
import { TitleChangeQuery, ChampionLineageParams as TitleLineageParams, TitleChange, League } from "@/domain/League";
import { User } from "@/domain/User";
import { Nullable } from "@/util";
import { fhlDb } from "@fhl/core/src/db";
import { Leagues } from "@fhl/core/src/sql.generated";
import DataLoader from "dataloader";
import { Selectable, sql } from "kysely";

export class LeagueDatasource {
  private batchLeagues = new DataLoader(async (ids: number[]) => {
    const leaguesList = await fhlDb
      .selectFrom("leagues")
      .where("id", "in", ids)
      .selectAll()
      .execute();

    const leagueIdsToLeagueMap = leaguesList.reduce(
      (mapping, league) => {
        mapping[league.id] = league;
        return mapping;
      },
      {} as { [key: string]: Selectable<Leagues> },
    );
    return ids.map((id) => leagueIdsToLeagueMap[id]);
  });

  public async getFHL(): Promise<League> {
    const result = await fhlDb
      .selectFrom("leagues")
      .where("name", "=", "FHL")
      .selectAll()
      .executeTakeFirstOrThrow();
    return new League(result);
  }

  public async getBottomFiveUserRecords(leagueId: string): Promise<User[]> {
    const result = await fhlDb
      .selectFrom("users")
      .where("league_id", "=", +leagueId)
      .select([
        "id",
        "gamertag",
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "idp_id",
        "avatar_url",
        "last_sign_in_at",
        "league_id",
        "wins",
        "losses",
        sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") || 0,
      ])
      .orderBy("win_loss_ratio", "asc")
      .limit(5)
      .execute();
    console.log(result, "bottom 5 users returned");
    return result.map((user) => new User(user));
  }

  public async getTopFiveUserRecords(leagueId: string): Promise<User[]> {
    const result = await fhlDb
      .selectFrom("users")
      .where("league_id", "=", +leagueId)
      .select([
        "id",
        "gamertag",
        "first_name",
        "last_name",
        "email",
        "created_at",
        "updated_at",
        "idp_id",
        "avatar_url",
        "last_sign_in_at",
        "league_id",
        "wins",
        "losses",
        sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") || 0,
      ])
      .orderBy("win_loss_ratio", "desc")
      .limit(5)
      .execute();
    console.log(result, "top 5 users returned");
    return result.map((user) => new User(user));
  }

  public async getCurrentChampion(leagueId: string): Promise<Nullable<User>> {
    const result = await fhlDb
      .selectFrom("user_title")
      .innerJoin("titles", "titles.id", "user_title.title_id")
      .where("titles.league_id", "=", +leagueId)
      .select([
        "titles.id",
        "titles.name",
        "titles.description",
        "user_id",
        "user_title.current",
        "user_title.defeated_user_id",
      ])
      .executeTakeFirst();
    if (!result) {
      return null;
    }

    const user = await fhlDb
      .selectFrom("users")
      .where("id", "=", result.user_id)
      .selectAll()
      .executeTakeFirstOrThrow();

    return new User(user);
  }

  public async getTitleLineage(
    leagueId: string,
    params: TitleLineageParams
    ): Promise<TitleChange[]> {
      const result: TitleChangeQuery[] = await fhlDb.selectFrom("user_title")
        .innerJoin("titles", "titles.id", "user_title.title_id")
        .innerJoin("users as winner", "winner.id", "user_title.user_id")
        .innerJoin("users as loser", "loser.id", "user_title.defeated_user_id")
        .where("titles.league_id", "=", +leagueId)
        .orderBy("user_title.created_at", params.order)
        .limit(params.limit)
        .offset(params.offset)
        .select([
          "winner.id",
          "loser.id",
          "titles.id",
          "titles.name",
          "titles.description",
          "titles.created_at",
          "titles.updated_at",
          "titles.league_id",
          "user_title.event_id",
        ])
        .execute();
      return result.map((champ) => new TitleChange(champ));
  }

  public async createEvent(input: CreateEventInput): Promise<Event> {
    const response = await fhlDb.insertInto("events")
      .values({
        league_id: +input.leagueId,
        is_active: input.isActive,
        name: input.name,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
    return new Event(response);
  }

  public async updateEvent(input: UpdateEventInput): Promise<Event> {
    const response = await fhlDb.updateTable("events")
      .set({
        is_active: input.isActive,
        name: input.name,
        league_id: +input.leagueId,
      })
      .where("id", "=", +input.id)
      .returningAll()
      .executeTakeFirstOrThrow();
    return new Event(response);
  }
}
