import { AwardTable } from "@/repositories/Award.repository";
import { Award } from "../Award";

export class AwardMapper {
    static toDomain(table: AwardTable): Award {
        return {
            id: table.id.toString(),
            name: table.name,
            description: table.description,
            createdAt: table.created_at,
            updatedAt: table.updated_at,
            seasonId: table.season_id?.toString() || "0",
            winningUserIds: table.winners.map(String),
            presentingUserIds: table.presenters.map(String)
        }
    }
}