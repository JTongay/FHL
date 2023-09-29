import { UserDatasource } from "@/datasources/UserDatasource";
import { Nullable } from "@/util";

const UNKNOWN_HEADER = "unknown";

export enum Platform {
    ANDROID = "Android",
    iOS = "iOS",
    WEB = "Web"
}

export type FHLContext = {
    authToken: Nullable<string>;
    datasources: {
        userDatasource: UserDatasource;
    }
}

export type BaseContext = {
    authToken?: string;
    appName: string;
    appVersion: string;
    platform: Platform;
    userAgent: string;
}

// Can't find the type for the args?
const contextBuilder = async ({ req }: any): Promise<BaseContext> => {
    const authToken: string | null = req.headers["authorization"];
    const context: BaseContext = {
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
