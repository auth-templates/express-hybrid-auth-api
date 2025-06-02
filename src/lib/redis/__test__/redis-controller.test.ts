import { RedisController } from '../redis-controller';
import type Redis from 'ioredis';

describe('RedisController', () => {
  let mockRedisClient: jest.Mocked<Redis>;
  let controller: RedisController;

  beforeEach(() => {
    mockRedisClient = {
      set: jest.fn(),
      sadd: jest.fn(),
      del: jest.fn(),
      srem: jest.fn(),
      get: jest.fn(),
      smembers: jest.fn(),
      sismember: jest.fn(),
      pexpire: jest.fn(),
      pipeline: jest.fn(),
    } as any; // casting because ioredis types are complex

    controller = new RedisController(mockRedisClient);
  });

  it('add() should call set with PX option', async () => {
    await controller.add('key', 'value', 5000);
    expect(mockRedisClient.set).toHaveBeenCalledWith('key', 'value', 'PX', 5000);
  });

  it('addToSet() should call sadd', async () => {
    await controller.addToSet('key', 'value');
    expect(mockRedisClient.sadd).toHaveBeenCalledWith('key', 'value');
  });

  it('remove() should call del', async () => {
    await controller.remove('key');
    expect(mockRedisClient.del).toHaveBeenCalledWith('key');
  });

  it('removeFromSet() should call srem', async () => {
    await controller.removeFromSet('key', 'value');
    expect(mockRedisClient.srem).toHaveBeenCalledWith('key', 'value');
  });

  it('get() should return value from get', async () => {
    mockRedisClient.get.mockResolvedValue('stored-value');
    const result = await controller.get('key');
    expect(result).toBe('stored-value');
    expect(mockRedisClient.get).toHaveBeenCalledWith('key');
  });

  it('getAllFromSet() should return members from smembers', async () => {
    mockRedisClient.smembers.mockResolvedValue(['a', 'b']);
    const result = await controller.getAllFromSet('set-key');
    expect(result).toEqual(['a', 'b']);
    expect(mockRedisClient.smembers).toHaveBeenCalledWith('set-key');
  });

  it('isMemberOfSet() should return true if sismember returns 1', async () => {
    mockRedisClient.sismember.mockResolvedValue(1);
    const result = await controller.isMemberOfSet('set-key', 'value');
    expect(result).toBe(true);
  });

  it('isMemberOfSet() should return false if sismember returns 0', async () => {
    mockRedisClient.sismember.mockResolvedValue(0);
    const result = await controller.isMemberOfSet('set-key', 'value');
    expect(result).toBe(false);
  });

  it('resetExpiration() should call pexpire', async () => {
    await controller.resetExpiration('key', 1000);
    expect(mockRedisClient.pexpire).toHaveBeenCalledWith('key', 1000);
  });

  it('removeMultiple() should call del in pipeline and exec', async () => {
    const delMock = jest.fn();
    const execMock = jest.fn().mockResolvedValue([]);
    mockRedisClient.pipeline.mockReturnValue({ del: delMock, exec: execMock } as any);

    await controller.removeMultiple(['key1', 'key2']);

    expect(mockRedisClient.pipeline).toHaveBeenCalled();
    expect(delMock).toHaveBeenCalledTimes(2);
    expect(execMock).toHaveBeenCalled();
  });
});
