import { ApiError } from "./errors/FHLApiError";
import { Order, PaginatedResponse, Pagination } from "@/util";

export class League {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  // TODO - Fix this type
  constructor(response: any) {
    this.id = response.id.toString();
    this.name = response.name;
    this.createdAt = response.createdAt;
    this.updatedAt = response.updatedAt;
  }
}

export type LeagueResponse = League | ApiError;

export interface CreateLeagueParams {
  name: string;
}

export type FHLLeague = {
  league: League;
};

export class Title {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  // TODO - Fix this type
  constructor(response: any) {
    this.id = response.id.toString();
    this.name = response.name;
    this.description = response.description;
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
  }
}

export class ChampionLineageParams implements Pagination {
  order: Order;
  limit: number;
  offset: number;

  constructor(limit: number, offset: number, order: Order) {
    this.order = order || Order.DESC;
    this.limit = limit;
    this.offset = offset;
  }
}

export type TitleChangeQuery = {
  winnerId: number;
  loserId: number;
  titleId: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  leagueId: number;
};

export class TitleChange {
  eventId: string;
  winnerId: string;
  loserId: string;
  title: Title;

  constructor(query: TitleChangeQuery) {
    this.eventId = query.eventId.toString();
    this.winnerId = query.winnerId.toString();
    this.loserId = query.loserId.toString();
    this.title = new Title({
      id: query.titleId,
      name: query.name,
      description: query.description,
      created_at: query.createdAt,
      league_id: query.leagueId,
      updated_at: query.updatedAt,
    });
  }
}

export class ChampionLineage extends PaginatedResponse<League> {
  constructor(paginationParams: Pagination, total: number, data: League[]) {
    super(paginationParams, total, data);
  }
}
