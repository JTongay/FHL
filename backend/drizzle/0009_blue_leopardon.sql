CREATE TABLE "titles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "titles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"description" text NOT NULL,
	"league_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_title" (
	"title_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"current" boolean DEFAULT true NOT NULL,
	"defeated_user_id" integer DEFAULT null,
	"event_id" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "user_title_title_id_user_id_pk" PRIMARY KEY("title_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "titles" ADD CONSTRAINT "titles_league_id_leagues_id_fk" FOREIGN KEY ("league_id") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_title" ADD CONSTRAINT "user_title_title_id_titles_id_fk" FOREIGN KEY ("title_id") REFERENCES "public"."titles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_title" ADD CONSTRAINT "user_title_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_title" ADD CONSTRAINT "user_title_defeated_user_id_users_id_fk" FOREIGN KEY ("defeated_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_title" ADD CONSTRAINT "user_title_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;