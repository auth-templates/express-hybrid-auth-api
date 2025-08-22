import GlobalConfig from "../../../config.js";
import { RedisController } from "../redis-controller.js";
import { RefreshTokenStore } from "../redis-token.js";

describe('RefreshTokenStore', () => {
  const userId = 42;
  const token = 'mock-refresh-token';
  const key = `refresh:${userId}:${token}`;
  const maxAge = GlobalConfig.SESSION_MAX_AGE;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('storeRefreshToken calls redisController.add with correct args', async () => {
    const addSpy = vi.spyOn(RedisController.prototype, 'add').mockResolvedValue(undefined);

    await RefreshTokenStore.storeRefreshToken(userId, token);

    expect(addSpy).toHaveBeenCalledWith(key, token, maxAge);
  });

  it('getStoredRefreshToken calls redisController.get with correct args and returns value', async () => {
    const expectedValue = token;
    vi.spyOn(RedisController.prototype, 'get').mockResolvedValue(expectedValue);

    const result = await RefreshTokenStore.getStoredRefreshToken(userId, token);

    expect(RedisController.prototype.get).toHaveBeenCalledWith(key);
    expect(result).toBe(expectedValue);
  });

  it('resetRefreshTokenExpiration calls redisController.resetExpiration with correct args', async () => {
    const expireSpy = vi.spyOn(RedisController.prototype, 'resetExpiration').mockResolvedValue(undefined);

    await RefreshTokenStore.resetRefreshTokenExpiration(userId, token);

    expect(expireSpy).toHaveBeenCalledWith(key, maxAge);
  });

  it('removeRefreshToken calls redisController.remove with correct args', async () => {
    const removeSpy = vi.spyOn(RedisController.prototype, 'remove').mockResolvedValue(undefined);

    await RefreshTokenStore.removeRefreshToken(userId, token);

    expect(removeSpy).toHaveBeenCalledWith(key);
  });
});
