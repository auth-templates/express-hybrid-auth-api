import { Request, Response } from 'express';

vi.mock('csrf-sync', () => {
  return {
    csrfSync: () => ({
      csrfSynchronisedProtection: vi.fn(),
      generateToken: vi.fn(() => 'fixed-token-123'),
    }),
  };
});

// Now import after mocking
import { csrfTokenHandler, csrfProtection } from '../csrf.js';

describe('csrfTokenHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let cookieMock: vi.Mock;
  let jsonMock: vi.Mock;

  beforeEach(() => {
    jsonMock = vi.fn();
    cookieMock = vi.fn().mockReturnValue({ json: jsonMock });

    req = {} as Partial<Request>;
    res = {
      cookie: cookieMock,
      json: jsonMock,
    };
  });

  test('should generate a CSRF token, set cookie, and respond with token JSON', () => {
    csrfTokenHandler(req as Request, res as Response);

    expect(cookieMock).toHaveBeenCalledWith(
      'XSRF-TOKEN',
      'fixed-token-123',
      expect.objectContaining({
        httpOnly: false,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    expect(jsonMock).toHaveBeenCalledWith({
      csrfToken: 'fixed-token-123',
    });
  });
});

describe('csrfProtection', () => {
  test('should be defined as a function (middleware)', () => {
    expect(typeof csrfProtection).toBe('function');
  });
});
