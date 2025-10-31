import { db } from "@/db";
import {
  EventsTable,
  LeaguesTable,
  TitlesTable,
  UserTitleTable,
} from "@/db/schema/leagues";
import { UsersTable } from "@/db/schema/users";
import { SelectLeague } from "@/db/types";
import { ApiError } from "@/domain/errors/FHLApiError";
import {
  CreateEventInput,
  Event,
  EventsList,
  EventsResponse,
  UpdateEventInput,
} from "@/domain/Event";
import {
  TitleChangeQuery,
  ChampionLineageParams as TitleLineageParams,
  TitleChange,
  League,
  CreateLeagueParams,
} from "@/domain/League";
import { User } from "@/domain/User";
import { Nullable, Pagination } from "@/util";
import DataLoader from "dataloader";
import { asc, desc, eq, inArray, sql, and, count } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export class LeagueDatasource {
  private batchLeagues = new DataLoader(async (ids: number[]) => {
    const leaguesList = await db
      .select()
      .from(LeaguesTable)
      .where(inArray(LeaguesTable.id, ids))
      .execute();

    const leagueIdsToLeagueMap = leaguesList.reduce((mapping, league) => {
      mapping[league.id] = league;
      return mapping;
    }, {} as { [key: string]: SelectLeague });
    return ids.map((id) => leagueIdsToLeagueMap[id]);
  });

  public async getFHL(): Promise<League> {
    const result = await db
      .select()
      .from(LeaguesTable)
      .where(eq(LeaguesTable.name, "FHL"))
      .execute();
    return new League(result[0]);
  }

  public async getLeague(id: number): Promise<League | ApiError> {
    try {
      const league = await this.batchLeagues.load(id);
      return new League(league);
    } catch (error) {
      return new ApiError(404, error.message);
    }
  }

  public async createLeague(
    params: CreateLeagueParams
  ): Promise<League | ApiError> {
    try {
      const response = await db
        .insert(LeaguesTable)
        .values({
          name: params.name,
        })
        .returning()
        .execute();

      return new League(response[0]);
    } catch (error) {
      return new ApiError(500, error.message);
    }
  }

  public async getBottomFiveUserRecords(leagueId: string): Promise<User[]> {
    const result = await db
      .select({
        id: UsersTable.id,
        gamertag: UsersTable.gamertag,
        firstName: UsersTable.firstName,
        lastName: UsersTable.lastName,
        email: UsersTable.email,
        createdAt: UsersTable.createdAt,
        updatedAt: UsersTable.updatedAt,
        idpId: UsersTable.idpId,
        avatarUrl: UsersTable.avatarUrl,
        lastSignInAt: UsersTable.lastSignInAt,
        leagueId: UsersTable.leagueId,
        wins: UsersTable.wins,
        losses: UsersTable.losses,
        // TODO: I don't know if this is the right way to do this
        // winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100` ?? sql<number>`0`,
        // winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") ||
        //   0,
        winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100`.as(
          "win_loss_ratio"
        ),
      })
      .from(UsersTable)
      .where(eq(UsersTable.leagueId, +leagueId))
      .orderBy(asc(sql`win_loss_ratio`))
      .limit(5)
      .execute();
    // const result = await fhlDb
    //   .selectFrom("users")
    //   .where("league_id", "=", +leagueId)
    //   .select([
    //     "id",
    //     "gamertag",
    //     "first_name",
    //     "last_name",
    //     "email",
    //     "created_at",
    //     "updated_at",
    //     "idp_id",
    //     "avatar_url",
    //     "last_sign_in_at",
    //     "league_id",
    //     "wins",
    //     "losses",
    //     sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") || 0,
    //   ])
    //   .orderBy("win_loss_ratio", "asc")
    //   .limit(5)
    //   .execute();
    console.log(result, "bottom 5 users returned");
    return result.map((user) => new User(user));
  }

  public async getTopFiveUserRecords(leagueId: string): Promise<User[]> {
    // const result = await fhlDb
    //   .selectFrom("users")
    //   .where("league_id", "=", +leagueId)
    //   .select([
    //     "id",
    //     "gamertag",
    //     "first_name",
    //     "last_name",
    //     "email",
    //     "created_at",
    //     "updated_at",
    //     "idp_id",
    //     "avatar_url",
    //     "last_sign_in_at",
    //     "league_id",
    //     "wins",
    //     "losses",
    //     sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") || 0,
    //   ])
    //   .orderBy("win_loss_ratio", "desc")
    //   .limit(5)
    //   .execute();
    const result = await db
      .select({
        id: UsersTable.id,
        gamertag: UsersTable.gamertag,
        firstName: UsersTable.firstName,
        lastName: UsersTable.lastName,
        email: UsersTable.email,
        createdAt: UsersTable.createdAt,
        updatedAt: UsersTable.updatedAt,
        idpId: UsersTable.idpId,
        avatarUrl: UsersTable.avatarUrl,
        lastSignInAt: UsersTable.lastSignInAt,
        leagueId: UsersTable.leagueId,
        wins: UsersTable.wins,
        losses: UsersTable.losses,
        // TODO: I don't know if this is the right way to do this
        // winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100` ?? sql<number>`0`,
        // winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100`.as("win_loss_ratio") ||
        //   0,
        winLossRatio: sql<number>`wins / NULLIF(losses, 0) * 100`.as(
          "win_loss_ratio"
        ),
      })
      .from(UsersTable)
      .where(eq(UsersTable.leagueId, +leagueId))
      .orderBy(desc(sql`win_loss_ratio`))
      .limit(5)
      .execute();
    console.log(result, "top 5 users returned");
    return result.map((user) => new User(user));
  }

  public async getCurrentChampion(
    leagueId: string
  ): Promise<Nullable<User> | ApiError> {
    try {
      const result = await db
        .select({
          titleId: TitlesTable.id,
          name: TitlesTable.name,
          description: TitlesTable.description,
          userId: UserTitleTable.userId,
          current: UserTitleTable.current,
          defeatedUserId: UserTitleTable.defeatedUserId,
        })
        .from(TitlesTable)
        .leftJoin(UserTitleTable, eq(TitlesTable.id, UserTitleTable.titleId))
        .where(
          and(
            eq(TitlesTable.leagueId, +leagueId),
            eq(UserTitleTable.current, true)
          )
        )
        .execute();

      if (!result || !result.length) {
        return null;
      }

      const user = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.id, result[0].userId))
        .execute();

      return new User(user[0]);
    } catch (error) {
      return new ApiError(404, error.message);
    }

    // const result = await fhlDb
    //   .selectFrom("user_title")
    //   .innerJoin("titles", "titles.id", "user_title.title_id")
    //   .where("titles.league_id", "=", +leagueId)
    //   .select([
    //     "titles.id",
    //     "titles.name",
    //     "titles.description",
    //     "user_id",
    //     "user_title.current",
    //     "user_title.defeated_user_id",
    //   ])
    //   .executeTakeFirst();
    // if (!result) {
    //   return null;
    // }

    // const user = await fhlDb
    //   .selectFrom("users")
    //   .where("id", "=", result.user_id)
    //   .selectAll()
    //   .executeTakeFirstOrThrow();

    // return new User(user);
  }

  public async getTitleLineage(
    leagueId: string,
    params: TitleLineageParams
  ): Promise<TitleChange[] | ApiError> {
    // const result: TitleChangeQuery[] = await fhlDb
    //   .selectFrom("user_title")
    //   .innerJoin("titles", "titles.id", "user_title.title_id")
    //   .innerJoin("users as winner", "winner.id", "user_title.user_id")
    //   .innerJoin("users as loser", "loser.id", "user_title.defeated_user_id")
    //   .where("titles.league_id", "=", +leagueId)
    //   .orderBy("user_title.created_at", params.order)
    //   .limit(params.limit)
    //   .offset(params.offset)
    //   .select([
    //     "winner.id",
    //     "loser.id",
    //     "titles.id",
    //     "titles.name",
    //     "titles.description",
    //     "titles.created_at",
    //     "titles.updated_at",
    //     "titles.league_id",
    //     "user_title.event_id",
    //   ])
    //   .execute();
    try {
      const loser = alias(UsersTable, "loser");
      const winner = alias(UsersTable, "winner");
      const result = await db
        .select({
          winnerId: winner.id,
          loserId: loser.id,
          titleId: TitlesTable.id,
          name: TitlesTable.name,
          description: TitlesTable.description,
          createdAt: TitlesTable.createdAt,
          updatedAt: TitlesTable.updatedAt,
          leagueId: TitlesTable.leagueId,
          eventId: UserTitleTable.eventId,
        })
        .from(UserTitleTable)
        .leftJoin(TitlesTable, eq(TitlesTable.id, UserTitleTable.titleId))
        .leftJoin(winner, eq(UserTitleTable.userId, winner.id))
        .leftJoin(loser, eq(UserTitleTable.defeatedUserId, loser.id))
        .limit(params.limit)
        .offset(params.offset)
        .orderBy(
          params.order === "asc"
            ? asc(UserTitleTable.createdAt)
            : desc(UserTitleTable.createdAt)
        )
        .execute();
      return result.map((champ) => new TitleChange(champ));
    } catch (error) {
      return new ApiError(500, error.message);
    }
  }

  async getEvent(id: number): Promise<Event | ApiError> {
    try {
      const response = await db
        .select()
        .from(EventsTable)
        .where(eq(EventsTable.id, id))
        .execute();

      return new Event(response[0]);
    } catch (error) {
      return new ApiError(404, error.message);
    }
  }

  async getEvents(pagination: Pagination): Promise<EventsList | ApiError> {
    try {
      const total = await db
        .select({
          count: count(),
        })
        .from(EventsTable)
        .execute();

      const response = await db
        .select()
        .from(EventsTable)
        .limit(pagination.limit)
        .offset(pagination.offset)
        .execute();

      const mapped = response.map((event) => new Event(event));

      return new EventsList(pagination, total[0].count, mapped);
    } catch (error) {
      return new ApiError(500, error.message);
    }
  }

  public async createEvent(input: CreateEventInput): Promise<Event> {
    try {
      const response = await db
        .insert(EventsTable)
        .values({
          leagueId: +input.leagueId,
          isActive: input.isActive,
          name: input.name,
        })
        .returning()
        .execute();

      return new Event(response);
    } catch (error) {
      console.error("Error creating event:", error);
      throw new ApiError(500, "Failed to create event");
    }
  }

  // public async updateEvent(input: UpdateEventInput): Promise<Event> {
  //   const response = await fhlDb
  //     .updateTable("events")
  //     .set({
  //       is_active: input.isActive,
  //       name: input.name,
  //       league_id: +input.leagueId,
  //     })
  //     .where("id", "=", +input.id)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  //   return new Event(response);
  // }
}
