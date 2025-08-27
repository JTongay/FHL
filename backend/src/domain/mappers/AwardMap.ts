// import { AwardTable } from "@/repositories/Award.repository";
import { SelectAward } from "@/db/types";
import { Award } from "../Award";
import { AwardsTable } from "@/db/schema/leagues";

interface AwardResponse extends SelectAward {
  seasonId: string;
  winners: string[];
  presenters: string[];
}

export class AwardMapper {
  static toDomain(table: AwardResponse): Award {
    return {
      id: table.id.toString(),
      name: table.name,
      description: table.description,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      seasonId: table.seasonId?.toString() || "0",
      winningUserIds: table.winners.map(String),
      presentingUserIds: table.presenters.map(String),
    };
  }
}
