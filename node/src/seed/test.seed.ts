import Mongoose from 'mongoose';
import { startConnection } from '../dals/dataAccess';
import { insertCollectionByName, removeCollectionByName } from '../helpers/mongodb.test-manager';
import { UserDto } from '../dtos';

export const seedUsers: UserDto[] = [
  {
    name: 'Mohit',
    email: 'nagorimohit21@gmail.com',
    password: 'mohit#2608',
  },
];

beforeAll(async () => {
  await startConnection('users_test');
  await insertCollectionByName('users', seedUsers);
});

afterAll(async () => {
  await removeCollectionByName('users');
  await Mongoose.connection.close();
});
