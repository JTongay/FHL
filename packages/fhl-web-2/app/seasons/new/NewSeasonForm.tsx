"use client";

import {
  UsersList,
  Team,
  CreateFullSeasonMutationFn,
  CreateFullSeasonMutation,
} from "@/generated/gql/graphql";
import { FieldArray, Form, useFormik, Formik } from "formik";
import { PropsWithChildren } from "react";
import { DatePicker } from "@/components/fhl/DatePicker";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/fhl/SelectInput";
import { MutationResult } from "@apollo/client";

interface Props extends PropsWithChildren {
  leagueId: string;
  teams: Partial<Team> & { id: string; name: string }[];
  players: Partial<UsersList>;
  submit: CreateFullSeasonMutationFn;
  submitStatus: MutationResult<CreateFullSeasonMutation>;
}

type TeamFormValue = {
  id: string;
  name: string;
  captain: {
    id: string;
    name: string;
  };
};

interface FormValues {
  startAt?: Date;
  endAt?: Date;
  teams: TeamFormValue[];
}

export function NewSeasonForm({
  leagueId,
  teams,
  players,
  submit,
  submitStatus,
}: Props) {
  const form = useFormik({
    initialValues: {
      startAt: undefined,
      endAt: undefined,
      teams: [
        {
          id: "",
          name: "",
          captain: {
            id: "",
            name: "",
          },
        },
      ],
    },
    onSubmit(values: FormValues) {
      console.log(values, "VALUESSS");
    },
  });

  const addNewTeamToForm = (
    teamsInForm: FormValues["teams"],
    allTeams: Partial<Team>[],
    push: (emptyTeam: TeamFormValue) => void
  ) => {
    // Check the length of the teams in the form compared
    // to the length of all teams
    //
    console.log(teamsInForm, "teams in form");
    console.log(allTeams, "all teams");
    if (teamsInForm.length === allTeams.length) {
      console.log("Can't add any more teams");
      return;
      // Show an alert or something or just disable the button
    }

    // All good, add a new section in the formy form
    push({ id: "", name: "", captain: { id: "", name: "" } });
  };

  const removeTeam = (
    teamsInForm: FormValues["teams"],
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
            name: "",
            captain: {
              id: "",
              name: "",
            },
          },
        ],
      }}
      onSubmit={(values) => {
        console.log(values, "onSubmit");
      }}
    >
      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-row justify-center items-center w-full">
          <div className="mx-12 sm:mx-4 w-[75%]">
            <div className="flex flex-col gap-y-4">
              <FieldArray
                name="teams"
                render={({ push, remove }) => (
                  <>
                    {form.values.teams.map((newTeam, index) => (
                      <div key={index}>
                        <SelectInput
                          {...form.getFieldProps("teams[0].name")}
                          name={`teams[0].name`}
                          displayKey="name"
                          placeholder="Select a Team"
                          values={teams}
                        />
                        <SelectInput
                          {...form.getFieldProps("teams[0].captain.name")}
                          name={`teams[0].captain.id`}
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
                            removeTeam(form.values.teams, index, remove)
                          }
                        >
                          Remove team
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        addNewTeamToForm(form.values.teams, teams, push)
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
    </Formik>
  );
}
