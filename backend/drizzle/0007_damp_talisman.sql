CREATE TABLE "user_team_season" (
	"team_id" integer NOT NULL,
	"player_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "user_team_season_team_id_player_id_season_id_pk" PRIMARY KEY("team_id","player_id","season_id")
);
--> statement-breakpoint
ALTER TABLE "user_team_season" ADD CONSTRAINT "user_team_season_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_team_season" ADD CONSTRAINT "user_team_season_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_team_season" ADD CONSTRAINT "user_team_season_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;