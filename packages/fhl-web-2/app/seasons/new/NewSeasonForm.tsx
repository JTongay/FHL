"use client";

import {
  UsersList,
  Team,
  CreateFullSeasonMutationFn,
  CreateFullSeasonMutation,
} from "@/generated/gql/graphql";
import { FieldArray, Formik } from "formik";
import { PropsWithChildren } from "react";
import { DatePicker } from "@/components/fhl/DatePicker";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/fhl/SelectInput";
import { MutationResult } from "@apollo/client";
import {
  NewSeasonRequest,
  type NewSeasonFormValues,
  type TeamFormValue,
} from "@/models/NewSeasonRequest";

interface Props extends PropsWithChildren {
  leagueId: string;
  teams: Partial<Team> & { id: string; name: string }[];
  players: Partial<UsersList>;
  submit: CreateFullSeasonMutationFn;
  submitStatus: MutationResult<CreateFullSeasonMutation>;
}

export function NewSeasonForm({
  leagueId,
  teams,
  players,
  submit,
  submitStatus,
}: Props) {
  const addNewTeamToForm = (
    teamsInForm: NewSeasonFormValues["teams"],
    allTeams: Partial<Team>[],
    push: (emptyTeam: TeamFormValue) => void
  ) => {
    // Check the length of the teams in the form compared
    // to the length of all teams
    // TODO: Check the teams and filter out what's
    // already selected so they can't choose the same one twice
    if (teamsInForm.length === allTeams.length) {
      console.log("Can't add any more teams");
      return;
      // Show an alert or something or just disable the button
    }

    // All good, add a new section in the formy form
    push({ id: "", captain: { id: "" } });
  };

  const removeTeam = (
    teamsInForm: NewSeasonFormValues["teams"],
    index: number,
    remove: (index: number) => void
  ) => {
    if (teamsInForm.length <= 1) {
      // Should not get here but we should handle it anyway
      return;
    }

    remove(index);
  };

  return (
    <Formik
      initialValues={{
        startAt: undefined,
        endAt: undefined,
        teams: [
          {
            id: "",
            captain: {
              id: "",
            },
          },
        ],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values, "onSubmit");
        setSubmitting(true);
        const request = new NewSeasonRequest(values, leagueId);
        try {
          const result = await submit({
            variables: {
              input: request,
            },
          });
          console.log(result, "Result??");
          if (result.errors) {
            console.log(result.errors, "ERRORS!!");
            // TODO Set Errors that were returned
          }

          if (result.data) {
            console.log(result.data, "RESULT!!");
            // TODO Show a toast of success
            // TODO Redirect maybe?
          }
        } catch (e) {
          console.error(e, "Big Bad Error yo");
        }
      }}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center items-center w-full">
            <div className="mx-12 sm:mx-4 w-[75%]">
              <div className="flex flex-col gap-y-4">
                <FieldArray
                  name="teams"
                  render={({ push, remove }) => (
                    <>
                      {values.teams.map((newTeam, index) => (
                        <div key={index}>
                          <SelectInput
                            name={`teams[${index}].id`}
                            displayKey="name"
                            placeholder="Select a Team"
                            values={teams}
                          />
                          <SelectInput
                            name={`teams[${index}].captain.id`}
                            renderOption={(user) => (
                              <span>
                                {user.gamertag} | {user.fullName}
                              </span>
                            )}
                            placeholder="Select Team Captain"
                            values={players.data || []}
                          />
                          <Button
                            onClick={() =>
                              removeTeam(values.teams, index, remove)
                            }
                          >
                            Remove team
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          addNewTeamToForm(values.teams, teams, push)
                        }
                      >
                        Add a team
                      </Button>
                    </>
                  )}
                />
                <div className="flex flex-row gap-x-4">
                  <div className="flex-grow w-full">
                    <DatePicker
                      placeholder="Start Date"
                      className="w-full"
                      name="startAt"
                    />
                  </div>
                  <div className="flex-grow w-full">
                    <DatePicker
                      placeholder="End Date"
                      className="w-full"
                      name="endAt"
                    />
                  </div>
                </div>
                <Button type="submit">Create</Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
