import { ApiError } from "./errors/FHLApiError";
import { PaginatedResponse, Pagination } from "@/util";

export class Season {
  id: string;
  year: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;

  // TODO - Fix this type
  constructor(response: any) {
    this.id = response.id.toString();
    this.year = response.year;
    this.isActive = response.is_active;
    this.createdAt = response.created_at;
    this.updatedAt = response.updated_at;
    this.startDate = response.start_date;
    this.endDate = response.end_date;
  }
}

export type SeasonResponse = ApiError | Season;
export type SeasonsResponse = ApiError | SeasonsList;

export class SeasonsList extends PaginatedResponse<Season> {
  constructor(paginationParams: Pagination, total: number, data: Season[]) {
    super(paginationParams, total, data);
  }
}

export interface CreateSeasonParams {
  leagueId: string;
  setActive: boolean;
  year: number;
  startDate: Date;
  endDate: Date;
}

export interface UpdateSeasonParams {
  id: string;
  setActive: boolean;
  year: number;
  startDate: Date;
  endDate: Date;
}

export interface DeleteSeasonParams {
  id: string;
}

export type CreateFullSeasonParams = {
  leagueId: string;
  teams: {
    id: string;
    captain: string;
  }[];
  startDate: string;
  endDate: string;
};
