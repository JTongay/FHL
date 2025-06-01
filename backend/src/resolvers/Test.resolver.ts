import { FHLContext } from "@/domain/FHLContext";
import { BaseResolver } from "./base/BaseResolver";
import { db } from "@/db";
import { TestTable } from "@/db/schema";

interface Args {
  name: string;
  age: number;
}

export class TestResolver extends BaseResolver {
  protected async resolver(
    parent: unknown,
    args: { testInput: Args },
    context: FHLContext
  ): Promise<string> {
    const result = await db
      .insert(TestTable)
      .values({
        name: args.testInput.name,
        ageRenamed: args.testInput.age,
      })
      .returning({ id: TestTable.id })
      .execute();

    return result[0].id.toString();
  }
}
