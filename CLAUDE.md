# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product Overview

FHL is a gaming league ran by a group of friends. The application I intend on building here is a place to manage and view the league by managing players, teams, seasons, awards, and scheduling. Currently, we manage the league in discord through a bulletin of pinned events, scheduling peoples availability for games through spreadsheets, drafting players into teams offline through messages, and just random voice channel conversations. Ideally we would have a 1 stop shot for all of these things, with scheduling games having a high priority.

Generally speaking, the league goes as follows:

- We have 1 commissioner who is also a player, and that commissioner sets the rules for pretty much everything.
- There are roughly 20 players in the league
- There is a season every year, where the season lasts about 6-8 months
- Each season has at least 2 teams
- There is 1 captain who is also a player on each team that drafts players
- Every month is a showdown game where the teams set their lineups of players to compete against each other in a predetermined game. This is where the scheduling comes in
- Before each showdown, there can be some scrimmage matches. This is also where the scheduling comes in
- After all of the showdowns are over, we host a 2-3 night in person event called "The Gauntlet" where we take the results of the previous showdowns and gives the teams points towards the Gauntlet event in a marathon of games.
- The particulars of the Gauntlet are not super important at this time

Currently I am in the process of deprecating all of the SST stuff, so anything inside the `infra` and `packages` directories you can ignore for now.

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

# Deploy to test environment
pnpm deploy:test

# Deploy to production
pnpm deploy:prod

# Type checking
pnpm typecheck
```

### Database Operations

```bash
# Generate new migration
pnpm gen migration new <MigrationName>

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
- `infra/`: AWS infrastructure definitions using SST

## Database Schema

- Users, Teams, Leagues, Seasons, Games, Awards, Storylines
- Drizzle migrations in `backend/drizzle/`
- Schema files in `backend/src/db/schema/`

## Development Notes

- Use shadcn/ui for new components: `pnpx shadcn@latest add <component>`
- GraphQL schema files are in `backend/src/graphql/schema/`
- Frontend uses GraphQL codegen for type-safe queries
- SST handles AWS deployment and local development environment
