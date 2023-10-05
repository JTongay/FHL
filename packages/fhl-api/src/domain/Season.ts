import { Seasons } from "@fhl/core/src/sql.generated";
import { Selectable } from "kysely"
import { ApiError } from "./errors/FHLApiError";
import { PaginatedResponse, Pagination } from "@/util";

export class Season {
    id: string;
    year: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(response: Selectable<Seasons>) {
        this.id = response.id.toString();
        this.year = response.year;
        this.isActive = response.is_active;
        this.createdAt = response.created_at;
        this.updatedAt = response.updated_at;
    }
}

export type SeasonResponse = ApiError | Season;
export type SeasonsResponse = ApiError | SeasonsList;

export class SeasonsList extends PaginatedResponse<Season> {
    constructor(paginationParams: Pagination, total: number, data: Season[]) {
        super(paginationParams, total, data)
    }
}

export interface CreateSeasonParams {
    leagueId: string;
    setActive: boolean;
    year: number;
}

export interface UpdateSeasonParams {
    id: string;
    setActive: boolean;
    year: number;
}

export interface DeleteSeasonParams {
    id: string;
}
