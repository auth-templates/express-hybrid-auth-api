import { require2FA } from "../require-2fa";

describe('require2FA middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('calls next if session.pending2FA is falsy', () => {
    req = {
      session: { pending2FA: false },
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => key),
    };

    require2FA(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('allows /auth/verify-2fa route even if pending2FA is true', () => {
    req = {
      session: { pending2FA: true },
      path: '/auth/verify-2fa',
      t: jest.fn().mockImplementation((key) => key),
    };

    require2FA(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('blocks access with 403 if pending2FA is true and path is not /auth/verify-2fa', () => {
    req = {
      session: { pending2FA: true },
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => `Translated: ${key}`),
    };

    require2FA(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Translated: validation.terms' });
    expect(next).not.toHaveBeenCalled();
  });

  test('handles missing session gracefully and calls next', () => {
    req = {
      path: '/dashboard',
      t: jest.fn().mockImplementation((key) => key),
    };

    require2FA(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
