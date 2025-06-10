import { Request, Response } from 'express';

jest.mock('csrf-sync', () => {
  return {
    csrfSync: () => ({
      csrfSynchronisedProtection: jest.fn(),
      generateToken: jest.fn(() => 'fixed-token-123'),
    }),
  };
});

// Now import after mocking
import { csrfTokenHandler, csrfProtection } from '../csrf';

describe('csrfTokenHandler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let cookieMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    cookieMock = jest.fn().mockReturnValue({ json: jsonMock });

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
