import DataLoader from "dataloader";
import {
  CreateUserParams,
  UpdateUserParams,
  User,
  UserResponse,
  UsersList,
  UsersResponse,
} from "@/domain/User";
import { ApiError } from "@/domain/errors/FHLApiError";
import { Pagination } from "@/util";
import { UNKNOWN_ERROR } from "@/domain/errors/codes";
import { TitleChange } from "@/domain/League";

// function isUser(user: Selectable<Users> | Error): user is Selectable<Users> {
//   return !(user instanceof Error);
// }

// function isError(user: Selectable<Users> | Error): user is Error {
//   return user instanceof Error;
// }

export class UserDatasource {
  // private userRepo: UserRepository;
  // constructor() {
  //   this.userRepo = new UserRepository(fhlDb);
  // }

  private batchUsers = new DataLoader(async (ids: number[]) => {
    console.log("hi");
    return [];
    // const usersList = await this.userRepo.getUsers(ids);
    // // Dataloader expects you to return a list with the results ordered just like the list in the arguments were
    // // Since the database might return the results in a different order the following code sorts the results accordingly
    // const userIdsToUserMap = usersList.reduce((mapping, user) => {
    //   mapping[user.id] = user;
    //   return mapping;
    // }, {} as { [key: string]: Selectable<Users> });
    // return ids.map((id) => userIdsToUserMap[id]);
  });

  // async getUsersBatch(ids: number[]): Promise<User[] | ApiError> {
  //   // const users = await this.batchUsers.loadMany(ids);
  //   // // Filter out the errors for some reason?
  //   // // TODO Maybe I want to get access to the Errors?
  //   // const errors = users.filter(isError);
  //   // if (errors.length) {
  //   //   console.error(errors);
  //   //   return new ApiError(1000, errors[0].message);
  //   // }
  //   // return users
  //   //     .filter(isUser)
  //   //     .map((user) => new User(user));
  // }

  // async getUsersPaginated(pagination: Pagination): Promise<UsersResponse> {
  //   // const users = await this.userRepo.getUsersPaginated(pagination);
  //   // return new UsersList(pagination, users.length, users.map((user) => new User(user)));
  // }

  // async getUser(id: number): Promise<UserResponse> {
  //   // try {
  //   //   const user = await this.batchUsers.load(id);
  //   //   if (!user) {
  //   //     return new ApiError(1001, "User not found");
  //   //   }
  //   //   return new User(user);
  //   // } catch (e: unknown) {
  //   //   return new ApiError(UNKNOWN_ERROR, e.toString());
  //   // }
  // }

  // async createUser(params: CreateUserParams): Promise<UserResponse> {
  //   // try {
  //   //   const response = await this.userRepo.createUser(params);
  //   //   return new User(response);
  //   // } catch (e) {
  //   //   return new ApiError(101, e.toString());
  //   // }
  // }

  // async updateUser(params: UpdateUserParams): Promise<UserResponse> {
  //   // try {
  //   //   const response = await this.userRepo.updateUser(params);
  //   //   return new User(response);
  //   // } catch (e: unknown) {
  //   //   return new ApiError(1009, e.toString());
  //   // }
  // }

  // async getTitleHistory(userId: number): Promise<TitleChange[]> {
  //   // return await this.userRepo.getTitleHistory(userId);
  // }
}
