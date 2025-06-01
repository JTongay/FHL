// import {FHLContext} from "@/domain/Context";
// import {League} from "@/domain/League";
// import {LeagueTeam} from "@/domain/Team";
// import {BaseResolver} from "@/resolvers/base/BaseResolver";

// export class LeagueTeamResolver extends BaseResolver {
//   protected async resolver(
//       parent: League,
//       args: {id: string},
//       context: FHLContext): Promise<LeagueTeam> {
//     return await context
//         .datasources
//         .teamDatasource
//         .getTeamForLeague({leagueId: parent.id, teamId: args.id});
//   }
// }
