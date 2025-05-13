import { Controller } from "../lib/redis/redis-controller";

export const mockRedisController = (): jest.Mocked<Controller> => ({
  add: jest.fn(),
  addToSet: jest.fn(),
  remove: jest.fn(),
  removeFromSet: jest.fn(),
  get: jest.fn().mockResolvedValue(null),
  getAllFromSet: jest.fn().mockResolvedValue([]),
  isMemberOfSet: jest.fn().mockResolvedValue(false),
  resetExpiration: jest.fn(),
  removeMultiple: jest.fn(),
});
