import { Nullable, PaginatedResponse, Pagination } from "@/util";
import { ApiError } from "@/domain/errors/FHLApiError";

export interface Award {
  id: string;
  name: string;
  description: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
  seasonId: string;
  winningUserIds: string[];
  presentingUserIds: string[];
}

// export const awardSeasonWinnerQB = expressionBuilder<
//   Database,
//   "awards" | "award_season_winner"
// >();

// export function hasSeasonId(id: number) {
//   return (
//     eb: ExpressionBuilder<Database, "awards" | "award_season_winner">,
//   ) => {
//     return eb.exists(
//       eb
//         .selectFrom("award_season_winner")
//         .select("award_season_winner.season_id")
//         .where("award_season_winner.season_id", "=", id),
//     );
//   };
// }

export type AwardResult = {
  id: number;
  season_id: Nullable<number>;
};

export class AwardsList extends PaginatedResponse<Award> {
  constructor(paginationParams: Pagination, total: number, data: Award[]) {
    super(paginationParams, total, data);
  }
}

export type AwardsResponse = AwardsList | ApiError;
export type AwardResponse = Award | ApiError;

export interface CreateAwardParams {
  name: string;
  seasonId: string;
  description: Nullable<string>;
  winningUserIds?: string[];
  presentingUserIds?: string[];
}

export class AwardMapper {
  constructor(
    private id: number,
    private name: string,
    private description: Nullable<string>,
    private created_at: Date,
    private updated_at: Date,
    private season_id: number,
    private winning_user_ids: number[],
    private presenting_user_ids: number[]
  ) {}

  toAward(): Award {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      seasonId: this.season_id.toString(),
      winningUserIds: this.winning_user_ids.map(String),
      presentingUserIds: this.presenting_user_ids.map(String),
    };
  }
}
