import { PaginatedResponse, UserDto } from '../../dtos';
import { SearchParamsDto } from '../../dtos/search-params.dto';
import { UserModel } from '../models';

export interface UserDAL {
  findById(id: string): Promise<UserModel>;
  findOne(params: any, fetchPassowrd?: boolean): Promise<UserModel>;
  save(user: UserDto): Promise<UserModel>;
  findAll(seasrchParams: SearchParamsDto): Promise<PaginatedResponse<UserModel>>;
}

export type UserDALFactory = (args?: any[]) => UserDAL;
