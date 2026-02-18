import { AwardDatasource } from "@/datasources/AwardDatasource";
import { LeagueDatasource } from "@/datasources/LeagueDatasource";
import { SeasonDatasource } from "@/datasources/SeasonDatasource";
import { StorylineDatasource } from "@/datasources/StorylineDatasource";
import { TeamDatasource } from "@/datasources/TeamDatasource";
import { UserDatasource } from "@/datasources/UserDatasource";
import { Nullable } from "@/util";

const UNKNOWN_HEADER = "unknown";

// export interface FHLContext {
//   authToken: string | null;
// }

export enum Platform {
  ANDROID = "Android",
  iOS = "iOS",
  WEB = "Web",
}

export interface FHLContext {
  authToken: Nullable<string>;
  datasources: {
    userDatasource: UserDatasource;
    teamDatasource: TeamDatasource;
    seasonDatasource: SeasonDatasource;
    leagueDatasource: LeagueDatasource;
    awardDatasource: AwardDatasource;
    storylineDatasource: StorylineDatasource;
  };
}

export type BaseContext = {
  authToken: string;
  appName: string;
  appVersion: string;
  platform: Platform;
  userAgent: string;
};

// Can't find the type for the args?
const contextBuilder = async ({ req }: any): Promise<BaseContext> => {
  const authToken: string = req.headers["authorization"] || "";
  const context: BaseContext = {
    authToken,
    appName: req.headers["app-name"] ?? "FHL",
    appVersion: req.headers["app-version"] ?? UNKNOWN_HEADER,
    platform: req.headers["platform"] ?? UNKNOWN_HEADER,
    userAgent: req.headers["user-agent"] ?? UNKNOWN_HEADER,
  };

  if (authToken) {
    context.authToken = authToken;
  }
  return context;
};

export { contextBuilder };
