// import { FHLContext } from "@/domain/Context";
// import { BaseResolver } from "../base/BaseResolver";
// import { Input } from "@/util";
// import { DeleteSeasonParams } from "@/domain/Season";
// import { ApiError } from "@/domain/errors/FHLApiError";
// import { fhlDb } from "@fhl/core/src/db";

// export class DeleteSeasonResolver extends BaseResolver {
//     protected async resolver(
//         parent: any,
//         args: Input<DeleteSeasonParams>,
//         context: FHLContext
//     ): Promise<boolean> {
//         try {
//             const deleted = await fhlDb.deleteFrom("seasons")
//                 .where("id", "=", +args.input.id)
//                 .executeTakeFirstOrThrow()
//             return true
//         } catch (e: unknown) {
//             return false
//         }
//     }
// }
