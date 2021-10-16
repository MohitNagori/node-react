import { UserDALFactory } from './user.contract.dal';
import { UserModel } from '../models';
import { UserEntity } from '../entities';
import { mapUserDocumentToUserModel, mapPaginatedUserDocumentToPaginatedUserModel } from '../mappers';
import { PaginatedResponse, SearchParamsDto, UserDto } from '../../dtos';
import Mongoose from 'mongoose';
import { customError } from '../../helpers/utility';

export const userDALFactory: UserDALFactory = () => ({
  findById: (id: string): Promise<UserModel> => {
    if (!Mongoose.Types.ObjectId.isValid(id)) {
      throw customError('User Not Found', 404);
    }

    return UserEntity.findOne({ _id: id }).then((user) => mapUserDocumentToUserModel(user));
  },

  findOne: (params: any, fetchPassowrd?: boolean): Promise<UserModel> => {
    const request = UserEntity.findOne(params);
    if (fetchPassowrd) {
      request.select('+password');
    }
    return request.then((user) => mapUserDocumentToUserModel(user));
  },

  findAll: (searchParams: SearchParamsDto): Promise<PaginatedResponse<UserModel>> => {
    const params: any = {};
    if (searchParams.search) {
      params.name = searchParams.search;
    }

    return UserEntity.aggregate([
      {
        $facet: {
          data: [
            { $match: params },
            { $skip: searchParams.limit * (searchParams.page - 1) },
            { $limit: searchParams.limit },
            { $sort: { [searchParams.sort.field]: searchParams.sort.direction === 'desc' ? -1 : 1 } },
          ],
          count: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          data: '$data',
          count: { $arrayElemAt: ['$count', 0] },
        },
      },
      {
        $project: {
          data: '$data',
          count: '$count.count',
        },
      },
    ]).then((response) => mapPaginatedUserDocumentToPaginatedUserModel(response[0]));
  },

  save: (user: UserDto): Promise<UserModel> => {
    return UserEntity.create(user).then((user) => mapUserDocumentToUserModel(user));
  },
});
