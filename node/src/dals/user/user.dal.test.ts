import { userDALFactory } from './user.dal';
import { SearchParamsDto } from '../../dtos';
import { seedUsers } from '../../seed/test.seed';

describe('usersDAL', () => {
  describe('user has users', () => {
    test('invoke findAll returns the users', async () => {
      // Arrange
      const userDAL = userDALFactory();
      const expectCategories = seedUsers;
      // Act
      const users = await userDAL.findAll(new SearchParamsDto());

      // Assert
      expect(users).not.toBeNull();
      expect(users.count).toBe(expectCategories.length);
    });
  });
});
