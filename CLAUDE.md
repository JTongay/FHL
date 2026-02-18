# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Overview

FHL is a gaming league ran by a group of friends. The application I intend on building here is a place to manage and view the league's current and historical data by managing players, teams, seasons, awards, and scheduling. Currently, we manage the league in discord through a bulletin of pinned events, scheduling peoples availability for games through spreadsheets, drafting players into teams offline through messages, and just random voice channel conversations. Ideally we would have a 1 stop shot for all of these things, with scheduling games having a high priority.

Generally speaking, the league goes as follows:

- We have 1 commissioner, who is also a player, and that commissioner sets the rules for pretty much everything. The commissioner can also have a few other admins who can give input, but the commissioner has the final say.
- There are roughly 20 players in the league, but that could either get bigger or smaller. Don't ever set a max number of players.
- There is a season every year, where the season lasts about 6-8 months. The season can span within a calendar year or can span between 2 calendar years, so for example, one season can be from March to November, but another could span from September to April.
- Each season has either 2 or 3 teams competing against each other historically, but never assume it'll only be that many
- There is 1 captain, who is also a player, on each team that drafts players. The draft is a typically Dodgeball style, where each captain goes one at a time picking players that are available. The drafting order is determined via coinflip. Drafts can happen offline or online. This feature can be pretty basic for now, but we can expand on this in the future to make it more engaging and cool.
- When a season is announced and the draft is complete, the commissioner announces the video games that will be played, in order, followed by the date and location of the Gauntlet. More details on the Gauntlet towards the end.
- Every month is a showdown game where the teams set their lineups of players to compete against each other in a predetermined video game. The game selection is set by the commissioner, as well as in what order the games will be played.
- Before each showdown, there can be some scrimmage matches, typically agreed on one day during the week.
- It is up to the captains to select which players will competing in the showdown. They can choose themselves or some of the players on their team. A captain can also choose players as backups to play just in case anything happens. Once the players are selected, scheduling occurs.
- For scheduling, each player puts in their availability in a 2 week window, where the player is available to play the game of the current showdown. The availability markers are, "available", "unavailable", and "preferred".
- After all of the showdowns are over, we host a 2-3 night in person event called "The Gauntlet" where we take the results of the previous showdowns and gives the teams points towards the Gauntlet event in a marathon of games.
- The particulars of the Gauntlet are not super important at this time

Currently I am in the process of deprecating all of the SST stuff, so anything inside the `infra` and `packages` directories you can ignore for now.

## Main Goals

## Project Structure

FHL is a gaming league for my friend group:

- **Backend**: Node.js/Express with Apollo Server (GraphQL), Drizzle ORM, PostgreSQL
- **Frontend**: React with Vite, TanStack Router, TanStack Query, Clerk auth, Tailwind CSS
- **Infrastructure**: AWS deployment via SST (Serverless Stack)
- **Database**: PostgreSQL with Drizzle ORM migrations

## Common Commands

### Development

```bash
# Frontend development server
cd frontend && pnpm dev

# Backend development server
cd backend && pnpm dev
```

### Build & Deploy

```bash
# Build the entire project
pnpm build

# Deploy to production
pnpm deploy:prod

# Type checking
pnpm typecheck
```

### Database Operations

```bash
# Generate Drizzle schema
cd backend && pnpm db:generate

# Apply migrations
cd backend && pnpm db:migrate
```

### Frontend Specific

```bash
# Linting and formatting
cd frontend && pnpm lint
cd frontend && pnpm check

# GraphQL code generation (watch mode)
cd frontend && pnpm graphql-gen:watch

# Add shadcn components
cd frontend && pnpx shadcn@latest add <component>
```

## Architecture Overview

### Backend Architecture

- **GraphQL API**: Apollo Server with type-safe resolvers
- **Data Layer**: Drizzle ORM with PostgreSQL
- **Domain Layer**: Domain entities (User, Team, Season, League, etc.)
- **Datasources**: Data access layer with DataLoader for optimization
- **Repositories**: Business logic layer
- **Resolvers**: GraphQL resolvers organized by domain (user/, team/, season/, etc.)

### Frontend Architecture

- **Routing**: TanStack Router with file-based routing
- **State Management**: TanStack Query for server state
- **Forms**: TanStack Form with Zod validation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Clerk for user management

### Key Directories

- `backend/src/resolvers/`: GraphQL resolvers organized by domain
- `backend/src/domain/`: Domain entities and business logic
- `backend/src/datasources/`: Data access layer
- `backend/src/db/schema/`: Database schema definitions
- `frontend/src/routes/`: File-based routing structure
- `frontend/src/components/`: Reusable UI components

## Database Schema

- Users, Teams, Leagues, Seasons, Games, Awards, Storylines
- Drizzle migrations in `backend/drizzle/`
- Schema files in `backend/src/db/schema/`

## Development Notes

- Use shadcn/ui for new components: `pnpx shadcn@latest add <component>`
- GraphQL schema files are in `backend/src/graphql/schema/`
- Frontend uses GraphQL codegen for type-safe queries.
- ALWAYS use TypeScript and NEVER use an `any` type.
