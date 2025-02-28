"use client";

import {
  type PlayersQuery,
  type UsersList,
  useNewSeasonFormQuery,
  useCreateFullSeasonMutation,
} from "@/generated/gql/graphql";
import { NewSeasonForm } from "./NewSeasonForm";
import { useFhl } from "@/hooks/useFhl";
import { useState } from "react";
import { NewSeasonFormStatus } from "./types";
import { NewSeasonFormState } from "./NewSeasonFormState";

function isPlayers(data: PlayersQuery["users"]): data is UsersList {
  return data.__typename === "UsersList";
}

/**
 *
 TODO: I'm making it so that the form adds the team data to local state,
 then rendering a section of the page with the data before submitting to the API
 This way it'll give the user a chance to correct any errors before submitting
 and also incrementally add the data to the form.

 This could be overkill or not a good idea, but I'm not sure what the best
 approach is.
*/

export default function NewSeasonsPage() {
  const [formStatus, setFormStatus] = useState<NewSeasonFormStatus>({
    teams: [],
  });
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
        <NewSeasonFormState formStatus={formStatus} />
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
