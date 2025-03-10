import { useGetSeasonsSuspenseQuery } from "@/generated/gql/graphql";
import Link from "next/link";
import { Suspense } from "react";

export default function Seasons() {
  // TODO - Add Pagination to the query
  const { data } = useGetSeasonsSuspenseQuery();

  if (data.seasons.__typename === "ApiError") {
    throw new Error(data.seasons.stacktrace || "oopsie");
  }
  return (
    <>
      <Suspense fallback={<p>Loading Seasons...</p>}>
        <h1>Here be the Seasons screen</h1>
        <div className="flex flex-col justify-center items-center">
          {data.seasons.data.map((season) => (
            <>
              <h1>{season.id}</h1>
              {season.teams.map((team) => (
                <>
                  <p>{team.name}</p>
                </>
              ))}
            </>
          ))}
        </div>
        <Link href="/seasons/new">Create A Season</Link>
      </Suspense>
    </>
  );
}
