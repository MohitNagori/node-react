import { UserModel } from '../models';
import { UserDocument } from '../entities';
import { customError } from '../../helpers/utility';
import { PaginatedResponse } from '../../dtos';

export const mapUserDocumentToUserModel = (user: UserDocument | null): UserModel => {
  if (!user) {
    throw customError('User Not Found', 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || user.createdAt,
    password: user.password,
  };
};

export const mapPaginatedUserDocumentToPaginatedUserModel = ({
  data,
  count,
}: {
  data: UserDocument[];
  count: number;
}): PaginatedResponse<UserModel> => {
  return {
    data: data.map((user) => mapUserDocumentToUserModel(user)),
    count,
  };
};

// export const mapPaginatedUserDocumentToPaginatedUserModel = (response: any): PaginatedResponse<UserModel> => {
//   console.log('=====', response);
//   return {
//     data: response.data.map((user: any) => mapUserDocumentToUserModel(user)),
//     count: response.count,
//   };
// };
