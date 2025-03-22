import { useGetSeasonsSuspenseQuery } from "@/generated/gql/graphql";

export const SeasonsContent = () => {
  const { data } = useGetSeasonsSuspenseQuery();

  if (data.seasons.__typename === "ApiError") {
    throw new Error(data.seasons.stacktrace || "oopsie");
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {data.seasons.data.map((season) => (
          <div key={season.id}>
            <h1>{season.id}</h1>
            {season.teams.map((team) => (
              <div key={team.id}>
                <p>{team.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
