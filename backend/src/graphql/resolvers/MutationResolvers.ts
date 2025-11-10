import { resolverMap } from "@/resolvers/base/ResolverMap";
import { CreateLeagueResolver } from "@/resolvers/league/CreateLeague.resolver";
import { CreateEventResolver } from "@/resolvers/league/event/CreateEvent.resolver";
import { UpdateEventResolver } from "@/resolvers/league/event/UpdateEvent.resolver";
import { CreateAwardResolver } from "@/resolvers/season/award/CreateAward.resolver";
import { CreateFullSeasonResolver } from "@/resolvers/season/CreateFullSeason.resolver";
import { DeleteSeasonResolver } from "@/resolvers/season/DeleteSeason.resolver";
import { CreateStorylineResolver } from "@/resolvers/season/storyline/CreateStoryline.resolver";
import { DeleteStorylineResolver } from "@/resolvers/season/storyline/DeleteStoryline.resolver";
import { UpdateStorylineResolver } from "@/resolvers/season/storyline/UpdateStoryline.resolver";
import { AddTeamToSeasonResolver } from "@/resolvers/season/team/AddTeamToSeason.resolver";
import { CreateTeamResolver } from "@/resolvers/season/team/CreateTeam.resolver";
import { DraftPlayerToTeamResolver } from "@/resolvers/season/team/DraftPlayerToTeam.resolver";
import { RemovePlayerFromTeamResolver } from "@/resolvers/season/team/RemovePlayerFromTeam.resolver";
import { UpdateTeamResolver } from "@/resolvers/season/team/UpdateTeam.resolver";
import { UpdateSeasonResolver } from "@/resolvers/season/UpdateSeason.resolver";
import { TestResolver } from "@/resolvers/Test.resolver";
import { CreateUserResolver } from "@/resolvers/user/CreateUser.resolver";
import { UpdateUserResolver } from "@/resolvers/user/UpdateUser.resolver";

export const MutationResolvers = resolverMap({
  Mutation: {
    // Test
    createTest: new TestResolver(),

    // User
    createUser: new CreateUserResolver(),
    updateUser: new UpdateUserResolver(),

    // Season
    createFullSeason: new CreateFullSeasonResolver(),
    updateSeason: new UpdateSeasonResolver(),
    deleteSeason: new DeleteSeasonResolver(),
    addTeamToSeason: new AddTeamToSeasonResolver(),

    // Team
    createTeam: new CreateTeamResolver(),
    updateTeam: new UpdateTeamResolver(),
    draftPlayerToTeam: new DraftPlayerToTeamResolver(),
    removePlayerFromTeam: new RemovePlayerFromTeamResolver(),

    // League
    createLeague: new CreateLeagueResolver(),

    // Storyline
    createStoryline: new CreateStorylineResolver(),
    updateStoryline: new UpdateStorylineResolver(),
    deleteStoryline: new DeleteStorylineResolver(),

    // Award
    createAward: new CreateAwardResolver(),

    // Event
    createEvent: new CreateEventResolver(),
    updateEvent: new UpdateEventResolver()
  },
});
