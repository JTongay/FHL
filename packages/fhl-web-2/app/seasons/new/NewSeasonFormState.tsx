import { NewSeasonFormStatus } from "./types";

interface Props {
  formStatus: NewSeasonFormStatus;
}

export function NewSeasonFormState({ formStatus }: Props) {
  if (formStatus.startAt && formStatus.endAt) {
    return (
      <section>
        <p>New Season Form Status</p>
        <div>
          <p>Start at {formStatus.startAt.toDateString()}</p>
          <p>End at {formStatus.endAt.toDateString()}</p>
        </div>
        <div>
          <p>Selected Teams</p>
          {formStatus.teams.map((team) => (
            <>
              <div>{team.name}</div>
              <p>{team.captain.name}</p>
            </>
          ))}
        </div>
      </section>
    );
  }
}
