import { FHLContext } from "../../domain/FHLContext";
import { FHLApiError } from "../../domain/errors/FHLApiError";
import { NO_AUTH_HEADER, SESSION_EXPIRED } from "../../domain/errors/codes";
// import { createClerkClient } from "@clerk/clerk-sdk-node";

abstract class BaseResolver<
  ParentType = unknown,
  ArgsType = unknown,
  ReturnType = unknown
> {
  public resolve = async (
    parent: ParentType,
    args: ArgsType,
    context: FHLContext
  ): Promise<ReturnType> => {
    console.log("boyaho");
    return await this.authCheck(parent, args, context);
  };

  private authCheck = async (
    parent: ParentType,
    args: ArgsType,
    context: FHLContext
  ): Promise<ReturnType> => {
    // const clerk = createClerkClient({
    //   secretKey: process.env.CLERK_SECRET_KEY,
    //   publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    // });
    // // console.log(result, "result");
    // const authenticate = await clerk.authenticateRequest(
    //     {
    //       headerToken: this.getAuthToken(context),
    //     }
    // );
    // console.log(authenticate, "auth check in base resolver");
    // if (!authenticate.isSignedIn) {
    //   throw new FHLApiError({
    //     code: SESSION_EXPIRED,
    //     message: "Session Expired",
    //   });
    // }
    // TODO: Use this to get the user's information to store in the context
    // const whoAmI = authenticate.toAuth();
    return this.resolver(parent, args, context);
  };

  protected getAuthToken = (context: FHLContext): string => {
    if (!context.authToken) {
      throw new FHLApiError({
        code: NO_AUTH_HEADER,
        message: "Missing Authorization Header",
      });
    }

    return context.authToken;
  };

  protected abstract resolver(
    parent: ParentType,
    args: ArgsType,
    context: FHLContext
  ): Promise<ReturnType>;
}

export { BaseResolver };
