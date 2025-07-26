CREATE TABLE "award_season_presenter" (
	"award_id" integer NOT NULL,
	"presenter_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	CONSTRAINT "award_season_presenter_award_id_presenter_id_season_id_pk" PRIMARY KEY("award_id","presenter_id","season_id")
);
--> statement-breakpoint
ALTER TABLE "award_season" RENAME TO "award_season_winner";--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP CONSTRAINT "award_season_award_id_awards_id_fk";
--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP CONSTRAINT "award_season_presenter_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP CONSTRAINT "award_season_winner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP CONSTRAINT "award_season_season_id_seasons_id_fk";
--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP CONSTRAINT "award_season_award_id_season_id_pk";--> statement-breakpoint
ALTER TABLE "award_season_winner" ADD CONSTRAINT "award_season_winner_award_id_season_id_pk" PRIMARY KEY("award_id","season_id");--> statement-breakpoint
ALTER TABLE "award_season_presenter" ADD CONSTRAINT "award_season_presenter_award_id_awards_id_fk" FOREIGN KEY ("award_id") REFERENCES "public"."awards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_presenter" ADD CONSTRAINT "award_season_presenter_presenter_id_users_id_fk" FOREIGN KEY ("presenter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_presenter" ADD CONSTRAINT "award_season_presenter_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_winner" ADD CONSTRAINT "award_season_winner_award_id_awards_id_fk" FOREIGN KEY ("award_id") REFERENCES "public"."awards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_winner" ADD CONSTRAINT "award_season_winner_winner_id_users_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_winner" ADD CONSTRAINT "award_season_winner_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "award_season_winner" DROP COLUMN "presenter_id";