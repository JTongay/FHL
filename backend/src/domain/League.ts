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
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
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
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  description: string;
  event_id: number;
  league_id: number;
};

export class TitleChange {
  eventId: string;
  winnerId: string;
  loserId: string;
  title: Title;

  constructor(query: TitleChangeQuery) {
    this.eventId = query.event_id.toString();
    this.winnerId = query.id.toString();
    this.loserId = query.id.toString();
    this.title = new Title({
      id: query.id,
      name: query.name,
      description: query.description,
      created_at: query.created_at,
      league_id: query.league_id,
      updated_at: query.updated_at,
    });
  }
}

export class ChampionLineage extends PaginatedResponse<League> {
  constructor(paginationParams: Pagination, total: number, data: League[]) {
    super(paginationParams, total, data);
  }
}
