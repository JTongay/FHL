export type NewSeasonFormStatus = {
  startAt?: Date;
  endAt?: Date;
  teams: {
    id: string;
    name: string;
    captain: {
      id: string;
      name: string;
    };
  }[];
};
