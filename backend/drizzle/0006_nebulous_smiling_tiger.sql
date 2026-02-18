CREATE TABLE "team_season" (
	"team_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	"captain_id" integer,
	"wins" integer DEFAULT 0 NOT NULL,
	"losses" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "team_season_team_id_season_id_pk" PRIMARY KEY("team_id","season_id")
);
--> statement-breakpoint
ALTER TABLE "team_season" ADD CONSTRAINT "team_season_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_season" ADD CONSTRAINT "team_season_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_season" ADD CONSTRAINT "team_season_captain_id_users_id_fk" FOREIGN KEY ("captain_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;