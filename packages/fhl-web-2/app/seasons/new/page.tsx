"use client";

import {
  type PlayersQuery,
  type UsersList,
  useNewSeasonFormQuery,
  useCreateFullSeasonMutation,
} from "@/generated/gql/graphql";
import { NewSeasonForm } from "./NewSeasonForm";
import { useFhl } from "@/hooks/useFhl";

function isPlayers(data: PlayersQuery["users"]): data is UsersList {
  return data.__typename === "UsersList";
}

export default function NewSeasonsPage() {
  const fhl = useFhl();
  const { data, error } = useNewSeasonFormQuery({
    variables: {
      limit: 15,
      offset: 0,
    },
  });
  const [createFullSeasonMutation, status] = useCreateFullSeasonMutation();

  if (error) {
    throw error;
  }

  if (data && isPlayers(data.users)) {
    const playersList = data.users;
    return (
      <>
        <h1>New Season Form</h1>
        <div className="flex justify-center flex-col">
          <p>
            This creates a new {fhl.name.toUpperCase()} season for the future.
          </p>
          <p>
            You can edit these values at a later time, they are not set in
            stone!
          </p>
        </div>

        <NewSeasonForm
          submit={createFullSeasonMutation}
          submitStatus={status}
          leagueId={fhl.id}
          teams={data.fhl.league.teams}
          players={playersList}
        />
      </>
    );
  }
}
